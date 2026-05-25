import { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import TapeShowcase from "@/components/TapeShowcase";
import FeaturesSection from "@/components/FeaturesSection";
import ProcessFlow from "@/components/ProcessFlow";
import WorkflowSection from "@/components/WorkflowSection";
import { generateSEOMetadata, getOrganizationSchema, getBreadcrumbSchema } from "@/utils/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "BOPP Packaging Tape Manufacturer & Wholesale Supplier | Packmax India",
  description: "Packmax India is a leading B2B packaging manufacturer and wholesale supplier of high-micron BOPP brown tapes, transparent carton box sealing tapes, printed brand logo tapes, and courier bags.",
  path: "/",
  keywords: "bopp tape factory, packaging tapes manufacturer, custom logo printed tape, brown adhesive cello tape, box sealing tapes wholesale, tamper proof courier bags"
});

export default function Home() {
  const orgSchema = getOrganizationSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] overflow-hidden relative selection:bg-[#C05800] selection:text-[#FDFBD4]">
        <HeroSection />
        <TapeShowcase />
        <FeaturesSection />
        <ProcessFlow />
        <WorkflowSection />
      </main>
    </>
  );
}
