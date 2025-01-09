import { axiosInstance } from '../utils/axiosConfig';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/states/userSlice';

const useRefreshToken = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const refresh = async () => {
		try {
			const response = await axiosInstance.get('/refreshToken');

			// console.log('Previous user state:', JSON.stringify(user));
			console.log('New access token:', response.data.accessToken);

			dispatch(setUser({ ...user, accessToken: response.data.accessToken }));
			return response.data.accessToken;
		} catch (error) {
			console.error('Error refreshing token:', error);
			// throw error;
		}
	};
	return refresh;
};

export default useRefreshToken;
