"use client";

import { useState } from "react";
import { Star, ShieldCheck } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  name: string;
  locationName: string;
}

export default function ProductGallery({ images, name, locationName }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="relative aspect-square sm:aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-white border border-[var(--color-border)] shadow-sm flex items-center justify-center p-6">
        
        {/* Rating Circular Badge */}
        <div className="absolute top-6 left-6 z-10 flex flex-col items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg border border-gray-100">
          <div className="flex items-center gap-0.5 text-amber-500 mb-0.5">
            <span className="text-sm font-black leading-none">4.9</span>
            <Star className="w-3 h-3 fill-current" />
          </div>
          <span className="text-[7px] font-black uppercase tracking-widest text-gray-400">Verified</span>
        </div>

        {/* Location Badge */}
        <div className="absolute top-6 right-6 z-10 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-heading)] opacity-80 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-500" /> Factory Verified
          </p>
        </div>

        <img 
          src={activeImage} 
          alt={name} 
          className="w-full h-full object-contain rounded-xl drop-shadow-sm transition-opacity duration-300"
          key={activeImage}
        />
      </div>

      {/* Sub Images (Thumbnails) */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden bg-white border-2 transition-all ${
                activeImage === img 
                  ? "border-[var(--color-cta)] shadow-md scale-105" 
                  : "border-[var(--color-border)] opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`${name} view ${idx + 1}`} className="w-full h-full object-contain p-2" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
