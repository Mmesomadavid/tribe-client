import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/Authcontext';

interface ProtectedRouteProps {
  allowedRoles?: Array<'talent' | 'hiring' | 'admin'>;
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-400">
        Loading…
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Logged in, but wrong role for this route (e.g. talent hitting /dashboard/hiring)
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}