import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/Authcontext';
import Header from './sections/Header';
import { Skeleton } from './ui/skeleton';

export default function DashboardLayout({
  children,
  rightSection,
}: {
  children: ReactNode;
  rightSection?: ReactNode;
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/sign-in');
  };

  const defaultRightSection = (
    <div className="space-y-4">
      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
        <Skeleton className="mb-3 h-3 w-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <Skeleton className="mb-3 h-3 w-24 rounded-full" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-7 w-16 rounded-full" />
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-14 rounded-full" />
          <Skeleton className="h-7 w-18 rounded-full" />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <Skeleton className="mb-3 h-3 w-24 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header variant="dashboard" user={user} onLogout={handleLogout} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <section className="min-w-0">{children}</section>
          <aside className="xl:sticky xl:top-24 xl:self-start">
            {rightSection ?? defaultRightSection}
          </aside>
        </div>
      </main>
    </div>
  );
}