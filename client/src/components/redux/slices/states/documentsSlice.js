import { createSlice } from '@reduxjs/toolkit';

const initaialState = {
	year: '',
	semester: '',
	branch: '',
	subject_name: '',
	unit_no: '',
	file_name: '',
	refer: '',
	classified: '',
	file_id: '',
	file_pic: '',
};

const documentSlice = createSlice({
	name: 'documents',
	initialState: initaialState,
	reducers: {
		// login
		setDocuments: (state, action) => {
			// console.log(action.payload);
			console.log(action.payload);
			state.year = action.payload.year || '';
			state.semester = action.payload.semester;
			state.branch = action.payload.branch;
			state.subject_name = action.payload.subject_name;
			state.unit_no = action.payload.unit_no;
			state.file_name = action.payload.file_name;
			state.refer = action.payload.refer;
			state.classified = action.payload.classified;
			state.file_id = action.payload.file_id;
			state.file_pic = action.payload.pic?.pic_temporary;
		},
		// logout
		logoutDocuments: (state, action) => {
			state._id = '';
			state.name = '';
			state.email = '';
			state.pic = '';
			state.phoneNo = '';
			state.year = '';
			state.branch = '';
			state.semester = '';
			state.person = '';
			state.token = '';
			state.socketConnection = null;
		},
		clearDocuments() {
			return initaialState;
		},
		// clearUser: () => {
		// 	initaialState;
		// },
	},
});

export const { setDocuments, logoutDocuments, clearDocuments } = documentSlice.actions;
export default documentSlice.reducer;
