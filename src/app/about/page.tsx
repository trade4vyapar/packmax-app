import { generateSEOMetadata } from "@/utils/seo";
import AboutClient from "./about-client";

export const metadata = generateSEOMetadata({
  title: "About Packmax India | Top BOPP Tape Manufacturer",
  description: "Learn about Packmax India, a leading industrial packaging and BOPP tape manufacturer based in Indore. Discover our capacity, business factsheet, and trusted client reviews.",
  path: "/about"
});

export default function AboutPage() {
  return <AboutClient />;
}
