import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosConfig } from '../../../utils/axiosConfig';

export const verifyUser = createAsyncThunk('api/verifyUser', async (data) => {
	const response = await axiosConfig.post('/verify', data);
	console.log('VerificationSlice: ', response.data);
	return response.data;
});

const verificationSlice = createSlice({
	name: 'verificationapi',
	initialState: {
		loading: false,
		error: null,
		success: false,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(verifyUser.pending, (state) => {
			state.loading = true;
			state.error = null;
			state.success = false;
		});
		builder.addCase(verifyUser.fulfilled, (state, action) => {
			state.loading = false;
			state.error = null;
			state.success = true;
		});
		builder.addCase(verifyUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
			state.success = false;
		});
	},
});

export default verificationSlice.reducer;
