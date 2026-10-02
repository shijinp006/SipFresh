"use client";

/**
 * SmoothScrollProvider Component
 * Integrates Lenis smooth scrolling with GSAP's ScrollTrigger ticker.
 * Recalculates scroll positions at 60/120fps without stutter.
 */
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenis = useLenis(({ scroll }) => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    if (!lenis) return;

    // Synchronize Lenis with GSAP ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
    };
  }, [lenis]);

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true, autoRaf: false }}>
      {children}
    </ReactLenis>
  );
}
