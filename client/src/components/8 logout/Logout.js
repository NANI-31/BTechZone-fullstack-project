import { useGlobalContext } from '../../context/GlobalContext';
import useRemoveCookie from '../actions/removeCookie';
import { Link, Navigate, useLocation } from 'react-router-dom';
const Logout = () => {
	const location = useLocation();
	const { setId, setName, setMail, setPic, setPhoneNo, setYear, setBranch, setSemester, setPerson, setToken } = useGlobalContext();
	setId('');
	setName('');
	setMail('');
	setPic('');
	setPhoneNo('');
	setYear('');
	setBranch('');
	setSemester('');
	setPerson('');
	setToken('');
	localStorage.removeItem('userToken');
	const { removeCustomeCookie } = useRemoveCookie();
	removeCustomeCookie('userToken');
	// navigate('login', { state: { from: location } });
	return <Navigate to="/login" state={{ from: location }} replace />;
};

export default Logout;
