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
        <FlavorSpecs />
        <CtaSection />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
