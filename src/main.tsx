import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/Authcontext.tsx'
import { Toaster } from './components/ui/sonner'
import { Analytics } from '@vercel/analytics/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <Toaster richColors position="top-center" />
      <Analytics />
    </AuthProvider>
  </StrictMode>,
)