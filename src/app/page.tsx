"use client";

/**
 * Main Application Entry Point (White Cream Theme)
 * Implements:
 * 1. Global Lenis & GSAP SmoothScrollProvider wrapper.
 * 2. Master Motion Continuity Engine (`InteractiveShowcase`) bridging Hero & Pinned Flavor Showcase.
 * 3. Warm white cream background aesthetic (#FAF8F5).
 * 4. Lazy loading for heavy GSAP & WebP section components (`FlavorSpecs`, `CtaSection`, `Footer`).
 */
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Navbar from "@/components/Navbar";
import InteractiveShowcase from "@/components/InteractiveShowcase";

// Lazy-loaded components for optimal initial loading performance & bundle optimization
const FlavorSpecs = dynamic(() => import("@/components/FlavorSpecs"), {
  ssr: false,
});

const CtaSection = dynamic(() => import("@/components/CtaSection"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
});

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="relative min-h-screen bg-[#FAF8F5] text-stone-900 overflow-x-hidden selection:bg-emerald-600 selection:text-white">
        <Navbar ready={true} />
        <InteractiveShowcase ready={true} />

        {/* View More Flavours -> /flavors page */}
        <div className="relative flex justify-center px-4 pt-10 sm:pt-14">
          <Link
            href="/flavors"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 shadow-md shadow-emerald-600/20 hover:opacity-95 hover:scale-105 transition-all"
          >
            View More Flavours
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <FlavorSpecs />
        <CtaSection />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
