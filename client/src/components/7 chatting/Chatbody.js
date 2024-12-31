import GroupsIconTwo from '../required/svg/GroupsIconTwo';
import React, { useState, useRef } from 'react';
import { BsCameraVideo } from 'react-icons/bs';
function ChatBody() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="chatting-container">
      <div className="chatting-top">
        <div className="chatting-top-left">
          <div className="chatting-top-left-img">
            <GroupsIconTwo />
          </div>
          <div className="chatting-top-left-text">
            <h3>Username</h3>
            <p>Online</p>
          </div>
        </div>
        <div className="chatting-top-right">
          {/* <BsCameraVideo /> */}
          <i className="fa-solid fa-video"></i>
          <i className="fa-solid fa-phone"></i>
          {/* <i className="fa-solid fa-magnifying-glass"></i> */}
          {/* <i className="fa-solid fa-paperclip"></i> */}
          {/* <i className="fa-solid fa-ellipsis-vertical"></i> */}
          <i className="fa-solid fa-circle-info"></i>
        </div>
      </div>
      <div className="chatting-msgs">chat msgs</div>
      <div className="chatting-bottom">
        <div className="chatting-bottom-container">
          <div className="chatting-bottom-container-icon">
            <i className="fa-solid fa-smile"></i>
          </div>
          <div className="chatting-bottom-container-icon">
            <i className="fa-solid fa-paperclip"></i>
          </div>
          <div className="chatting-bottom-container-input">
            <input type="text" placeholder="Type a message" value={inputValue} onChange={handleInputChange} />
          </div>

          {inputValue.trim() ? (
            <div className="chatting-bottom-container-icon">
              <i className="fa-solid fa-paper-plane"></i>
            </div>
          ) : (
            <div className="chatting-bottom-container-icon">
              <i className="fa-solid fa-microphone"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatBody;
