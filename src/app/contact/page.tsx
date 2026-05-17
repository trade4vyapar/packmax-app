"use client";

import { useState } from "react";
import Link from "next/link";
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
  Globe
} from "lucide-react";
import { siteData } from "@/data/siteData";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "General Inquiry",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello Packmax! I am interested in bulk packaging inquiries. Please connect me with a sales engineer.");
    window.open(`https://wa.me/919893115645?text=${message}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)] pt-32 pb-24 font-sans selection:bg-[var(--color-cta)] selection:text-white overflow-x-hidden">
      
      {/* 1. CINEMATIC BACKGROUND BLURS */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[var(--color-cta)] opacity-5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-10 top-40 w-80 h-80 bg-orange-200 opacity-10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[95rem] mx-auto px-6 lg:px-20 relative z-10">
        
        {/* Header Title */}
        <div className="mb-16 max-w-3xl pb-8 border-b border-[var(--color-border)]">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[var(--color-border)] shadow-sm text-[10px] font-black text-[var(--color-cta)] uppercase tracking-widest mb-6">
            <Globe className="w-3.5 h-3.5" /> Corporate Communication Hub
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-[var(--color-heading)] tracking-tighter uppercase leading-[0.95] mb-6">
            Let's Build Your <br /><span className="text-[var(--color-cta)]">Supply Pipeline</span>
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-heading)] opacity-60 font-bold leading-relaxed">
            Get direct manufacturer pricing, custom dimensional calibrations, and dedicated supply schedules. Contact our engineering office today.
          </p>
        </div>

        {/* 2. SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT COLUMN: Authoritative Contact Cards */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick Contact Panel */}
            <div className="bg-white border border-[var(--color-border)] rounded-[2.5rem] p-8 shadow-sm space-y-6">
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
                  {/* WhatsApp Custom SVG */}
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

            </div>

            {/* Response Time Pledge */}
            <div className="bg-gradient-to-br from-[var(--color-heading)] to-black rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-lg border border-white/5">
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
            </div>

            {/* Social Channels placeholder card */}
            <div className="bg-white border border-[var(--color-border)] rounded-[2.5rem] p-8 shadow-sm space-y-6">
              <h4 className="text-[10px] font-black text-[var(--color-heading)] uppercase tracking-[0.3em] border-b border-[var(--color-border)] pb-4">
                Corporate Social Handles
              </h4>
              <div className="flex gap-4">
                {["LinkedIn", "Instagram", "Facebook"].map((handle) => (
                  <span 
                    key={handle}
                    className="px-4 py-2.5 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-[10px] font-black uppercase tracking-wider text-[var(--color-heading)] opacity-50 cursor-not-allowed hover:opacity-100 transition-opacity"
                  >
                    {handle}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Modern Form Submit */}
          <div className="lg:col-span-7 bg-white border border-[var(--color-border)] rounded-[3rem] p-8 sm:p-12 shadow-sm relative">
            
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
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] focus:border-[var(--color-cta)] px-5 py-4 rounded-2xl text-xs font-bold text-[var(--color-heading)] outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Inquiry Type */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black text-[var(--color-heading)] uppercase tracking-widest opacity-50">Inquiry Target Category</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] focus:border-[var(--color-cta)] px-5 py-4 rounded-2xl text-xs font-black text-[var(--color-heading)] uppercase tracking-wider outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="General Inquiry">General B2B Inquiry</option>
                    <option value="Printed Brand Tapes">Custom Printed Brand Tapes</option>
                    <option value="Ecommerce Shipping Bags">Ecommerce Polybags & Mailers</option>
                    <option value="Pallet Stretch Roll">Pallet Stretch Wrap Films</option>
                    <option value="Bulk Supply Contract">Annual Supply & Procurement Contract</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black text-[var(--color-heading)] uppercase tracking-widest opacity-50">Message / Material Requirements *</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Describe roll thickness (Micron), width (mm), stretch percentage, or plain polybag dimensions required..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] focus:border-[var(--color-cta)] px-5 py-4 rounded-2xl text-xs font-bold text-[var(--color-heading)] outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full bg-[var(--color-heading)] text-white hover:bg-[var(--color-cta)] flex items-center justify-center gap-2 py-4.5 rounded-full text-xs font-black uppercase tracking-widest transition-colors duration-300 shadow-md shadow-black/5 cursor-pointer"
                >
                  Submit Inquiry Specification <Send className="w-3.5 h-3.5" />
                </button>

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
                  Your bulk inquiry specification for <span className="text-[var(--color-cta)]">{formData.subject}</span> has been logged under Sharma Industries routing systems. A Packmax plant representative will call you at <span className="text-[var(--color-heading)] font-black">{formData.phone}</span> shortly.
                </p>

                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="bg-[var(--color-heading)] text-white hover:bg-[var(--color-cta)] px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all"
                >
                  Submit Another Form
                </button>
              </div>
            )}

          </div>

        </div>

        {/* 3. CORPORATE MANUFACTURING LOCATIONS GRID */}
        <section className="mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[var(--color-border)] pb-8">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-cta)] block mb-2">Industrial Presence</span>
              <h2 className="text-3xl sm:text-4xl font-black text-[var(--color-heading)] uppercase tracking-tight">Corporate Office Coordinates</h2>
            </div>
            <p className="text-sm font-bold text-[var(--color-heading)] opacity-40 max-w-sm">
              Explore dynamic local marketplaces and dispatch hubs serving our national clientele.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteData.locations.slice(0, 4).map((loc) => (
              <div 
                key={loc.slug}
                className="bg-white border border-[var(--color-border)] rounded-[2.5rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-full aspect-[16/10] rounded-2xl bg-[var(--color-bg)] overflow-hidden mb-6 relative border border-[var(--color-border)]">
                    <img 
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                      alt={loc.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute bottom-4 left-4 text-xs font-black uppercase tracking-widest text-white">{loc.name}</span>
                  </div>
                  
                  <span className="text-[8px] font-black uppercase tracking-widest text-[var(--color-cta)] block mb-2">Regional Address</span>
                  
                  <p className="text-[11px] font-black text-[var(--color-heading)] opacity-80 leading-relaxed mb-6">
                    {loc.address}
                  </p>
                </div>

                <Link 
                  href={`/${loc.slug}`}
                  className="w-full bg-[var(--color-bg)] hover:bg-[var(--color-heading)] hover:text-white border border-[var(--color-border)] flex items-center justify-center gap-1.5 py-3.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-colors duration-300"
                >
                  Browse Location Hub <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
