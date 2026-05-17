import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteData } from "@/data/siteData";
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Package, Info, ChevronRight, FileText } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = siteData.products.find((p) => p.slug === slug);

  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | Packmax India`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = siteData.products.find((p) => p.slug === slug);

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-[var(--color-bg)] pt-28 pb-16 selection:bg-[var(--color-cta)] selection:text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        
        {/* Compact Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-6 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--color-heading)] opacity-30">
          <Link href="/">Home</Link>
          <ChevronRight className="w-2 h-2" />
          <Link href="/products">Products</Link>
          <ChevronRight className="w-2 h-2" />
          <span className="text-[var(--color-cta)]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left: Compact Image Section */}
          <div className="lg:col-span-5">
            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-white border border-[var(--color-border)] shadow-xl">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6 bg-[var(--color-heading)] text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                Premium Quality
              </div>
            </div>

            {/* Quick Trust Row */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { icon: ShieldCheck, label: "Secured" },
                { icon: Zap, label: "Industrial" },
                { icon: Package, label: "Bulk" }
              ].map((item, i) => (
                <div key={i} className="bg-white/50 p-4 rounded-2xl border border-[var(--color-border)] flex flex-col items-center">
                  <item.icon className="w-5 h-5 text-[var(--color-cta)] mb-2" strokeWidth={1.5} />
                  <span className="text-[8px] font-black uppercase tracking-widest opacity-60">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Focused Content Section */}
          <div className="lg:col-span-7">
            <div className="mb-4 inline-flex items-center gap-2 text-[var(--color-cta)] font-black text-[10px] uppercase tracking-[0.3em]">
              Product Overview
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-black text-[var(--color-heading)] tracking-tighter leading-tight mb-4 uppercase">
              {product.name}
            </h1>
            
            <p className="text-lg font-bold text-[var(--color-heading)] opacity-80 mb-6 leading-relaxed">
              {product.tagline}
            </p>

            <p className="text-base text-[var(--color-text)] leading-relaxed mb-8 font-medium">
              {product.description}
            </p>

            {/* Specs Grid (Compact) */}
            <div className="bg-white rounded-[2rem] p-8 border border-[var(--color-border)] mb-8 shadow-sm">
              <h3 className="text-[10px] font-black text-[var(--color-heading)] uppercase tracking-[0.2em] mb-6 flex items-center gap-2 opacity-40">
                <Info className="w-3 h-3" /> Technical Data
              </h3>
              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="border-b border-[var(--color-border)] pb-3">
                    <span className="block text-[8px] font-black text-[var(--color-heading)] uppercase tracking-widest opacity-30 mb-1">{key.replace("_", " ")}</span>
                    <span className="text-xs font-black text-[var(--color-heading)]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar (More Compact) */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="flex-[2] group px-8 py-5 rounded-full bg-[var(--color-cta)] text-white font-black text-center text-xs shadow-xl shadow-[#C05800]/20 hover:bg-[var(--color-cta-hover)] transition-all flex items-center justify-center gap-3 tracking-widest uppercase"
              >
                Get Bulk Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="flex-1 px-8 py-5 rounded-full bg-white border-2 border-[var(--color-border)] text-[var(--color-heading)] font-black text-xs hover:shadow-lg transition-all flex items-center justify-center gap-3 tracking-widest uppercase">
                <FileText className="w-4 h-4" /> Specs
              </button>
            </div>

            {/* Features Row */}
            <div className="mt-10 pt-8 border-t border-[var(--color-border)] flex flex-wrap gap-6">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-cta)]" />
                  <span className="text-[10px] font-black text-[var(--color-heading)] uppercase tracking-wider opacity-60">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
