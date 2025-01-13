import { createSlice } from '@reduxjs/toolkit';
// import { set } from 'mongoose';

const initialState = {
	onlineUser: [],
	socketConnection: null,
	chatUsers: [],
};

export const socketSlice = createSlice({
	name: 'socket',
	initialState,
	reducers: {
		setOnlineUser: (state, action) => {
			state.onlineUser = action.payload;
		},
		setSocketConnection: (state, action) => {
			state.socketConnection = action.payload;
		},
		setChatUsers: (state, action) => {
			console.log(action.payload);
			state.chatUsers = action.payload;
		},
		logout: (state, action) => {
			state.socketConnection = null;
		},
	},
});

// Action creators are generated for each case reducer function
export const { logout, setOnlineUser, setSocketConnection, setChatUsers } = socketSlice.actions;

export default socketSlice.reducer;
