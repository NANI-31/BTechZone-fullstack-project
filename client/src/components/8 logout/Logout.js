import useRemoveCookie from '../actions/removeCookie';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import axios from '../utils/axiosConfig';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../redux/slices/states/userSlice';
import { logout } from '../redux/slices/states/socketSlice';

const Logout = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.user);
	const person = userData.person;
	const from = location.state?.from?.pathname || '/login';
	const { removeCustomeCookie } = useRemoveCookie();
	useEffect(() => {
		localStorage.removeItem('userToken');
		removeCustomeCookie('token');
		dispatch(clearUser());
		dispatch(logout());
		axios.get('logout', { person }).then((response) => {
			console.log(response.data);
		});

		// navigate(from, { replace: true });
		navigate('/login');
	}, []);
	// return <Navigate to="/login" state={{ from: location.pathname }} replace />;
};

export default Logout;
