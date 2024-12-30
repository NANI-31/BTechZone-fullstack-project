import GroupsIcon from '../required/svg/GroupsIcon';
import CreatePlus from '../required/svg/CreatePlus';
import GroupsIconTwo from '../required/svg/GroupsIconTwo';
import React, { useState } from 'react';
import defaultPic from '../required/images/student1.png';

function Groups() {
  const [inputValue, setInputValue] = useState('');
  const [isGroups, setIsGroups] = useState(true);
  const [isCreate, setIsCreate] = useState(false);
  const [chatGroupColor, setChatGroupColor] = useState({
    color: '#333',
    bg: '#f1f7fe',
  });
  const [chatGroupCreateColor, setChatGroupCreateColor] = useState({
    color: '#333',
    bg: '#f1f7fe',
  });

  const handleGroups = () => {
    setIsGroups(true);
    setIsCreate(false);
    setChatGroupColor({
      color: '#333',
      bg: '#f1f7fe',
    });
    setChatGroupCreateColor({
      color: '#f1f7fe',
      bg: 'transparent',
    });
  };
  const handleCreate = () => {
    setIsGroups(false);
    setIsCreate(true);
    setChatGroupColor({
      color: '#f1f7fe',
      bg: 'transparent',
    });
    setChatGroupCreateColor({
      color: '#333',
      bg: '#f1f7fe',
    });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    setInputValue('');
  };
  return (
    <div className="groups-container">
      {isGroups && (
        <>
          <div className="groups-input-search">
            <input
              type="text"
              placeholder="Search"
              value={inputValue}
              onChange={handleInputChange}
              style={
                {
                  // paddingRight: '40px',
                }
              }
            />
            <div className="groups-search-icons">
              {inputValue && (
                <i
                  className="fa-solid fa-xmark"
                  onClick={clearInput}
                  // style={{
                  //   position: 'absolute',
                  //   right: '35px',
                  //   top: '50%',
                  //   transform: 'translateY(-50%)',
                  //   cursor: 'pointer',
                  //   color: '#999',
                  // }}
                ></i>
              )}
              <i
                className="fa-solid fa-magnifying-glass"
                // style={{
                //   position: 'absolute',
                //   right: '10px',
                //   top: '50%',
                //   transform: 'translateY(-50%)',
                //   color: '#999',
                // }}
              ></i>
            </div>
          </div>
          <div className="groups-box">
            <div className="groups-box-container">
              <div className="groups-box-img">
                <GroupsIconTwo />
              </div>
              <div className="groups-box-name">
                <p>name</p>
              </div>
            </div>
          </div>
        </>
      )}
      {isCreate && (
        <>
          <h1>Create</h1>
        </>
      )}
      <div className="groups-icons">
        <div className="groups-icons-container">
          <div className="groups-svg" onClick={handleGroups} style={{ color: chatGroupColor.color, backgroundColor: chatGroupColor.bg }}>
            <GroupsIcon />
          </div>
          <p className="groups-icons-container-name">Groups</p>
        </div>
        <div className="groups-icons-container">
          <div className="groups-svg" onClick={handleCreate} style={{ color: chatGroupCreateColor.color, backgroundColor: chatGroupCreateColor.bg }}>
            <CreatePlus />
          </div>
          <p className="groups-icons-container-name">Create</p>
        </div>
      </div>
    </div>
  );
}

export default Groups;