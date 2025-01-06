import useRemoveCookie from '../actions/removeCookie';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosConfig';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from '../redux/slices/states/userSlice';

const Logout = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const from = location.state?.from?.pathname || '/login';
	const { removeCustomeCookie } = useRemoveCookie();
	useEffect(() => {
		localStorage.removeItem('userToken');
		removeCustomeCookie('token');
		dispatch(clearUser());
		axiosInstance.get('logout').then((response) => {
			console.log(response.data);
		});

		// navigate(from, { replace: true });
		navigate('/login');
	}, []);
	// return <Navigate to="/login" state={{ from: location.pathname }} replace />;
};

export default Logout;
