import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Simple auth check – token stored in localStorage under 'accessToken'
const RequireAuth = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('accessToken');
  const isAuthenticated = Boolean(token);
  if (!isAuthenticated) {
    // Redirect to login, preserve intended destination
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
