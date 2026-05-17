"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const cities = [
  { name: "Indore", slug: "indore" },
  { name: "Mumbai", slug: "mumbai" },
  { name: "Delhi NCR", slug: "delhi-ncr" },
  { name: "Ahmedabad", slug: "ahmedabad" },
  { name: "Pune", slug: "pune" },
  // Add more as needed...
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 }
  },
};

export default function MarketArea() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[#C05800] selection:text-[#FDFBD4] pb-32">
      <div className="pt-40 px-6 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-[var(--color-cta)] text-[#FDFBD4] px-8 py-3 rounded-full font-black text-2xl tracking-widest uppercase shadow-md mb-8">
            Market Area
          </div>
          <h1
            className="text-4xl md:text-5xl font-black text-[var(--color-heading)] tracking-tight uppercase"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Pan India Delivery
          </h1>
          <p className="mt-4 text-lg font-medium max-w-2xl mx-auto">
            We proudly supply our premium packaging solutions across all major cities and states in India. From our manufacturing plant in Indore to your doorstep.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6"
        >
          {cities.map((city) => (
            <Link key={city.slug} href={`/${city.slug}`}>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5, borderColor: "#C05800" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border-2 border-[var(--color-border)] rounded-2xl py-6 px-4 text-center shadow-sm hover:shadow-lg transition-all cursor-pointer"
              >
                <span className="font-bold text-[var(--color-heading)] text-sm md:text-base tracking-wide uppercase">
                  {city.name}
                </span>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Bottom Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-20 text-center bg-white p-12 rounded-[3rem] border border-[var(--color-border)] shadow-sm max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-black text-[var(--color-heading)] mb-4 uppercase">Don't see your city?</h3>
          <p className="font-bold text-[var(--color-text)] mb-8 opacity-60">We deliver to every corner of India. Contact us to confirm logistics for your location.</p>
          <Link href="/contact" className="inline-block bg-[var(--color-heading)] text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-black transition-colors">
            Contact Sales
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
