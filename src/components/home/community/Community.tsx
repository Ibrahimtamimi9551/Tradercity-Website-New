//Gpt code given for logic Background render karo + Discord render karo + Illustration render karo

import CommunityBackground from "./CommunityBackground";
import CommunityDiscord from "./CommunityDiscord";
import CommunityIllustration from "./CommunityIllustratiion";

export default function Community() {
  return (
    <section className="relative overflow-hidden bg-[#050816]">
      <CommunityBackground />

      <div className="relative z-10">
        <CommunityDiscord />
        <CommunityIllustration />
      </div> 
    </section>
  );
} 
