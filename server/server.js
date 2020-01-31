const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')  // require the helper functions

const PORT = process.env.PORT || 8000;  // define the port information

const router = require('./router'); 

const app = express();
const server = http.createServer(app);  // set up the server
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {  // socket join
    const { error, user } = addUser({ id: socket.id, name, room }); // 

    if(error) return callback(error);  // if there is error, return the callback function with error

    socket.join(user.room);  // if no error, joins a user to a user.room

    socket.emit('message', { user: 'Admin', text: `${user.name}, welcome to room ${user.room}.`});  // emit an event 'message', 
    socket.broadcast.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has joined!` });  // broadcast function make a event to all users in the room, then emit the message new user joined
    
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });  // send to frontend for the current users in the room
    
    callback();
  });

  socket.on('sendMessage', (message, callback) => {  // send message event, takes in the message, and a callback function
    const user = getUser(socket.id);  // find the current user

    io.to(user.room).emit('message', { user: user.name, text: message });  // send an io instance to the user's room with the message object, user(name) and test(message)

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id); // invoke removeUser function

    if(user) {  // let other users know
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });  // send a message to users in the room
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});


server.listen(PORT, () => {
  console.log(`Server is listening at Port ${PORT}.`)
})
