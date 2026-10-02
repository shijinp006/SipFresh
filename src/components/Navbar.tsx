"use client";

/**
 * Navbar Component (White Cream Theme)
 * Minimalist top navigation using Next.js Link component.
 * - Mobile: Always has a glassmorphic background box.
 * - Desktop: Transparent on Hero & Flavors, glassmorphic box after Flavors section (#specs).
 */
import { useState, useRef } from "react";
import Link from "next/link";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ShoppingBag, Menu, X } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface NavbarProps {
  ready?: boolean;
}

export default function Navbar({ ready = true }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasBg, setHasBg] = useState(false);

  useGSAP(
    () => {
      // 1. Entrance animation
      gsap.fromTo(
        navRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      // 2. Add navbar background on desktop after reaching the "Crafted Without Compromise" section (#specs)
      ScrollTrigger.create({
        trigger: "#specs",
        start: "top 120px",
        onEnter: () => setHasBg(true),
        onLeaveBack: () => setHasBg(false),
        onEnterBack: () => setHasBg(true),
      });

      ScrollTrigger.refresh();
    },
    { scope: navRef, dependencies: [ready] }
  );

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (target === "#hero") {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (target === "#flavors") {
      const el = document.querySelector("#flavors");
      if (el) {
        const pinSpacer = el.closest(".pin-spacer") as HTMLElement;
        const startY = pinSpacer ? pinSpacer.offsetTop : el.getBoundingClientRect().top + window.scrollY;
        // Scroll into the pinned showcase section where hero text has glided out and green apple showcase is active
        const targetY = startY + window.innerHeight * 0.85;
        if (lenis) {
          lenis.scrollTo(targetY, { duration: 1.2 });
        } else {
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }
      return;
    }

    if (lenis) {
      lenis.scrollTo(target, { duration: 1.2, offset: -40 });
    } else {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        ref={navRef}
        className={`fixed inset-x-0 z-50 transition-all duration-500 flex items-center justify-between text-stone-900 mx-auto pointer-events-auto ${
          hasBg
            ? "top-3 md:top-4 max-w-[92vw] md:max-w-6xl px-4 md:px-10 py-2.5 md:py-3.5 bg-[#FAF8F5]/90 backdrop-blur-md border border-stone-200/80 rounded-2xl shadow-md"
            : "top-3 md:top-0 max-w-[92vw] md:max-w-7xl px-4 md:px-16 py-2.5 md:py-6 bg-[#FAF8F5]/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border border-stone-200/80 md:border-transparent rounded-2xl md:rounded-none shadow-md md:shadow-none"
        }`}
      >
        {/* Logo Left */}
        <Link href="#" onClick={(e) => handleNavClick(e, "#hero")} className="flex items-center group pointer-events-auto">
          <span className="font-black text-xl sm:text-2xl tracking-tighter text-stone-900 group-hover:text-emerald-700 transition-colors">
            SIP FRESH
          </span>
        </Link>

        {/* Links Center (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-stone-600 pointer-events-auto">
          <Link href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="hover:text-emerald-700 transition-colors">
            Home
          </Link>
          <Link href="#flavors" onClick={(e) => handleNavClick(e, "#flavors")} className="hover:text-emerald-700 transition-colors">
            Flavors
          </Link>
          <Link href="#specs" onClick={(e) => handleNavClick(e, "#specs")} className="hover:text-emerald-700 transition-colors">
            Nutrition & Ingredients
          </Link>
          <Link href="#order" onClick={(e) => handleNavClick(e, "#order")} className="hover:text-emerald-700 transition-colors">
            Pre-Order
          </Link>
        </nav>

        {/* Right Actions (Desktop CTA + Mobile Menu Button) */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <Link
            href="#order"
            onClick={(e) => handleNavClick(e, "#order")}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 hover:opacity-95 transition-all shadow-md shadow-emerald-600/20 hover:scale-105"
          >
            <ShoppingBag className="w-4 h-4" />
            BUY NOW
          </Link>

          {/* Mobile Menu Icon Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-800 hover:text-emerald-700 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-800" /> : <Menu className="w-5 h-5 text-stone-800" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 z-40 p-6 rounded-2xl bg-[#FAF8F5]/95 backdrop-blur-xl border border-stone-200/90 shadow-2xl md:hidden flex flex-col gap-5 text-center animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto">
          <Link
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="py-2.5 text-base font-bold text-stone-800 hover:text-emerald-700 border-b border-stone-200/60 transition-colors"
          >
            Home
          </Link>
          <Link
            href="#flavors"
            onClick={(e) => handleNavClick(e, "#flavors")}
            className="py-2.5 text-base font-bold text-stone-800 hover:text-emerald-700 border-b border-stone-200/60 transition-colors"
          >
            Flavors
          </Link>
          <Link
            href="#specs"
            onClick={(e) => handleNavClick(e, "#specs")}
            className="py-2.5 text-base font-bold text-stone-800 hover:text-emerald-700 border-b border-stone-200/60 transition-colors"
          >
            Nutrition & Ingredients
          </Link>
          <Link
            href="#order"
            onClick={(e) => handleNavClick(e, "#order")}
            className="py-2.5 text-base font-bold text-stone-800 hover:text-emerald-700 border-b border-stone-200/60 transition-colors"
          >
            Pre-Order
          </Link>
          <Link
            href="#order"
            onClick={(e) => handleNavClick(e, "#order")}
            className="mt-2 w-full py-3 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 flex items-center justify-center gap-2 shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            BUY NOW
          </Link>
        </div>
      )}
    </>
  );
}

