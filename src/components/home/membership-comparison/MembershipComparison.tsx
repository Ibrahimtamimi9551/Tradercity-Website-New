import MembershipComparisonBackground from "./MembershipComparisonBackground";
import MembershipComparisonContent from "./MembershipComparisonContent";

export default function MembershipComparison() {
  return (
    <section className="relative overflow-hidden">
      <MembershipComparisonBackground />

      <div className="relative z-10 w-full">
        <MembershipComparisonContent />
      </div>
    </section>
  );
}