"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { FaInstagram, FaFacebookF } from "react-icons/fa6";
import Link from "next/link";
import { siteData } from "@/data/siteData";
import { CATEGORIES } from "@/components/EcommerceCategory";
import { usePathname } from "next/navigation";

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export default function Footer() {
  const pathname = usePathname() || "";
  const currentSlug = pathname.split('/')[1] || '';
  const location = siteData.locations.find(l => l.slug === currentSlug);

  const officeTitle = location ? `${location.name} Office` : "Corporate Office";
  const officeAddress = location ? location.address : "A-14/15, Sector - 59, Noida, Uttar Pradesh, India 201309";

  return (
    <footer
      className="bg-gradient-to-b from-[#0A0F2C] to-[#040614] text-[#F7F5F4] pt-8 pb-6 px-6 sm:pt-16 sm:pb-8 sm:px-8 lg:px-20 overflow-hidden relative"
    >
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-[0.02] -skew-x-12 translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-16 mb-8 sm:mb-12">

          {/* Brand & Bio */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-white rounded-2xl px-4 py-3 sm:px-5 sm:py-4 shadow-[0_4px_20px_rgba(0,0,0,0.15)] mb-3 sm:mb-8"
            >
              <img
                src="/packmax-logo.webp"
                alt="PackMax"
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-xs sm:text-sm font-medium text-white/60 leading-relaxed mb-4 sm:mb-6 max-w-sm">
              India's trusted packaging <strong className="text-white/80">manufacturer, wholesale supplier and authorised wholesaler</strong>. Since 2021, Packmax has been the factory-direct manufacturer-supplier-wholesaler partner for brands, dealers and B2B clients across India.
            </p>
            <div className="flex gap-3">
              {[FaInstagram, FaFacebookF].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ 
                    scale: 1.15,
                    y: -3, 
                    color: "#E86A12",
                    backgroundColor: "rgba(255, 255, 255, 0.1)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Categories */}
          <div className="hidden sm:block lg:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 sm:mb-6 text-[var(--color-cta)]">Products</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-col sm:space-y-4">
              {CATEGORIES.slice(0, 8).map((cat) => (
                <li key={cat}>
                  <Link href={`/${siteData.locations[0].slug}/${generateSlug(cat)}`} className="text-[9px] sm:text-[10px] font-bold text-white/50 hover:text-[var(--color-cta)] transition-colors uppercase tracking-widest block truncate">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 sm:mb-6 text-[var(--color-cta)]">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-col sm:space-y-4">
              {[
                { label: "About", href: "/about" },
                { label: "Products", href: "/products" },
                { label: "Market Area", href: "/market-area" },
                { label: "Contact", href: "/contact" }
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[9px] sm:text-[10px] font-bold text-white/50 hover:text-[var(--color-cta)] transition-colors uppercase tracking-widest block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 sm:mb-6 text-[var(--color-cta)]">{officeTitle}</h4>
            <div className="space-y-4 sm:space-y-8">
              <div className="flex items-start gap-3 sm:gap-5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-cta)]" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-white/70 leading-relaxed uppercase tracking-wide">
                  {officeAddress}
                </p>
              </div>
              <div className="flex items-center gap-3 sm:gap-5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-cta)]" />
                </div>
                <p className="text-xs sm:text-sm font-black text-white uppercase tracking-widest">
                  +91 98931 15645
                </p>
              </div>
              <div className="flex items-center gap-3 sm:gap-5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-cta)]" />
                </div>
                <p className="text-xs sm:text-sm font-black text-white lowercase tracking-widest">
                  info@packmaxindia.in
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4 sm:pt-8 border-t border-white/5 gap-4 sm:gap-6">
          <p className="text-[9px] sm:text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
            © 2021 - {new Date().getFullYear()} Packmax India. All rights reserved.
          </p>
          <div className="hidden md:flex gap-10">
            {["Terms", "Shipping", "Sitemap"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="text-[10px] font-black text-white/30 hover:text-white uppercase tracking-[0.3em] transition-colors">
                {item}
              </Link>
            ))}
          </div>
          <p className="hidden md:block text-[9px] sm:text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
            Manufacturer • Supplier • Wholesaler
          </p>
        </div>

        {/* Developer credit */}
        <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-white/5 text-center">
          <p className="text-[9px] sm:text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
            Developed and Marketed by{" "}
            <motion.span
              animate={{
                textShadow: [
                  "0 0 4px rgba(232,106,18,0.55)",
                  "0 0 14px rgba(232,106,18,0.95)",
                  "0 0 4px rgba(232,106,18,0.55)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-[var(--color-cta)]"
            >
              Trade4Vyapar
            </motion.span>
          </p>
        </div>
      </div>
    </footer>
  );
}
