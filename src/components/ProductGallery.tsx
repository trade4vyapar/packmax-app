"use client";

import { useState, useRef } from "react";
import { Star, ShieldCheck, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  name: string;
  locationName: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="relative aspect-square sm:aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-white border border-[var(--color-border)] shadow-sm flex items-center justify-center p-6 group">

        {/* Rating Circular Badge */}
        <div className="absolute top-6 left-6 z-20 flex flex-col items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg border border-gray-100">
          <div className="flex items-center gap-0.5 text-amber-500 mb-0.5">
            <span className="text-sm font-black leading-none">4.9</span>
            <Star className="w-3 h-3 fill-current" />
          </div>
          <span className="text-[7px] font-black uppercase tracking-widest text-gray-400">Verified</span>
        </div>

        {/* Location Badge */}
        <div className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-heading)] opacity-80 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-500" /> Factory Verified
          </p>
        </div>

        {/* Zoom hint (desktop only, hidden while actively zooming) — bottom-left to leave space for watermark */}
        <div
          className={`hidden sm:flex absolute bottom-6 left-6 z-20 items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-100 shadow-sm text-[10px] font-black uppercase tracking-widest text-[var(--color-heading)] transition-opacity duration-200 ${
            isZooming ? "opacity-0" : "opacity-80"
          }`}
        >
          <ZoomIn className="w-3 h-3 text-[var(--color-cta)]" /> Hover to Zoom
        </div>

        {/* PackMax watermark — bottom-right of the visible image area */}
        <img
          src="https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/watermark.webp"
          alt=""
          aria-hidden
          draggable={false}
          className="pointer-events-none select-none absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 h-10 sm:h-12 w-auto opacity-80 drop-shadow-md"
        />

        <div
          ref={containerRef}
          onMouseEnter={() => setIsZooming(true)}
          onMouseLeave={() => setIsZooming(false)}
          onMouseMove={handleMouseMove}
          className="relative w-full h-full overflow-hidden rounded-xl cursor-zoom-in"
        >
          <div
            className="flex w-full h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {images.map((img, idx) => (
              <div
                key={idx}
                className="w-full h-full shrink-0 flex items-center justify-center overflow-hidden"
              >
                <img
                  src={img}
                  alt={`${name} image ${idx + 1}`}
                  draggable={false}
                  className="w-full h-full object-contain drop-shadow-sm transition-transform duration-200 ease-out select-none"
                  style={
                    idx === activeIndex && isZooming
                      ? {
                          transform: "scale(2)",
                          transformOrigin: `${origin.x}% ${origin.y}%`,
                        }
                      : { transform: "scale(1)", transformOrigin: "center center" }
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-md text-gray-600 hover:text-[var(--color-cta)] hover:bg-white opacity-0 group-hover:opacity-100 transition-all border border-gray-100 z-20"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-md text-gray-600 hover:text-[var(--color-cta)] hover:bg-white opacity-0 group-hover:opacity-100 transition-all border border-gray-100 z-20"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}
      </div>

      {/* Sub Images (Thumbnails) */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden bg-white border-2 transition-all ${
                activeIndex === idx
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
