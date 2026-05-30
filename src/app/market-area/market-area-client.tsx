"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Showcase-only marketplaces. These are intentionally NOT links — they exist
// purely to display Packmax's network reach.
const cities = [
  "Indore",
  "Bhopal",
  "Jabalpur",
  "Satna",
  "Gwalior",
  "Sagar",
  "Ratlam",
  "Ujjain",
  "Dewas",
  "Jaipur",
  "Udaipur",
  "Jodhpur",
  "Jalgaon",
  "Agra",
  "Kanpur",
  "Raipur",
  "Bhilai",
  "Raigarh",
  "Rajkot",
  "Mumbai",
  "Hyderabad",
  "Kerala",
  "Guwahati",
  "Bengaluru",
  "Pune",
];

// Additional "important cities we serve" — state-wise top cities across India.
// Display-only showcase, deduplicated so a city shared by two states (e.g.
// Udaipur) appears once.
const importantCities = Array.from(
  new Set([
    // Andhra Pradesh
    "Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Kurnool",
    // Arunachal Pradesh
    "Itanagar", "Tawang", "Pasighat", "Ziro", "Naharlagun",
    // Assam
    "Dibrugarh", "Silchar", "Jorhat", "Tezpur",
    // Bihar
    "Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga",
    // Chhattisgarh
    "Bilaspur", "Korba", "Durg",
    // Goa
    "Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda",
    // Gujarat
    "Ahmedabad", "Surat", "Vadodara", "Bhavnagar",
    // Haryana
    "Gurugram", "Faridabad", "Panipat", "Ambala", "Hisar",
    // Himachal Pradesh
    "Shimla", "Dharamshala", "Solan", "Mandi", "Kullu",
    // Jharkhand
    "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar",
    // Karnataka
    "Mysuru", "Hubballi", "Mangaluru", "Belagavi",
    // Kerala
    "Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Kannur",
    // Maharashtra
    "Nagpur", "Nashik", "Aurangabad",
    // Manipur
    "Imphal", "Thoubal", "Churachandpur", "Bishnupur", "Ukhrul",
    // Meghalaya
    "Shillong", "Tura", "Jowai", "Nongstoin", "Baghmara",
    // Mizoram
    "Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib",
    // Nagaland
    "Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha",
    // Odisha
    "Bhubaneswar", "Cuttack", "Rourkela", "Puri", "Sambalpur",
    // Punjab
    "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda",
    // Rajasthan
    "Kota", "Ajmer",
    // Sikkim
    "Gangtok", "Namchi", "Gyalshing", "Mangan", "Singtam",
    // Tamil Nadu
    "Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli",
    // Telangana
    "Warangal", "Nizamabad", "Karimnagar", "Khammam",
    // Tripura
    "Agartala", "Dharmanagar", "Kailashahar", "Belonia",
    // Uttar Pradesh
    "Lucknow", "Varanasi", "Prayagraj",
    // Uttarakhand
    "Dehradun", "Haridwar", "Haldwani", "Roorkee", "Nainital",
    // West Bengal
    "Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol",
  ])
);

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 }
  },
};

// Non-clickable showcase tile.
function CityTile({ name }: { name: string }) {
  return (
    <motion.div
      variants={itemVariants}
      className="select-none bg-white border border-[var(--color-border)] rounded-2xl py-5 px-3 text-center shadow-sm"
    >
      <span className="font-bold text-[var(--color-heading)] text-xs sm:text-sm tracking-wide uppercase">
        {name}
      </span>
    </motion.div>
  );
}

export default function MarketAreaClient() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[#E86A12] selection:text-[#F7F5F4] pb-32">
      <div className="pt-40 px-6 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-[var(--color-cta)] text-[#F7F5F4] px-6 py-2 rounded-full font-black text-sm sm:text-lg tracking-widest uppercase shadow-md mb-8">
            Supplier & Wholesaler Network
          </div>
          <h1
            className="text-3xl sm:text-5xl font-black text-[var(--color-heading)] tracking-tight uppercase"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Pan-India Manufacturer & Wholesaler
          </h1>
          <p className="mt-4 text-base sm:text-lg font-medium max-w-2xl mx-auto opacity-70">
            Packmax is the manufacturer, wholesale supplier and authorised wholesaler of premium packaging across India. From our Indore manufacturing plant, our supplier and wholesaler network ships direct to dealers, retailers and B2B clients in every major city.
          </p>
        </motion.div>

        {/* Primary marketplace grid (showcase only) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {cities.map((city) => (
            <CityTile key={city} name={city} />
          ))}
        </motion.div>

        {/* Important Cities We Serve */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="text-2xl sm:text-4xl font-black text-[var(--color-heading)] tracking-tight uppercase"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Important Cities We Serve
            </h2>
            <p className="mt-3 text-sm sm:text-base font-medium max-w-2xl mx-auto opacity-70">
              Our logistics reach extends to key cities across every Indian state — delivering packaging supplies wherever your business operates.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            {importantCities.map((city) => (
              <CityTile key={city} name={city} />
            ))}
          </motion.div>
        </div>

        {/* Bottom Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center bg-white p-6 sm:p-12 rounded-[2.5rem] border border-[var(--color-border)] shadow-sm max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-black text-[var(--color-heading)] mb-4 uppercase">Don&apos;t see your city?</h3>
          <p className="font-bold text-[var(--color-text)] mb-8 opacity-60">We deliver to every corner of India. Contact us to confirm logistics for your location.</p>
          <Link href="/contact" className="inline-block bg-[var(--color-heading)] text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-black transition-colors">
            Contact Sales
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
