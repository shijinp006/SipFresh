"use client";

/**
 * Navbar Component (White Cream Theme)
 * Minimalist top navigation using Next.js Link component.
 * - Mobile: Always has a glassmorphic background box.
 * - Other pages (e.g. /flavors): always shows the background box; links navigate to the home page sections.
 * - Desktop: Transparent on Hero & Flavors, glassmorphic box after Flavors section (#specs).
 */
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ShoppingBag, Menu, X, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// href: where the Link navigates. target: home-page section to smooth-scroll to when already on the home page.
const mobileLinks: { href: string; label: string; target?: string }[] = [
  { href: "/#hero", label: "Home", target: "#hero" },
  { href: "/#flavors", label: "Flavors", target: "#flavors" },
  { href: "/#specs", label: "Nutrition & Ingredients", target: "#specs" },
  { href: "/#order", label: "Pre-Order", target: "#order" },
];

const ease = [0.22, 1, 0.36, 1] as const;

// Mobile menu: panel drops in, then the links slide in one after another
const panelVariants: Variants = {
  hidden: { opacity: 0, y: -16, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 380, damping: 30, staggerChildren: 0.06, delayChildren: 0.08 },
  },
  exit: { opacity: 0, y: -12, scale: 0.97, transition: { duration: 0.2, ease } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

interface NavbarProps {
  ready?: boolean;
}

export default function Navbar({ ready = true }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolledPastSpecs, setScrolledPastSpecs] = useState(false);
  // Outside the home page there is no hero to sit on, so the navbar always gets its background box
  const hasBg = !isHome || scrolledPastSpecs;

  useGSAP(
    () => {
      // 1. Entrance animation
      gsap.fromTo(
        navRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

    },
    { scope: navRef, dependencies: [ready] }
  );

  // Mobile menu: pause page scrolling while open, close on Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileMenuOpen, lenis]);

  // 2. Add navbar background on desktop once the "Crafted Without Compromise" section (#specs) reaches the top.
  // #specs is lazy-loaded, so it is looked up on every scroll instead of being bound once at mount.
  useEffect(() => {
    if (!isHome) return;
    const check = () => {
      const specs = document.getElementById("specs");
      setScrolledPastSpecs(!!specs && specs.getBoundingClientRect().top <= 120);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [isHome]);

  // Arriving on the home page from another page with a section hash (e.g. /#order from /flavors):
  // #specs / #order are lazy-loaded, so the browser can't jump to them itself. Wait for the section, then jump.
  useEffect(() => {
    if (!isHome || !lenis) return;
    const hash = window.location.hash;
    if (!hash || hash === "#hero") return;
    // Keep re-applying for ~1s after the section appears, while the pinned showcase finishes measuring the page
    let tries = 0;
    let settleTicks = 0;
    const timer = window.setInterval(() => {
      const el = document.querySelector(hash);
      if (++tries > 60 || (el && ++settleTicks > 10)) window.clearInterval(timer);
      if (!el) return;
      if (hash === "#flavors") {
        const pinSpacer = el.closest(".pin-spacer") as HTMLElement | null;
        const startY = pinSpacer ? pinSpacer.offsetTop : el.getBoundingClientRect().top + window.scrollY;
        lenis.scrollTo(startY + window.innerHeight * 0.85, { immediate: true, force: true });
      } else {
        lenis.scrollTo(el as HTMLElement, { offset: -40, immediate: true, force: true });
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, [isHome, lenis]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    setMobileMenuOpen(false);
    // On other pages, let the Link navigate to the home page section
    if (!isHome) return;
    e.preventDefault();
    // Lenis is paused while the mobile menu is open; resume it first or the scroll is ignored
    lenis?.start();

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
        <Link href="/" onClick={(e) => handleNavClick(e, "#hero")} className="flex items-center group pointer-events-auto">
          <span className="font-black text-xl sm:text-2xl tracking-tighter text-stone-900 group-hover:text-emerald-700 transition-colors">
            SIP FRESH
          </span>
        </Link>

        {/* Links Center (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-stone-600 pointer-events-auto">
          <Link href="/#hero" onClick={(e) => handleNavClick(e, "#hero")} className="hover:text-emerald-700 transition-colors">
            Home
          </Link>
          <Link href="/#flavors" onClick={(e) => handleNavClick(e, "#flavors")} className="hover:text-emerald-700 transition-colors">
            Flavors
          </Link>
          <Link href="/#specs" onClick={(e) => handleNavClick(e, "#specs")} className="hover:text-emerald-700 transition-colors">
            Nutrition & Ingredients
          </Link>
          <Link href="/#order" onClick={(e) => handleNavClick(e, "#order")} className="hover:text-emerald-700 transition-colors">
            Pre-Order
          </Link>
        </nav>

        {/* Right Actions (Desktop CTA + Mobile Menu Button) */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <Link
            href="/#order"
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
            aria-expanded={mobileMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileMenuOpen ? "close" : "open"}
                className="block"
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-800" /> : <Menu className="w-5 h-5 text-stone-800" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop (tap to close) */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-stone-900/20 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.nav
              key="panel"
              aria-label="Mobile navigation"
              className="fixed inset-x-4 top-20 z-40 origin-top overflow-hidden rounded-3xl bg-[#FAF8F5] border border-stone-200/90 shadow-2xl shadow-stone-900/15 md:hidden"
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {/* Soft brand glow */}
              <div aria-hidden className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-emerald-200/40 blur-3xl pointer-events-none" />

              <div className="relative p-3">
                <ul className="flex flex-col pt-1">
                  {mobileLinks.map((l) => (
                    <motion.li key={l.href} variants={itemVariants}>
                      <Link
                        href={l.href}
                        onClick={(e) => (l.target ? handleNavClick(e, l.target) : setMobileMenuOpen(false))}
                        className="group flex items-center gap-3 min-[360px]:gap-4 rounded-2xl px-3 min-[360px]:px-4 py-3.5 text-left hover:bg-emerald-50 active:bg-emerald-100/70 transition-colors"
                      >
                        <span className="flex-1 min-w-0 whitespace-nowrap text-base min-[360px]:text-lg font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">{l.label}</span>
                        <ArrowUpRight className="w-4 h-4 shrink-0 text-stone-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <motion.div variants={ctaVariants} className="mt-2 p-1">
                  <Link
                    href="/#order"
                    onClick={(e) => handleNavClick(e, "#order")}
                    className="w-full py-3.5 rounded-2xl font-bold text-xs tracking-wider uppercase text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 active:scale-[0.98] transition-transform"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    BUY NOW
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

