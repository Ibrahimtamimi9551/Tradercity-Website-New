import AnalystTeamContent from "./AnalystTeamContent";
import AnalystTeamBackground from "./AnalystTeamBackground";

/**
 * Meet the Analysts — homepage consumer of Published Public Profiles.
 * Presentation SoT: Public Profile Management → PublicAnalystCard.
 */
export default function AnalystTeam() {
  return (
    <section id="analysts" className="relative overflow-hidden">
      <AnalystTeamBackground />
      <AnalystTeamContent />
    </section>
  );
}
