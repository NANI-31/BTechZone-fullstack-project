import { useLocation, Navigate, Outlet } from 'react-router-dom';
const PrivateRouting = () => {
	const token = localStorage.getItem('userToken');
	console.log(token);
	const location = useLocation();
	if (location.pathname === '/logout') {
		return <Outlet />;
	}
	return token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRouting;
