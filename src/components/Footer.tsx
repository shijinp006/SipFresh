"use client";

/**
 * Footer Component (White Cream Theme)
 * Minimalist footer using Next.js Link, Lenis scroll-to-top, and Framer Motion animations.
 */
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const footerLinks = [
  { href: "/#hero", label: "Overview" },
  { href: "/#flavors", label: "Flavors" },
  { href: "/#specs", label: "Ingredients" },
];

export default function Footer() {
  const lenis = useLenis();
  const isHome = usePathname() === "/";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    // On other pages, let the Link navigate to the home page section
    if (!isHome) return;
    e.preventDefault();

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
    <footer className="relative overflow-hidden bg-[#F5F2EC] py-12 px-4 md:px-6 lg:px-20 text-stone-900 select-none">
      <div className="relative">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start">
            <div className="text-center md:text-left">
              <span className="font-black text-2xl tracking-tighter text-stone-900 block">SIP FRESH</span>
              <span className="text-xs text-stone-500 font-mono">ORGANIC BOTANICAL BEVERAGE</span>
            </div>
          </div>

          {/* Links using Next.js Link component */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm font-semibold text-stone-600">
            {footerLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={(e) => handleNavClick(e, l.href.slice(1))} className="hover:text-emerald-700 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full mt-10 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-center md:justify-between gap-4 text-xs font-mono text-stone-500 text-center md:text-left">
          <p>© 2026 SIP FRESH INC. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
