import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  if (!accessToken) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/" replace />;
  }

  // If the user is authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
