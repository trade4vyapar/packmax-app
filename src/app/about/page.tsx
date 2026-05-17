"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  Users2, 
  ShieldCheck, 
  Award, 
  Globe, 
  Truck, 
  Star, 
  BadgeCheck, 
  Coins, 
  Briefcase, 
  Layers 
} from "lucide-react";
import Link from "next/link";
import PremiumCTA from "@/components/PremiumCTA";

const MotionLink = motion.create(Link);

export default function AboutPage() {
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
    { label: "Registered Office", value: "Indore - 452010, Madhya Pradesh, India", category: "Location" }
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

  const reviews = [
    {
      name: "Narendra Kawche",
      location: "Indore, Madhya Pradesh",
      date: "18-January-26",
      product: "Printed Logo Tapes",
      comment: "Very strong tape and the logo print quality is excellent. Fits our box sealing needs perfectly."
    },
    {
      name: "Rohit Gurjar",
      location: "Indore, Madhya Pradesh",
      date: "04-February-26",
      product: "Transparent Tapes",
      comment: "Super clear tape, very strong stickiness, and does not turn yellow. Great for packing boxes quickly."
    }
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
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] overflow-hidden relative selection:bg-[#C05800] selection:text-[#FDFBD4] pt-28 pb-20">
      
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
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-cta)] block">Established in year 2021</span>
              <h1 className="text-4xl sm:text-6xl font-black text-[var(--color-heading)] uppercase tracking-tight leading-none">
                Simple, Reliable <br /> Packaging Tapes
              </h1>
              <p className="text-sm sm:text-base font-bold text-[var(--color-text)] opacity-70 leading-relaxed pr-6">
                Packmax India was started because we wanted to give local businesses more than just simple tape and boxes. We saw that companies in Bhopal and Indore needed high-quality packing tapes and custom logo printed tapes that they could rely on everyday.
              </p>
              <p className="text-sm font-bold text-[var(--color-text)] opacity-60 leading-relaxed pr-6">
                Today, we are a key partner for top e-commerce sellers, factories, and warehouses across Madhya Pradesh. We help them pack their items safely, save packaging space, and print their logos to make their brand look highly professional.
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
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-cta)] block mb-2">Our Standards</span>
            <h2 className="text-2xl sm:text-4xl font-black text-[var(--color-heading)] uppercase tracking-tight">
              Why Choose Packmax India?
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
              <h3 className="text-lg font-black text-[var(--color-heading)] uppercase tracking-tight">Wholesale Bulk Prices</h3>
              <p className="text-xs font-bold text-[var(--color-heading)] opacity-50 leading-relaxed">
                We offer special wholesale prices on bulk orders. The more you buy, the cheaper it gets, helping you save money on packaging.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-[var(--color-cta)]">
                <ShieldCheck className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-lg font-black text-[var(--color-heading)] uppercase tracking-tight">Strong Stickiness</h3>
              <p className="text-xs font-bold text-[var(--color-heading)] opacity-50 leading-relaxed">
                We use high-grade plastics and glue. Our tapes stick firmly to cardboard box surfaces so your packages stay fully sealed.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-[var(--color-cta)]">
                <Truck className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-lg font-black text-[var(--color-heading)] uppercase tracking-tight">Quick Delivery</h3>
              <p className="text-xs font-bold text-[var(--color-heading)] opacity-50 leading-relaxed">
                Our main factory setup in Indore and distribution hubs in Bhopal allow us to prepare, load, and deliver your orders quickly within 48 hours.
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
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-cta)] block">Company Facts</span>
              <h2 className="text-3xl sm:text-5xl font-black text-[var(--color-heading)] uppercase tracking-tight leading-none">
                Our Business <br /> Information
              </h2>
              <p className="text-xs sm:text-sm font-bold text-[var(--color-text)] opacity-60 leading-relaxed pr-4">
                Here is all the basic information about our business registration, GST details, banker, and location so you can check us easily.
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
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-cta)] block mb-2">In Stock Range</span>
              <h2 className="text-2xl sm:text-4xl font-black text-[var(--color-heading)] uppercase tracking-tight">
                Our Product Categories
              </h2>
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

        {/* ================= RATINGS & REVIEWS ================= */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Proportional Title + 4.9 Score Card */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="lg:col-span-4 space-y-6"
            >
              <div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-cta)] block mb-1.5">Customer Trust</span>
                <h2 className="text-xl sm:text-2xl font-black text-[var(--color-heading)] uppercase tracking-tight leading-tight">
                  What Customers <br /> Say About Us
                </h2>
              </div>
              
              <div className="bg-white border border-[var(--color-border)] rounded-3xl p-6.5">
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-4xl font-black text-[var(--color-heading)] leading-none">4.9</span>
                  <span className="text-sm font-bold text-[var(--color-text)] opacity-40 pb-1">out of 5.0</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                  <span className="text-[10px] font-black text-[var(--color-heading)] uppercase ml-2">13 Total Ratings</span>
                </div>

                {/* Score breakdown bar */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-[var(--color-heading)] mb-1">
                      <span>Quick Response</span>
                      <span>100%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-[var(--color-heading)] mb-1">
                      <span>Strong Quality</span>
                      <span>100%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-[var(--color-heading)] mb-1">
                      <span>On-Time Delivery</span>
                      <span>100%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-full" />
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Testimonials staggered from bottom */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="lg:col-span-8 space-y-6"
            >
              {reviews.map((rev, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeInUp}
                  className="bg-white border border-[var(--color-border)] rounded-[2rem] p-6 sm:p-8 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <h4 className="text-base font-black text-[var(--color-heading)] uppercase tracking-tight">
                        {rev.name}
                      </h4>
                      <span className="text-[10px] font-bold text-[var(--color-text)] opacity-40">
                        {rev.location}
                      </span>
                    </div>
                    <div className="flex flex-col sm:items-end">
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[9px] font-black text-[var(--color-cta)] uppercase tracking-wider mt-1">
                        Verified Order • {rev.product}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-[var(--color-heading)] opacity-60 leading-relaxed mb-4">
                    "{rev.comment}"
                  </p>
                  <div className="text-[8px] font-black uppercase text-gray-300 tracking-widest">
                    Audited {rev.date}
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>

      </div>
    </main>
  );
}
