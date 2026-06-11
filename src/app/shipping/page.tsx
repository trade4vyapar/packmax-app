import ShippingClient from "./shipping-client";
import { generateSEOMetadata } from "@/utils/seo";

export const dynamic = "force-static";
export const revalidate = 86400; // Cache for 24 hours

export const metadata = generateSEOMetadata({
  title: "Shipping & Logistics Policy",
  description: "B2B shipping, logistics, and delivery policy for industrial packaging materials by Packmax India.",
  path: "/shipping",
});

export default function ShippingPage() {
  return <ShippingClient />;
}
