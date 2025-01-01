import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosConfig } from '../../../utils/axiosConfig';

export const uploadFile = createAsyncThunk('api/uploadFile', async (data) => {
	const response = await axiosConfig.post('/upload', data);
	console.log('UploadFileSlice: ', response.data);
	return response.data;
});

const uploadFileSlice = createSlice({
	name: 'uploadfileapi',
	initialState: {
		loading: false,
		error: null,
		success: false,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(uploadFile.pending, (state) => {
			state.loading = true;
			state.error = null;
			state.success = false;
		});
		builder.addCase(uploadFile.fulfilled, (state, action) => {
			state.loading = false;
			state.error = null;
			state.success = true;
		});
		builder.addCase(uploadFile.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
			state.success = false;
		});
	},
});

export default uploadFileSlice.reducer;
