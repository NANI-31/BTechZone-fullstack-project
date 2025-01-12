import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	onlineUser: [],
	socketConnection: null,
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
		logout: (state, action) => {
			state.socketConnection = null;
		},
	},
});

// Action creators are generated for each case reducer function
export const { logout, setOnlineUser, setSocketConnection } = socketSlice.actions;

export default socketSlice.reducer;
