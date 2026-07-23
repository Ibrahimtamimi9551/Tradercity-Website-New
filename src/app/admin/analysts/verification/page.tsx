import { redirect } from "next/navigation";

/**
 * Wave B — Verification folds into Applications Review Queue.
 * Legacy route retained as redirect so bookmarks and Dashboard links keep working.
 */
export default function AnalystVerificationRedirectPage() {
  redirect("/admin/analysts/applications?view=queue");
}
