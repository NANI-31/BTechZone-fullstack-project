import GroupsIcon from '../required/svg/GroupsIcon';
import CreatePlus from '../required/svg/CreatePlus';
import GroupsIconTwo from '../required/svg/GroupsIconTwo';
import UserChatsIcon from '../required/svg/UserChatsIcon';
import defaultPic from '../required/images/student1.png';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setChatUsers } from '../redux/slices/states/socketSlice';
const { axiosInstance } = require('../utils/axiosConfig');

function Groups() {
	const [inputValue, setInputValue] = useState('');
	const [activeTab, setActiveTab] = useState('groups');
	const [chats, setChats] = useState([]);
	const dispatch = useDispatch();
	const chatUser = useSelector((state) => state.socket.chatUsers);

	const handleTabChange = (tab) => () => {
		setActiveTab(tab);
	};

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const clearInput = () => {
		setInputValue('');
	};

	console.log(chatUser);

	useEffect(() => {
		const response = async () => {
			try {
				const response = await axiosInstance.get('/getChatUsers');
				// console.log(response.data);
				dispatch(setChatUsers(response.data));
			} catch (error) {
				console.log(error);
			}
		};
		response();
		// return () => {
		// 	setChats([]);
		// };
	}, []);
	return (
		<div className="groups-container">
			{activeTab === 'groups' && (
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
						{Array.isArray(chatUser) && chatUser.length > 0 ? (
							chatUser.map((user) => (
								<div className="groups-box-container" key={user._id}>
									<div className="groups-box-img">
										{/* <UserChatsIcon /> */}
										{user.image && <img src={user.image} alt={`${user.name}'s profile`} />}
									</div>
									<div className="groups-box-name">
										<p>{user.name}</p>
									</div>
								</div>
							))
						) : (
							<p>No users found.</p>
						)}
						{/* <div className="groups-box-container">
							<div className="groups-box-img">
								<GroupsIconTwo />
							</div>
							<div className="groups-box-name">
								<p>name</p>
							</div>
						</div> */}
					</div>
				</>
			)}
			{activeTab === 'chats' && (
				<>
					<h1>Chats</h1>
				</>
			)}
			{activeTab === 'create' && (
				<>
					<h1>Create</h1>
				</>
			)}
			<div className="groups-icons">
				<div className="groups-icons-container">
					<div className={activeTab === 'groups' ? 'groups-svg-active groups-svg' : 'groups-svg'} onClick={handleTabChange('groups')}>
						<GroupsIcon />
					</div>
					<p className="groups-icons-container-name">Groups</p>
				</div>
				<div className="groups-icons-container">
					<div className={activeTab === 'chats' ? 'groups-svg-active groups-svg' : 'groups-svg'} onClick={handleTabChange('chats')}>
						<UserChatsIcon />
					</div>
					<p className="groups-icons-container-name">Chats</p>
				</div>
				<div className="groups-icons-container">
					<div className={activeTab === 'create' ? 'groups-svg-active groups-svg' : 'groups-svg'} onClick={handleTabChange('create')}>
						<CreatePlus />
					</div>
					<p className="groups-icons-container-name">Create</p>
				</div>
			</div>
		</div>
	);
}

export default Groups;
