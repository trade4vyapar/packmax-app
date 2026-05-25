import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteData } from "@/data/siteData";
import EcommerceCategory, { CATEGORIES } from "@/components/EcommerceCategory";
import { MapPin, CheckCircle2, ArrowRight, ShieldCheck, Truck, Star } from "lucide-react";
import Link from "next/link";
import InquiryButton from "@/components/InquiryButton";
import ProductGallery from "@/components/ProductGallery";
import ProductClientPage from "@/app/products/[slug]/product-client";

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

interface Props {
  params: Promise<{ location: string; product: string }>;
}

import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location: locSlug, product: prodSlug } = await params;
  const location = siteData.locations.find((l) => l.slug === locSlug);
  
  if (!location) return { title: "Location Not Found" };

  const category = CATEGORIES.find(c => generateSlug(c) === prodSlug);
  if (category) {
    const isTape = category.toLowerCase().includes("tape");
    const title = isTape
      ? `${category} Manufacturer in ${location.name}, ${location.state} | Custom BOPP Tapes`
      : `${category} Supplier in ${location.name}, ${location.state}`;
      
    const description = `Leading B2B manufacturer and wholesale distributor of ${category} serving ${location.name}, ${location.state}. Get cheap direct-from-factory rates and fast dispatch.`;
    const keywords = `${category} manufacturer ${location.name}, buy ${category} ${location.name}, wholesale ${category} ${location.name}, packaging materials ${location.name}`;
    
    return generateSEOMetadata({
      title,
      description,
      path: `/${location.slug}/${prodSlug}`,
      keywords,
      locationName: location.name,
      categoryName: category
    });
  }

  const product = siteData.products.find((p) => p.slug === prodSlug);
  if (product) {
    const isTape = product.categorySlug.includes("tape") || product.slug.includes("tape");
    const title = isTape
      ? `${product.name} Manufacturer in ${location.name}, ${location.state} | Wholesale BOPP Tapes`
      : `${product.name} Supplier in ${location.name}, ${location.state} | Packaging Solutions`;
      
    const description = `Buy premium ${product.name} supplied in ${location.name}, ${location.state} directly from our factory. High-micron B2B packaging films and rolls with 72h delivery.`;
    const keywords = `${product.name} manufacturer ${location.name}, buy ${product.name} ${location.name}, wholesale ${product.name} ${location.name}, adhesive tape supplier ${location.name}, packaging films ${location.name}`;

    return generateSEOMetadata({
      title,
      description,
      path: `/${location.slug}/${product.slug}`,
      keywords,
      ogImage: product.image,
      locationName: location.name,
      productName: product.name
    });
  }

  return { title: "Page Not Found | Packmax India" };
}

export default async function LocationProductOrCategoryPage({ params }: Props) {
  const { location: locSlug, product: prodSlug } = await params;
  const location = siteData.locations.find((l) => l.slug === locSlug);
  
  if (!location) notFound();

  // Check if it's a specific product from siteData
  const product = siteData.products.find((p) => p.slug === prodSlug);
  
  if (!product) {
    // If not a product, check if it's a CATEGORY (like ecommerce-tapes)
    const category = CATEGORIES.find(c => generateSlug(c) === prodSlug);
    if (category) {
      return <EcommerceCategory locationSlug={location.slug} categorySlug={generateSlug(category)} />;
    }
    notFound();
  }

  return <ProductClientPage slug={product.slug} locationSlug={location.slug} locationName={location.name} />;
}

export async function generateStaticParams() {
  const params: { location: string; product: string }[] = [];

  siteData.locations.forEach((loc) => {
    // 1. All products for this location
    siteData.products.forEach((prod) => {
      params.push({
        location: loc.slug,
        product: prod.slug
      });
    });

    // 2. All categories for this location
    CATEGORIES.forEach((cat) => {
      params.push({
        location: loc.slug,
        product: generateSlug(cat)
      });
    });
  });

  return params;
}
