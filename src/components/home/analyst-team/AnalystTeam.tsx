import AnalystTeamContent from "./AnalystTeamContent";
import AnalystTeamBackground from "./AnalystTeamBackground";

export default function AnalystTeam() {
  return (
    <section
      id="analysts"
      // className="relative min-h-screen overflow-hidden"
      className="relative overflow-hidden"
    >
        <AnalystTeamBackground />
        <AnalystTeamContent /> 
    </section>
  );
}