"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  Send,
  MapPin,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
  MessageSquare,
  Globe,
  ChevronDown,
  Check,
  X,
  UploadCloud,
  Image as ImageIcon,
} from "lucide-react";
import { siteData } from "@/data/siteData";
import PremiumCTA from "@/components/PremiumCTA";
import { sendInquiry } from "@/utils/formSubmit";

const MotionLink = motion.create(Link);

// Catalog: a "General" catch-all option, followed by every product name from
// our data. Sorted alphabetically so it's easy for the buyer to scan.
const GENERAL_OPTION = "General B2B Inquiry";
const PRODUCT_OPTIONS: string[] = [
  GENERAL_OPTION,
  ...Array.from(new Set(siteData.products.map((p) => p.name))).sort((a, b) =>
    a.localeCompare(b),
  ),
];

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subjects: [GENERAL_OPTION] as string[],
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const MAX_LOGO_BYTES = 5 * 1024 * 1024; // FormSubmit attachment ceiling

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) {
      setLogoFile(null);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setFileError("Please upload an image file (PNG, JPG, SVG or WEBP).");
      removeLogo();
      return;
    }
    if (file.size > MAX_LOGO_BYTES) {
      setFileError("Logo is too large — please keep it under 5 MB.");
      removeLogo();
      return;
    }
    setLogoFile(file);
  };

  const removeLogo = () => {
    setLogoFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Close the dropdown when clicking outside of it.
  useEffect(() => {
    if (!dropdownOpen) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [dropdownOpen]);

  const toggleSubject = (value: string) => {
    setFormData((prev) => {
      const isSelected = prev.subjects.includes(value);
      const next = isSelected
        ? prev.subjects.filter((s) => s !== value)
        : [...prev.subjects, value];
      // Always keep at least one selection so the submission has a target.
      return { ...prev, subjects: next.length ? next : [GENERAL_OPTION] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const targetCategory = formData.subjects.join(", ");

    const result = await sendInquiry(
      {
        _subject: `New B2B Inquiry — ${targetCategory} — ${formData.company}`,
        _replyto: formData.email,
        "Inquiry Type": "Contact Page — Corporate Request",
        "Full Name": formData.name,
        "Corporate Email": formData.email,
        "Phone": formData.phone,
        "Company": formData.company,
        "Target Category": targetCategory,
        "Message": formData.message,
        "Logo Attached": logoFile ? logoFile.name : "No",
        "Submitted From": typeof window !== "undefined" ? window.location.href : "",
      },
      logoFile
    );

    setIsSubmitting(false);
    if (result.success) {
      setIsSubmitted(true);
      removeLogo();
    } else {
      setSubmitError(result.message);
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello Packmax! I am interested in bulk packaging inquiries. Please connect me with a sales engineer.");
    window.open(`https://wa.me/919893115645?text=${message}`, "_blank");
  };

  // Animations definitions
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

  return (
    <main className="min-h-screen bg-[var(--color-bg)] pt-32 pb-24 font-sans selection:bg-[var(--color-cta)] selection:text-white overflow-x-hidden relative">

      {/* 1. CINEMATIC BACKGROUND BLURS */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[var(--color-cta)] opacity-5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-10 top-40 w-80 h-80 bg-orange-200 opacity-10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[95rem] mx-auto px-6 lg:px-20 relative z-10">

        {/* Header Title with premium Framer Motion fade-in */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-16 max-w-3xl pb-8 border-b border-[var(--color-border)]"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[var(--color-border)] shadow-sm text-[10px] font-black text-[var(--color-cta)] uppercase tracking-widest mb-6">
            <Globe className="w-3.5 h-3.5" /> Manufacturer • Supplier • Wholesaler Desk
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-[var(--color-heading)] tracking-tighter uppercase leading-[0.95] mb-6">
            Talk to the <br /><span className="text-[var(--color-cta)]">Manufacturer Direct</span>
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-heading)] opacity-60 font-bold leading-relaxed">
            Get manufacturer-direct pricing, dedicated wholesale supplier schedules and authorised wholesaler terms. Our B2B desk handles dealer, wholesaler and bulk supply enquiries the same day.
          </p>
        </motion.div>

        {/* 2. SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* LEFT COLUMN: Authoritative Contact Cards with staggered entries */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="lg:col-span-5 space-y-8"
          >

            {/* Quick Contact Panel */}
            <motion.div
              variants={fadeInUp}
              className="bg-white border border-[var(--color-border)] rounded-[2.5rem] p-8 shadow-sm space-y-6"
            >
              <h3 className="text-xs font-black text-[var(--color-heading)] uppercase tracking-[0.3em] border-b border-[var(--color-border)] pb-4">
                Direct Channels
              </h3>

              {/* Phone Channel */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-cta)] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-black text-[var(--color-heading)] uppercase tracking-wider opacity-40 block mb-0.5">Primary Telephone</span>
                  <a href="tel:+919893115645" className="text-lg font-black text-[var(--color-heading)] hover:text-[var(--color-cta)] transition-colors block">
                    +91 98931 15645
                  </a>
                  <span className="text-[10px] font-bold text-gray-400 block mt-0.5">Mon - Sat: 9:00 AM to 7:00 PM</span>
                </div>
              </div>

              {/* WhatsApp Channel */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#25d366]/10 border border-[#25d366]/20 flex items-center justify-center text-[#25d366] shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.023-5.116-2.887-6.982C16.582 1.895 14.1 1.867 11.47 1.867c-5.437 0-9.863 4.421-9.867 9.867-.001 1.772.483 3.5 1.396 5.025l-.993 3.63 3.733-.979zm11.758-5.321c-.328-.164-1.94-.959-2.24-1.069-.3-.11-.518-.165-.736.165-.218.33-.844 1.069-1.036 1.289-.191.22-.383.247-.711.083-.328-.164-1.386-.511-2.64-1.629-.976-.87-1.635-1.947-1.826-2.276-.191-.33-.02-.508.145-.672.148-.148.328-.383.492-.575.164-.191.218-.328.328-.547.11-.219.055-.411-.027-.575-.082-.164-.736-1.772-1.009-2.43-.267-.64-.539-.553-.736-.563-.19-.01-.41-.01-.628-.01-.218 0-.573.082-.873.411-.3.33-1.147 1.121-1.147 2.732 0 1.61 1.173 3.161 1.337 3.38 1.64 2.151 3.161 3.287 5.097 4.12 1.936.833 1.936.553 2.716.483.78-.07 2.24-.915 2.553-1.801.314-.887.314-1.647.22-1.802-.095-.155-.328-.247-.655-.411z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[9px] font-black text-[var(--color-heading)] uppercase tracking-wider opacity-40 block mb-0.5">WhatsApp Chat</span>
                  <button
                    onClick={handleWhatsAppClick}
                    className="text-lg font-black text-[#25d366] hover:underline transition-colors block text-left"
                  >
                    Start WhatsApp Chat
                  </button>
                  <span className="text-[10px] font-bold text-gray-400 block mt-0.5">Tap to chat with a B2B Specialist</span>
                  <span className="text-[10px] font-bold text-gray-400 block mt-0.5">Mon - Sat: 9:00 AM to 8:00 PM</span>
                </div>
              </div>

              {/* Email Channel */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-cta)] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-black text-[var(--color-heading)] uppercase tracking-wider opacity-40 block mb-0.5">Official Email</span>
                  <a href="mailto:info@packmaxindia.in" className="text-lg font-black text-[var(--color-heading)] hover:text-[var(--color-cta)] transition-colors block">
                    info@packmaxindia.in
                  </a>
                  <span className="text-[10px] font-bold text-gray-400 block mt-0.5">We reply within 45 minutes</span>
                </div>
              </div>

            </motion.div>

            {/* Response Time Pledge */}
            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-br from-[var(--color-heading)] to-black rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-lg border border-white/5"
            >
              <div className="absolute top-0 right-0 w-32 h-full bg-white opacity-[0.02] -skew-x-12 translate-x-1/2 pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 text-[var(--color-cta)] font-black text-[8px] uppercase tracking-[0.3em] mb-4 bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10">
                  <Clock className="w-3.5 h-3.5" /> Rapid Response Protocol
                </div>
                <h4 className="text-xl font-black uppercase tracking-tight mb-2">
                  Our Support Pledge
                </h4>
                <p className="text-xs text-white/60 font-semibold leading-relaxed">
                  B2B supply demands precision. We guarantee that all qualified price requests submitted through our corporate communication channels are thoroughly reviewed and answered by an active plant logistics engineer in less than an hour.
                </p>
              </div>
            </motion.div>

            {/* Social Channels card */}
            <motion.div
              variants={fadeInUp}
              className="bg-white border border-[var(--color-border)] rounded-[2.5rem] p-8 shadow-sm space-y-6"
            >
              <h4 className="text-[10px] font-black text-[var(--color-heading)] uppercase tracking-[0.3em] border-b border-[var(--color-border)] pb-4">
                Corporate Social Handles
              </h4>
              <div className="flex flex-wrap gap-3">
                {["LinkedIn", "Instagram", "Facebook"].map((handle) => (
                  <span
                    key={handle}
                    className="px-4 py-2.5 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-[10px] font-black uppercase tracking-wider text-[var(--color-heading)] opacity-50 cursor-not-allowed hover:opacity-100 transition-opacity"
                  >
                    {handle}
                  </span>
                ))}
              </div>
            </motion.div>

          </motion.div>

          {/* RIGHT COLUMN: Modern Form Submit with slide-in animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white border border-[var(--color-border)] rounded-[3rem] p-8 sm:p-12 shadow-sm relative overflow-hidden"
          >

            {/* Overlay if submitting */}
            {isSubmitting && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-20 flex items-center justify-center rounded-[3rem]">
                <div className="flex flex-col items-center gap-3">
                  <span className="w-10 h-10 border-4 border-[var(--color-cta)] border-t-transparent rounded-full animate-spin" />
                  <span className="text-[10px] font-black text-[var(--color-heading)] uppercase tracking-widest">Routing to Logistics Desk...</span>
                </div>
              </div>
            )}

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-[9px] font-black text-[var(--color-cta)] uppercase tracking-[0.3em] block mb-2">Configure Dispatch Info</span>
                  <h3 className="text-2xl font-black text-[var(--color-heading)] uppercase tracking-tight">
                    Corporate Request Form
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-black text-[var(--color-heading)] uppercase tracking-widest opacity-50">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] focus:border-[var(--color-cta)] px-5 py-4 rounded-2xl text-xs font-bold text-[var(--color-heading)] outline-none transition-colors"
                    />
                  </div>

                  {/* Corporate Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-black text-[var(--color-heading)] uppercase tracking-widest opacity-50">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sales@yourcompany.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] focus:border-[var(--color-cta)] px-5 py-4 rounded-2xl text-xs font-bold text-[var(--color-heading)] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Telephone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-black text-[var(--color-heading)] uppercase tracking-widest opacity-50">Telephone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98000 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] focus:border-[var(--color-cta)] px-5 py-4 rounded-2xl text-xs font-bold text-[var(--color-heading)] outline-none transition-colors"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-black text-[var(--color-heading)] uppercase tracking-widest opacity-50">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sharma Industries Ltd."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] focus:border-[var(--color-cta)] px-5 py-4 rounded-2xl text-xs font-bold text-[var(--color-heading)] outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Inquiry Target — multi-select dropdown. Trigger shows the
                    count of selected products; clicking it opens a panel where
                    the user can toggle multiple items on/off. */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[9px] font-black text-[var(--color-heading)] uppercase tracking-widest opacity-50">
                      Inquiry Target Products
                    </label>
                    <span className="text-[9px] font-black text-[var(--color-cta)] uppercase tracking-widest">
                      {formData.subjects.length} selected
                    </span>
                  </div>

                  <div ref={dropdownRef} className="relative">
                    {/* Trigger */}
                    <button
                      type="button"
                      onClick={() => setDropdownOpen((o) => !o)}
                      aria-haspopup="listbox"
                      aria-expanded={dropdownOpen}
                      className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-cta)] focus:border-[var(--color-cta)] px-5 py-4 rounded-2xl text-left text-xs font-black text-[var(--color-heading)] uppercase tracking-wider outline-none transition-colors flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <span className="truncate">
                        {formData.subjects.length === 1
                          ? formData.subjects[0]
                          : `${formData.subjects.length} products selected`}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Selected chips preview (visible when closed too, so the
                        user can see/remove choices without re-opening). */}
                    {formData.subjects.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {formData.subjects.map((s) => (
                          <span
                            key={s}
                            className="inline-flex items-center gap-1 bg-[var(--color-cta)]/10 border border-[var(--color-cta)]/30 text-[var(--color-cta)] px-2.5 py-1 rounded-full text-[10px] font-bold"
                          >
                            {s}
                            <button
                              type="button"
                              onClick={() => toggleSubject(s)}
                              aria-label={`Remove ${s}`}
                              className="hover:opacity-70"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Dropdown panel */}
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute left-0 right-0 mt-2 z-30 bg-white border border-[var(--color-border)] rounded-2xl shadow-xl overflow-hidden"
                        >
                          <div className="max-h-[70vh] overflow-y-auto p-2">
                            {PRODUCT_OPTIONS.map((opt) => {
                              const isActive = formData.subjects.includes(opt);
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  role="option"
                                  aria-selected={isActive}
                                  onClick={() => toggleSubject(opt)}
                                  className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left text-[12px] font-bold transition-colors ${
                                    isActive
                                      ? "bg-[var(--color-cta)]/10 text-[var(--color-cta)]"
                                      : "text-[var(--color-heading)] hover:bg-gray-50"
                                  }`}
                                >
                                  <span className="truncate">{opt}</span>
                                  <span
                                    className={`flex items-center justify-center w-5 h-5 rounded-md border shrink-0 transition-colors ${
                                      isActive
                                        ? "bg-[var(--color-cta)] border-[var(--color-cta)] text-white"
                                        : "bg-white border-gray-300"
                                    }`}
                                  >
                                    {isActive && <Check className="w-3 h-3" strokeWidth={3} />}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                          <div className="border-t border-gray-100 px-3 py-2 flex items-center justify-between bg-gray-50">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                              {formData.subjects.length} selected
                            </span>
                            <button
                              type="button"
                              onClick={() => setDropdownOpen(false)}
                              className="text-[10px] font-black text-[var(--color-cta)] uppercase tracking-widest hover:underline"
                            >
                              Done
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <p className="text-[10px] font-medium text-gray-400">
                    Tap the field to open the list and pick one or more products to inquire about.
                  </p>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black text-[var(--color-heading)] uppercase tracking-widest opacity-50">Message / Material Requirements *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe roll thickness (Micron), width (mm), stretch percentage, or plain polybag dimensions required..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] focus:border-[var(--color-cta)] px-5 py-4 rounded-2xl text-xs font-bold text-[var(--color-heading)] outline-none transition-colors resize-none"
                  />
                </div>

                {/* Logo Upload */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black text-[var(--color-heading)] uppercase tracking-widest opacity-50">
                    Upload Your Logo (Optional)
                  </label>
                  <input
                    ref={fileInputRef}
                    id="logo-upload"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                  {logoFile ? (
                    <div className="flex items-center justify-between gap-3 bg-[var(--color-bg)] border border-[var(--color-border)] px-5 py-4 rounded-2xl">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-[var(--color-cta)]/10 border border-[var(--color-cta)]/20 flex items-center justify-center text-[var(--color-cta)] shrink-0">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-black text-[var(--color-heading)] truncate">{logoFile.name}</p>
                          <p className="text-[10px] font-bold text-gray-400">{(logoFile.size / 1024).toFixed(0)} KB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeLogo}
                        aria-label="Remove logo"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="logo-upload"
                      className="flex items-center gap-3 bg-[var(--color-bg)] border border-dashed border-[var(--color-border)] hover:border-[var(--color-cta)] px-5 py-4 rounded-2xl cursor-pointer transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-[var(--color-border)] flex items-center justify-center text-[var(--color-cta)] shrink-0">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-[var(--color-heading)]">Click to upload your brand logo</p>
                        <p className="text-[10px] font-bold text-gray-400">PNG, JPG, SVG or WEBP — up to 5 MB. Attached to your inquiry email.</p>
                      </div>
                    </label>
                  )}
                  {fileError && <p className="text-[10px] font-bold text-red-600">{fileError}</p>}
                </div>

                {submitError && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[11px] font-bold text-red-700">
                    {submitError}
                  </div>
                )}

                {/* Submit Action */}
                <PremiumCTA
                  type="submit"
                  label="Submit Inquiry Specification"
                  variant="primary"
                  icon={<Send className="w-3.5 h-3.5" />}
                  wFull={true}
                />

                <p className="text-[10px] font-medium text-gray-400 text-center leading-relaxed">
                  * By submitting, you request direct corporate factory rates. Your contact data remains strictly private.
                </p>
              </form>
            ) : (
              /* Submission Success screen */
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6 border border-green-200 shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.4em] mb-4 bg-green-50 border border-green-200 px-3.5 py-1.5 rounded-full">
                  Transmission Verified
                </span>

                <h3 className="text-3xl font-black text-[var(--color-heading)] uppercase tracking-tighter leading-none mb-6">
                  Thank You, {formData.name}!
                </h3>

                <p className="text-sm text-[var(--color-heading)] opacity-60 font-bold max-w-md leading-relaxed mb-8">
                  Your bulk inquiry specification for <span className="text-[var(--color-cta)]">{formData.subjects.join(", ")}</span> has been logged under Packmax India routing systems. Our representative will contact you shortly.
                </p>

                <PremiumCTA 
                  onClick={() => setIsSubmitted(false)}
                  label="Submit Another Form"
                  variant="primary"
                />
              </div>
            )}

          </motion.div>

        </div>



      </div>
    </main>
  );
}
