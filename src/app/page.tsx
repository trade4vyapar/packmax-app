import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TapeShowcase from "@/components/TapeShowcase";
import CustomerReviews from "@/components/CustomerReviews";
import CategoryCircles from "@/components/CategoryCircles";
import ProcessFlow from "@/components/ProcessFlow";
import WorkflowSection from "@/components/WorkflowSection";
import { generateSEOMetadata } from "@/utils/seo";

export const metadata = generateSEOMetadata({
  title: "BOPP Tape Manufacturer & Industrial Packaging Supplier",
  description: "Packmax India is a leading B2B manufacturer and wholesale supplier of BOPP brown tapes, transparent tapes, custom printed logo tapes, stretch films, and courier bags. Serving 40+ cities Pan-India with cheap direct-from-factory prices.",
  path: "/"
});

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] overflow-hidden relative selection:bg-[#E86A12] selection:text-[#F7F5F4]">
      <HeroSection />
      <TapeShowcase />
      <CustomerReviews />
      <CategoryCircles />
      <ProcessFlow />
      <WorkflowSection />
    </main>
  );
}
