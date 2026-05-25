import { Metadata } from "next";
import { siteData } from "@/data/siteData";
import { generateSEOMetadata } from "@/utils/seo";
import ProductClientPage from "./product-client";
import EcommerceCategory, { CATEGORIES } from "@/components/EcommerceCategory";
import { notFound } from "next/navigation";

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = siteData.products.find((p) => p.slug === slug);

  if (product) {
    const isTape = product.categorySlug.includes("tape") || product.slug.includes("tape");
    const title = isTape
      ? `${product.name} Manufacturer & Wholesaler | BOPP Tapes`
      : `${product.name} Supplier | Industrial Packaging`;
      
    const description = `Buy premium ${product.name} directly from our factory. High-micron B2B packaging films and rolls with Pan-India 72h delivery.`;
    const keywords = `${product.name} manufacturer, buy ${product.name}, wholesale ${product.name}, adhesive tape supplier, packaging films`;

    return generateSEOMetadata({
      title,
      description,
      path: `/products/${product.slug}`,
      keywords,
      ogImage: product.image,
      productName: product.name
    });
  const category = CATEGORIES.find(c => generateSlug(c) === slug);
  if (category) {
    return generateSEOMetadata({
      title: `${category} Supplier & Manufacturer | Wholesale Packaging`,
      description: `Buy premium ${category} directly from our factory. High-quality B2B packaging solutions with fast delivery across India.`,
      path: `/products/${generateSlug(category)}`,
      keywords: `${category} manufacturer, buy ${category}, wholesale ${category}, packaging supplier India`,
      categoryName: category
    });
  }

  return { title: "Page Not Found | Packmax India" };
}


export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  
  const product = siteData.products.find((p) => p.slug === slug);
  if (product) {
    return <ProductClientPage slug={slug} />;
  }

  const category = CATEGORIES.find(c => generateSlug(c) === slug);
  if (category) {
    return <EcommerceCategory locationSlug="india" categorySlug={generateSlug(category)} />;
  }

  notFound();
}

export async function generateStaticParams() {
  return siteData.products.map((product) => ({
    slug: product.slug,
  }));
}
