import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL, organizationSchema, websiteSchema, getMasterKeywords } from "@/utils/seo";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Packmax India | BOPP Tape, Courier Bags & Custom Printed Packaging",
    template: "%s | Packmax India",
  },
  description:
    "Packmax India — direct-from-factory BOPP brown tape, transparent tape, custom-printed Amazon/Flipkart/Meesho seller tapes, tamper-proof courier bags, and packaging films. Wholesale rates, 48-72h delivery across India.",
  keywords: getMasterKeywords().join(", "),
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [{ url: "/favicon.ico?v=2", sizes: "any", type: "image/x-icon" }],
    shortcut: ["/favicon.ico?v=2"],
    apple: [{ url: "/favicon.ico?v=2" }],
  },
  openGraph: {
    title: "Packmax India | BOPP Tape, Courier Bags & Custom Printed Packaging",
    description:
      "Direct-from-factory packaging tapes and courier bags. Wholesale rates, 48-72h delivery across India.",
    type: "website",
    url: SITE_URL,
    siteName: "Packmax India",
    locale: "en_IN",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Packmax India — Your Trusted Packaging Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Packmax India | BOPP Tape, Courier Bags & Custom Printed Packaging",
    description:
      "Direct-from-factory packaging tapes and courier bags. Wholesale rates, 48-72h delivery across India.",
    images: [`${SITE_URL}/og-image.png`],
    creator: "@PackmaxIndia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import MobileDock from "@/components/MobileDock";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </head>
      <body className="antialiased pb-[68px] md:pb-0">
        <Preloader />
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <FloatingChat />
          <MobileDock />
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
