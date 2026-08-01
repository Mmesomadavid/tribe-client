import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../contexts/Authcontext';

export default function HiringDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-gray-950 mb-1">
        Welcome back, {user?.name?.split(' ')[0]}
      </h1>
      <p className="text-sm text-gray-400 mb-8">
        Here's an overview of your open roles and pipeline.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-gray-100 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Open roles</p>
          <p className="text-2xl font-semibold text-gray-950">0</p>
        </div>
        <div className="rounded-2xl border border-gray-100 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Candidates</p>
          <p className="text-2xl font-semibold text-gray-950">0</p>
        </div>
        <div className="rounded-2xl border border-gray-100 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Interviews scheduled</p>
          <p className="text-2xl font-semibold text-gray-950">0</p>
        </div>
      </div>
    </DashboardLayout>
  );
}