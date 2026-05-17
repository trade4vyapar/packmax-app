import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteData } from "@/data/siteData";
import { MapPin, CheckCircle2, ArrowRight, Truck, Factory, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const location = siteData.locations.find((l) => l.slug === slug);

  if (!location) return { title: "Location Not Found" };

  return {
    title: `Premium Packaging Solutions in ${location.name}, ${location.state} | Packmax India`,
    description: `Leading manufacturer and supplier of BOPP Tapes and Courier Bags in ${location.name}. Fast delivery and custom branding available.`,
  };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const location = siteData.locations.find((l) => l.slug === slug);

  if (!location) notFound();

  return (
    <main className="min-h-screen bg-[var(--color-bg)] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-8 lg:px-20">
        
        {/* Hero Section for Location */}
        <div className="bg-[var(--color-heading)] rounded-[4rem] p-12 lg:p-24 text-white relative overflow-hidden mb-20 shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white opacity-[0.03] rotate-12 translate-x-1/2" />
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-black uppercase tracking-widest mb-8">
              <MapPin className="w-4 h-4 text-[var(--color-cta)]" />
              Serving {location.name}, {location.state}
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none mb-8 uppercase">
              Premium Packaging <br />
              <span className="text-[var(--color-cta)]">Supply in {location.name}</span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed mb-12 font-medium">
              {location.description} Packmax India ensures high-quality industrial tapes and courier bags reach your doorstep with rapid turnaround times and verified quality.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-4 bg-[var(--color-cta)] text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-[var(--color-cta-hover)] transition-all shadow-xl"
            >
              Get Location Quote <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Local Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            <div className="bg-white p-10 rounded-[3rem] border border-[var(--color-border)] shadow-sm">
                <Truck className="w-12 h-12 text-[var(--color-cta)] mb-6" strokeWidth={1} />
                <h3 className="text-xl font-black text-[var(--color-heading)] uppercase mb-4 tracking-tight">Rapid Delivery</h3>
                <p className="text-sm text-[var(--color-text)] font-medium leading-relaxed">Direct shipping from our Indore manufacturing hub to all zones in {location.name} within 48-72 hours.</p>
            </div>
            <div className="bg-white p-10 rounded-[3rem] border border-[var(--color-border)] shadow-sm">
                <Factory className="w-12 h-12 text-[var(--color-cta)] mb-6" strokeWidth={1} />
                <h3 className="text-xl font-black text-[var(--color-heading)] uppercase mb-4 tracking-tight">Direct Manufacturer</h3>
                <p className="text-sm text-[var(--color-text)] font-medium leading-relaxed">Skip the middlemen. Get factory-direct pricing for your business in {location.name}.</p>
            </div>
            <div className="bg-white p-10 rounded-[3rem] border border-[var(--color-border)] shadow-sm">
                <ShieldCheck className="w-12 h-12 text-[var(--color-cta)] mb-6" strokeWidth={1} />
                <h3 className="text-xl font-black text-[var(--color-heading)] uppercase mb-4 tracking-tight">Sample First</h3>
                <p className="text-sm text-[var(--color-text)] font-medium leading-relaxed">We provide free samples to companies in {location.name} before starting bulk manufacturing.</p>
            </div>
        </div>

        {/* Featured Products in this area */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 pb-6 border-b border-[var(--color-border)]">
            <div>
              <h2 className="text-4xl font-black text-[var(--color-heading)] uppercase tracking-tighter">Available in {location.name}</h2>
              <p className="text-lg font-bold text-[var(--color-heading)] opacity-40">Complete industrial catalog ready for shipping</p>
            </div>
            <Link href="/products" className="text-sm font-black text-[var(--color-cta)] uppercase tracking-widest flex items-center gap-2 hover:underline">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteData.products.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`} className="group bg-white rounded-[2.5rem] p-6 border border-[var(--color-border)] hover:shadow-2xl hover:-translate-y-2 transition-all">
                <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-[var(--color-bg)]">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h4 className="text-lg font-black text-[var(--color-heading)] uppercase mb-2">{product.name}</h4>
                <p className="text-xs font-bold text-[var(--color-text)] opacity-60 leading-relaxed line-clamp-2">{product.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
