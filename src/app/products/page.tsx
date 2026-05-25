import { generateSEOMetadata } from "@/utils/seo";
import ProductsClient from "./products-client";

export const metadata = generateSEOMetadata({
  title: "Industrial Packaging Products | Packmax India Catalog",
  description: "Browse our complete catalog of industrial packaging materials. We manufacture and supply Amazon/Flipkart printed tapes, BOPP tapes, courier bags, and stretch film rolls wholesale.",
  path: "/products"
});

export default function ProductsPage() {
  return <ProductsClient />;
}
