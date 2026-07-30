/** DEV MOCK ONLY — replace with NestJS JWT/session during backend auth integration. */

import { MOCK_AUTH_LATENCY_MS } from "../constants";
import type {
  AuthActionResult,
  AuthCredentials,
  MockAuthProvider,
  MockSession,
  MockUserProfile,
} from "../types";
import {
  clearMockSession,
  readMockSession,
  writeMockSession,
} from "./mock-session-storage";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function buildProfile(
  credentials: AuthCredentials | undefined,
  provider: MockAuthProvider
): MockUserProfile {
  const email =
    credentials?.email?.trim() ||
    (provider === "google"
      ? "dev.google@tradercity.local"
      : provider === "discord"
        ? "dev.discord@tradercity.local"
        : "dev.member@tradercity.local");

  const displayName =
    credentials?.displayName?.trim() ||
    email.split("@")[0]?.replace(/[._]/g, " ") ||
    "TraderCity Member";

  return {
    id: `mock-user-${provider}`,
    email,
    displayName:
      displayName.charAt(0).toUpperCase() + displayName.slice(1),
    role: "member",
    membershipTier: "free",
  };
}

function createSession(
  credentials: AuthCredentials | undefined,
  provider: MockAuthProvider
): MockSession {
  return {
    isAuthenticated: true,
    user: buildProfile(credentials, provider),
    provider,
    createdAt: new Date().toISOString(),
    source: "dev-mock",
  };
}

/**
 * Development simulator: always succeeds, including with empty fields.
 * No API calls, no credential validation.
 */
export const mockAuthService = {
  getSession(): MockSession | null {
    return readMockSession();
  },

  async login(
    credentials?: AuthCredentials,
    provider: MockAuthProvider = "email"
  ): Promise<AuthActionResult> {
    await delay(MOCK_AUTH_LATENCY_MS);
    const session = createSession(credentials, provider);
    writeMockSession(session);
    return { ok: true, session };
  },

  async register(
    credentials?: AuthCredentials,
    provider: MockAuthProvider = "email"
  ): Promise<AuthActionResult> {
    await delay(MOCK_AUTH_LATENCY_MS);
    const session = createSession(credentials, provider);
    writeMockSession(session);
    return { ok: true, session };
  },

  async logout(): Promise<void> {
    await delay(120);
    clearMockSession();
  },
};
