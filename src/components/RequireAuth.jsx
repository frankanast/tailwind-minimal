import 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext.jsx';

export default function RequireAuth({ children }) {
    const { token, loading } = useAuthContext();
    const location = useLocation();

    if (loading) {
        return <div className="flex items-center justify-center h-full">Loading...</div>;
    }

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}