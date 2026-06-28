
import Hero from "@/components/home/hero/Hero";
import ProblemAwareness from "@/components/home/problem-awareness/ProblemAwareness";
import TraderSolution from "@/components/home/trader-solution/TraderSolution";
import AnalystTeam from "@/components/home/analyst-team/AnalystTeam";
import Community from "@/components/home/community/Community";
import MembershipComparison from "@/components/home/membership-comparison/MembershipComparison";
import ResearchFramework from "@/components/home/research-framework/ResearchFramework";
import Pricing from "@/components/pricing/Pricing";

export default function Page() {
  return (
    <main>
      <Hero />
      <ProblemAwareness />
      <TraderSolution />
      <AnalystTeam />
      <Community />
      <MembershipComparison />
      <ResearchFramework />
      <Pricing />   
    </main>
  );
}

