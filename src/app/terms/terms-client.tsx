"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function TermsClient() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] pt-6 lg:pt-10 pb-24 selection:bg-[var(--color-cta)] selection:text-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-cta)] block mb-4">Packmax India</span>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-heading)] tracking-tighter uppercase leading-none">
            Terms of Service
          </h1>
        </motion.div>

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-[var(--color-border)] shadow-sm prose prose-sm md:prose-base max-w-none text-[var(--color-text)]">
          <p className="font-bold text-[var(--color-heading)] opacity-70 uppercase tracking-widest text-[10px] mb-8">
            Last Updated: May 2026
          </p>

          <h2 className="text-xl font-black text-[var(--color-heading)] uppercase tracking-tight mt-8 mb-4">1. Manufacturing Tolerances</h2>
          <p>
            Due to the nature of industrial packaging manufacturing, standard industry tolerances apply to all orders:
          </p>
          <ul className="list-none pl-0 space-y-3 my-6">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--color-cta)] shrink-0 mt-0.5" />
              <span><strong>Micron Variance:</strong> Film thickness is subject to a ±5% standard manufacturing tolerance.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--color-cta)] shrink-0 mt-0.5" />
              <span><strong>Length/Width Variance:</strong> Slitting and winding processes may result in ±2% variance in dimensions.</span>
            </li>
          </ul>

          <h2 className="text-xl font-black text-[var(--color-heading)] uppercase tracking-tight mt-10 mb-4">2. Custom Printed Logo Tapes</h2>
          <p>
            For custom branded orders, cylinder plate charges are borne by the client on the first order. The plates remain the property of the client but are stored at our facility for future repeat orders. Production begins only after written approval of the digital proof.
          </p>

          <h2 className="text-xl font-black text-[var(--color-heading)] uppercase tracking-tight mt-10 mb-4">3. B2B Audit & Compliance</h2>
          <p>
            Packmax India maintains strict quality control measures. We welcome third-party audits by our corporate B2B clients, provided a written request is made 14 days in advance. All our products comply with standard e-commerce shipping requirements.
          </p>
        </div>
      </div>
    </main>
  );
}
