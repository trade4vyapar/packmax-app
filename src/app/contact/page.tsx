import { generateSEOMetadata } from "@/utils/seo";
import ContactClient from "./contact-client";

export const metadata = generateSEOMetadata({
  title: "Contact Packmax India | B2B Packaging Supplier",
  description: "Get in touch with Packmax India for bulk packaging inquiries, custom printed tapes, and fast wholesale deliveries. Call or WhatsApp our industrial supply team today.",
  path: "/contact"
});

export default function ContactPage() {
  return <ContactClient />;
}
