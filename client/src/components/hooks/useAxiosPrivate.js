// import { axiosInstance } from '../../components/utils/axiosConfig';
// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import useRefreshToken from './useRefreshToken';

// const useAxiosPrivate = () => {
// 	const refresh = useRefreshToken();
// 	const auth = useSelector((state) => state.user);

// 	useEffect(() => {
// 		const requestIntercept = axiosInstance.interceptors.request.use(
// 			(config) => {
// 				if (!config.headers['Authorization']) {
// 					config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
// 					console.log('axiosPrivate request: ', config.headers['Authorization']);
// 				}
// 				return config;
// 			},
// 			(error) => Promise.reject(error)
// 		);

// 		const responseIntercept = axiosInstance.interceptors.response.use(
// 			(response) => response,
// 			async (error) => {
// 				const prevRequest = error?.config;
// 				if (error?.response?.status === 403 && !prevRequest?.sent) {
// 					prevRequest.sent = true;
// 					const newAccessToken = await refresh();
// 					prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
// 					console.log('axiosPrivate response: ', `Bearer ${newAccessToken}`);
// 					return axiosInstance(prevRequest);
// 				}
// 				return Promise.reject(error);
// 			}
// 		);

// 		return () => {
// 			axiosInstance.interceptors.request.eject(requestIntercept);
// 			axiosInstance.interceptors.response.eject(responseIntercept);
// 		};
// 	}, [auth, refresh]);

// 	return axiosInstance;
// };

// export default useAxiosPrivate;
