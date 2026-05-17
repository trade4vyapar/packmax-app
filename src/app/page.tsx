import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TapeShowcase from "@/components/TapeShowcase";
import FeaturesSection from "@/components/FeaturesSection";
import ProcessFlow from "@/components/ProcessFlow";
import WorkflowSection from "@/components/WorkflowSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] overflow-hidden relative selection:bg-[#C05800] selection:text-[#FDFBD4]">
      <HeroSection />
      <TapeShowcase />
      <FeaturesSection />
      <ProcessFlow />
      <WorkflowSection />
    </main>
  );
}
