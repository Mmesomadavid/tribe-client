// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../contexts/Authcontext"
import type { Role } from "../contexts/Authcontext"

const dashboardPathFor = (role: Role) =>
  role === "hiring" ? "/dashboard/hiring" : "/dashboard/talent"

export default function ProtectedRoute({ allowedRoles }: { allowedRoles?: Role[] }) {
  const { isAuthenticated, isLoading, user } = useAuth()

  if (isLoading) return null // or a spinner — avoid flashing sign-in during the silent refresh

  if (!isAuthenticated || !user) {
    return <Navigate to="/sign-in" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // logged in, just wrong dashboard — bounce to their own instead of sign-in
    return <Navigate to={dashboardPathFor(user.role)} replace />
  }

  return <Outlet />
}