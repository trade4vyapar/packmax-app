import { generateSEOMetadata } from "@/utils/seo";
import MarketAreaClient from "./market-area-client";

export const dynamic = "force-static";
export const revalidate = 86400; // Cache for 24 hours

export const metadata = generateSEOMetadata({
  title: "Delivery & Market Area | Pan-India Packaging Supplies",
  description: "Packmax India delivers premium BOPP tapes, stretch film, and ecommerce polybags to 40+ industrial hubs including Indore, Bhopal, Mumbai, Delhi, and Bengaluru.",
  path: "/market-area"
});

export default function MarketAreaPage() {
  return <MarketAreaClient />;
}
