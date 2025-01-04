import useRemoveCookie from '../actions/removeCookie';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosConfig';
import { useEffect } from 'react';

const Logout = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from?.pathname || '/login';
	const { removeCustomeCookie } = useRemoveCookie();
	useEffect(() => {
		localStorage.removeItem('userToken');
		removeCustomeCookie('token');
		axiosInstance.post('logout').then((response) => {
			console.log(response.data);
		});

		navigate(from, { replace: true });
	}, []);
	// return <Navigate to="/login" state={{ from: location.pathname }} replace />;
};

export default Logout;
