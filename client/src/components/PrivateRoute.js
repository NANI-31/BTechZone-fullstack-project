import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalProvider';
const PrivateRouting = () => {
	const { token } = useGlobalContext();
	const location = useLocation();
	return token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRouting;
