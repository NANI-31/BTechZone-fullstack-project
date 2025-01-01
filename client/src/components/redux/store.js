import { configureStore } from '@reduxjs/toolkit';

// import rootReducer from './reducers';
import userReducer from './slices/states/userSlice';

export const store = configureStore({
	// reducer: rootReducer,
	reducer: {
		// user: rootReducer.userReducer,
		user: userReducer,
	},
});
