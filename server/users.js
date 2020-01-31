const users = [];  // create a users arr to save all user information

const addUser = ({ id, name, room }) => {  // add user function, takes in id (from socket), name, room
  name = name.trim().toLowerCase();  // trim name spaces, and make it lowercase
  room = room.trim().toLowerCase();  // trim room spaces, and make it lowercase

  const existingUser = users.find((user) => user.room === room && user.name === name);  // check if there is user in the same room with same name

  if(!name || !room) return { error: 'Username and room are required.' };
  if(existingUser) return { error: 'Username is taken.' };  // if there is existing user, return an error message

  const user = { id, name, room };  // if not, create a new user

  users.push(user);  // push the user to the users array

  return { user };  // return out the user.
}

const removeUser = (id) => {  // remove a user, takes in the user's id.
  const index = users.findIndex((user) => user.id === id);  // try find if the user is there by user it, and return the index for the user in the array.

  if(index !== -1) return users.splice(index, 1)[0];  // if there is user, splice out the user.
}

const getUser = (id) => users.find((user) => user.id === id);  // find the user by id

const getUsersInRoom = (room) => users.filter((user) => user.room === room);  // use filter function to filter out the users based off the room.

module.exports = { addUser, removeUser, getUser, getUsersInRoom };  // export above helper functions.