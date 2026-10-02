"use client";

/**
 * HeroSection Component (White Cream Theme)
 * - Split Side-by-Side Layout: Minimalist Text on Left, Dual LARGE 3D Beverage Cans on Right.
 * - Headline: "SIP BETTER LIVE FRESHER" with staggered word entrance.
 * - Decoupled GSAP Architecture: Outer ref handles ScrollTrigger scrub, Inner ref handles ambient floating oscillation.
 * - ZERO CONFLICT: Cans remain 100% full-sized and 100% visible on both forward and reverse scroll!
 */
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroSectionProps {
  ready?: boolean;
}

export default function HeroSection({ ready }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  // Outer containers for ScrollTrigger scrub transitions
  const leftCanRef = useRef<HTMLDivElement>(null);
  const rightCanRef = useRef<HTMLDivElement>(null);

  // Inner containers for infinite ambient floating oscillation
  const leftCanFloatRef = useRef<HTMLDivElement>(null);
  const rightCanFloatRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const words = headlineRef.current?.querySelectorAll(".word");

      // 1. Entrance animation on mount
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      }

      // Cans entrance (Ensures opacity always ends at 1)
      gsap.fromTo(
        [leftCanRef.current, rightCanRef.current],
        { opacity: 0, y: 80, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        }
      );

      // 2. Infinite ambient floating oscillation on INNER containers (Decoupled from scroll scrub)
      if (leftCanFloatRef.current) {
        gsap.to(leftCanFloatRef.current, {
          y: "-=16",
          rotate: "-=3",
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (rightCanFloatRef.current) {
        gsap.to(rightCanFloatRef.current, {
          y: "-=20",
          rotate: "+=3",
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.3,
        });
      }

      // 3. MASTER SCROLL CONTINUITY: Outer containers scrub smoothly on scroll down and reverse scroll!
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5, // Ultra smooth scrubbed motion
        },
      });

      // Headline glides up and fades out cleanly
      scrollTl.to(headlineRef.current, {
        y: -100,
        opacity: 0,
        scale: 0.95,
        ease: "none",
      });

      // Green Apple Can glides gracefully toward center without size reduction
      scrollTl.to(
        leftCanRef.current,
        {
          x: "-20vw",
          y: "8vh",
          scale: 1.1,
          opacity: 1,
          ease: "none",
        },
        "<"
      );

      // Citrus Can glides smoothly alongside
      scrollTl.to(
        rightCanRef.current,
        {
          x: "-15vw",
          y: "10vh",
          scale: 1.05,
          opacity: 0.8,
          ease: "none",
        },
        "<"
      );

      // Refresh ScrollTrigger calculations after setup
      ScrollTrigger.refresh();
    },
    { scope: containerRef }
  );

  const headlineWords = ["SIP", "BETTER", "LIVE", "FRESHER"];

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-16 px-4 md:px-6 lg:px-20 overflow-hidden bg-[#FAF8F5] text-stone-900 select-none"
    >
      {/* Soft Ambient Radial Background Glows */}
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-emerald-100/60 via-amber-100/40 to-teal-100/50 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* LEFT COLUMN: Clean Headline & Description */}
        <div className="flex flex-col items-start gap-6 text-left z-10">
          <h1
            ref={headlineRef}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] uppercase perspective-1000 flex flex-wrap gap-x-4 gap-y-2 text-left"
          >
            {headlineWords.map((word, idx) => (
              <span
                key={idx}
                className={`word inline-block ${idx >= 2
                    ? "bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900"
                    : "text-stone-900"
                  }`}
              >
                {word}
              </span>
            ))}
          </h1>

          <p className="text-stone-600 max-w-lg text-base sm:text-lg font-medium leading-relaxed">
            Cold-extracted botanical sparkling water crafted with zero artificial sugar and real fruit essences.
          </p>
        </div>

        {/* RIGHT COLUMN: DUAL LARGE 3D BEVERAGE CANS (Transparent Cutouts with Gap) */}
        <div className="relative w-full h-[480px] sm:h-[580px] flex items-center justify-center">
          {/* First Can: Green Apple (Transparent Cutout, Shifted Left) */}
          <div
            ref={leftCanRef}
            className="absolute left-[-4%] sm:left-[-8%] lg:left-[-12%] top-2 w-56 sm:w-72 lg:w-80 h-[400px] sm:h-[500px] cursor-pointer group pointer-events-auto opacity-100 z-10"
          >
            <div ref={leftCanFloatRef} className="w-full h-full relative -rotate-6 transition-transform duration-500 hover:-rotate-3">
              <Image
                src="/images/green_apple_nobg.webp"
                alt="Crisp Green Apple Can"
                fill
                className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>

          {/* Second Can: Citrus Fusion (Transparent Cutout, Shifted Right with Gap) */}
          <div
            ref={rightCanRef}
            className="absolute right-[-4%] sm:right-[-8%] lg:right-[-12%] top-16 w-56 sm:w-72 lg:w-80 h-[400px] sm:h-[500px] cursor-pointer group z-20 pointer-events-auto opacity-100"
          >
            <div ref={rightCanFloatRef} className="w-full h-full relative rotate-6 transition-transform duration-500 hover:rotate-3">
              <Image
                src="/images/citrus_nobg.webp"
                alt="Citrus Fusion Can"
                fill
                className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
