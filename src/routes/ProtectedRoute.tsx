// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth, type Role } from "../contexts/Authcontext"

interface ProtectedRouteProps {
  allowedRoles?: Array<Role>
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Logged in, but wrong role for this route branch
    return <Navigate to="/" replace />
  }

  return <Outlet />
}