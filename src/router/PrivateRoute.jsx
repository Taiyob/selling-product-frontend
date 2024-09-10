import useAuthContext from '../hooks/useAuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
    const { user, loader } = useAuthContext();
    const location = useLocation();

    if (loader) {
        return <div className="w-16 h-16 text-center border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
    }

    if (user) {
        return children;
    }

    //return <Navigate to="/login" replace="true" state={{ from: location }}></Navigate>
    return <Navigate to="/login" state={location.pathname} replace></Navigate>;
};

PrivateRoute.propTypes = {
    children: PropTypes.node,
}

export default PrivateRoute;