/** DEV MOCK ONLY — public auth surface for UI and route guards. */

export { AUTH_IS_DEV_MOCK, DEFAULT_POST_AUTH_PATH } from "./constants";
export { AuthProvider, useAuth } from "./AuthProvider";
export { RequireAuth } from "./RequireAuth";
export {
  buildLoginHref,
  resolvePostAuthRedirect,
  sanitizeReturnUrl,
} from "./redirects";
export type {
  AuthCredentials,
  AuthMode,
  MockAuthProvider,
  MockMembershipTier,
  MockSession,
  MockUserProfile,
} from "./types";
