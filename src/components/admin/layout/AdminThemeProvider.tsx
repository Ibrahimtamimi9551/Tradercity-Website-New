"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  applyAdminThemeAttribute,
  commitAdminTheme,
  readStoredAdminTheme,
  subscribeAdminTheme,
  toggleStoredAdminTheme,
  type AdminTheme,
} from "@/lib/admin/theme";

type AdminThemeContextValue = {
  theme: AdminTheme;
  setTheme: (theme: AdminTheme) => void;
  toggleTheme: () => void;
};

const AdminThemeContext = createContext<AdminThemeContextValue | null>(null);

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  // Start dark to match SSR / boot script default; hydrate from storage on mount.
  const [theme, setThemeState] = useState<AdminTheme>("dark");

  useEffect(() => {
    const stored = readStoredAdminTheme();
    setThemeState(stored);
    applyAdminThemeAttribute(stored);
    return subscribeAdminTheme(() => {
      setThemeState(readStoredAdminTheme());
    });
  }, []);

  const setTheme = useCallback((next: AdminTheme) => {
    commitAdminTheme(next);
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = toggleStoredAdminTheme();
    // Optimistic React update — don't wait only on the storage event.
    setThemeState(next);
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return <AdminThemeContext.Provider value={value}>{children}</AdminThemeContext.Provider>;
}

export function useAdminTheme() {
  const ctx = useContext(AdminThemeContext);
  if (!ctx) {
    throw new Error("useAdminTheme must be used within AdminThemeProvider");
  }
  return ctx;
}
