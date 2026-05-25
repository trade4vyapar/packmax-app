import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Packmax India | Premium Packaging Solutions",
  description:
    "All Customized Packing Solutions. Your Trusted Partner in Premium Packaging based in Indore.",
  keywords: "packaging, sustainable packaging, brand packaging, PackMax",
  openGraph: {
    title: "Packmax India | Premium Packaging Solutions",
    description:
      "All Customized Packing Solutions. Your Trusted Partner in Premium Packaging based in Indore.",
    type: "website",
  },
};

import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";

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
      </head>
      <body className="antialiased">
        <Preloader />
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <FloatingChat />
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
