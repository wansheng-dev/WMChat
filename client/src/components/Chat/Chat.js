import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

let socket;

const Chat = ({ location }) => {
  const [ name, setName ] = useState('');
  const [ room, setRoom ] = useState('');
  const [ users, setUsers ] = useState('');
  const [ message, setMessage ] = useState('');
  const [ messages, setMessages ] = useState([]);
  const ENDPOINT = 'localhost:8000';


  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);


  useEffect(() => {  // handle message
    socket.on('message', (message) => {      // listen for message event
      setMessages([...messages, message ]);  // take the message send by admin or otehrs, will be set into the messages state
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    })

    return () => {
      socket.emit('disconnect');

      socket.off();
    }

  }, [messages])  // reload on when messages change


  const sendMessage = (event) => { // handle send message
    event.preventDefault();
  
    if(message) {  // if there is message
      socket.emit('sendMessage', message, () => setMessage(''));  // socket will emit the message to the backend - send the message back - then clear the message
    }
  }

  // console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;