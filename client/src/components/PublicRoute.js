import { Navigate, Outlet } from 'react-router-dom';

const PublicRouting = ({ isjwt }) => {
	// Redirect to `/user` if token exists
	return isjwt ? <Navigate to="/user" replace /> : <Outlet />;
};

export default PublicRouting;
