"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { siteData } from "@/data/siteData";
import { Star, Mail, ChevronDown, Package } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ProductGallery from "@/components/ProductGallery";
import InquiryButton from "@/components/InquiryButton";

export default function ProductClientPage({ slug, locationSlug, locationName }: { slug: string; locationSlug?: string; locationName?: string }) {
  const product = siteData.products.find((p) => p.slug === slug);
  if (!product) notFound();

  let hash = 0;
  for (let i = 0; i < product.id.length; i++) hash = product.id.charCodeAt(i) + ((hash << 5) - hash);
  const rating = (4.1 + ((Math.abs(hash) % 9) * 0.1)).toFixed(1);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "info" | null>("desc");
  const [selectedSize, setSelectedSize] = useState("2 Inch");

  // Mock sizes for packaging tapes
  const sizes = ["1 Inch", "2 Inch", "3 Inch"];

  const toggleTab = (tab: "desc" | "info") => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)] pt-32 pb-16 selection:bg-[var(--color-cta)] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-8 text-sm font-medium text-[var(--color-text)] opacity-70">
          <Link href="/" className="hover:text-[var(--color-cta)] transition-colors">Home</Link>
          <span className="text-gray-400">/</span>
          {locationSlug ? (
            <>
              <Link href={`/${locationSlug}`} className="hover:text-[var(--color-cta)] transition-colors capitalize">{locationName}</Link>
              <span className="text-gray-400">/</span>
            </>
          ) : (
            <>
              <span>Products</span>
              <span className="text-gray-400">/</span>
            </>
          )}
          <span className="text-[var(--color-heading)]">{product.name}</span>
        </nav>

        <div className="bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left: Product Image */}
            <div className="lg:col-span-1">
              <ProductGallery
                images={product.images || [product.image]}
                name={product.name}
                locationName={locationName || "India"}
              />
            </div>

            {/* Right: Product Details */}
            <div className="lg:col-span-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-heading)] mb-3">
                {product.name} {locationName ? <span className="text-[var(--color-cta)] text-xl sm:text-2xl ml-2">in {locationName}</span> : null}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-current"
                      opacity={star <= Math.floor(parseFloat(rating)) ? 1 : (star === Math.ceil(parseFloat(rating)) && parseFloat(rating) % 1 >= 0.5 ? 0.5 : 0.2)}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-[var(--color-text)]">({rating})</span>
              </div>



              {/* Categories */}
              <div className="text-[11px] sm:text-xs text-[var(--color-text)] mb-8 flex items-center gap-2">
                <span className="font-black tracking-widest text-[var(--color-heading)] uppercase opacity-50">CATEGORIES:</span>
                <span className="uppercase font-bold tracking-wider text-[var(--color-heading)] bg-gray-100 px-2.5 py-1 rounded-md">{product.categorySlug.replace(/-/g, " ")}</span>
              </div>

              {/* Variants Selector */}
              <div className="mb-8 flex items-center gap-4">
                <span className="text-[11px] sm:text-xs font-black tracking-widest text-[var(--color-heading)] uppercase opacity-50">SIZE :</span>
                <div className="flex flex-wrap gap-2.5">
                  {sizes.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${selectedSize === size
                        ? "bg-[var(--color-cta)] text-white shadow-lg shadow-[var(--color-cta)]/20"
                        : "bg-gray-100/80 text-[var(--color-heading)]/60 hover:bg-gray-200"
                        }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-5">
                <Link href="/contact" className="flex-1 block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-full bg-gradient-to-r from-[#121B5A] to-[#1a267a] text-white py-4 px-6 rounded-xl font-black uppercase tracking-widest text-xs sm:text-sm shadow-xl shadow-[#121B5A]/20 hover:shadow-2xl hover:shadow-[#121B5A]/30 transition-all flex items-center justify-center gap-3 border border-white/10"
                  >
                    <Package className="w-5 h-5" /> Request Sample
                  </motion.button>
                </Link>

                <div className="flex-1 block">
                  <InquiryButton
                    locationName={locationName || "India"}
                    productName={product.name}
                    className="w-full h-full bg-gradient-to-r from-[var(--color-cta)] to-[#f97316] text-white py-4 px-6 rounded-xl font-black uppercase tracking-widest text-xs sm:text-sm shadow-xl shadow-[var(--color-cta)]/20 hover:shadow-2xl hover:shadow-[var(--color-cta)]/30 transition-all flex items-center justify-center gap-3 border border-white/10"
                  >
                    <Mail className="w-5 h-5" /> Bulk Enquiry
                  </InquiryButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accordions Section */}
        <div className="mt-12 bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 overflow-hidden relative z-10">
          <div className="p-2 sm:p-4 space-y-2">
            {/* Description */}
            <div className="rounded-xl overflow-hidden transition-colors">
              <button
                onClick={() => toggleTab("desc")}
                className={`w-full flex items-center justify-between p-5 sm:p-6 text-left font-black tracking-widest uppercase text-sm sm:text-base transition-colors ${activeTab === 'desc' ? 'text-[var(--color-heading)] bg-gray-50/80' : 'text-[var(--color-heading)]/70 hover:bg-gray-50/50'}`}
              >
                <span>DESCRIPTION</span>
                <motion.div animate={{ rotate: activeTab === "desc" ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>
              <AnimatePresence>
                {activeTab === "desc" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden bg-gray-50/80"
                  >
                    <div className="p-5 sm:p-8 pt-0 text-[var(--color-text)]">
                      <h3 className="text-xl sm:text-2xl font-black text-[var(--color-heading)] mb-6 tracking-tight">{product.name} Manufacturer in {locationName || "India"} - Shop Now</h3>
                      <div className="mb-6 bg-white p-6 rounded-2xl shadow-sm border border-black/5">
                        <span className="font-black text-[var(--color-heading)] uppercase tracking-widest text-xs opacity-60 mb-3 block">Features</span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {product.features.map((f, i) => (
                            <li key={i} className="flex items-center gap-2 font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cta)]" /> {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
                        <span className="font-black text-[var(--color-heading)] uppercase tracking-widest text-xs opacity-60 mb-3 block">Benefits</span>
                        <p className="leading-relaxed font-medium text-gray-600">{product.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-6 my-1" />

            {/* Additional Information */}
            <div className="rounded-xl overflow-hidden transition-colors">
              <button
                onClick={() => toggleTab("info")}
                className={`w-full flex items-center justify-between p-5 sm:p-6 text-left font-black tracking-widest uppercase text-sm sm:text-base transition-colors ${activeTab === 'info' ? 'text-[var(--color-heading)] bg-gray-50/80' : 'text-[var(--color-heading)]/70 hover:bg-gray-50/50'}`}
              >
                <span>ADDITIONAL INFORMATION</span>
                <motion.div animate={{ rotate: activeTab === "info" ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>
              <AnimatePresence>
                {activeTab === "info" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden bg-gray-50/80"
                  >
                    <div className="p-5 sm:p-8 pt-0 text-[var(--color-text)]">
                      <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
                        <table className="w-full text-sm sm:text-base text-left">
                          <tbody>
                            {Object.entries(product.specs).map(([key, value], i) => (
                              <tr key={key} className={`group ${i !== Object.keys(product.specs).length - 1 ? 'border-b border-gray-100' : ''}`}>
                                <td className="py-4 px-6 font-black tracking-widest text-[var(--color-heading)]/60 uppercase w-1/3 bg-gray-50/50 group-hover:bg-gray-50 transition-colors">{key.replace("_", " ")}</td>
                                <td className="py-4 px-6 font-bold text-[var(--color-heading)] group-hover:bg-gray-50/30 transition-colors">{value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
