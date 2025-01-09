import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/slices/states/userSlice';
import { axiosInstance } from './utils/axiosConfig';

const PersistanceLogin = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	console.log('Fetched user data:', user);
	useEffect(() => {
		const fetchUser = async () => {
			if (!user?.accessToken) {
				try {
					const response = await axiosInstance.get('/persistData');
					const users = response.data.user;
					console.log(users);
					dispatch(setUser(users));
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
