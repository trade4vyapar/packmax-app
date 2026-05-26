import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteData } from "@/data/siteData";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import FeaturesSection from "@/components/FeaturesSection";
import EcommerceCategory, { CATEGORIES } from "@/components/EcommerceCategory";
import TapeShowcase from "@/components/TapeShowcase";
import ProcessFlow from "@/components/ProcessFlow";
import WorkflowSection from "@/components/WorkflowSection";

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

interface Props {
  params: Promise<{ location: string }>;
}

import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location: slug } = await params;
  
  const location = siteData.locations.find((l) => l.slug === slug);
  if (location) {
    const title = `BOPP Tape Manufacturer in ${location.name}, ${location.state} | Custom Printed & Brown Tapes`;
    const description = `Leading B2B packaging manufacturer and wholesale supplier of BOPP brown tapes, transparent box sealing tapes, and custom printed logo tapes in ${location.name}, ${location.state}. Quick 48-hour delivery.`;
    const keywords = `bopp tape manufacturer ${location.name}, packaging tapes ${location.name}, brown cello tape supplier ${location.name}, custom logo tape ${location.name}, packaging materials wholesale ${location.name}, carton sealing tape ${location.name}`;
    
    return generateSEOMetadata({
      title,
      description,
      path: `/${location.slug}`,
      keywords,
      locationName: location.name
    });
  }

  const category = CATEGORIES.find(c => generateSlug(c) === slug);
  if (category) {
    const isTape = category.toLowerCase().includes("tape");
    const title = isTape
      ? `${category} Manufacturer & Wholesaler | Buy Online`
      : `${category} Manufacturer - Direct Factory Prices`;
      
    const description = `Browse our range of heavy-duty, high-performance ${category}. Direct manufacturer rates with quick dispatch for B2B e-commerce sellers and warehouses.`;
    const keywords = `${category} manufacturer, wholesale ${category}, buy ${category} bulk, industrial packaging materials`;

    return generateSEOMetadata({
      title,
      description,
      path: `/${generateSlug(category)}`,
      keywords,
      categoryName: category
    });
  }

  return { title: "Page Not Found | Packmax India" };
}

export default async function LocationOrCategoryPage({ params }: Props) {
  const { location: slug } = await params;
  
  const location = siteData.locations.find((l) => l.slug === slug);
  
  if (location) {
    return (
      <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] overflow-hidden relative selection:bg-[#E86A12] selection:text-[#F7F5F4]">
        <HeroSection locationName={location.name} />
        <ServicesSection />
        <TapeShowcase />
        <FeaturesSection locationName={location.name} locationSlug={location.slug} />
        
        {/* Product Link Overrides specific to this area */}
        <div className="bg-white py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12 pb-6 border-b border-[var(--color-border)]">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-[var(--color-heading)] uppercase tracking-tighter">Available in {location.name}</h2>
                <p className="text-base sm:text-lg font-bold text-[var(--color-heading)] opacity-40">Complete industrial catalog ready for shipping</p>
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
        <ProcessFlow />
        <WorkflowSection />
      </main>
    );
  }

  const category = CATEGORIES.find(c => generateSlug(c) === slug);
  if (category) {
    return <EcommerceCategory categorySlug={generateSlug(category)} />;
  }

  notFound();
}

export async function generateStaticParams() {
  const params: { location: string }[] = [];
  
  // 1. Add all locations
  siteData.locations.forEach((loc) => {
    params.push({ location: loc.slug });
  });

  // 2. Add all categories
  CATEGORIES.forEach((cat) => {
    params.push({ location: generateSlug(cat) });
  });

  return params;
}
