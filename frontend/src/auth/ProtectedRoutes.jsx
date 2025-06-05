import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoutes({ children }) {
  // Check for auth token or user info in localStorage/sessionStorage/context
  const isAuthenticated = !!localStorage.getItem('token') // adjust as per your auth logic

  if (!isAuthenticated) {
    // Redirect unauthenticated users to login
    return <Navigate to="/login" replace />
  }

  // Render child routes if authenticated
  return children
}
