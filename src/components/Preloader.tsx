"use client";

/**
 * Preloader Component (White Cream Aesthetic)
 * Progress percentage counter (0% to 100%), smooth progress bar fill,
 * and curtain lift reveal using GSAP timeline.
 */
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Sparkles } from "lucide-react";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const brandTextRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // 1. Counter & progress bar fill
      const counterObj = { value: 0 };
      tl.to(counterObj, {
        value: 100,
        duration: 1.8,
        ease: "power2.inOut",
        onUpdate: () => {
          setCount(Math.floor(counterObj.value));
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${counterObj.value}%`;
          }
        },
      });

      // 2. Brand pulse highlight
      tl.to(brandTextRef.current, {
        scale: 1.04,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
      });

      // 3. Curtain lift reveal animation
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#F7F5F0] p-8 sm:p-12 text-stone-900 select-none"
    >
      <div className="flex items-center justify-between text-xs font-mono tracking-widest text-stone-500 uppercase">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
          <span>SIP FRESH // CREAM SHOWCASE</span>
        </div>
        <span>PRELOADER 2026</span>
      </div>

      <div className="flex flex-col items-center justify-center my-auto">
        <div
          ref={brandTextRef}
          className="text-4xl sm:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-800 mb-6 text-center"
        >
          SIP BETTER. LIVE FRESHER.
        </div>
        <p className="text-stone-500 text-sm font-mono tracking-wider">CRAFTING ORGANIC BEVERAGE MOTION</p>
      </div>

      <div className="w-full max-w-xl mx-auto flex flex-col gap-3">
        <div className="flex justify-between items-center font-mono text-xs text-stone-500">
          <span>LOADING WEBP ASSETS & GSAP ENGINE</span>
          <span suppressHydrationWarning className="text-emerald-700 font-bold text-base">
            {count}%
          </span>
        </div>
        <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-800 w-0 transition-all duration-75 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
