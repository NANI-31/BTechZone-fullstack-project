import { useSelector } from 'react-redux';
import { axiosInstance } from '../utils/axiosConfig';
import GroupsIconTwo from '../required/svg/GroupsIconTwo';
import React, { useState, useEffect, useRef } from 'react';
import { BsCameraVideo } from 'react-icons/bs';

function ChatBody() {
	const socket = useSelector((state) => state.socket.socketConnection);
	const currentRef = useRef(null);

	const [message, setMessage] = useState('');
	const [chat, setChat] = useState([]);

	useEffect(() => {
		// Listen for incoming messages
		if (socket) {
			socket.on('receive_message', (data) => {
				setChat((prevChat) => [...prevChat, { sender: 'Other', message: data }]);
			});
		}
	}, [socket]);

	const sendMessage = () => {
		if (message.trim()) {
			setChat((prevChat) => [...prevChat, { sender: 'You', message }]);
			socket.emit('send_message', message);
			setMessage('');
		}
	};
	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			sendMessage(); // Call sendMessage when Enter is pressed
		}
	};
	useEffect(() => {
		currentRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [chat]);

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
			<div className="chatting-msgs-container ">
				{/* <div className="chatting-msgs"> */}
				<div className="chatting-msgs" ref={currentRef}>
					{chat.map((msg, index) => (
						<div className={` ${msg.sender === 'You' ? 'ml-auto bg-teal-100 chatting-msgs-you css' : 'chatting-msgs-other css bg-white'}`}>
							<p key={index} className="px-2">
								{msg.message}
							</p>
						</div>
					))}
				</div>
			</div>
			<div className="chatting-bottom">
				<div className="chatting-bottom-container">
					<div className="chatting-bottom-container-icon">
						<i className="fa-solid fa-smile"></i>
					</div>
					<div className="chatting-bottom-container-icon">
						<i className="fa-solid fa-paperclip"></i>
					</div>
					<div className="chatting-bottom-container-input">
						<input type="text" placeholder="Type a message" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyPress} />
					</div>

					{message.trim() ? (
						<div className="chatting-bottom-container-icon">
							<i className="fa-solid fa-paper-plane" onClick={sendMessage}></i>
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
