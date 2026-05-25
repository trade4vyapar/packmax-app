import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteData } from "@/data/siteData";
import EcommerceCategory, { CATEGORIES } from "@/components/EcommerceCategory";
import { MapPin, CheckCircle2, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import InquiryButton from "@/components/InquiryButton";
import ProductGallery from "@/components/ProductGallery";

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
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
    return {
      title: `${category} Manufacturer in ${location.name} - Buy Online | Packmax India`,
      description: `Leading manufacturer of ${category} serving ${location.name}. Direct factory prices and fast delivery.`,
    };
  }

  const product = siteData.products.find((p) => p.slug === prodSlug);
  if (product) {
    return {
      title: `${product.name} in ${location.name} | Packmax India`,
      description: `Leading manufacturer of ${product.name} serving ${location.name}.`,
    };
  }

  return { title: "Page Not Found" };
}

export default async function LocationProductOrCategoryPage({ params }: Props) {
  const { location: locSlug, product: prodSlug } = await params;
  const location = siteData.locations.find((l) => l.slug === locSlug);
  
  if (!location) notFound();

  // If the product slug is a CATEGORY (like ecommerce-tapes), show the Ecommerce Category Page
  const category = CATEGORIES.find(c => generateSlug(c) === prodSlug);
  if (category) {
    return <EcommerceCategory locationSlug={location.slug} categorySlug={generateSlug(category)} />;
  }

  // Fallback to the old Matrix Page if it's a specific product from siteData
  const product = siteData.products.find((p) => p.slug === prodSlug);
  if (!product) notFound();

  return (
    <main className="min-h-screen bg-[var(--color-bg)] pt-32 pb-16 selection:bg-[var(--color-cta)] selection:text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        
        {/* Compact SEO Header */}
        <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
          <div className="inline-flex items-center gap-2.5 text-[var(--color-cta)] font-black text-[11px] uppercase tracking-[0.4em] mb-4">
            <MapPin className="w-4 h-4" />
            Supplying {location.name}
          </div>
          {/* Ensure title stays in single line via truncate or line-clamp-1 if it gets too long, but flex-wrap handles natural breaks. The user wants it single line, so we will use whitespace-nowrap or flex-row. */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--color-heading)] tracking-tighter leading-tight uppercase flex flex-wrap gap-x-3 items-center w-full">
            <span className="truncate max-w-full">{product.name}</span>
            <span className="text-[var(--color-cta)] whitespace-nowrap">In {location.name}</span>
          </h1>
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
