"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { siteData } from "@/data/siteData";
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Package, Info, ChevronRight, FileText, Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import PremiumCTA from "@/components/PremiumCTA";
import ProductGallery from "@/components/ProductGallery";

const MotionLink = motion.create(Link);

export default function ProductClientPage({ slug }: { slug: string }) {
  const product = siteData.products.find((p) => p.slug === slug);

  if (!product) notFound();

  // Animation variants
  const scaleReveal = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)] pt-32 pb-16 selection:bg-[var(--color-cta)] selection:text-white">
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
          
          {/* Left: Compact Image Section with Zoom Reveal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <ProductGallery 
              images={product.images || [product.image]} 
              name={product.name} 
              locationName="India" 
            />

            {/* Quick Trust Row */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { icon: ShieldCheck, label: "Secured" },
                { icon: Zap, label: "Strong Stick" },
                { icon: Package, label: "Bulk Box" }
              ].map((item, i) => (
                <div key={i} className="bg-white/50 p-4 rounded-2xl border border-[var(--color-border)] flex flex-col items-center shadow-sm">
                  <item.icon className="w-6 h-6 text-[var(--color-cta)] mb-2" strokeWidth={1.5} />
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-60">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Focused Content Section */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={scaleReveal}
            className="lg:col-span-7"
          >
            <div className="mb-4 inline-flex items-center gap-2 text-[var(--color-cta)] font-black text-[10px] uppercase tracking-[0.3em]">
              Product Details
            </div>
            
            {/* Title single line */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--color-heading)] tracking-tight leading-tight mb-3 uppercase truncate w-full">
              {product.name}
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
            <div className="text-[11px] font-black uppercase tracking-wider text-[var(--color-heading)] opacity-50 mb-6">
              CATEGORIES: {product.categorySlug.replace(/-/g, " ")}
            </div>
            
            <p className="text-xl font-bold text-[var(--color-heading)] opacity-80 mb-6 leading-relaxed">
              {product.tagline}
            </p>

            <p className="text-base text-[var(--color-text)] leading-relaxed mb-8 font-medium opacity-85">
              {product.description}
            </p>

            {/* Specs Grid (Compact) */}
            <div className="bg-white rounded-[2rem] p-10 border border-[var(--color-border)] mb-8 shadow-sm">
              <h3 className="text-xs font-black text-[var(--color-heading)] uppercase tracking-[0.2em] mb-6 flex items-center gap-2 opacity-40">
                <Info className="w-4 h-4" /> Technical Data
              </h3>
              <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="border-b border-[var(--color-border)] pb-4">
                    <span className="block text-[10px] sm:text-[11px] font-black text-[var(--color-heading)] uppercase tracking-widest opacity-40 mb-1.5">{key.replace("_", " ")}</span>
                    <span className="text-sm sm:text-base font-black text-[var(--color-heading)]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar (More Compact) */}
            <div className="flex flex-col sm:flex-row gap-4">
              <PremiumCTA 
                href="/contact"
                label="Get Cheap Bulk Quote"
                variant="primary"
                icon={<ArrowRight className="w-5 h-5" />}
                className="flex-[2]"
              />
              <PremiumCTA 
                href="/products"
                label="Back to Products"
                variant="secondary"
                icon={<FileText className="w-5 h-5" />}
                className="flex-1"
              />
            </div>

            {/* Features Row */}
            <div className="mt-10 pt-8 border-t border-[var(--color-border)] flex flex-wrap gap-6">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-cta)]" />
                  <span className="text-[11px] font-black text-[var(--color-heading)] uppercase tracking-wider opacity-70">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
