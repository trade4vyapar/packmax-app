import { siteData } from "@/data/siteData";
import Link from "next/link";
import { ChevronRight, ArrowRight, PackageSearch } from "lucide-react";

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
                Available in {location.name}
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              {currentCategoryName}
            </h1>
            <p className="text-lg text-gray-600 font-medium">
              Browse our premium catalog of high-grade industrial packaging solutions, manufactured for durability and brand excellence.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sticky Sidebar / Mobile Scrolling Pill Ribbon */}
          <aside className="w-full lg:w-[22rem] shrink-0 lg:sticky lg:top-32 z-20 overflow-visible">
            <div className="w-full bg-transparent lg:bg-white lg:rounded-xl lg:border lg:border-gray-200 pt-0 px-0 pb-2 lg:pt-5 lg:px-5 lg:pb-10 lg:shadow-sm lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto lg:custom-scrollbar lg:flex-col lg:flex overflow-x-auto whitespace-nowrap scrollbar-none flex flex-row gap-2.5">
              
              <h3 className="hidden lg:flex text-xs font-bold text-gray-900 uppercase tracking-widest mb-4 items-center gap-2 border-b border-gray-100 pb-3">
                <PackageSearch className="w-4 h-4 text-[var(--color-cta)]" /> Categories
              </h3>
              
              <div className="flex flex-row lg:flex-col gap-2 lg:gap-0 lg:space-y-1 pb-0 lg:pb-8 shrink-0">
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
                {/* Visual Scroll Buffer / Spacer to prevent corner clipping on desktop */}
                <div className="hidden lg:block h-6 w-full shrink-0 pointer-events-none" />
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

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayProducts.map((prod) => (
                <Link 
                  key={prod.id} 
                  href={`${locationPrefix}/${prod.slug}`}
                  className="group bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 flex flex-col cursor-pointer"
                >
                  
                  {/* Compact Image Container */}
                  <div className="w-full h-44 mb-4 rounded-xl bg-gray-50 overflow-hidden relative border border-gray-100 flex items-center justify-center">
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm text-[9px] font-bold uppercase tracking-wider text-gray-700 z-10 border border-gray-200">
                      In Stock
                    </div>
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out" 
                    />
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 flex flex-col">
                    <h4 className="text-base font-bold text-gray-900 leading-tight mb-1.5 group-hover:text-[var(--color-cta)] transition-colors">{prod.name}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{prod.description}</p>
                    
                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Price</span>
                        <span className="text-base font-black text-gray-900">{prod.price}</span>
                      </div>
                      
                      <div className="bg-gray-900 text-white group-hover:bg-[var(--color-cta)] flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-colors duration-300 shadow-sm">
                        Select Options <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
