// src/routes/AuthGate.tsx
import { type ReactNode } from "react"
import { useAuth } from "../contexts/Authcontext"
import Loader from "../components/Loader"

const AuthGate = ({ children }: { children: ReactNode }) => {
  const { isLoading } = useAuth()

  if (isLoading) return <Loader />

  return <>{children}</>
}

export default AuthGate