import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosConfig } from '../../../utils/axiosConfig';

export const loginUser = createAsyncThunk('api/loginUser', async (data) => {
	const response = await axiosConfig.post('/login', data);
	console.log('LoginSlice: ', response.data);
	return response.data;
});

const loginSlice = createSlice({
	name: 'loginapi',
	initialState: {
		loading: false,
		error: null,
		success: false,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loginUser.pending, (state) => {
			state.loading = true;
			state.error = null;
			state.success = false;
		});
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.loading = false;
			state.error = null;
			state.success = true;
		});
		builder.addCase(loginUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
			state.success = false;
		});
	},
});

export default loginSlice.reducer;
