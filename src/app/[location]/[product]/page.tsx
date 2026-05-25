import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteData } from "@/data/siteData";
import EcommerceCategory, { CATEGORIES } from "@/components/EcommerceCategory";
import { MapPin, CheckCircle2, ArrowRight, ShieldCheck, Truck, Star } from "lucide-react";
import Link from "next/link";
import InquiryButton from "@/components/InquiryButton";
import ProductGallery from "@/components/ProductGallery";

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

  return (
    <main className="min-h-screen bg-[var(--color-bg)] pt-32 pb-16 selection:bg-[var(--color-cta)] selection:text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        
        {/* Compact SEO Header */}
        <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
          <div className="inline-flex items-center gap-2.5 text-[var(--color-cta)] font-black text-[11px] uppercase tracking-[0.4em] mb-4">
            <MapPin className="w-4 h-4" />
            Supplying {location.name}
          </div>
          {/* Title single line with truncation */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--color-heading)] tracking-tight leading-tight uppercase truncate w-full mb-3 flex items-center gap-3">
            {product.name} <span className="text-[var(--color-cta)] whitespace-nowrap">In {location.name}</span>
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex text-amber-500">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" opacity={0.3} />
            </div>
            <span className="text-sm font-black text-[var(--color-heading)] opacity-60">(4.0)</span>
          </div>

          {/* Categories */}
          <div className="text-[11px] font-black uppercase tracking-wider text-[var(--color-heading)] opacity-50">
            CATEGORIES: {product.categorySlug.replace(/-/g, " ")}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left: Compact Visual */}
          <div className="lg:col-span-5">
            <ProductGallery 
              images={product.images || [product.image]} 
              name={product.name} 
              locationName={location.name} 
            />

            <div className="prose prose-base max-w-none text-[var(--color-text)] font-medium leading-relaxed mt-8">
              <p className="mb-4 text-base leading-relaxed">Looking for high-quality {product.name} in {location.name}? Packmax India provides industrial-grade packaging solutions delivered directly from our Indore manufacturing facility to your doorstep in {location.name}.</p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center justify-center gap-3 bg-white p-5 rounded-2xl border border-[var(--color-border)] shadow-sm">
                    <Truck className="w-6 h-6 text-[var(--color-cta)]" />
                    <span className="text-[11px] font-black uppercase tracking-widest opacity-70">72h Delivery</span>
                </div>
                <div className="flex items-center justify-center gap-3 bg-white p-5 rounded-2xl border border-[var(--color-border)] shadow-sm">
                    <ShieldCheck className="w-6 h-6 text-[var(--color-cta)]" />
                    <span className="text-[11px] font-black uppercase tracking-widest opacity-70">Tested Quality</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Technical Specs & Inquiry */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-[var(--color-heading)] text-white p-10 rounded-[2.5rem] shadow-xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xs font-black text-[var(--color-cta)] uppercase tracking-[0.3em]">Technical Profile</h3>
                <Link href={`/products/${product.slug}`} className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-[var(--color-cta)] transition-colors">
                  Product Details
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-8 mb-10">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="border-b border-white/10 pb-4">
                    <span className="block text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-white/40 mb-1.5">{key.replace("_", " ")}</span>
                    <span className="text-sm sm:text-base font-bold">{value as React.ReactNode}</span>
                  </div>
                ))}
              </div>
              
              <InquiryButton locationName={location.name} productName={product.name} />
            </div>

            {/* Quick Benefits */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-[var(--color-border)] shadow-sm">
              <div className="flex flex-wrap gap-x-8 gap-y-5">
                {product.features.slice(0, 3).map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-cta)]" />
                    <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[var(--color-heading)] opacity-70">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
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
