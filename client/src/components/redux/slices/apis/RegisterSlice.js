import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosConfig } from '../../../utils/axiosConfig';

export const registerUser = createAsyncThunk('api/registerUser', async (data) => {
	const response = await axiosConfig.post('/register', data);
	console.log('RegisterSlice: ', response.data);
	return response.data;
});

const registerSlice = createSlice({
	name: 'registerapi',
	initialState: {
		loading: false,
		error: null,
		success: false,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(registerUser.pending, (state) => {
			state.loading = true;
			state.error = null;
			state.success = false;
		});
		builder.addCase(registerUser.fulfilled, (state, action) => {
			state.loading = false;
			state.error = null;
			state.success = true;
		});
		builder.addCase(registerUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
			state.success = false;
		});
	},
});

export default apiSlice.reducer;

// export const {} = apiSlice.actions;

// export function useApi() {
//     const api = useSelector((state) => state.api);
//     const dispatch = useDispatch();

//     return { api, dispatch };
// }
