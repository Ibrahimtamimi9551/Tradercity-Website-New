/** DEV MOCK ONLY — replace with NestJS JWT/session during backend auth integration. */

"use client";

import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { mockAuthService } from "./mock/mock-auth-service";
import type {
  AuthCredentials,
  MockAuthProvider,
  MockSession,
  MockUserProfile,
} from "./types";

interface AuthContextValue {
  /** False until localStorage hydration completes. */
  isReady: boolean;
  isAuthenticated: boolean;
  session: MockSession | null;
  user: MockUserProfile | null;
  login: (
    credentials?: AuthCredentials,
    provider?: MockAuthProvider
  ) => Promise<MockSession>;
  register: (
    credentials?: AuthCredentials,
    provider?: MockAuthProvider
  ) => Promise<MockSession>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [session, setSession] = useState<MockSession | null>(null);

  useEffect(() => {
    // Hydrate mock session from localStorage once on the client.
    const existing = mockAuthService.getSession();
    startTransition(() => {
      setSession(existing);
      setIsReady(true);
    });
  }, []);

  const login = useCallback(
    async (
      credentials?: AuthCredentials,
      provider: MockAuthProvider = "email"
    ) => {
      const result = await mockAuthService.login(credentials, provider);
      setSession(result.session);
      return result.session;
    },
    []
  );

  const register = useCallback(
    async (
      credentials?: AuthCredentials,
      provider: MockAuthProvider = "email"
    ) => {
      const result = await mockAuthService.register(credentials, provider);
      setSession(result.session);
      return result.session;
    },
    []
  );

  const logout = useCallback(async () => {
    await mockAuthService.logout();
    setSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isReady,
      isAuthenticated: !!session?.isAuthenticated,
      session,
      user: session?.user ?? null,
      login,
      register,
      logout,
    }),
    [isReady, session, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
