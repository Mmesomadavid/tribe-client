import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import type {ReactNode} from "react"
import { apiFetch } from '../lib/api';

export type Role = 'talent' | 'hiring' | 'admin';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string | null;
  isEmailVerified: boolean;
  status: string;
}

interface AuthContextValue {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  loading: boolean;
  isAuthenticated: boolean;
  setAuth: (accessToken: string, user?: User | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Kept out of React state too, so non-component code (e.g. an apiFetch
// interceptor) can read the freshest token without a re-render.
let inMemoryAccessToken: string | null = null;
export const getAccessToken = () => inMemoryAccessToken;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setAuth = useCallback((token: string, nextUser?: User | null) => {
    inMemoryAccessToken = token;
    setAccessToken(token);
    if (nextUser !== undefined) setUser(nextUser);
  }, []);

  const clearAuth = useCallback(() => {
    inMemoryAccessToken = null;
    setAccessToken(null);
    setUser(null);
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' });
    } finally {
      clearAuth();
    }
  }, [clearAuth]);

  // On first load: use the httpOnly refresh cookie to silently re-authenticate
  useEffect(() => {
    (async () => {
      try {
        const { accessToken: token } = await apiFetch<{ accessToken: string }>(
          '/api/auth/refresh-token'
        );
        const { user: freshUser } = await apiFetch<{ user: User }>('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAuth(token, freshUser);
      } catch {
        clearAuth();
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isLoading,
        loading: isLoading,
        isAuthenticated: !!accessToken,
        setAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}