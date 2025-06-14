// auth/ProtectedRoutes.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoutes({ children, user }) {
  const location = useLocation();

  const publicRoutes = ['/', '/about', '/contact', '/login', '/register', '/blog'];
  const isPublic = publicRoutes.includes(location.pathname);
  const isAuthenticated = !!user;

  if (!isAuthenticated && isPublic) {
    return children;
  }

  if (!isAuthenticated && !isPublic) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
