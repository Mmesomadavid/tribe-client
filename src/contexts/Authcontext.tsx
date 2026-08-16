import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import type { ReactNode } from "react";

import {
  apiFetch,
  setAccessToken as setStoredAccessToken,
  clearAccessToken as clearStoredAccessToken,
} from "../lib/api";

// ============================================================
// TYPES
// ============================================================

export type Role = "talent" | "hiring" | "admin";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string | null;
  isEmailVerified: boolean;
  status: string;

  // IMPORTANT:
  // This must come from the User document returned by /api/auth/me
  onboardingCompleted: boolean;
}

interface AuthContextValue {
  user: User | null;
  accessToken: string | null;

  isLoading: boolean;
  loading: boolean;

  isAuthenticated: boolean;

  setAuth: (
    accessToken: string,
    user?: User | null
  ) => void;

  updateUser: (user: User) => void;

  refreshUser: () => Promise<User | null>;

  logout: () => Promise<void>;
}

// ============================================================
// CONTEXT
// ============================================================

const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

// ============================================================
// REFRESH LOCK
// ============================================================

let refreshPromise: Promise<{
  accessToken: string;
  user: User;
}> | null = null;

// ============================================================
// RESTORE SESSION
// ============================================================

const restoreSession = async () => {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const { accessToken } =
        await apiFetch<{ accessToken: string }>(
          "/api/auth/refresh-token"
        );

      setStoredAccessToken(accessToken);

      const { user } =
        await apiFetch<{ user: User }>(
          "/api/auth/me"
        );

      return {
        accessToken,
        user,
      };
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

// ============================================================
// PROVIDER
// ============================================================

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const [accessToken, setAccessTokenState] =
    useState<string | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  // ==========================================================
  // SET AUTH
  // ==========================================================

  const setAuth = useCallback(
    (
      token: string,
      nextUser?: User | null
    ) => {
      setStoredAccessToken(token);
      setAccessTokenState(token);

      if (nextUser !== undefined) {
        setUser(nextUser);
      }
    },
    []
  );

  // ==========================================================
  // UPDATE USER
  // ==========================================================

  const updateUser = useCallback(
    (nextUser: User) => {
      setUser(nextUser);
    },
    []
  );

  // ==========================================================
  // REFRESH USER FROM BACKEND
  // ==========================================================

  const refreshUser = useCallback(async () => {
    try {
      const { user: freshUser } =
        await apiFetch<{ user: User }>(
          "/api/auth/me"
        );

      setUser(freshUser);

      return freshUser;
    } catch (error) {
      console.error(
        "Failed to refresh authenticated user:",
        error
      );

      return null;
    }
  }, []);

  // ==========================================================
  // CLEAR AUTH
  // ==========================================================

  const clearAuth = useCallback(() => {
    clearStoredAccessToken();

    setAccessTokenState(null);
    setUser(null);
  }, []);

  // ==========================================================
  // LOGOUT
  // ==========================================================

  const logout = useCallback(async () => {
    try {
      await apiFetch(
        "/api/auth/logout",
        {
          method: "POST",
        }
      );
    } catch (error) {
      console.error(
        "Logout request failed:",
        error
      );
    } finally {
      clearAuth();
    }
  }, [clearAuth]);

  // ==========================================================
  // RESTORE SESSION
  // ==========================================================

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const session = await restoreSession();

        if (!mounted) return;

        setAuth(
          session.accessToken,
          session.user
        );
      } catch (error) {
        console.error(
          "Failed to restore authentication:",
          error
        );

        if (mounted) {
          clearAuth();
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, [setAuth, clearAuth]);

  // ==========================================================
  // AUTHENTICATION STATE
  // ==========================================================

  const isAuthenticated =
    Boolean(accessToken) &&
    Boolean(user);

  // ==========================================================
  // PROVIDER
  // ==========================================================

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,

        isLoading,
        loading: isLoading,

        isAuthenticated,

        setAuth,
        updateUser,
        refreshUser,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ============================================================
// USE AUTH
// ============================================================

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return ctx;
}