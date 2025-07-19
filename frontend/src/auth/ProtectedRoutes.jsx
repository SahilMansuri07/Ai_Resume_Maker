// auth/ProtectedRoutes.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function ProtectedRoutes({ children }) {
  const location = useLocation();
  const { user } = useUser();

  const publicRoutes = ['/', '/about', '/contact', '/login', '/register', '/blog'];
  const isPublic = publicRoutes.includes(location.pathname);
  const isAuthenticated = !!user && !!user.token;

  if (!isAuthenticated && isPublic) {
    return children;
  }

  if (!isAuthenticated && !isPublic) {
    return <Navigate to="/login" replace />;
  }

  return children;
}