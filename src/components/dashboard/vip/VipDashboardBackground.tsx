// import Section4Background from "@/components/home/section4/Section4Background";

// export default function VipDashboardBackground() {
//   return <Section4Background />;
// }

export default function Section4Background() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: "url('public/images/Backgrounds/Section2Background.png')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}