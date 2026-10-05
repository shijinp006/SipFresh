import type { Metadata } from "next";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Navbar from "@/components/Navbar";
import FlavorsCatalog from "@/components/FlavorsCatalog";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Flavours — SIP FRESH",
  description: "Explore every SIP FRESH botanical sparkling water flavour: Crisp Green Apple, Midnight Blueberry and Citrus Fusion.",
};

export default function FlavorsPage() {
  return (
    <SmoothScrollProvider>
      <main className="relative min-h-screen bg-[#FAF8F5] text-stone-900 overflow-x-hidden selection:bg-emerald-600 selection:text-white">
        <Navbar />
        <FlavorsCatalog />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
