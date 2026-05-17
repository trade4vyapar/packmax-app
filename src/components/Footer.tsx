"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { siteData } from "@/data/siteData";
import { CATEGORIES } from "@/components/EcommerceCategory";
import { usePathname } from "next/navigation";

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export default function Footer() {
  const pathname = usePathname();
  const currentSlug = pathname.split('/')[1] || '';
  const location = siteData.locations.find(l => l.slug === currentSlug);

  const officeTitle = location ? `${location.name} Office` : "Corporate Office";
  const officeAddress = location ? location.address : "A-14/15, Sector - 59, Noida, Uttar Pradesh, India 201309";

  return (
    <footer className="bg-[var(--color-heading)] text-[#FDFBD4] pt-16 pb-8 px-8 lg:px-20 overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-[0.02] -skew-x-12 translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16 mb-12">

          {/* Brand & Bio */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-8">
              <h2 className="text-4xl font-black tracking-tighter uppercase" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Packmax<span className="text-[var(--color-cta)]">®</span>
              </h2>
            </Link>
            <p className="text-sm font-medium text-white/60 leading-relaxed mb-6 max-w-sm">
              Your trusted partner in premium, customized industrial packaging solutions. Since 2021, we've been helping brands seal their success with quality.
            </p>
            <div className="flex gap-4">
              {[FaInstagram, FaFacebookF, FaLinkedinIn, FaXTwitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, color: "#C05800" }}
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Categories */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-[var(--color-cta)]">Products</h4>
            <ul className="space-y-4">
              {CATEGORIES.slice(0, 8).map((cat) => (
                <li key={cat}>
                  <Link href={`/${siteData.locations[0].slug}/${generateSlug(cat)}`} className="text-[10px] font-bold text-white/50 hover:text-[var(--color-cta)] transition-colors uppercase tracking-widest block truncate">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-[var(--color-cta)]">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { label: "About", href: "/about" },
                { label: "Products", href: "/products" },
                { label: "Market Area", href: "/market-area" },
                { label: "Contact", href: "/contact" }
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[10px] font-bold text-white/50 hover:text-[var(--color-cta)] transition-colors uppercase tracking-widest block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-[var(--color-cta)]">{officeTitle}</h4>
            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-5 h-5 text-[var(--color-cta)]" />
                </div>
                <p className="text-sm font-bold text-white/70 leading-relaxed uppercase tracking-wide">
                  {officeAddress}
                </p>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[var(--color-cta)]" />
                </div>
                <p className="text-sm font-black text-white uppercase tracking-widest">
                  +91 97917 63025
                </p>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[var(--color-cta)]" />
                </div>
                <p className="text-sm font-black text-white lowercase tracking-widest">
                  admin@packmax.in
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6">
          <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
            © 2021 - {new Date().getFullYear()} Packmax India. All rights reserved.
          </p>
          <div className="flex gap-10">
            {["Terms", "Privacy", "Shipping", "Sitemap"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="text-[10px] font-black text-white/30 hover:text-white uppercase tracking-[0.3em] transition-colors">
                {item}
              </Link>
            ))}
          </div>
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
            Quality Guaranteed
          </p>
        </div>
      </div>
    </footer>
  );
}
