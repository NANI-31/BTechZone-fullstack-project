const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
// const getUserDetailsFromToken = require('../helpers/getUserDetailsFromToken');
// const UserModel = require('../models/UserModel');
// const { ConversationModel, MessageModel } = require('../models/ConversationModel');
// const getConversation = require('../helpers/getConversation');

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: process.env.FRONTEND_URL || 'http://localhost:3000',
		credentials: true,
	},
});

io.on('connection', (socket) => {
	console.log('User connected:', socket.id);

	// Listen for messages from the client
	socket.on('send_message', (data) => {
		// console.log('Message received:', data);
		// Broadcast message to other connected clients
		socket.broadcast.emit('receive_message', data);
	});

	socket.on('disconnect', () => {
		console.log('User disconnected:', socket.id);
	});
});

module.exports = { app, server };
