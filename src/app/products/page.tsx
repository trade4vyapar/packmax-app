"use client";

import { motion } from "framer-motion";
import { siteData } from "@/data/siteData";
import { CATEGORIES } from "@/components/EcommerceCategory";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import InquiryButton from "@/components/InquiryButton";
import PremiumCTA from "@/components/PremiumCTA";

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const MotionLink = motion.create(Link);

export default function ProductsDirectoryPage() {
  const defaultLocationSlug = "indore";
  const defaultLocationName = "Indore";

  // Filter E-commerce specific tapes for the Spotlight - limited to exactly 2 tapes instead of 4
  const spotlightTapes = siteData.products.filter(p => 
    ["amazon-prime-tape", "flipkart-tape"].includes(p.slug)
  ).slice(0, 2);

  // Other products for the standard grid
  const standardProducts = siteData.products.filter(p => 
    !["amazon-prime-tape", "amazon-tape", "flipkart-tape", "meesho-tape"].includes(p.slug)
  );

  // Animation variants
  const scaleReveal = {
    hidden: { opacity: 0, scale: 0.96 },
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
    <main className="min-h-screen bg-[var(--color-bg)] pt-32 pb-24 font-sans selection:bg-[var(--color-cta)] selection:text-white overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative px-6 lg:px-20 max-w-[95rem] mx-auto mb-24">
        <div className="absolute top-0 right-10 w-96 h-96 bg-[var(--color-cta)] opacity-5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -left-10 top-20 w-80 h-80 bg-orange-200 opacity-10 rounded-full blur-[80px] pointer-events-none" />
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 text-[10px] font-black uppercase tracking-[0.25em] text-[var(--color-heading)] opacity-35">
          <Link href="/">Home</Link>
          <ChevronRight className="w-2.5 h-2.5" />
          <span className="text-[var(--color-cta)]">Product Portfolio</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--color-border)] shadow-sm text-[10px] font-black text-[var(--color-cta)] uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Premium Bulk Tape & Bag Supplies
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-black text-[var(--color-heading)] tracking-tighter uppercase leading-[0.9] mb-8">
              Strong Tapes <br /> To <span className="text-[var(--color-cta)]">Protect.</span>
            </h1>
            
            <p className="text-lg text-[var(--color-heading)] opacity-70 font-bold leading-relaxed max-w-xl mb-10">
              We make strong adhesive tapes and secure packing bags for businesses. Our tapes stick firmly to boxes, helping online sellers ship their orders safely without any opening or damage.
            </p>

            <div className="flex flex-wrap gap-4">
              <PremiumCTA 
                href="#spotlight"
                label="View E-commerce Tapes"
                variant="primary"
                icon={<ArrowRight className="w-4 h-4" />}
              />
              <PremiumCTA 
                href="/market-area"
                label="Explore Delivery Areas"
                variant="secondary"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative w-full aspect-[4/3] sm:aspect-square rounded-[3rem] overflow-hidden border border-[var(--color-border)] shadow-2xl bg-white group">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
                alt="Packmax Warehouse Logistics"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-cta)] block mb-1">Direct From Factory</span>
                  <span className="text-xl font-black text-white uppercase tracking-tight block">Tested Strong Sticky Quality</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. BOUTIQUE PANEL CATEGORIES BAR */}
      <section className="bg-white py-16 border-y border-[var(--color-border)] mb-28">
        <div className="max-w-[95rem] mx-auto px-6 lg:px-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-cta)] block mb-2">Easy Categories</span>
              <h2 className="text-3xl font-black text-[var(--color-heading)] uppercase tracking-tight">Our Main Products</h2>
            </div>
            <p className="text-sm font-bold text-[var(--color-heading)] opacity-40 max-w-sm">
              We ship strong packing tapes and secure bags directly to your office or warehouse.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {CATEGORIES.slice(0, 4).map((cat, idx) => {
              const slug = generateSlug(cat);
              const desc = idx === 0 
                ? "Self-adhesive tapes, printed with your logo or standard seller marks."
                : idx === 1 
                ? "Tamper-proof mailing bags with sticky peel strip that locks closed."
                : idx === 2 
                ? "Strong, stretchy wrap rolls to hold heavy cartons together on pallets."
                : "Colorful BOPP adhesive tape rolls made for automatic packing machines.";

              return (
                <Link 
                  key={slug} 
                  href={`/${defaultLocationSlug}/${slug}`}
                  className="block"
                >
                  <motion.div
                    variants={scaleReveal}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="group bg-[var(--color-bg)] rounded-[2.5rem] p-8 border border-[var(--color-border)] shadow-sm hover:shadow-xl hover:bg-white transition-all duration-300 h-full flex flex-col justify-between aspect-[1.1]"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white border border-[var(--color-border)] flex items-center justify-center text-[var(--color-cta)] text-lg font-black group-hover:bg-[var(--color-cta)] group-hover:text-white transition-all shadow-sm">
                      0{idx + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-[var(--color-heading)] uppercase tracking-tight leading-snug mb-3 group-hover:text-[var(--color-cta)] transition-colors">
                        {cat}
                      </h3>
                      <p className="text-xs text-[var(--color-heading)] opacity-50 font-medium leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. CINEMATIC STAGGERED SPOTLIGHT SHOWCASE (Alternating Rows) */}
      <section id="spotlight" className="max-w-[95rem] mx-auto px-6 lg:px-20 mb-28">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-cta)] block mb-3">Popular Choice</span>
          <h2 className="text-4xl sm:text-5xl font-black text-[var(--color-heading)] uppercase tracking-tighter leading-none mb-6">
            E-Commerce Shipping Tapes
          </h2>
          <p className="text-base text-[var(--color-heading)] opacity-60 font-bold leading-relaxed">
            Officially approved packaging tapes made for online sellers. These tapes meet all shipping rules and keep your boxes tightly closed during transport.
          </p>
        </motion.div>

        <div className="space-y-24">
          {spotlightTapes.map((prod, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div 
                key={prod.id} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-120px" }}
                variants={scaleReveal}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Product Image Panel */}
                <div className={`lg:col-span-6 relative ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="relative aspect-[16/11] rounded-[3.5rem] overflow-hidden bg-white border border-[var(--color-border)] shadow-xl p-8 group flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-bg)] to-white pointer-events-none" />
                    <img 
                      src={prod.image} 
                      alt={prod.name}
                      className="w-[85%] h-[85%] object-contain group-hover:scale-105 transition-transform duration-500 relative z-10"
                    />
                    <div className="absolute top-6 left-6 bg-green-500/10 text-green-700 border border-green-300/30 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      100% Approved Tape
                    </div>
                  </div>
                </div>

                {/* Product Details Panel */}
                <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-cta)] block mb-3">
                    0{idx + 1} // Approved Specifications
                  </span>
                  
                  <h3 className="text-3xl sm:text-5xl font-black text-[var(--color-heading)] uppercase tracking-tighter leading-none mb-6">
                    {prod.name}
                  </h3>
                  
                  <p className="text-lg font-bold text-[var(--color-heading)] opacity-80 mb-6 leading-relaxed">
                    {prod.tagline}
                  </p>

                  <p className="text-sm text-[var(--color-text)] leading-relaxed mb-8 font-medium">
                    {prod.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {prod.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2.5 bg-white border border-[var(--color-border)] p-4 rounded-2xl shadow-sm">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-cta)]" />
                        <span className="text-[10px] font-black text-[var(--color-heading)] uppercase tracking-wider opacity-70">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Elegant Horizontal Action Row */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[var(--color-border)]">
                    <PremiumCTA 
                      href={`/${defaultLocationSlug}/${prod.slug}`}
                      label="View Details"
                      variant="primary"
                      icon={<ArrowRight className="w-3.5 h-3.5" />}
                      className="flex-1"
                    />

                    <div className="flex-1">
                      <InquiryButton 
                        locationName={defaultLocationName} 
                        productName={prod.name} 
                        buttonText="Direct Quote"
                        className="w-full py-4.5 rounded-full bg-white hover:bg-[var(--color-bg)] border-2 border-[var(--color-border)] text-[var(--color-heading)] font-black text-center text-xs shadow-sm transition-all flex items-center justify-center gap-2 tracking-widest uppercase cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 5. STANDARD STABLE PRODUCTS ROW */}
      <section className="max-w-[95rem] mx-auto px-6 lg:px-20 mb-28">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-cta)] block mb-2">Full Range</span>
            <h2 className="text-3xl font-black text-[var(--color-heading)] uppercase tracking-tight">Bulk Warehouse Supplies</h2>
          </div>
          <p className="text-sm font-bold text-[var(--color-heading)] opacity-40 max-w-sm">
            Tested box sealing tape and packaging film built to keep your boxes completely safe.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {standardProducts.map((prod) => (
            <motion.div 
              key={prod.id} 
              variants={scaleReveal}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group bg-white border border-[var(--color-border)] rounded-[2.5rem] p-6 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-full aspect-[4/3] rounded-3xl bg-[var(--color-bg)] overflow-hidden mb-6 border border-[var(--color-border)] flex items-center justify-center">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="text-[8px] font-black uppercase tracking-[0.25em] text-[var(--color-cta)] block mb-2">
                  {prod.categorySlug.replace(/-/g, ' ')}
                </span>
                <h3 className="text-lg font-black text-[var(--color-heading)] uppercase tracking-tight leading-snug mb-3 group-hover:text-[var(--color-cta)] transition-colors">
                  {prod.name}
                </h3>
                <p className="text-xs text-[var(--color-heading)] opacity-50 font-bold leading-relaxed mb-6">
                  {prod.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--color-border)] flex flex-col gap-2">
                <PremiumCTA 
                  href={`/${defaultLocationSlug}/${prod.slug}`}
                  label="Configure"
                  variant="primary"
                  icon={<ArrowRight className="w-3 h-3" />}
                  className="w-full py-3 h-10 text-[9px]"
                />
                <InquiryButton 
                  locationName={defaultLocationName} 
                  productName={prod.name} 
                  buttonText="Inquiry Details"
                  className="w-full py-3 rounded-full bg-white hover:bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-heading)] font-black text-center text-[9px] transition-colors flex items-center justify-center gap-1.5 tracking-widest uppercase cursor-pointer"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 6. IMMERSIVE BRAND FOOTER CTA CARD */}
      <section className="max-w-[95rem] mx-auto px-6 lg:px-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-[var(--color-heading)] to-black rounded-[3.5rem] p-12 sm:p-20 text-white relative overflow-hidden border border-white/10 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white opacity-[0.02] -skew-x-12 translate-x-1/2 pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[var(--color-cta)] font-black text-[9px] uppercase tracking-[0.4em] mb-6 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5" /> Direct Manufacturer Guarantee
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter leading-none mb-6">
              Start Your Easy Bulk Orders Today
            </h2>
            <p className="text-sm text-white/60 font-bold leading-relaxed mb-8">
              We offer cheap wholesale prices, quick production times, and custom tape sizes to fit your exact business needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <PremiumCTA 
                href="/contact"
                label="Connect With Engineers"
                variant="primary"
                icon={<ArrowRight className="w-4 h-4" />}
              />
              <PremiumCTA 
                href="/market-area"
                label="View Delivery Network"
                variant="white-outline"
              />
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
