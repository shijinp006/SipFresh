"use client";

/**
 * SmoothScrollProvider Component
 * Integrates Lenis smooth scrolling with GSAP's ScrollTrigger ticker.
 * Recalculates scroll positions at 60/120fps without stutter.
 */
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Lives inside <ReactLenis>, so useLenis resolves to this page's instance
function ScrollTriggerSync() {
  useLenis(() => ScrollTrigger.update());
  return null;
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  // Drive THIS page's Lenis instance via a ref. Reading the global root instance (useLenis outside
  // <ReactLenis>) could still return the previous page's instance right after a route change, which
  // kept finishing its scroll glide and dropped the new page at the bottom.
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    // Synchronize Lenis with GSAP ticker
    const updateTicker = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ lerp: 0.08, smoothWheel: true, autoRaf: false }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
