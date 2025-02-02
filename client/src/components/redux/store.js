import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import userReducer from './slices/states/userSlice';
import documentReducer from './slices/states/documentsSlice';
import socketReducer from './slices/states/socketSlice';

// Persist configuration
// const persistConfig = {
// 	key: 'root',
// 	storage,
// 	// backlist: ['user'],
// };
// // Create a persisted reducer
// const persistedReducer = persistReducer(persistConfig, userReducer);

// // Configure the store
// export const store = configureStore({
// 	reducer: {
// 		user: persistedReducer,
// 	},
// 	middleware: (getDefaultMiddleware) =>
// 		getDefaultMiddleware({
// 			serializableCheck: {
// 				ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
// 			},
// 		}),
// });

// // Create a persistor
// export const persistor = persistStore(store);
const store = configureStore({
	// reducer: rootReducer,
	reducer: {
		// user: rootReducer.userReducer,
		user: userReducer,
		document: documentReducer,
		socket: socketReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, // Disable serializable check
		}),
});

export default store;
