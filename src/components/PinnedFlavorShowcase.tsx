"use client";

/**
 * PinnedFlavorShowcase Component (White Cream Theme)
 * - Uses Next.js Link component.
 * - Pinned container where screen locks on scroll (`pin: true, scrub: 1`).
 * - Huge bold background text ("GREEN APPLE", "BLUEBERRY", "CITRUS BURST") layered behind cutout can visual.
 * - Warm white cream theme (`#FAF8F5`).
 */
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkles, ShoppingCart, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const flavors = [
  {
    id: "green-apple",
    title: "CRISP GREEN APPLE",
    bgText: "GREEN APPLE",
    tagline: "Tart, Refreshing, Pure Orchard Extract",
    textColor: "text-emerald-700",
    accentColor: "border-emerald-600/40",
    glowColor: "rgba(16, 185, 129, 0.25)",
    image: "/images/green_apple_nobg.webp",
    specs: { calories: "0 Cal", sugar: "0g", potassium: "180mg" },
  },
  {
    id: "blueberry",
    title: "MIDNIGHT BLUEBERRY",
    bgText: "BLUEBERRY",
    tagline: "Rich Violet Antioxidants & Wild Essence",
    textColor: "text-indigo-700",
    accentColor: "border-indigo-600/40",
    glowColor: "rgba(99, 102, 241, 0.25)",
    image: "/images/blueberry_nobg.webp",
    specs: { calories: "0 Cal", sugar: "0g", potassium: "210mg" },
  },
  {
    id: "citrus",
    title: "CITRUS FUSION",
    bgText: "CITRUS BURST",
    tagline: "Zesty Grapefruit & Electric Sunshine Lemon",
    textColor: "text-amber-700",
    accentColor: "border-amber-600/40",
    glowColor: "rgba(245, 158, 11, 0.25)",
    image: "/images/citrus_nobg.webp",
    specs: { calories: "0 Cal", sugar: "0g", potassium: "195mg" },
  },
];

export default function PinnedFlavorShowcase() {
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>(".flavor-panel");
      const canImages = gsap.utils.toArray<HTMLElement>(".can-item");
      const bgTexts = gsap.utils.toArray<HTMLElement>(".bg-text-item");

      // Master ScrollTrigger timeline with pin: true & scrub: 1
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          pin: true,
          scrub: 0.5,
          start: "top top",
          end: `+=${panels.length * 100}%`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Initial states are owned by GSAP (not CSS classes) so transforms never conflict
      gsap.set(bgTexts, { opacity: 0, scale: 1.15 });
      gsap.set(canImages, { opacity: 0, scale: 0.7, rotate: 20, y: 60, force3D: true });
      gsap.set([bgTexts[0]], { opacity: 0.25, scale: 1 });
      gsap.set([canImages[0]], { opacity: 1, scale: 1, rotate: 0, y: 0 });

      panels.forEach((panel, i) => {
        if (i === 0) return; // First item is visible initially

        // 1. Crossfade background text
        mainTl.to(
          bgTexts[i - 1],
          { opacity: 0, scale: 0.85, duration: 1, ease: "power2.inOut" },
          `step-${i}`
        );
        mainTl.fromTo(
          bgTexts[i],
          { opacity: 0, scale: 1.15 },
          { opacity: 0.25, scale: 1, duration: 1, ease: "power2.inOut" },
          `step-${i}`
        );

        // 2. Can crossfade with 3D rotation shifts and scale adjustments
        mainTl.to(
          canImages[i - 1],
          { opacity: 0, scale: 0.7, rotate: -15, y: -60, duration: 1, ease: "power2.inOut" },
          `step-${i}`
        );
        mainTl.fromTo(
          canImages[i],
          { opacity: 0, scale: 0.7, rotate: 20, y: 60 },
          { opacity: 1, scale: 1, rotate: 0, y: 0, duration: 1, ease: "power2.inOut" },
          `step-${i}`
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="flavors" className="relative bg-[#FAF8F5] text-stone-900 select-none">
      <div ref={pinSectionRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* HUGE BOLD BACKGROUND TEXT (Layered behind the can cutout) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
          {flavors.map((f, idx) => (
            <h2
              key={f.id}
              className={`bg-text-item absolute text-[12vw] font-black uppercase tracking-tighter text-stone-300 whitespace-nowrap will-change-transform ${idx === 0 ? "opacity-25" : "opacity-0"
                }`}
            >
              {f.bgText}
            </h2>
          ))}
        </div>

        {/* CENTER CAN IMAGE CUTOUT (No cards, floating 3D cans) */}
        <div className="relative w-72 sm:w-96 h-[460px] sm:h-[540px] z-10 flex items-center justify-center">
          {flavors.map((f, idx) => (
            <div
              key={f.id}
              className={`can-item absolute inset-0 will-change-transform ${idx === 0 ? "opacity-100" : "opacity-0"
                }`}
            >
              <Image
                src={f.image}
                alt={f.title}
                fill
                className="object-contain drop-shadow-[0_35px_50px_rgba(0,0,0,0.18)]"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
