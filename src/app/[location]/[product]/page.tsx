import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteData } from "@/data/siteData";
import EcommerceCategory, { CATEGORIES } from "@/components/EcommerceCategory";
import ProductClientPage from "@/app/products/[slug]/product-client";
import JsonLd from "@/components/JsonLd";
import SeoLocalContent from "@/components/SeoLocalContent";
import RelatedProducts from "@/components/RelatedProducts";
import ProductFaq from "@/components/ProductFaq";
import {
  generateSEOMetadata,
  breadcrumbSchema,
  productSchema,
  localBusinessSchema,
  faqSchema,
  SITE_URL,
} from "@/utils/seo";

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const MARKETPLACES = ["Amazon", "Flipkart", "Meesho", "Myntra", "Ajio", "Snapdeal", "JioMart", "Nykaa"];

function matchMarketplace(name: string): string | null {
  const hit = MARKETPLACES.find(mp => name.toLowerCase().includes(mp.toLowerCase()));
  return hit || null;
}

interface Props {
  params: Promise<{ location: string; product: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location: locSlug, product: prodSlug } = await params;
  const location = siteData.locations.find((l) => l.slug === locSlug);

  if (!location) return { title: "Location Not Found" };

  const category = CATEGORIES.find(c => generateSlug(c) === prodSlug);
  if (category) {
    const isTape = category.toLowerCase().includes("tape");
    const title = isTape
      ? `${category} in ${location.name} | ${category} Manufacturer & Wholesale Supplier`
      : `${category} in ${location.name} | Wholesale Supplier & Direct Factory`;

    const description = `Buy ${category} in ${location.name}, ${location.state} directly from the Packmax factory. Wholesale rates, custom prints, and 48-72 hour dispatch across ${location.name} and nearby industrial zones.`;
    const keywords = `${category} ${location.name}, ${category} manufacturer ${location.name}, buy ${category} ${location.name}, wholesale ${category} ${location.name}, packmax ${category} ${location.name}, packaging materials ${location.name}`;

    return generateSEOMetadata({
      title,
      description,
      path: `/${location.slug}/${prodSlug}`,
      keywords,
      locationName: location.name,
      categoryName: category,
    });
  }

  const product = siteData.products.find((p) => p.slug === prodSlug);
  if (product) {
    const marketplace = matchMarketplace(product.name);
    const isTape = product.categorySlug.includes("tape") || product.slug.includes("tape");

    // Title is the single most-weighted SEO signal — front-load the exact query.
    // For "amazon tape bhopal packmax", title becomes: "Amazon Tape in Bhopal | Packmax — Buy Amazon Seller Tape Wholesale"
    const title = marketplace
      ? `${product.name} in ${location.name} | Packmax — Buy ${marketplace} Seller Tape Wholesale`
      : isTape
        ? `${product.name} in ${location.name}, ${location.state} | Wholesale BOPP Tape Manufacturer`
        : `${product.name} in ${location.name}, ${location.state} | Packaging Supplier`;

    const description = marketplace
      ? `Buy ${product.name} in ${location.name}, ${location.state} from Packmax — official-spec ${marketplace} seller packaging tape with custom print, 48-72h delivery, and direct factory pricing for ${location.name}-based ${marketplace} sellers.`
      : `Buy ${product.name} in ${location.name}, ${location.state} directly from Packmax. High-micron B2B packaging with wholesale rates and 48-72h delivery across ${location.name}.`;

    const baseKeywords = [
      `${product.name} ${location.name}`,
      `${product.name} manufacturer ${location.name}`,
      `buy ${product.name} ${location.name}`,
      `wholesale ${product.name} ${location.name}`,
      `${product.name} supplier ${location.name}`,
      `packmax ${product.name} ${location.name}`,
      `${product.name} ${location.name} packmax`,
    ];
    if (marketplace) {
      baseKeywords.push(
        `${marketplace} tape ${location.name}`,
        `${marketplace} tape ${location.name} packmax`,
        `${marketplace} printed tape ${location.name}`,
        `${marketplace} seller packaging ${location.name}`,
        `buy ${marketplace} tape ${location.name}`,
        `${marketplace} fulfillment tape supplier ${location.name}`,
      );
    }
    const keywords = baseKeywords.join(", ");

    return generateSEOMetadata({
      title,
      description,
      path: `/${location.slug}/${product.slug}`,
      keywords,
      ogImage: product.image,
      locationName: location.name,
      productName: product.name,
    });
  }

  return { title: "Page Not Found | Packmax India" };
}

