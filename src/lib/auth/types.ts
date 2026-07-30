/** DEV MOCK ONLY — replace with NestJS JWT/session during backend auth integration. */

export type MockAuthRole = "member" | "analyst" | "admin";

export type MockMembershipTier = "free" | "vip";

export type MockAuthProvider = "email" | "google" | "discord";

export type AuthMode = "login" | "register";

export interface MockUserProfile {
  id: string;
  email: string;
  displayName: string;
  role: MockAuthRole;
  membershipTier: MockMembershipTier;
}

export interface MockSession {
  /** Always true when a session document exists. */
  isAuthenticated: true;
  user: MockUserProfile;
  /** How the mock session was created. */
  provider: MockAuthProvider;
  /** ISO timestamp */
  createdAt: string;
  /** Marker so production code can refuse mock sessions. */
  source: "dev-mock";
}

export interface AuthCredentials {
  email?: string;
  password?: string;
  displayName?: string;
}

export interface AuthActionResult {
  ok: true;
  session: MockSession;
}
