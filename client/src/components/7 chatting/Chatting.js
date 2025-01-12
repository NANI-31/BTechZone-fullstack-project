import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSocketConnection } from '../redux/slices/states/socketSlice';

import ChatBody from './Chatbody';
import Groups from './Groups';
import './chatting.css';

import { io } from 'socket.io-client';

function Chatting() {
	const dispatch = useDispatch();
	useEffect(() => {
		const socket = io('http://localhost:5000');

		socket.on('connect', () => {
			console.log('Connected to server');
		});
		// const socketData = {
		// 	id: socket.id, // Unique socket identifier
		// 	connected: socket.connected, // Connection status
		// };

		dispatch(setSocketConnection(socket));

		socket.on('disconnect', () => {
			console.log('Disconnected from server');
		});
		return () => {
			socket.disconnect();
		};
	}, [dispatch]);
	return (
		<>
			<div className="message-container">
				<Groups />
				<ChatBody />
				{/* <CreatePlus /> */}
				{/* <i className="fas fa-circle-plus"></i> */}
				{/* <div></div> */}
			</div>
		</>
	);
}

export default Chatting;
