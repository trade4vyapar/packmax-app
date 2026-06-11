import { generateSEOMetadata } from "@/utils/seo";
import SitemapClient from "./sitemap-client";

export const dynamic = "force-static";
export const revalidate = 86400; // Cache for 24 hours

export const metadata = generateSEOMetadata({
  title: "Sitemap | All Pages, Categories & Products",
  description:
    "Complete site directory for Packmax India. Browse every page, product category, individual packaging product, and city we serve — all from one place.",
  path: "/sitemap",
});

export default function SitemapPage() {
  return <SitemapClient />;
}
