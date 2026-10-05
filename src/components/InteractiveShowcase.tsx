"use client";

/**
 * InteractiveShowcase Component (White Cream Theme)
 * Unified Master Motion Engine connecting Hero Section & Pinned Flavor Showcase with 100% Seamless Cinematic Continuity.
 * 
 * Motion Timeline:
 * 1. Hero State: Text on Left, 3D Beverage Can on Right.
 * 2. Continuity Transition: Hero text glides up & out while 3D Can seamlessly glides from Right -> Center of screen!
 * 3. Pinned Scrub Showcase: Can locks in center while background text ("GREEN APPLE", "BLUEBERRY", "CITRUS BURST") & flavor details cycle smoothly on scroll.
 */
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkles, ShoppingCart, ArrowRight, Leaf, Flame, Droplet } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface InteractiveShowcaseProps {
  ready?: boolean;
}

const flavors = [
  {
    id: "green-apple",
    title: "CRISP GREEN APPLE",
    bgText: "GREEN APPLE",
    tagline: "Tart, Refreshing, Pure Orchard Extract",
    textColor: "text-emerald-700",
    bgTextColor: "text-emerald-300",
    titleColor: "text-emerald-700",
    accentColor: "border-emerald-600/40",
    glowColor: "rgba(16, 185, 129, 0.25)",
    image: "/images/green_apple_nobg.webp",
    sketchImage: "/images/green_apple_sketch.webp",
    specs: { calories: "0 Cal", sugar: "0g", potassium: "180mg" },
  },
  {
    id: "blueberry",
    title: "MIDNIGHT BLUEBERRY",
    bgText: "BLUEBERRY",
    tagline: "Rich Violet Antioxidants & Wild Essence",
    textColor: "text-indigo-700",
    bgTextColor: "text-indigo-300",
    titleColor: "text-indigo-700",
    accentColor: "border-indigo-600/40",
    glowColor: "rgba(99, 102, 241, 0.25)",
    image: "/images/blueberry_nobg.webp",
    sketchImage: "/images/blueberry_sketch.webp",
    specs: { calories: "0 Cal", sugar: "0g", potassium: "210mg" },
  },
  {
    id: "citrus",
    title: "CITRUS FUSION",
    bgText: "CITRUS BURST",
    tagline: "Zesty Grapefruit & Electric Sunshine Lemon",
    textColor: "text-amber-700",
    bgTextColor: "text-amber-300",
    titleColor: "text-amber-600",
    accentColor: "border-amber-600/40",
    glowColor: "rgba(245, 158, 11, 0.25)",
    image: "/images/citrus_nobg.webp",
    sketchImage: "/images/citrus_sketch.webp",
    specs: { calories: "0 Cal", sugar: "0g", potassium: "195mg" },
  },
];

