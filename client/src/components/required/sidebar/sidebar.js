import React, { useState, useEffect } from 'react';
import './sidebar.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link, useLocation } from 'react-router-dom';
// import io from 'socket.io-client';
import { useSelector } from 'react-redux';
// import { useGlobalContext } from '../../../context/GlobalProvider';
import { axiosInstance } from '../../utils/axiosConfig';

// import aa from './aa.jpeg';
import defaultPic from '../images/sidebar/user.png';

// const socket = io.connect('http://localhost:5000');
function Sidebar() {
	const userData = useSelector((state) => state.user);
	console.log(userData?.accessToken?.slice(-10));
	const location = useLocation();
	const [isLoaded, setIsLoaded] = useState(false);

	const [labels, setLabels] = useState({
		bookmarks: 'My Bookmarks',
		library: 'Library',
		profile: 'My Profile',
		block: 'block',
	});

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 950) {
				setLabels({
					bookmarks: 'Bookmarks',
					library: 'Library',
					profile: 'Profile',
					block: 'block',
				});
			} else {
				setLabels({
					bookmarks: 'My Bookmarks',
					library: 'My Library',
					profile: 'My Profile',
				});
			}
		};
		// Add event listener
		window.addEventListener('resize', handleResize);

		// Initial check
		handleResize();

		// Cleanup on unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const paths = ['chatting', 'publiclibrary', 'studentlibrary', 'teacherlibrary', 'otherlibrary'];
	const isActive = (path) => {
		if (window.innerWidth <= 950) {
			return location.pathname === path ? 'sidebar-active block' : '';
		} else {
			return location.pathname === path ? 'sidebar-active' : '';
		}
	};

	// socket.on('updateProfilePhoto', (data) => {
	//     alert("ok");
	//     setProfilePhoto(data.img);
	// });
	// return () => {
	//     socket.off('updateProfilePhoto');
	// };
	return (
		<div className="sidebar-container">
			<div className="sidebar">
				<div className="sidebar-logo">
					{!isLoaded && <Skeleton circle={true} height={40} width={40} />}
					<img
						src={userData.pic}
						alt="logo"
						onLoad={() => setIsLoaded(true)}
						style={{
							display: isLoaded ? 'block' : 'none',
						}}
					/>
					{/* {userData?.pic ? <img src={userData.pic} alt="logo" onLoad={() => setIsLoaded(true)} /> : <Skeleton circle={true} height={50} width={50} />} */}
					<h2 className="sidebar-user-name">{userData?.name || 'user'}</h2>
				</div>
				<ul className="sidebar-links links1">
					<li className={isActive('/user')}>
						<Link to="/user" className="sidebar-a">
							<span>
								<i className="fas fa-gauge sidebari"></i>
							</span>
							<p className="sidebar-names">Dashboard</p>
						</Link>
					</li>
					<li className={isActive('/userupload')}>
						<Link to="/userupload" className="sidebar-a">
							<span>
								<i className="fas fa-cloud-arrow-up sidebari"></i>
							</span>

							<p className="sidebar-names">Upload</p>
						</Link>
					</li>

					<hr />

					<li className={isActive('/mylibrary')}>
						<Link to="/mylibrary" className="sidebar-a">
							<span>
								<i className="fas fa-book sidebari"></i>
							</span>

							{/* <p className={`sidebar-names ${isActivee('/mylibrary')}`}>My Library</p> */}
							<p className="sidebar-names">{labels.library}</p>
						</Link>
					</li>

					<li className={isActive('/mybookmarks')}>
						<Link to="/mybookmarks" className="sidebar-a">
							<span>
								<i className="fa-solid fa-book-bookmark sidebari"></i>
							</span>

							<p className="sidebar-names">{labels.bookmarks}</p>
						</Link>
					</li>
					<li className={`isActive('/publiclibrary') || isActive('/studentlibrary') || isActive('/teacherlibrary') || isActive('/otherlibrary') block`}>
						<Link to="/publiclibrary" className="sidebar-a">
							<span>
								<i className="fas fa-swatchbook sidebari"></i>
							</span>

							<p className="sidebar-names">Public Library</p>
						</Link>
					</li>

					<hr />

					<li className={isActive('/profile')}>
						<Link to="/profile" className="sidebar-a">
							<span>
								<i className="fas fa-user sidebari"></i>
							</span>

							<p className="sidebar-names">{labels.profile}</p>
						</Link>
					</li>

					{/* <li> <Link> <i className="fas fa-key sidebari"></i>
                    <p className="sidebar-names">Change Password</p>
                </Link>
                </li> */}

					<li className={isActive('/chatting')}>
						<Link to="/chatting" className="sidebar-a">
							<span>
								<i className="fas fa-comment-dots sidebari"></i>
							</span>

							<p className="sidebar-names">Message</p>
						</Link>
					</li>

					<hr />

					<li>
						<Link to="/logout" className="sidebar-a">
							<span>
								<i className="fa-solid fa-arrow-right-from-bracket sidebari"></i>
							</span>

							<p className="sidebar-names">Logout</p>
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Sidebar;
