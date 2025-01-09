import { axiosInstance } from '../../components/utils/axiosConfig';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/states/userSlice';
import useRefreshToken from './useRefreshToken';

const useAxiosPrivate = () => {
	const refresh = useRefreshToken();
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		const requestIntercept = axiosInstance.interceptors.request.use(
			(config) => {
				if (!config.headers['Authorization']) {
					console.log('axiosPrivate request: ', config.headers);
					// console.log(user);
					config.headers['Authorization'] = `Bearer ${user.accessToken}`;
					console.log('axiosPrivate request: ', config.headers['Authorization']);
				}
				return config;
			},
			(error) => {
				console.log('axiosPrivate request error: ', error);
				Promise.reject(error);
			}
		);

		const responseIntercept = axiosInstance.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config;
				// console.log('prevRequest: ', prevRequest);
				// if (error?.response?.status === 403 && !prevRequest?.sent) {
				// 	const newAccessToken = await refresh();
				// 	if (!newAccessToken) {
				// 		console.log('newAccessToken is null: ', Promise.reject(error));
				// 		return Promise.reject(error);
				// 	}
				// 	console.log('axiosPrivate response: ', `Bearer ${newAccessToken}`);
				// }
				// return Promise.reject(error);
				if (error?.response?.status === 403 && !prevRequest?.sent) {
					prevRequest.sent = true;
					const response = await axiosInstance.get('/refreshToken');

					// console.log('Previous user state:', JSON.stringify(user));
					console.log('New access token:', response.data.accessToken);

					dispatch(setUser({ ...user, accessToken: response.data.accessToken }));
					prevRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
					console.log('axiosPrivate resonse', prevRequest.headers['Authorization']);
					return axiosInstance(prevRequest);
				}
				return Promise.reject(error);
			}
		);

		return () => {
			axiosInstance.interceptors.request.eject(requestIntercept);
			axiosInstance.interceptors.response.eject(responseIntercept);
		};
	}, [user, refresh]);

	return axiosInstance;
};

export default useAxiosPrivate;
