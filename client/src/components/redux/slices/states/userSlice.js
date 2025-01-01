import { createSlice } from '@reduxjs/toolkit';

const initaialState = {
	_id: '',
	name: '',
	email: '',
	profile_pic: '',
	phoneNo: '',
	year: '',
	branch: '',
	semester: '',
	role: '',
	token: '',
	onlineusers: [],
	socketConnection: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState: initaialState,
	reducers: {
		// login
		setUser: (state, action) => {
			state._id = action.payload._id;
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.profile_pic = action.payload.profile_pic;
			state.phoneNo = action.payload.phoneNo;
			state.year = action.payload.year;
			state.branch = action.payload.branch;
			state.semester = action.payload.semester;
			state.role = action.payload.role;
			state.token = action.payload.token;
		},

		setOnlineUser: (state, action) => {
			state.onlineusers = action.payload;
		},

		setSocketConnection: (state, action) => {
			state.socketConnection = action.payload;
		},
		// logout
		logout: (state, action) => {
			state._id = '';
			state.name = '';
			state.email = '';
			state.profile_pic = '';
			state.phoneNo = '';
			state.year = '';
			state.branch = '';
			state.semester = '';
			state.role = '';
			state.token = '';
			state.socketConnection = null;
		},
	},
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

// export function useUser() {
// 	const user = useSelector((state) => state.user.user);
// 	const dispatch = useDispatch();

// 	return {
// 		user,
// 		login: (user) => dispatch(login(user)),
// 		logout: () => dispatch(logout()),
// 	};
// }
