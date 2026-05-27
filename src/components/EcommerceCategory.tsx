import { siteData } from "@/data/siteData";
import Link from "next/link";
import { ChevronRight, ArrowRight, PackageSearch, Star } from "lucide-react";

export const CATEGORIES = [
  "Ecommerce Tapes",
  "Printed & plain Ecommerce Polybags",
  "Stretch filmroll",
  "BOPP Color Tape",
  "BOPP Transparent Tape",
  "Box Strapping roll & clip",
  "Corrugated Roll",
  "Custom Brand Logo Name Printed tape",
  "Air bubble roll",
  "BOPP Brown Tape"
];

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export default function EcommerceCategory({ locationSlug, categorySlug }: { locationSlug?: string, categorySlug: string }) {
  const location = locationSlug
    ? siteData.locations.find((l) => l.slug === locationSlug)
    : siteData.locations.find((l) => l.slug === 'indore');

  const currentCategoryName = CATEGORIES.find(c => generateSlug(c) === categorySlug) || categorySlug.replace(/-/g, ' ');

  const locationPrefix = locationSlug ? `/${locationSlug}` : '/indore';

  const realProducts = siteData.products.filter(p => p.categorySlug === categorySlug);

  const displayProducts = realProducts.length > 0 ? realProducts.map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    price: "Request Quote",
    image: p.image
  })) : Array.from({ length: 9 }).map((_, i) => ({
    id: `prod-${i}`,
    name: `${currentCategoryName} ${i + 1}`,
    slug: categorySlug,
    description: "High-performance industrial packaging material ensuring maximum durability and secure transit for your goods.",
    price: `₹${150 + (i * 45)} / Roll`,
    image: i % 2 === 0
      ? "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop"
      : "https://images.unsplash.com/photo-1606206591513-adbf01ac2cee?q=80&w=2070&auto=format&fit=crop"
  }));

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24 font-sans selection:bg-[var(--color-cta)] selection:text-white">
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Professional Header Section */}
        <div className="mb-10 pb-6 border-b border-gray-200">
          <div className="max-w-4xl">
            {location && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-orange-50 border border-orange-200 text-[11px] font-bold text-[var(--color-cta)] uppercase tracking-wider mb-4 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cta)] animate-pulse" />
                Manufacturer • Supplier • Distributor in {location.name}
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              {currentCategoryName} {location ? `Manufacturer & Supplier in ${location.name}` : `Manufacturer, Supplier & Distributor`}
            </h1>
            <p className="text-lg text-gray-600 font-medium">
              Packmax is a direct-factory manufacturer, wholesale supplier and authorised distributor of {currentCategoryName.toLowerCase()}{location ? ` in ${location.name}, ${location.state}` : ' across India'}. Bulk B2B rates for dealers, distributors and corporate buyers — manufactured in-house, dispatched in 48-72 hours.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Sticky Sidebar / Mobile Scrolling Pill Ribbon */}
          <aside className="w-full lg:w-[22rem] shrink-0 lg:sticky lg:top-32 z-20 overflow-visible">
            <div className="w-full bg-transparent lg:bg-white lg:rounded-xl lg:border lg:border-gray-200 pt-0 px-0 pb-2 lg:pt-5 lg:px-5 lg:pb-6 lg:shadow-sm lg:flex-col lg:flex overflow-x-auto whitespace-nowrap scrollbar-none flex flex-row gap-2.5">

              <h3 className="hidden lg:flex text-xs font-bold text-gray-900 uppercase tracking-widest mb-4 items-center gap-2 border-b border-gray-100 pb-3">
                <PackageSearch className="w-4 h-4 text-[var(--color-cta)]" /> Categories
              </h3>

              <div className="flex flex-row lg:flex-col gap-2 lg:gap-0 lg:space-y-1 shrink-0">
                {CATEGORIES.map(category => {
                  const slug = generateSlug(category);
                  const isActive = slug === categorySlug;
                  return (
                    <Link
                      key={slug}
                      href={`${locationPrefix}/${slug}`}
                      className={`group flex items-center justify-between px-4 py-2.5 lg:px-3 lg:py-2.5 rounded-full lg:rounded-lg transition-all duration-200 shrink-0 text-xs lg:text-sm font-semibold ${isActive ? 'bg-orange-50 text-[var(--color-cta)] border border-orange-200 lg:border-none' : 'bg-white border border-gray-200 lg:border-none lg:bg-transparent hover:bg-gray-50 text-gray-700'}`}
                    >
                      <span className={`${isActive ? 'text-[var(--color-cta)]' : 'text-gray-700'}`}>
                        {category}
                      </span>
                      {isActive && <ChevronRight className="hidden lg:block w-4 h-4 text-[var(--color-cta)]" />}
                    </Link>
                  );
                })}
                {/* Ensure bottom spacing is strictly respected in the scrollable flex container */}
                <div className="hidden lg:block min-h-[2rem] w-full shrink-0 pointer-events-none" />
              </div>
            </div>
          </aside>

          {/* Professional Product Grid */}
          <main className="flex-1 w-full">
            <div className="flex items-center justify-between mb-6 px-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Showing {displayProducts.length} Products
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {displayProducts.map((prod) => {
                let hash = 0;
                for (let i = 0; i < prod.id.length; i++) hash = prod.id.charCodeAt(i) + ((hash << 5) - hash);
                const rating = (4.1 + ((Math.abs(hash) % 9) * 0.1)).toFixed(1);
                return (
                  <Link
                    key={prod.id}
                    href={`${locationPrefix}/${prod.slug}`}
                    className="group bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 p-3 sm:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col cursor-pointer text-center relative overflow-hidden"
                  >
                    {/* Premium Image Container */}
                    <div className="w-full h-48 sm:h-52 mb-4 relative flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl sm:rounded-[1.25rem] p-4 group-hover:shadow-inner transition-all duration-500">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out drop-shadow-sm"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col items-center px-1 sm:px-2">
                      <h4 className="text-[15px] sm:text-[17px] font-black text-[var(--color-heading)] leading-snug mb-2 group-hover:text-[var(--color-cta)] transition-colors line-clamp-2">{prod.name}</h4>

                      <div className="flex items-center justify-center text-amber-400 mb-3 gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="w-3.5 h-3.5 fill-current"
                            opacity={star <= Math.floor(parseFloat(rating)) ? 1 : (star === Math.ceil(parseFloat(rating)) && parseFloat(rating) % 1 >= 0.5 ? 0.5 : 0.2)}
                          />
                        ))}
                        <span className="text-[11px] text-gray-400 font-bold ml-1.5">({rating})</span>
                      </div>



                      {/* Premium Animated Button */}
                      <div className="w-full mt-auto relative overflow-hidden rounded-lg sm:rounded-xl">
                        <div className="absolute inset-0 bg-[#0B122A] transition-transform duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-cta)] to-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        <div className="relative flex items-center justify-center px-3 py-2.5 sm:py-3 text-white text-[12px] font-black tracking-widest uppercase z-10 gap-2">
                          Select Options
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
