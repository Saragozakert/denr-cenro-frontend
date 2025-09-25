import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const UserProtectedRoute = () => {
  const token = localStorage.getItem('userToken');
  const userData = localStorage.getItem('userData');
  
  if (!token || !userData) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default UserProtectedRoute;