"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  Users2, 
  ShieldCheck, 
  Award, 
  Globe, 
  Truck,
  BadgeCheck,
  Coins, 
  Briefcase, 
  Layers 
} from "lucide-react";
import Link from "next/link";
import PremiumCTA from "@/components/PremiumCTA";

const MotionLink = motion.create(Link);

export default function AboutClient() {
  const stats = [
    { value: "500+", label: "Happy Clients", desc: "Local companies and sellers who buy from us regularly." },
    { value: "1M+", label: "Rolls Shipped", desc: "Total packaging rolls we manufacture every month." },
    { value: "24h", label: "Quick Dispatch", desc: "We prepare and ship standard orders in one day." },
    { value: "99%", label: "Perfect Quality", desc: "Orders that pass our quality check without any issues." }
  ];

  const factsheet = [
    { label: "Type of Business", value: "Manufacturer (Factory Owner)", category: "Basic Info" },
    { label: "Company Head (CEO)", value: "A Soni", category: "Basic Info" },
    { label: "GST Status", value: "Registered (Since Nov'21)", category: "Basic Info" },
    { label: "Firm Type", value: "Proprietorship", category: "Basic Info" },
    { label: "Annual Turnover", value: "0 - 40 Lakhs", category: "Basic Info" },
    { label: "Our Banker", value: "State Bank of India (SBI)", category: "Statutory" },
    { label: "GST Number", value: "23**********1ZM (Verified)", category: "Statutory" },
    { label: "UDYAM Registration No.", value: "UDYAM-MP-23-****928", category: "Statutory" },
    { label: "Number of Workers", value: "Upto 10 Staff Members", category: "Basic Info" },
    { label: "Registered Office", value: "Survey no. 126/2/4, S. R. Compound, AB Road, Indore, Madhya Pradesh, 452010", category: "Location" }
  ];

  const categories = [
    { name: "BOPP Tape", count: 16 },
    { name: "Packaging Tape", count: 12 },
    { name: "Cello Tape", count: 3 },
    { name: "Stretch Film Roll", count: 2 },
    { name: "Air Bubble Roll", count: 1 },
    { name: "Printed BOPP Tape", count: 1 },
    { name: "Stretch Film", count: 1 }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const stagger = {
    visible: { 
      transition: { staggerChildren: 0.08 }
    }
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] overflow-hidden relative selection:bg-[#E86A12] selection:text-[#F7F5F4] pt-28 pb-20">
      
      {/* Decorative Warm Background Spots */}
      <div className="absolute top-10 right-0 w-[40rem] h-[40rem] bg-orange-100/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-orange-50 opacity-40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ================= HERO STORY SECTION ================= */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="lg:col-span-7 space-y-6"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-cta)] block">Established 2021 • Manufacturer • Supplier • Wholesaler</span>
              <h1 className="text-4xl sm:text-6xl font-black text-[var(--color-heading)] uppercase tracking-tight leading-none">
                Packaging Manufacturer, <br /> Supplier & Wholesaler
              </h1>
              <p className="text-sm sm:text-base font-bold text-[var(--color-text)] opacity-70 leading-relaxed pr-6">
                Packmax India is a direct-factory manufacturer, wholesale supplier and authorised wholesaler of BOPP tapes, custom-printed logo tapes and courier bags. We started because businesses in Bhopal and Indore needed a reliable manufacturer-cum-supplier they could trust day after day.
              </p>
              <p className="text-sm font-bold text-[var(--color-text)] opacity-60 leading-relaxed pr-6">
                Today we are the supplier and wholesaler of choice for e-commerce sellers, factories and warehouses across Madhya Pradesh — helping dealers, wholesalers and retail clients pack their goods safely, brand them professionally, and source bulk packaging at manufacturer-direct rates.
              </p>
            </motion.div>

            {/* Glass Stat Block with Staggered Spring pop-ups */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="lg:col-span-5 grid grid-cols-2 gap-4"
            >
              {stats.map((st, idx) => (
                <motion.div 
                  key={idx} 
                  variants={scaleUp}
                  className="bg-white/40 backdrop-blur-md border border-white/60 p-6 rounded-3xl shadow-[0_8px_32px_0_rgba(192,88,0,0.03)] hover:bg-white/60 transition-colors flex flex-col justify-between min-h-[160px]"
                >
                  <div className="text-3xl sm:text-4xl font-black text-[var(--color-cta)] tracking-tight">
                    {st.value}
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black uppercase text-[var(--color-heading)] tracking-wider mb-1">
                      {st.label}
                    </h4>
                    <p className="text-[9px] font-bold text-[var(--color-text)] opacity-55 leading-tight">
                      {st.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* ================= CORE ADVANTAGES SECTION ================= */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-24 py-16 bg-white border border-[var(--color-border)] rounded-[3rem] px-8 sm:px-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-50/50 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-cta)] block mb-2">Manufacturer • Supplier • Wholesaler Standards</span>
            <h2 className="text-2xl sm:text-4xl font-black text-[var(--color-heading)] uppercase tracking-tight">
              Why Choose the Packmax Manufacturer & Supplier Network?
            </h2>
          </div>

          <motion.div 
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-[var(--color-cta)]">
                <Coins className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-lg font-black text-[var(--color-heading)] uppercase tracking-tight">Wholesale Supplier Pricing</h3>
              <p className="text-xs font-bold text-[var(--color-heading)] opacity-50 leading-relaxed">
                As the direct manufacturer and bulk supplier, we offer wholesaler-grade wholesale rates on bulk orders. The bigger the order, the deeper the supplier discount.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-[var(--color-cta)]">
                <ShieldCheck className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-lg font-black text-[var(--color-heading)] uppercase tracking-tight">Manufacturer-Grade Quality</h3>
              <p className="text-xs font-bold text-[var(--color-heading)] opacity-50 leading-relaxed">
                Manufactured in-house using high-grade BOPP film and acrylic adhesive — every roll our supplier and wholesaler team ships is QC-passed for industrial stickiness.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-[var(--color-cta)]">
                <Truck className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-lg font-black text-[var(--color-heading)] uppercase tracking-tight">Wholesaler Delivery</h3>
              <p className="text-xs font-bold text-[var(--color-heading)] opacity-50 leading-relaxed">
                Our Indore manufacturing facility and Bhopal wholesaler hub run a tight supplier chain — orders are prepared, loaded and delivered to dealers, retailers and end-clients within 48 hours.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ================= FACTSHEET PROFILE ================= */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="lg:col-span-5 space-y-6 lg:sticky lg:top-28"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-cta)] block">Manufacturer Profile</span>
              <h2 className="text-3xl sm:text-5xl font-black text-[var(--color-heading)] uppercase tracking-tight leading-none">
                Manufacturer & Supplier <br /> Factsheet
              </h2>
              <p className="text-xs sm:text-sm font-bold text-[var(--color-text)] opacity-60 leading-relaxed pr-4">
                Verified manufacturer-cum-supplier profile — GST, UDYAM, banker and registered office details so dealers, wholesalers and corporate buyers can vet us with confidence.
              </p>
              <div className="pt-4">
                <PremiumCTA 
                  href="/contact"
                  label="Contact Our Sales Office"
                  variant="primary"
                />
              </div>
            </motion.div>

            {/* Factsheet Rows with staggered entrance from right */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 bg-white border border-[var(--color-border)] rounded-[2.5rem] p-6 sm:p-8 shadow-sm"
            >
              <div className="divide-y divide-gray-100">
                {factsheet.map((fact, idx) => (
                  <div key={idx} className="py-4.5 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[var(--color-heading)] opacity-50">
                      {fact.label}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-[var(--color-heading)]">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>

        {/* ================= PRODUCTS & CAPACITY ================= */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-24"
        >
          <div className="bg-white border border-[var(--color-border)] rounded-[3rem] p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-72 h-72 bg-orange-50/50 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="max-w-2xl mb-12">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-cta)] block mb-2">Supplier & Wholesaler Catalog</span>
              <h2 className="text-2xl sm:text-4xl font-black text-[var(--color-heading)] uppercase tracking-tight">
                Manufacturer Catalog & Supplier Range
              </h2>
              <p className="text-xs sm:text-sm font-bold text-[var(--color-text)] opacity-60 leading-relaxed mt-3">
                Every category below is manufactured at our Indore plant and distributed through our supplier network to dealers and B2B clients pan-India.
              </p>
            </div>

            <motion.div 
              variants={stagger}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {categories.map((cat, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeInUp}
                  className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl p-5 hover:border-orange-200 transition-colors cursor-default"
                >
                  <h4 className="text-xs font-black text-[var(--color-heading)] uppercase tracking-tight mb-2">
                    {cat.name}
                  </h4>
                  <div className="text-[10px] font-bold text-[var(--color-cta)] uppercase tracking-wider">
                    {cat.count} {cat.count === 1 ? "Product" : "Products"} Available
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

      </div>
    </main>
  );
}
