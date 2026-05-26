"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Shield, ArrowRightLeft } from "lucide-react";
import Link from "next/link";
import { siteData } from "@/data/siteData";
import PremiumCTA from "@/components/PremiumCTA";

const MotionLink = motion.create(Link);

export default function TapeShowcase() {
  // Curated list of varied top sellers for the homepage to replace the old tape-only logic
  const featuredProducts = [
    siteData.products.find(p => p.slug === "custom-brand-printed-tape"),
    siteData.products.find(p => p.slug === "standard-brown-packaging-tape"),
    siteData.products.find(p => p.slug === "hand-grade-stretch-film"),
    siteData.products.find(p => p.slug === "plain-courier-bags"),
  ].filter(Boolean) as typeof siteData.products;

  // Animation variants
  const scaleReveal = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const stagger = {
    visible: { 
      transition: { staggerChildren: 0.08 }
    }
  };

  return (
    <section className="py-16 px-6 bg-[var(--color-bg)] border-t border-[var(--color-border)] relative overflow-hidden">
      {/* Dynamic Background Details */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-orange-100/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Simple Minimal Title */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12"
        >
          <div>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-cta)] block mb-2">Top Sellers</span>
            <h2 className="text-2xl sm:text-4xl font-black text-[var(--color-heading)] uppercase tracking-tight leading-none">
              Featured Packaging
            </h2>
          </div>
          <p className="text-xs font-bold text-[var(--color-heading)] opacity-50 max-w-sm">
            Our most requested industrial packaging solutions, directly supplied from our manufacturing hubs to your business.
          </p>
        </motion.div>

        {/* Horizontal Line Grid (Swipeable on Mobile, Grid on Laptop) with premium stagger */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="flex overflow-x-auto gap-5 pb-6 px-1 -mx-6 md:mx-0 md:px-0 md:overflow-visible md:grid md:grid-cols-4 md:gap-6 scrollbar-hide snap-x"
        >
          {featuredProducts.map((prod) => (
            <motion.div 
              key={prod.id}
              variants={scaleReveal}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="min-w-[270px] sm:min-w-0 flex-1 snap-start group bg-white border border-[var(--color-border)] rounded-2.5xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                
                {/* Visual Blob Image */}
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-[var(--color-bg)] border border-[var(--color-border)] relative">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[var(--color-border)] text-[8px] font-black text-[var(--color-cta)] uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Shield className="w-2.5 h-2.5" /> High Stick
                  </div>
                </div>

                <h3 className="text-sm font-black text-[var(--color-heading)] uppercase tracking-tight mb-1.5 leading-tight">
                  {prod.name}
                </h3>
                
                <p className="text-[10px] font-bold text-[var(--color-text)] opacity-60 leading-relaxed mb-4 line-clamp-2">
                  {prod.tagline}
                </p>

                {/* Specs */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  <span className="text-[8px] font-black uppercase bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-heading)] px-2 py-0.5 rounded-full">
                    {prod.specs.thickness}
                  </span>
                  <span className="text-[8px] font-black uppercase bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-heading)] px-2 py-0.5 rounded-full">
                    {prod.specs.material}
                  </span>
                </div>

              </div>

              {/* View/Inquire Button */}
              <PremiumCTA 
                href={`/products/${prod.slug}`} 
                label="Inquire Specs"
                variant="secondary"
                icon={<ArrowRight className="w-3 h-3" />}
                className="w-full py-3 h-10 text-[9px] rounded-xl"
              />

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