export default function InteractiveShowcase({ ready = true }: InteractiveShowcaseProps) {
  const masterContainerRef = useRef<HTMLDivElement>(null);
  const pinTriggerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const heroCanRef = useRef<HTMLDivElement>(null);
  const secondaryCanRef = useRef<HTMLDivElement>(null);
  const showcaseCanWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ready) return;

      const words = headlineRef.current?.querySelectorAll(".word");
      if (!words) return;

      // Each can has 3 nested layers so animations never fight over one transform:
      //   outer (ref)       -> ScrollTrigger scrub (moves up on scroll, fully reversible)
      //   mid (.hero-can-enter) -> one-time entrance
      //   inner (.hero-can-float) -> infinite ambient float
      const entrances = gsap.utils.toArray<HTMLElement>(".hero-can-enter");
      const floaters = gsap.utils.toArray<HTMLElement>(".hero-can-float");

      // 1. Hero Entrance Animation
      const entranceTl = gsap.timeline();
      entranceTl.fromTo(
        words,
        { opacity: 0, y: 50, rotateX: -30 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }
      );
      entranceTl.fromTo(
        entrances,
        { opacity: 0, scale: 0.4, y: 120, rotate: (i) => (i === 0 ? -20 : 20) },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotate: (i) => (i === 0 ? -5 : 6),
          duration: 1.2,
          stagger: 0.2,
          ease: "back.out(2.2)",
        },
        "-=0.5"
      );

      // Bouncing: the hero apple can and the showcase can share ONE tween (same phase) so the
      // hand-off between them never jumps. The citrus can bounces separately.
      // The hero can is scaled up while it travels, so its bounce is divided by its scale to
      // keep the on-screen bounce identical to the showcase can's at the moment of hand-off.
      gsap.to(showcaseCanWrapRef.current, {
        y: -20,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        onUpdate() {
          const wrapY = gsap.getProperty(showcaseCanWrapRef.current, "y") as number;
          const heroScale = (gsap.getProperty(heroCanRef.current, "scale") as number) || 1;
          gsap.set(floaters[0], { y: wrapY / heroScale });
        },
      });
      if (floaters[1]) {
        gsap.to(floaters[1], { y: -20, duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 });
      }

      // 2. MASTER SCROLL TIMELINE (pinned, scrubbed, fully reversible)
      const bgTexts = gsap.utils.toArray<HTMLElement>(".bg-text-item");
      const canItems = gsap.utils.toArray<HTMLElement>(".showcase-can-item");
      const sketchItems = gsap.utils.toArray<HTMLElement>(".sketch-item");

      const masterTl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: pinTriggerRef.current,
          pin: true,
          scrub: 0.6,
          start: "top top",
          end: "+=350%",
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // PHASE 1 (0 -> 1): text + right (citrus) can move UP, left (apple) can moves DOWN, showcase rises in
      masterTl.fromTo(heroTextRef.current, { y: 0, opacity: 1 }, { y: "-60vh", opacity: 0, duration: 1 }, 0);
      // Left (apple) can travels DOWN and lands exactly on the showcase can position
      const landing = () => {
        const hero = heroCanRef.current!;
        const target = showcaseCanWrapRef.current!;
        const h = hero.getBoundingClientRect();
        const t = target.getBoundingClientRect();
        const curX = gsap.getProperty(hero, "x") as number;
        const curY = gsap.getProperty(hero, "y") as number;
        // Remove the (synchronised) bounce offsets so the target is the can's resting position
        const heroBounce = ((gsap.getProperty(floaters[0], "y") as number) || 0) * ((gsap.getProperty(hero, "scale") as number) || 1);
        const targetBounce = gsap.getProperty(target, "y") as number;
        return {
          x: t.left + t.width / 2 - (h.left + h.width / 2 - curX),
          y: t.top - targetBounce + t.height / 2 - (h.top - heroBounce + h.height / 2 - curY),
          scale: t.height / hero.offsetHeight,
        };
      };
      masterTl.fromTo(
        heroCanRef.current,
        { x: 0, y: 0, scale: 1 },
        { x: () => landing().x, y: () => landing().y, scale: () => landing().scale, duration: 1, ease: "power2.out" },
        0
      );
      masterTl.to(entrances[0], { rotate: 0, duration: 1 }, 0);
      masterTl.fromTo(secondaryCanRef.current, { y: 0, opacity: 1 }, { y: "-110vh", opacity: 0, duration: 1 }, 0);
      masterTl.fromTo(bgTexts[0], { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 1 }, 0);
      // Green Apple sketch background fades/zooms in
      masterTl.fromTo(sketchItems[0], { opacity: 0, scale: 1.15 }, { opacity: 1, scale: 1, duration: 1 }, 0);
      // Seamless hand-off: hero can disappears the instant the showcase can appears at the same spot
      masterTl.set(canItems[0], { opacity: 0 }, 0);
      masterTl.to(canItems[0], { opacity: 1, duration: 0.02, ease: "none" }, 1);
      masterTl.to(heroCanRef.current, { opacity: 0, duration: 0.02, ease: "none" }, 1);

      // PHASE 2 (1.8 -> 2.8): Midnight Blueberry transition (sketch backgrounds crossfade)
      masterTl.to(bgTexts[0], { opacity: 0, scale: 0.85, duration: 0.5, ease: "power1.in" }, 1.8);
      masterTl.to(canItems[0], { opacity: 0, scale: 0.7, rotate: -20, y: -60, duration: 0.5, ease: "power1.in" }, 1.8);
      masterTl.to(sketchItems[0], { opacity: 0, scale: 0.92, duration: 0.5, ease: "power1.in" }, 1.8);

      masterTl.fromTo(bgTexts[1], { opacity: 0, scale: 1.15 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power1.out" }, 1.8 + 0.5);
      masterTl.fromTo(canItems[1], { opacity: 0, scale: 0.7, rotate: 20, y: 60 }, { opacity: 1, scale: 1, rotate: 0, y: 0, duration: 0.6, ease: "power2.out" }, 1.8 + 0.5);
      masterTl.fromTo(sketchItems[1], { opacity: 0, scale: 1.15 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, 1.8 + 0.5);

      // PHASE 3 (3.6 -> 4.6): Citrus Fusion transition (sketch backgrounds crossfade)
      masterTl.to(bgTexts[1], { opacity: 0, scale: 0.85, duration: 0.5, ease: "power1.in" }, 3.6);
      masterTl.to(canItems[1], { opacity: 0, scale: 0.7, rotate: -20, y: -60, duration: 0.5, ease: "power1.in" }, 3.6);
      masterTl.to(sketchItems[1], { opacity: 0, scale: 0.92, duration: 0.5, ease: "power1.in" }, 3.6);

      masterTl.fromTo(bgTexts[2], { opacity: 0, scale: 1.15 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power1.out" }, 3.6 + 0.5);
      masterTl.fromTo(canItems[2], { opacity: 0, scale: 0.7, rotate: 20, y: 60 }, { opacity: 1, scale: 1, rotate: 0, y: 0, duration: 0.6, ease: "power2.out" }, 3.6 + 0.5);
      masterTl.fromTo(sketchItems[2], { opacity: 0, scale: 1.15 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, 3.6 + 0.5);

      // brief hold on the last flavor before unpinning
      masterTl.to({}, { duration: 0.6 });
    },
    { scope: masterContainerRef, dependencies: [ready] }
  );

  const headlineWords = ["SIP", "BETTER", "LIVE", "FRESHER"];

  return (
    <div ref={masterContainerRef} id="hero" className="relative bg-[#FAF8F5] text-stone-900 select-none">
      {/* PINNED SHOWCASE CONTAINER */}
      <div ref={pinTriggerRef} id="flavors" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Soft Ambient Radial Background Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-emerald-100/60 via-amber-100/40 to-teal-100/50 rounded-full blur-[150px] pointer-events-none -z-10" />

        {/* HERO CONTENT LAYER (Visible at start, glides seamlessly out on scroll) */}
        <div
          ref={heroTextRef}
          className="absolute inset-x-0 top-16 sm:top-0 bottom-0 w-full px-5 sm:px-8 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start lg:items-center z-10 pointer-events-auto pt-6 sm:pt-0"
        >
          {/* Hero Left Column: Headline */}
          <div className="flex flex-col items-start gap-3 sm:gap-6 text-left max-w-full lg:max-w-none">
            <h1
              ref={headlineRef}
              className="text-3xl sm:text-6xl lg:text-8xl font-black tracking-tight leading-[0.95] uppercase perspective-1000 flex flex-wrap gap-x-2.5 sm:gap-x-4 gap-y-1 sm:gap-y-2 text-left"
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

            <p className="text-stone-600 max-w-xs sm:max-w-lg text-xs sm:text-lg font-medium leading-relaxed">
              Cold-extracted botanical sparkling water crafted with zero artificial sugar and real fruit essences.
            </p>
          </div>

          {/* Hero Right Column Canvas Placeholder for initial layout alignment */}
          <div className="relative w-full h-[280px] sm:h-[440px] lg:h-[520px] hidden lg:block" />
        </div>

        {/* HERO FLOATING CANS (Direct GSAP Motion Continuity Targets) */}
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center w-full px-4 sm:px-8 lg:px-20">
          {/* Main Hero Green Apple Can */}
          <div
            ref={heroCanRef}
            className="absolute right-3 sm:right-[11rem] md:right-[12.5rem] lg:right-[14rem] top-[42%] sm:top-0 bottom-auto sm:bottom-0 my-0 sm:my-auto w-44 sm:w-60 lg:w-72 h-[320px] sm:h-[420px] lg:h-[480px] pointer-events-auto cursor-pointer group"
          >
            <div className="hero-can-enter w-full h-full">
              <div className="hero-can-float w-full h-full relative">
                <Image
                  src="/images/green_apple_nobg.webp"
                  alt="Crisp Green Apple Can"
                  fill
                  className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Secondary Hero Citrus Can */}
          <div
            ref={secondaryCanRef}
            className="hidden sm:block absolute right-0 sm:right-2 lg:right-4 top-[14%] sm:top-[16%] w-44 sm:w-64 lg:w-72 h-[330px] sm:h-[410px] lg:h-[460px] pointer-events-auto cursor-pointer group"
          >
            <div className="hero-can-enter w-full h-full">
              <div className="hero-can-float w-full h-full relative">
                <Image
                  src="/images/citrus_nobg.webp"
                  alt="Citrus Fusion Can"
                  fill
                  className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* BOTANICAL SKETCH BACKGROUND (large sketches in the top-right & bottom-left corners per flavor) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {flavors.map((f) => (
            <div key={`sketch-${f.id}`} className="sketch-item absolute inset-0 opacity-0">
              {/* Top Right */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-[22vw] sm:w-[14vw] lg:w-[12vw] max-w-[190px] aspect-square opacity-80">
                <Image src={f.sketchImage} alt="" fill sizes="(max-width: 640px) 22vw, 14vw" className="object-contain" />
              </div>
              {/* Bottom Left (rotated 180° so it mirrors the top-right one) */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-[22vw] sm:w-[14vw] lg:w-[12vw] max-w-[190px] aspect-square opacity-80 rotate-180">
                <Image src={f.sketchImage} alt="" fill sizes="(max-width: 640px) 22vw, 14vw" className="object-contain" />
              </div>
            </div>
          ))}
        </div>

        {/* HUGE BOLD BACKGROUND TEXT (Expands behind the centered can during scroll) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
          {flavors.map((f, idx) => (
            <h2
              key={f.id}
              className={`bg-text-item absolute text-[12vw] font-black uppercase tracking-tighter ${f.bgTextColor} whitespace-nowrap opacity-0`}
            >
              {f.bgText}
            </h2>
          ))}
        </div>

        {/* PINNED SHOWCASE 3D CANS (Active after Hero Continuity Transition with Normal Bounce) */}
        <div ref={showcaseCanWrapRef} className="relative h-[min(72vh,640px)] aspect-[7/10] z-20 flex items-center justify-center pointer-events-none">
          {flavors.map((f, idx) => (
            <div
              key={f.id}
              className={`showcase-can-item absolute inset-0 opacity-0 pointer-events-auto cursor-pointer group`}
            >
              <Image
                src={f.image}
                alt={f.title}
                fill
                className="object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.14)] group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