export default async function LocationProductOrCategoryPage({ params }: Props) {
  const { location: locSlug, product: prodSlug } = await params;
  const location = siteData.locations.find((l) => l.slug === locSlug);

  if (!location) notFound();

  const product = siteData.products.find((p) => p.slug === prodSlug);

  if (!product) {
    const category = CATEGORIES.find(c => generateSlug(c) === prodSlug);
    if (category) {
      const catBreadcrumb = breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: location.name, url: `/${location.slug}` },
        { name: category, url: `/${location.slug}/${prodSlug}` },
      ]);
      const catBiz = localBusinessSchema({
        name: `Packmax India — ${location.name}`,
        url: `/${location.slug}/${prodSlug}`,
        city: location.name,
        state: location.state,
        streetAddress: location.address,
        description: `${category} manufacturer and wholesale supplier serving ${location.name}, ${location.state}.`,
      });
      const catFaq = faqSchema([
        {
          question: `Where can I buy ${category} in ${location.name}?`,
          answer: `Packmax India ships ${category} directly from our factory to ${location.name}, ${location.state}. Order via the inquiry form on this page for 48-72 hour dispatch.`,
        },
        {
          question: `Does Packmax offer wholesale rates for ${category} in ${location.name}?`,
          answer: `Yes — bulk B2B pricing is available for ${category} buyers in ${location.name}. Request a quote and the team will share location-specific rates.`,
        },
      ]);
      return (
        <>
          <JsonLd data={[catBreadcrumb, catBiz, catFaq]} />
          <EcommerceCategory locationSlug={location.slug} categorySlug={generateSlug(category)} />
        </>
      );
    }
    notFound();
  }

  const marketplace = matchMarketplace(product.name);
  const pageUrl = `/${location.slug}/${product.slug}`;

  const prodBreadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: location.name, url: `/${location.slug}` },
    { name: product.name, url: pageUrl },
  ]);

  const prodSchema = productSchema({
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.id,
    brand: "Packmax India",
    url: `${SITE_URL}${pageUrl}`,
    locationName: location.name,
    ratingValue: "4.7",
    reviewCount: 184,
    category: product.categorySlug,
  });

  const biz = localBusinessSchema({
    name: `Packmax India — ${location.name}`,
    url: pageUrl,
    image: product.image,
    city: location.name,
    state: location.state,
    streetAddress: location.address,
    description: `${product.name} manufacturer and wholesale supplier serving ${location.name}, ${location.state}.`,
  });

  const faqItems = [
    {
      question: `Where can I buy ${product.name} in ${location.name}?`,
      answer: `Packmax India is the direct manufacturer of ${product.name} for buyers in ${location.name}, ${location.state}. Submit an inquiry on this page for factory-direct pricing and 48-72 hour dispatch.`,
    },
    ...(marketplace
      ? [{
          question: `Is this ${product.name} compliant with ${marketplace} seller guidelines?`,
          answer: `Yes — our ${product.name} is engineered to ${marketplace}'s packaging spec (45-50 micron BOPP, high-tack adhesive, tamper-evident finish) and is used by ${marketplace} sellers across ${location.name}.`,
        }]
      : []),
    {
      question: `Do you ship ${product.name} to ${location.name} industrial zones?`,
      answer: `We dispatch ${product.name} to all major industrial areas around ${location.name}, ${location.state} within 48-72 hours.`,
    },
    {
      question: `What is the minimum order quantity for ${product.name}?`,
      answer: `Standard MOQ for ${product.name} starts at 72 rolls for plain stock and 144 rolls for custom-printed variants. Volume discounts apply for ${location.name}-based B2B buyers.`,
    },
  ];
  const faq = faqSchema(faqItems);

  // Sibling marketplace tapes in the same location — strengthens internal linking
  // so Google understands the location hub.
  const relatedLinks = siteData.products
    .filter(p => p.id !== product.id)
    .filter(p => matchMarketplace(p.name) || p.categorySlug === product.categorySlug)
    .slice(0, 8)
    .map(p => ({
      label: `${p.name} in ${location.name}`,
      href: `/${location.slug}/${p.slug}`,
    }));

  return (
    <>
      <JsonLd data={[prodBreadcrumb, prodSchema, biz, faq]} />
      <ProductClientPage slug={product.slug} locationSlug={location.slug} locationName={location.name} />
      <SeoLocalContent
        productName={product.name}
        locationName={location.name}
        state={location.state}
        marketplace={marketplace}
        relatedLinks={relatedLinks}
      />
      <RelatedProducts productSlug={product.slug} locationSlug={location.slug} />
      <ProductFaq productName={product.name} locationName={location.name} faq={faqItems} />
    </>
  );
}

export async function generateStaticParams() {
  const params: { location: string; product: string }[] = [];

  siteData.locations.forEach((loc) => {
    siteData.products.forEach((prod) => {
      params.push({
        location: loc.slug,
        product: prod.slug,
      });
    });

    CATEGORIES.forEach((cat) => {
      params.push({
        location: loc.slug,
        product: generateSlug(cat),
      });
    });
  });

  return params;
}
