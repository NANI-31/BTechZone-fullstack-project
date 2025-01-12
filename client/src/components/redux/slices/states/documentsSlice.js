import { createSlice } from '@reduxjs/toolkit';

const initaialState = {
	publicDocuments: '',
	privateDocuments: '',
	recentDocuments: '',
};

const documentSlice = createSlice({
	name: 'documents',
	initialState: initaialState,
	reducers: {
		// login
		setDocuments: (state, action) => {
			console.log(action.payload);
			const { type, documents } = action.payload;

			switch (type) {
				case 'public':
					state.publicDocuments = documents;
					console.log(state.publicDocuments);
					break;
				case 'private':
					state.privateDocuments = documents;
					break;
				case 'recent':
					state.recentDocuments = documents;
					break;
				default:
					console.error(`Unknown document type: ${type}`);
			}
		},

		removeFile: (state, action) => {
			const { type, fileId } = action.payload;
			if (type === 'public') {
				state.publicDocuments = state.publicDocuments.filter((file) => file.file_id !== fileId);
			} else if (type === 'private') {
				state.privateDocuments = state.privateDocuments.filter((file) => file.file_id !== fileId);
			} else if (type === 'recent') {
				state.recentDocuments = state.recentDocuments.filter((file) => file.file_id !== fileId);
			}
		},

		clearDocuments() {
			return initaialState;
		},
		// clearUser: () => {
		// 	initaialState;
		// },
	},
});

export const { setDocuments, clearDocuments } = documentSlice.actions;
export default documentSlice.reducer;
