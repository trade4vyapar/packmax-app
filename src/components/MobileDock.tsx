"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PhoneCall, MessageSquareText, Package } from "lucide-react";
import { siteData } from "@/data/siteData";

export default function MobileDock() {
  const pathname = usePathname() || "";
  const possibleLocation = pathname.split('/').filter(Boolean)[0] || '';
  const isLocation = siteData.locations.some(l => l.slug === possibleLocation);
  // "Products" navigates to the current location hub (which lists categories),
  // not the dedicated /products page.
  const productsHref = isLocation ? `/${possibleLocation}` : `/india`;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[100] md:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="bg-[var(--color-bg)]/80 backdrop-blur-xl border border-[var(--color-border)] shadow-[0_8px_32px_rgba(15,23,42,0.12)] rounded-3xl">
        <div className="flex justify-around items-end h-[68px] px-2 relative pb-1.5">
          
          {/* Home */}
          <Link href="/" className="flex flex-col items-center justify-center w-16 h-full text-[var(--color-heading)] opacity-70 hover:opacity-100 hover:text-[var(--color-cta)] transition-all">
            <Home className="w-[22px] h-[22px] mb-1" strokeWidth={1.5} />
            <span className="text-[10px] font-medium tracking-wide">Home</span>
          </Link>
          
          {/* Call Now */}
          <a href="tel:+911234567890" className="flex flex-col items-center justify-center w-16 h-full text-[var(--color-heading)] opacity-70 hover:opacity-100 hover:text-[var(--color-cta)] transition-all">
            <PhoneCall className="w-[22px] h-[22px] mb-1" strokeWidth={1.5} />
            <span className="text-[10px] font-medium tracking-wide">Call Now</span>
          </a>

          {/* Whatsapp Center Floating */}
          <div className="w-[72px] flex flex-col justify-end items-center h-full relative">
            <a 
              href="https://wa.me/911234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute -top-7 bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_8px_16px_rgba(37,211,102,0.4)] border-4 border-[var(--color-bg)] flex flex-col items-center justify-center transition-transform active:scale-95 z-10"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
            </a>
            <span className="text-[10px] font-medium tracking-wide text-[#25D366] mt-auto">Whatsapp</span>
          </div>

          {/* Messenger */}
          <Link href="/contact" className="flex flex-col items-center justify-center w-16 h-full text-[var(--color-heading)] opacity-70 hover:opacity-100 hover:text-[var(--color-cta)] transition-all">
            <MessageSquareText className="w-[22px] h-[22px] mb-1" strokeWidth={1.5} />
            <span className="text-[10px] font-medium tracking-wide">Messenger</span>
          </Link>
          
          {/* Categories (was Products — products page is removed) */}
          <Link href={productsHref} className="flex flex-col items-center justify-center w-16 h-full text-[var(--color-heading)] opacity-70 hover:opacity-100 hover:text-[var(--color-cta)] transition-all">
            <Package className="w-[22px] h-[22px] mb-1" strokeWidth={1.5} />
            <span className="text-[10px] font-medium tracking-wide">Categories</span>
          </Link>
          
        </div>
      </div>
    </div>
  );
}
