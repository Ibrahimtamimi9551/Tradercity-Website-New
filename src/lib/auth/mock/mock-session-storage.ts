/** DEV MOCK ONLY — replace with NestJS JWT/session during backend auth integration. */

import { MOCK_SESSION_STORAGE_KEY } from "../constants";
import type { MockSession } from "../types";

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function isMockSession(value: unknown): value is MockSession {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<MockSession>;
  return (
    candidate.isAuthenticated === true &&
    candidate.source === "dev-mock" &&
    !!candidate.user &&
    typeof candidate.user.id === "string"
  );
}

export function readMockSession(): MockSession | null {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(MOCK_SESSION_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isMockSession(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writeMockSession(session: MockSession): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(MOCK_SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearMockSession(): void {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(MOCK_SESSION_STORAGE_KEY);
}
