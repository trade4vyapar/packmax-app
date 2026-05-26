"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, User, Mail, Phone, MapPin, Package, Send, ChevronDown } from "lucide-react";
import { siteData } from "@/data/siteData";

interface Props {
  locationName: string;
  productName: string;
  buttonText?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function InquiryButton({ locationName, productName, buttonText, className, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 20px 35px -10px rgba(192, 88, 0, 0.35)",
          y: -2
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
        className={className || "w-full group px-6 py-4 rounded-full bg-[var(--color-cta)] text-white font-black text-center text-xs shadow-xl hover:bg-[var(--color-cta-hover)] transition-all flex items-center justify-center gap-3 tracking-widest uppercase"}
      >
        {children || (
          <>{buttonText || `Inquiry for ${locationName}`} <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" /></>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99] cursor-pointer"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl bg-[var(--color-bg)] rounded-[2.5rem] shadow-2xl z-[100] overflow-hidden border border-[var(--color-border)] flex flex-col max-h-[90vh]"
            >
              <div className="bg-[var(--color-heading)] text-white p-6 relative shrink-0">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="inline-flex items-center gap-2 text-[var(--color-cta)] font-black text-[9px] uppercase tracking-[0.4em] mb-3 bg-[var(--color-cta)]/10 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cta)] animate-pulse" />
                  Direct Manufacturer Inquiry
                </div>
                <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">
                  Get in Touch
                </h2>
                <p className="text-white/60 text-xs font-bold mt-2">
                  Requesting bulk pricing in {locationName}
                </p>
              </div>

              <div className="p-6 overflow-y-auto">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); alert('Inquiry Sent Successfully!'); setIsOpen(false); }}>

                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-heading)] opacity-40" />
                    <input
                      type="text"
                      placeholder="Enter your name"
                      required
                      className="w-full bg-white border border-[var(--color-border)] rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-[var(--color-heading)] placeholder:text-[var(--color-heading)]/40 focus:outline-none focus:border-[var(--color-cta)] focus:ring-1 focus:ring-[var(--color-cta)] transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-heading)] opacity-40" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="w-full bg-white border border-[var(--color-border)] rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-[var(--color-heading)] placeholder:text-[var(--color-heading)]/40 focus:outline-none focus:border-[var(--color-cta)] focus:ring-1 focus:ring-[var(--color-cta)] transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-heading)] opacity-40" />
                    <input
                      type="tel"
                      placeholder="Enter your phone"
                      required
                      className="w-full bg-white border border-[var(--color-border)] rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-[var(--color-heading)] placeholder:text-[var(--color-heading)]/40 focus:outline-none focus:border-[var(--color-cta)] focus:ring-1 focus:ring-[var(--color-cta)] transition-all"
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-heading)] opacity-40" />
                    <input
                      type="text"
                      placeholder="Enter your city"
                      defaultValue={locationName}
                      className="w-full bg-white border border-[var(--color-border)] rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-[var(--color-heading)] placeholder:text-[var(--color-heading)]/40 focus:outline-none focus:border-[var(--color-cta)] focus:ring-1 focus:ring-[var(--color-cta)] transition-all"
                    />
                  </div>

                  <div className="relative md:col-span-2">
                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-heading)] z-10" />
                    <select
                      defaultValue={productName}
                      className="w-full bg-white border border-[var(--color-border)] rounded-xl py-3 pl-12 pr-10 text-sm font-bold text-[var(--color-heading)] appearance-none focus:outline-none focus:border-[var(--color-cta)] focus:ring-1 focus:ring-[var(--color-cta)] transition-all cursor-pointer relative z-0"
                    >
                      <option disabled value="">Select a Product</option>
                      {siteData.products.map(p => (
                        <option key={p.id} value={p.name}>{p.name} Bulk Order</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-heading)] pointer-events-none z-10" />
                  </div>

                  <div className="md:col-span-2">
                    <textarea
                      placeholder="Write your specific requirements (e.g. quantity, printing details, size)..."
                      rows={3}
                      className="w-full bg-white border border-[var(--color-border)] rounded-xl p-4 text-sm font-bold text-[var(--color-heading)] placeholder:text-[var(--color-heading)]/40 focus:outline-none focus:border-[var(--color-cta)] focus:ring-1 focus:ring-[var(--color-cta)] transition-all resize-none"
                    ></textarea>
                  </div>

                  <div className="md:col-span-2 flex justify-end mt-2">
                    <motion.button
                      type="submit"
                      whileHover={{ 
                        scale: 1.04,
                        boxShadow: "0 20px 35px -10px rgba(192, 88, 0, 0.35)",
                        y: -2
                      }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      className="group px-8 py-4 rounded-full bg-[var(--color-cta)] text-white font-black text-xs shadow-xl hover:bg-[var(--color-cta-hover)] transition-all flex items-center justify-center gap-3 tracking-widest uppercase cursor-pointer"
                    >
                      Submit Inquiry <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </motion.button>
                  </div>

                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
