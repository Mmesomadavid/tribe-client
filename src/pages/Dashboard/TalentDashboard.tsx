import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import JobCards from '../../components/JobCards';
import { Toggle } from '../../components/ui/toggle';
import { useAuth } from '../../contexts/Authcontext';

export default function TalentDashboard() {
  const { user } = useAuth();
  const [aiMode, setAiMode] = useState(true);

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-1 text-3xl font-semibold text-gray-950">
            Welcome back, {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-sm text-gray-400">
            Here's what's happening with your job search.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-sm">
          <Sparkles size={14} className="text-amber-500" />
          <span className="text-sm font-medium text-gray-700">AI Mode</span>
          <Toggle
            pressed={aiMode}
            onPressedChange={setAiMode}
            variant="outline"
            size="sm"
            className="rounded-full border border-gray-200 bg-gray-50 px-3 text-[13px] text-gray-700 data-[pressed=true]:bg-gray-950 data-[pressed=true]:text-white"
          >
            {aiMode ? 'Auto apply' : 'Manual apply'}
          </Toggle>
        </div>
      </div>

      <JobCards />
    </DashboardLayout>
  );
}