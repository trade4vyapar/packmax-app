"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, User, Mail, Phone, MapPin, Package, Send, ChevronDown, CheckCircle2 } from "lucide-react";
import { siteData } from "@/data/siteData";
import { sendInquiry } from "@/utils/formSubmit";

interface Props {
  locationName: string;
  productName: string;
  buttonText?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function InquiryButton({ locationName, productName, buttonText, className, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(productName);
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: locationName, message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetAndClose = () => {
    setIsOpen(false);
    setDropdownOpen(false);
    setError(null);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", city: locationName, message: "" });
      setSelectedProduct(productName);
    }, 250);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await sendInquiry({
      _subject: `Bulk Inquiry — ${selectedProduct} — ${form.city}`,
      _replyto: form.email,
      "Inquiry Type": "Product Page — Bulk Order",
      "Product": `${selectedProduct} Bulk Order`,
      "Full Name": form.name,
      "Email": form.email,
      "Phone": form.phone,
      "City": form.city,
      "Message": form.message,
      "Submitted From": typeof window !== "undefined" ? window.location.href : "",
    });

    setSubmitting(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.message);
    }
  };
  const scrollYRef = useRef(0);
  const dropdownListRef = useRef<HTMLDivElement>(null);
  const currentItemRef = useRef<HTMLDivElement>(null);

  // Auto-scroll dropdown to current product when it opens
  useEffect(() => {
    if (dropdownOpen && currentItemRef.current && dropdownListRef.current) {
      const list = dropdownListRef.current;
      const item = currentItemRef.current;
      const itemOffset = item.offsetTop;
      const itemHeight = item.offsetHeight;
      const listHeight = list.clientHeight;
      list.scrollTop = itemOffset - listHeight / 2 + itemHeight / 2;
    }
  }, [dropdownOpen]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      scrollYRef.current = window.scrollY;
      // Lock the body in place at current scroll position
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body and scroll position
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollYRef.current);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — full fixed layer, blocks all pointer events */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 z-[99998] bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal wrapper — centered on top of backdrop */}
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-[var(--color-bg)] rounded-[2rem] shadow-2xl flex flex-col pointer-events-auto border border-[var(--color-border)]"
              style={{ maxHeight: 'calc(100dvh - 2rem)' }}
            >
              {/* Header */}
              <div className="bg-[var(--color-heading)] text-white p-6 rounded-t-[2rem] relative shrink-0">
                <button
                  onClick={resetAndClose}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="inline-flex items-center gap-2 text-[var(--color-cta)] font-black text-[9px] uppercase tracking-[0.4em] mb-3 bg-[var(--color-cta)]/10 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cta)] animate-pulse" />
                  Direct Manufacturer Inquiry
                </div>
                <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">Get in Touch</h2>
                <p className="text-white/60 text-xs font-bold mt-2">Requesting bulk pricing in {locationName}</p>
              </div>

              {/* Scrollable form body */}
              <div className="overflow-y-auto overscroll-contain p-5 sm:p-6 relative" style={{ WebkitOverflowScrolling: 'touch' }}>
                {submitting && (
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-20 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <span className="w-10 h-10 border-4 border-[var(--color-cta)] border-t-transparent rounded-full animate-spin" />
                      <span className="text-[10px] font-black text-[var(--color-heading)] uppercase tracking-widest">Sending inquiry...</span>
                    </div>
                  </div>
                )}

                {submitted ? (
                  <div className="py-10 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-5 border border-green-200">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-[var(--color-heading)] uppercase tracking-tight leading-none mb-3">
                      Inquiry Sent
                    </h3>
                    <p className="text-xs font-bold text-[var(--color-heading)]/60 max-w-sm leading-relaxed mb-6">
                      Thanks! Your bulk request for <span className="text-[var(--color-cta)]">{selectedProduct}</span> has been delivered to our sales desk. We will reply within an hour.
                    </p>
                    <motion.button
                      type="button"
                      onClick={resetAndClose}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-6 py-3 rounded-full bg-[var(--color-cta)] text-white text-[11px] font-black uppercase tracking-widest shadow-lg hover:bg-[var(--color-cta-hover)] transition-colors"
                    >
                      Close
                    </motion.button>
                  </div>
                ) : (
                <form
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  onSubmit={handleSubmit}
                >
                  {/* Name */}
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-heading)] opacity-40" />
                    <input type="text" placeholder="Enter your name" required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white border border-[var(--color-border)] rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-[var(--color-heading)] placeholder:text-[var(--color-heading)]/40 focus:outline-none focus:border-[var(--color-cta)] focus:ring-1 focus:ring-[var(--color-cta)] transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-heading)] opacity-40" />
                    <input type="email" placeholder="Enter your email" required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white border border-[var(--color-border)] rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-[var(--color-heading)] placeholder:text-[var(--color-heading)]/40 focus:outline-none focus:border-[var(--color-cta)] focus:ring-1 focus:ring-[var(--color-cta)] transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-heading)] opacity-40" />
                    <input type="tel" placeholder="Enter your phone" required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white border border-[var(--color-border)] rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-[var(--color-heading)] placeholder:text-[var(--color-heading)]/40 focus:outline-none focus:border-[var(--color-cta)] focus:ring-1 focus:ring-[var(--color-cta)] transition-all"
                    />
                  </div>

                  {/* City */}
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-heading)] opacity-40" />
                    <input type="text" placeholder="Enter your city" required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full bg-white border border-[var(--color-border)] rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-[var(--color-heading)] placeholder:text-[var(--color-heading)]/40 focus:outline-none focus:border-[var(--color-cta)] focus:ring-1 focus:ring-[var(--color-cta)] transition-all"
                    />
                  </div>

                  {/* Product dropdown — inline, fixed height, fully scrollable */}
                  <div className="md:col-span-2">
                    <button
                      type="button"
                      className="w-full bg-white border border-[var(--color-border)] rounded-xl py-3 px-4 pl-12 text-sm font-bold text-[var(--color-heading)] flex items-center justify-between hover:border-[var(--color-cta)] transition-all relative"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-heading)]" />
                      <span className="truncate">{selectedProduct ? `${selectedProduct} Bulk Order` : 'Select a Product'}</span>
                      <ChevronDown className={`w-4 h-4 shrink-0 ml-2 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Fixed height, independently scrollable list */}
                    {dropdownOpen && (
                      <div
                        ref={dropdownListRef}
                        className="mt-1 border border-[var(--color-border)] rounded-xl bg-white shadow-lg overflow-y-scroll overscroll-contain"
                        style={{ height: '240px', WebkitOverflowScrolling: 'touch' }}
                        onWheel={e => e.stopPropagation()}
                        onTouchMove={e => e.stopPropagation()}
                      >
                        {siteData.products.map(p => {
                          const isCurrent = p.name === selectedProduct;
                          return (
                            <div
                              key={p.id}
                              ref={isCurrent ? currentItemRef : null}
                              className={`px-4 py-3 text-sm font-bold cursor-pointer transition-colors border-b border-gray-50 last:border-0 flex items-center justify-between ${
                                isCurrent
                                  ? 'bg-[var(--color-cta)] text-white'
                                  : 'text-[var(--color-heading)] hover:bg-orange-50 hover:text-[var(--color-cta)]'
                              }`}
                              onClick={() => { setSelectedProduct(p.name); setDropdownOpen(false); }}
                            >
                              <span>{p.name} Bulk Order</span>
                              {isCurrent && <span className="text-[10px] font-black tracking-widest uppercase opacity-80 shrink-0 ml-2">Current</span>}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  <div className="md:col-span-2">
                    <textarea
                      placeholder="Write your specific requirements (e.g. quantity, printing details, size)..."
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-white border border-[var(--color-border)] rounded-xl p-4 text-sm font-bold text-[var(--color-heading)] placeholder:text-[var(--color-heading)]/40 focus:outline-none focus:border-[var(--color-cta)] focus:ring-1 focus:ring-[var(--color-cta)] transition-all resize-none"
                    />
                  </div>

                  {error && (
                    <div className="md:col-span-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[11px] font-bold text-red-700">
                      {error}
                    </div>
                  )}

                  {/* Submit */}
                  <div className="md:col-span-2 flex justify-end mt-2 pb-2">
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: 1.04, boxShadow: "0 20px 35px -10px rgba(192, 88, 0, 0.35)", y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      className="group px-8 py-4 rounded-full bg-[var(--color-cta)] text-white font-black text-xs shadow-xl hover:bg-[var(--color-cta-hover)] transition-all flex items-center justify-center gap-3 tracking-widest uppercase cursor-pointer disabled:opacity-60 disabled:cursor-wait"
                    >
                      Submit Inquiry <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </motion.button>
                  </div>
                </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02, boxShadow: "0 20px 35px -10px rgba(192, 88, 0, 0.35)", y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
        className={className || "w-full group px-6 py-4 rounded-full bg-[var(--color-cta)] text-white font-black text-center text-xs shadow-xl hover:bg-[var(--color-cta-hover)] transition-all flex items-center justify-center gap-3 tracking-widest uppercase"}
      >
        {children || (
          <>{buttonText || `Inquiry for ${locationName}`} <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" /></>
        )}
      </motion.button>

      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}
