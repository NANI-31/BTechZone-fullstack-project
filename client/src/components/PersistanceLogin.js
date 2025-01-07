import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/slices/states/userSlice';
import { axiosInstance } from './utils/axiosConfig';
import { useCookies } from 'react-cookie';
const PersistanceLogin = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	useEffect(() => {
		const fetchUser = async () => {
			if (!user?.accessToken) {
				try {
					const response = await axiosInstance.get('/persistData');
					console.log(response.data);
					dispatch(setUser(response.data));
				} catch (error) {
					console.log('Error fetching user data:', error);
				}
			}
		};
		fetchUser();
	}, [user.accessToken]);

	return <Outlet />;
};

export default PersistanceLogin;
