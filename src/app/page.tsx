import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Ecosystem from "@/components/home/Ecosystem";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        <Hero />
        <Ecosystem />

      </main>
    </>
  );
}