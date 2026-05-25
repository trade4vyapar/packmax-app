"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const cities = [
  { name: "Indore", slug: "indore" },
  { name: "Bhopal", slug: "bhopal" },
  { name: "Jabalpur", slug: "jabalpur" },
  { name: "Satna", slug: "satna" },
  { name: "Gwalior", slug: "gwalior" },
  { name: "Sagar", slug: "sagar" },
  { name: "Ratlam", slug: "ratlam" },
  { name: "Ujjain", slug: "ujjain" },
  { name: "Dewas", slug: "dewas" },
  { name: "Jaipur", slug: "jaipur" },
  { name: "Udaipur", slug: "udaipur" },
  { name: "Jodhpur", slug: "jodhpur" },
  { name: "Jalgaon", slug: "jalgaon" },
  { name: "Agra", slug: "agra" },
  { name: "Kanpur", slug: "kanpur" },
  { name: "Raipur", slug: "raipur" },
  { name: "Bhilai", slug: "bhilai" },
  { name: "Raigarh", slug: "raigarh" },
  { name: "Rajkot", slug: "rajkot" },
  { name: "Mumbai", slug: "mumbai" },
  { name: "Hyderabad", slug: "hyderabad" },
  { name: "Kerala", slug: "kerala" },
  { name: "Guwahati", slug: "guwahati" },
  { name: "Bengaluru", slug: "bengaluru" },
  { name: "Pune", slug: "pune" }
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

export default function MarketAreaClient() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[#E86A12] selection:text-[#F7F5F4] pb-32">
      <div className="pt-40 px-6 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-[var(--color-cta)] text-[#F7F5F4] px-6 py-2 rounded-full font-black text-sm sm:text-lg tracking-widest uppercase shadow-md mb-8">
            Market Area
          </div>
          <h1
            className="text-3xl sm:text-5xl font-black text-[var(--color-heading)] tracking-tight uppercase"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Pan India Delivery
          </h1>
          <p className="mt-4 text-base sm:text-lg font-medium max-w-2xl mx-auto opacity-70">
            We proudly supply our premium packaging solutions across all major cities and states in India. From our manufacturing plant in Indore to your doorstep.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {cities.map((city) => (
            <Link key={city.slug} href={`/${city.slug}`}>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -4, borderColor: "#E86A12" }}
                whileTap={{ scale: 0.97 }}
                className="bg-white border border-[var(--color-border)] rounded-2xl py-5 px-3 text-center shadow-sm hover:shadow-lg transition-all cursor-pointer"
              >
                <span className="font-bold text-[var(--color-heading)] text-xs sm:text-sm tracking-wide uppercase">
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
          className="mt-20 text-center bg-white p-6 sm:p-12 rounded-[2.5rem] border border-[var(--color-border)] shadow-sm max-w-3xl mx-auto"
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
