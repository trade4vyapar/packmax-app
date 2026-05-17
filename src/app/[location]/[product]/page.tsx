import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteData } from "@/data/siteData";
import EcommerceCategory, { CATEGORIES } from "@/components/EcommerceCategory";
import { MapPin, CheckCircle2, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

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
    <main className="min-h-screen bg-[var(--color-bg)] pt-28 pb-16 selection:bg-[var(--color-cta)] selection:text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        
        {/* Compact SEO Header */}
        <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
          <div className="inline-flex items-center gap-2 text-[var(--color-cta)] font-black text-[9px] uppercase tracking-[0.4em] mb-4">
            <MapPin className="w-3 h-3" />
            Supplying {location.name}
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-[var(--color-heading)] tracking-tighter leading-tight uppercase">
            {product.name} <br />
            <span className="text-[var(--color-cta)]">In {location.name}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Compact Visual */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden bg-white border border-[var(--color-border)] shadow-lg mb-8">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                <p className="text-[8px] font-black uppercase tracking-widest text-[var(--color-heading)] opacity-50 mb-1">Direct Delivery</p>
                <p className="text-[10px] font-black uppercase text-[var(--color-cta)]">Manufacturing hub: Indore</p>
              </div>
            </div>

            <div className="prose prose-sm max-w-none text-[var(--color-text)] font-medium leading-relaxed">
              <p className="mb-4">Looking for high-quality {product.name} in {location.name}? Packmax India provides industrial-grade packaging solutions delivered directly from our Indore manufacturing facility to your doorstep in {location.name}.</p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-[var(--color-border)]">
                    <Truck className="w-5 h-5 text-[var(--color-cta)]" />
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-60">72h Delivery</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-[var(--color-border)]">
                    <ShieldCheck className="w-5 h-5 text-[var(--color-cta)]" />
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Tested Quality</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Technical Specs & Inquiry */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[var(--color-heading)] text-white p-8 rounded-[2.5rem] shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[10px] font-black text-[var(--color-cta)] uppercase tracking-[0.3em]">Technical Profile</h3>
                <Link href={`/products/${product.slug}`} className="text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-[var(--color-cta)] transition-colors">
                  Product Details
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="border-b border-white/5 pb-3">
                    <span className="block text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">{key.replace("_", " ")}</span>
                    <span className="text-xs font-bold">{value}</span>
                  </div>
                ))}
              </div>
              
              <Link
                href="/contact"
                className="w-full group px-6 py-4 rounded-full bg-[var(--color-cta)] text-white font-black text-center text-xs shadow-xl hover:bg-[var(--color-cta-hover)] transition-all flex items-center justify-center gap-3 tracking-widest uppercase"
              >
                Inquiry for {location.name} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Quick Benefits */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-[var(--color-border)]">
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {product.features.slice(0, 3).map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-cta)]" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-heading)] opacity-60">{f}</span>
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
