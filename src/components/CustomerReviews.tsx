"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Narendra Kawche",
    location: "Indore, Madhya Pradesh",
    date: "18-January-26",
    product: "Printed Logo Tapes",
    comment:
      "Very strong tape and the logo print quality is excellent. Fits our box sealing needs perfectly.",
  },
  {
    name: "Rohit Gurjar",
    location: "Indore, Madhya Pradesh",
    date: "04-February-26",
    product: "Transparent Tapes",
    comment:
      "Super clear tape, very strong stickiness, and does not turn yellow. Great for packing boxes quickly.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export default function CustomerReviews() {
  return (
    <section className="py-20 px-6 bg-[var(--color-bg)] border-t border-[var(--color-border)] relative overflow-hidden">
      <div className="absolute top-10 right-0 w-[40rem] h-[40rem] bg-orange-100/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Title + 4.9 Score Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="lg:col-span-4 space-y-6"
          >
            <div>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-cta)] block mb-1.5">
                Customer Trust
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[var(--color-heading)] uppercase tracking-tight leading-tight">
                What Customers <br /> Say About Us
              </h2>
            </div>

            <div className="bg-white border border-[var(--color-border)] rounded-3xl p-6.5">
              <div className="flex items-end gap-3 mb-4">
                <span className="text-4xl font-black text-[var(--color-heading)] leading-none">
                  4.9
                </span>
                <span className="text-sm font-bold text-[var(--color-text)] opacity-40 pb-1">
                  out of 5.0
                </span>
              </div>
              <div className="flex items-center gap-1 text-amber-500 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
                <span className="text-[10px] font-black text-[var(--color-heading)] uppercase ml-2">
                  13 Total Ratings
                </span>
              </div>

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

          {/* Right: Testimonials */}
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
                  &ldquo;{rev.comment}&rdquo;
                </p>
                <div className="text-[8px] font-black uppercase text-gray-300 tracking-widest">
                  Audited {rev.date}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
