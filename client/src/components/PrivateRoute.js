import { useLocation, Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';
const PrivateRouting = () => {
	const token = localStorage.getItem('userToken');
	// console.log(token);
	const location = useLocation();
	if (location.pathname === '/logout') {
		return <Outlet />;
	}
	return token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRouting;
