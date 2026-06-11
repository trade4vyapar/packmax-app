import { generateSEOMetadata } from "@/utils/seo";
import ContactClient from "./contact-client";

export const dynamic = "force-static";
export const revalidate = 86400; // Cache for 24 hours

export const metadata = generateSEOMetadata({
  title: "Contact Packmax India | B2B Packaging Supplier",
  description: "Get in touch with Packmax India for bulk packaging inquiries, custom printed tapes, and fast wholesale deliveries. Call or WhatsApp our industrial supply team today.",
  path: "/contact"
});

export default function ContactPage() {
  return <ContactClient />;
}
