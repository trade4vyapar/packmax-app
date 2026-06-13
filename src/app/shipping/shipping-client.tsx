"use client";

import { motion } from "framer-motion";
import { Truck, MapPin, ShieldCheck } from "lucide-react";

export default function ShippingClient() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] pt-20 lg:pt-32 pb-24 selection:bg-[var(--color-cta)] selection:text-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-cta)] block mb-4">Manufacturer • Supplier • Wholesaler Logistics</span>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-heading)] tracking-tighter uppercase leading-none">
            Shipping Policy
          </h1>
          <p className="text-sm sm:text-base font-bold text-[var(--color-heading)] opacity-60 mt-4 leading-relaxed">
            Logistics terms for our manufacturer-to-wholesaler consignments — covering freight, supplier inspection and pan-India dispatch for dealers and bulk B2B clients.
          </p>
        </motion.div>

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-[var(--color-border)] shadow-sm">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
              <Truck className="w-8 h-8 text-[var(--color-cta)] mb-4" />
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-900 mb-2">Local Wholesaler Delivery</h3>
              <p className="text-xs text-gray-500 font-medium">Free supplier delivery in Indore & Bhopal for bulk manufacturer-direct orders.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
              <MapPin className="w-8 h-8 text-[var(--color-cta)] mb-4" />
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-900 mb-2">Pan-India Wholesaler Network</h3>
              <p className="text-xs text-gray-500 font-medium">Manufacturer-direct dispatch via VRL, TCI or our wholesaler partners within 48h to any city in India.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
              <ShieldCheck className="w-8 h-8 text-[var(--color-cta)] mb-4" />
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-900 mb-2">POD Proof</h3>
              <p className="text-xs text-gray-500 font-medium">100% insured transit. Proof of Delivery mandatory upon receipt.</p>
            </div>
          </div>

          <div className="prose prose-sm md:prose-base max-w-none text-[var(--color-text)]">
            <h2 className="text-xl font-black text-[var(--color-heading)] uppercase tracking-tight mb-4">Manufacturer & Wholesaler Delivery Terms</h2>
            <p>
              As a B2B manufacturer, wholesale supplier and authorised wholesaler, Packmax handles high-volume consignments daily. Freight is calculated ex-factory (Indore, MP) unless your dealer or wholesaler purchase order negotiates otherwise.
            </p>
            <p>
              <strong>Supplier Inspection at Delivery:</strong> Dealers, wholesalers and end-clients must inspect all cartons before signing the Lorry Receipt (LR) or POD. Transit damage must be noted on the carrier's receipt to claim insurance. Packmax (as the manufacturer-supplier) is not liable for damages reported after a clean POD is signed.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
