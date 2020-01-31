import React from 'react';
import ReactEmoji from 'react-emoji';

import './Message.css';

const Message = ({ message: { text, user }, name }) => {  // check individual message if it belongs to the current user, takes in the message object and the name of the user
  let isSentByCurrentUser = false;  // current condition

  const trimmedName = name.trim().toLowerCase();  // trim and lowercase the name, to match the backend.

  if(user === trimmedName) {  // check whether the current user is the message's user
    isSentByCurrentUser = true;  // if so, change the condition to true
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10 ">{user}</p>
          </div>
        )
  );
}

export default Message;