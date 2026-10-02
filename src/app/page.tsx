"use client";

/**
 * Main Application Entry Point (White Cream Theme)
 * Implements:
 * 1. Global Lenis & GSAP SmoothScrollProvider wrapper.
 * 2. Master Motion Continuity Engine (`InteractiveShowcase`) bridging Hero & Pinned Flavor Showcase.
 * 3. Warm white cream background aesthetic (#FAF8F5).
 * 4. Lazy loading for heavy GSAP & WebP section components (`FlavorSpecs`, `CtaSection`, `Footer`).
 */
import { useState } from "react";
import dynamic from "next/dynamic";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Preloader from "@/components/Preloader";
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
  const [preloaderFinished, setPreloaderFinished] = useState(false);

  return (
    <SmoothScrollProvider>
      <main className="relative min-h-screen bg-[#FAF8F5] text-stone-900 overflow-x-hidden selection:bg-emerald-600 selection:text-white">
        <Preloader onComplete={() => setPreloaderFinished(true)} />
        <Navbar ready={preloaderFinished} />
        <InteractiveShowcase ready={preloaderFinished} />
        <FlavorSpecs />
        <CtaSection />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
