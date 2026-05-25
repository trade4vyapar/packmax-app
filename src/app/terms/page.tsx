import TermsClient from "./terms-client";
import { generateSEOMetadata } from "@/utils/seo";

export const metadata = generateSEOMetadata({
  title: "Terms of Service",
  description: "Terms and conditions for B2B industrial packaging supply by Packmax India.",
  path: "/terms",
});

export default function TermsPage() {
  return <TermsClient />;
}
