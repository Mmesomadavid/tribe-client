// src/layouts/Topbar.tsx
import { useAuth } from "../contexts/Authcontext"

export default function Topbar() {
  const { user } = useAuth()

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      <div /> {/* space for mobile menu trigger / breadcrumbs later */}
      <div className="flex items-center gap-3 text-sm font-medium">
        {user?.name}
      </div>
    </header>
  )
}