import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteData } from "@/data/siteData";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import EcommerceCategory, { CATEGORIES } from "@/components/EcommerceCategory";

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

interface Props {
  params: Promise<{ location: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location: slug } = await params;
  
  const location = siteData.locations.find((l) => l.slug === slug);
  if (location) {
    return {
      title: `Premium Packaging Solutions in ${location.name}, ${location.state} | Packmax India`,
      description: `Leading manufacturer and supplier of BOPP Tapes and Courier Bags in ${location.name}. Fast delivery and custom branding available.`,
    };
  }

  const category = CATEGORIES.find(c => generateSlug(c) === slug);
  if (category) {
    return {
      title: `${category} Manufacturer - Buy Online | Packmax India`,
      description: `Browse our wide range of ${category}. Direct manufacturer prices.`,
    };
  }

  return { title: "Page Not Found" };
}

export default async function LocationOrCategoryPage({ params }: Props) {
  const { location: slug } = await params;
  
  const location = siteData.locations.find((l) => l.slug === slug);
  
  if (location) {
    return (
      <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] overflow-hidden relative selection:bg-[#C05800] selection:text-[#FDFBD4]">
        <HeroSection locationName={location.name} />
        <FeaturesSection locationName={location.name} locationSlug={location.slug} />
        
        {/* Product Link Overrides specific to this area */}
        <div className="bg-white py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 pb-6 border-b border-[var(--color-border)]">
              <div>
                <h2 className="text-4xl font-black text-[var(--color-heading)] uppercase tracking-tighter">Available in {location.name}</h2>
                <p className="text-lg font-bold text-[var(--color-heading)] opacity-40">Complete industrial catalog ready for shipping</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {siteData.products.map((product) => (
                <Link key={product.id} href={`/${location.slug}/${product.slug}`} className="group bg-white rounded-[2.5rem] p-6 border border-[var(--color-border)] hover:shadow-2xl hover:-translate-y-2 transition-all">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-[var(--color-bg)]">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h4 className="text-lg font-black text-[var(--color-heading)] uppercase mb-2 leading-tight">{product.name}</h4>
                  <p className="text-xs font-bold text-[var(--color-text)] opacity-60 leading-relaxed line-clamp-2 mb-4">{product.tagline}</p>
                  <div className="text-[10px] font-black uppercase text-[var(--color-cta)] tracking-widest flex items-center gap-2">
                    View Specs <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  const category = CATEGORIES.find(c => generateSlug(c) === slug);
  if (category) {
    return <EcommerceCategory categorySlug={generateSlug(category)} />;
  }

  notFound();
}
