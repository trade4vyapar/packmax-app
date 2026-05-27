"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Truck, Package, MessageSquare } from "lucide-react";
import Link from "next/link";
import { siteData } from "@/data/siteData";

export default function FeaturedProducts() {
  const featured = [
    {
      id: "printed-tapes",
      name: "PackMax Elite Print Tapes",
      tagline: "Custom Logo BOPP Tape Manufacturer & Supplier",
      description: "Manufactured in our own factory and supplied direct to dealers, distributors and B2B buyers — high-grade adhesive tape printed with your corporate logo, exact brand colours and machine-line dimensions.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
      specs: ["45 - 55 Micron Thickness", "Water-Based Acrylic Adhesive", "Rotogravure 4-Color Printing", "Length: 50m - 650m rolls"],
      accent: "[var(--color-cta)]"
    },
    {
      id: "courier-bags",
      name: "ArmorSeal Poly Courier Bags",
      tagline: "Courier Bag Manufacturer & Wholesale Distributor",
      description: "Tear-resistant, triple-co-extruded LDPE courier bags manufactured in-house and distributed through our authorised supplier network to e-commerce sellers, 3PL operators and bulk B2B clients.",
      image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=2070&auto=format&fit=crop",
      specs: ["50 - 75 Micron Standard", "Tear & Water Resistant LDPE", "Tamper-Evident Security Seal", "Optional Pod Jackets"],
      accent: "#121B5A"
    }
  ];

  return (
    <section className="py-24 px-6 bg-[var(--color-bg)] border-t border-[var(--color-border)] relative overflow-hidden">
      {/* Decorative Blurs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-orange-100 opacity-50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-[var(--color-cta)] opacity-5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-16 pb-8 border-b border-[var(--color-border)]">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-cta)] block mb-3">Flagship Manufacturer Supply</span>
            <h2 className="text-3xl sm:text-5xl font-black text-[var(--color-heading)] tracking-tighter uppercase leading-[0.95]">
              Manufacturer-Direct <br /> Packaging Portfolios
            </h2>
          </div>
          <p className="text-sm font-bold text-[var(--color-heading)] opacity-50 max-w-sm leading-relaxed">
            Manufactured inside our Indore facility and distributed pan-India through our wholesale supplier and authorised distributor network — high-speed line sealing, transit protection and brand-grade printing in every roll.
          </p>
        </div>

        {/* Dynamic Asymmetrical Split Grid */}
        <div className="space-y-16 lg:space-y-28">
          {featured.map((prod, idx) => (
            <div 
              key={prod.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center`}
            >
              
              {/* Product Visual */}
              <div className={`lg:col-span-6 relative ${idx % 2 === 1 ? "lg:order-last" : ""}`}>
                <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-[var(--color-border)] bg-white shadow-xl group">
                  <img 
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 sm:p-8">
                    <div>
                      <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[var(--color-cta)] block mb-1">State-of-the-Art Factory</span>
                      <span className="text-lg sm:text-2xl font-black text-white uppercase tracking-tight block leading-none">{prod.tagline}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Context */}
              <div className="lg:col-span-6 space-y-6 sm:space-y-8">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[var(--color-border)] shadow-sm text-[9px] font-black text-[var(--color-cta)] uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5" /> High Performance Standard
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-[var(--color-heading)] uppercase tracking-tight leading-none">
                    {prod.name}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--color-heading)] opacity-60 font-bold leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                {/* Grid specs */}
                <div className="grid grid-cols-2 gap-4">
                  {prod.specs.map((spec) => (
                    <div key={spec} className="bg-white border border-[var(--color-border)] rounded-2xl p-4 flex items-center gap-3">
                      <Zap className="w-4 h-4 text-[var(--color-cta)] shrink-0" />
                      <span className="text-[10px] font-black uppercase tracking-tight text-[var(--color-heading)] leading-snug">{spec}</span>
                    </div>
                  ))}
                </div>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link 
                    href="/contact" 
                    className="group px-8 py-4 rounded-full bg-[var(--color-heading)] hover:bg-[var(--color-cta)] text-white font-black text-xs transition-colors tracking-widest uppercase flex items-center gap-2 shadow-sm"
                  >
                    Quick Spec Inquiry <MessageSquare className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
