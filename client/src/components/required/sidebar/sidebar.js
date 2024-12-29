import React, { useState, useEffect } from 'react';
import './sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import io from 'socket.io-client';

// import aa from './aa.jpeg';
import defaultPic from '../images/sidebar/user.png';

// const socket = io.connect('http://localhost:5000');
function Sidebar() {
  const location = useLocation();
  // const [profilePhoto, setProfilePhoto] = useState(null);

  const isActive = (path) => {
    return location.pathname === path ? 'sidebar-active' : '';
  };

  const [user, setUser] = useState(null);
  // const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('userdata');

    if (storedUser) {
      setUser((prevUser) => {
        const newUser = JSON.parse(storedUser);
        // setProfilePhoto(newUser.img);
        return newUser;
      });
    }

    // socket.on('updateProfilePhoto', (data) => {
    //     alert("ok");
    //     setProfilePhoto(data.img);
    // });
    // return () => {
    //     socket.off('updateProfilePhoto');
    // };
  }, []);
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={user?.pic || defaultPic} alt="logo" />
        <h2>{user?.name || ''}</h2>
      </div>
      <ul className="links links1">
        <li className={isActive('/user')}>
          <Link to="/user">
            <i className="fas fa-gauge sidebari"></i>
            <p className="sidebar-names">Dashboard</p>
          </Link>
        </li>
        <li className={isActive('/userupload')}>
          <Link to="/userupload">
            <i className="fas fa-cloud-arrow-up sidebari"></i>
            <p className="sidebar-names">Upload</p>
          </Link>
        </li>

        <hr />

        <li className={isActive('/mylibrary')}>
          <Link to="/mylibrary">
            <i className="fas fa-book sidebari"></i>
            {/* <p className={`sidebar-names ${isActivee('/mylibrary')}`}>My Library</p> */}
            <p className="sidebar-names">My Library</p>
          </Link>
        </li>

        <li className={isActive('/mybookmarks')}>
          <Link to="/mybookmarks">
            <i className="fa-solid fa-book-bookmark sidebari"></i>
            <p className="sidebar-names">My Bookmarks</p>
          </Link>
        </li>
        <li className={isActive('/publiclibrary') || isActive('/studentlibrary') || isActive('/teacherlibrary') || isActive('/otherlibrary')}>
          <Link to="/publiclibrary">
            <i className="fas fa-swatchbook sidebari"></i>
            <p className="sidebar-names">Public Library</p>
          </Link>
        </li>

        <hr />

        <li className={isActive('/profile')}>
          <Link to="/profile">
            <i className="fas fa-user sidebari"></i>
            <p className="sidebar-names">My Profile</p>
          </Link>
        </li>

        {/* <li> <Link> <i className="fas fa-key sidebari"></i>
                    <p className="sidebar-names">Change Password</p>
                </Link>
                </li> */}

        <li className={isActive('/message')}>
          <Link>
            <i className="fas fa-envelope sidebari"></i>
            <p className="sidebar-names">Message</p>
          </Link>
        </li>

        <hr />

        <li className="logout-link">
          <Link to="/login">
            <i className="fa-solid fa-arrow-right-from-bracket sidebari"></i>
            <p className="sidebar-names">Logout</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
