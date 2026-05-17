import { siteData } from "@/data/siteData";
import Link from "next/link";
import { ChevronDown, MessageSquare } from "lucide-react";

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
  const location = locationSlug ? siteData.locations.find((l) => l.slug === locationSlug) : null;
  const currentCategoryName = CATEGORIES.find(c => generateSlug(c) === categorySlug) || categorySlug.replace(/-/g, ' ');

  const title = location 
    ? `${currentCategoryName} Manufacturer in ${location.name} - Buy Online`
    : `${currentCategoryName} Manufacturer - Buy Online`;

  const locationPrefix = locationSlug ? `/${locationSlug}` : '';

  // Generate mock products based on the category
  const mockProducts = Array.from({ length: 9 }).map((_, i) => ({
    id: `prod-${i}`,
    name: `${currentCategoryName} - Variant ${i + 1}`,
    price: `₹${150 + (i * 45)} - ₹${3500 + (i * 200)}`,
    rating: 4.5,
    image: i % 2 === 0 
      ? "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop"
      : "https://images.unsplash.com/photo-1606206591513-adbf01ac2cee?q=80&w=2070&auto=format&fit=crop"
  }));

  return (
    <div className="min-h-screen bg-[#F5F5F5] pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="w-full h-32 bg-[var(--color-heading)] rounded-t-lg flex items-center justify-center relative overflow-hidden mb-6">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070')] bg-cover bg-center" />
          <h1 className="text-3xl lg:text-4xl font-bold text-white relative z-10">{title}</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-64 bg-white shadow-sm border border-gray-200 shrink-0">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Categories</h3>
            </div>
            <div className="flex flex-col">
              {CATEGORIES.map(category => {
                const slug = generateSlug(category);
                const isActive = slug === categorySlug;
                return (
                  <Link 
                    key={slug} 
                    href={`${locationPrefix}/${slug}`}
                    className={`px-4 py-3 text-sm flex items-center justify-between border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors ${isActive ? 'bg-gray-50 font-bold text-[var(--color-cta)] border-l-4 border-l-[var(--color-cta)]' : 'text-gray-600'}`}
                  >
                    <span>{category} <span className="opacity-50 font-normal">({Math.floor(Math.random() * 50) + 10})</span></span>
                    <ChevronDown className="w-4 h-4 opacity-50 -rotate-90" />
                  </Link>
                );
              })}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 w-full">
            <div className="bg-[#006A9C] text-white px-4 py-3 mb-6 flex items-center shadow-sm">
              <span className="text-sm font-medium">Showing 1 to {mockProducts.length} of {mockProducts.length * 5}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockProducts.map((prod) => (
                <div key={prod.id} className="bg-white border border-gray-200 p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow relative group">
                  <div className="w-full aspect-square mb-4 p-4 border border-gray-100 rounded bg-white overflow-hidden">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-800 mb-2 leading-snug">{prod.name}</h4>
                  <p className="text-[var(--color-cta)] font-bold mb-2">{prod.price}</p>
                  
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className={`w-4 h-4 ${star <= prod.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({prod.rating})</span>
                  </div>

                  <button className="bg-[#245D99] hover:bg-[#1C4B7D] text-white text-sm font-medium py-2 px-6 rounded transition-colors mt-auto w-full max-w-[200px]">
                    Select Options
                  </button>
                </div>
              ))}
            </div>
          </main>
        </div>

        {/* Floating Chat Button Overlay simulation (Optional based on image) */}
        <div className="fixed bottom-6 right-6 z-50">
           <button className="bg-[#1C4B7D] text-white p-4 rounded-full shadow-2xl hover:bg-[#153C65] transition-colors">
              <MessageSquare className="w-6 h-6" />
           </button>
        </div>
      </div>
    </div>
  );
}
