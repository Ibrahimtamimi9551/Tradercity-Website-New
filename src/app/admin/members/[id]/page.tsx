import { MemberProfileView } from "@/components/members/sections/profile/MemberProfileView";

type MemberProfilePageProps = {
  params: Promise<{ id: string }>;
};

/**
 * Phase 3 — User Profile Control Center.
 * Reflection hub only; management actions live in domain modules (Phases 4–6).
 */
export default async function MemberProfilePage({ params }: MemberProfilePageProps) {
  const { id } = await params;
  return <MemberProfileView memberId={id} />;
}
