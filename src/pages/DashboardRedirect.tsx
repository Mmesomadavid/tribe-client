import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/Authcontext';

export default function DashboardRedirect() {
  const { user } = useAuth();

  if (!user) return null; // ProtectedRoute already guarantees auth by the time this renders

  if (user.role === 'hiring') return <Navigate to="/dashboard/hiring" replace />;
  return <Navigate to="/dashboard/talent" replace />;
}