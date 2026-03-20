import React from 'react';
import { Navigate } from 'react-router';
import useUserStore from '../stores/userStore';

function ProtectedRoute({ children }) {

    const user = useUserStore((state) => state.user);


    if (!user || !user.userId) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;