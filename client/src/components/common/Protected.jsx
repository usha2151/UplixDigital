import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        isAuthenticated ? <Outlet/> : <Navigate to="/signin"  />
    );
};

export default PrivateRoutes;
