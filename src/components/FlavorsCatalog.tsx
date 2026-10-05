"use client";

/**
 * FlavorsCatalog Component (White Cream Theme)
 * Full flavor lineup for the /flavors page.
 * - Mobile: single column (can on top, details below).
 * - Tablet / Desktop: two columns, alternating can left / right per flavor.
 * Animated with Framer Motion (scroll-in reveals, floating cans).
 */
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { flavors } from "@/data/flavors";

const ease = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function FlavorsCatalog() {
  const lenis = useLenis();

  // Arriving from the home page, Lenis would keep the old scroll position: always open at the top
  // (unless a flavour anchor like /flavors#citrus was requested).
  useEffect(() => {
    // Stop the browser restoring the old position on refresh (avoids a flash mid-page)
    window.history.scrollRestoration = "manual";
    if (window.location.hash) return;
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [lenis]);

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 px-4 md:px-6 lg:px-20 text-stone-900">
      {/* Lightweight static ambient glows */}
      <div aria-hidden className="absolute -top-20 -left-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-emerald-200/30 blur-2xl pointer-events-none" />
      <div aria-hidden className="absolute top-40 -right-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-amber-200/30 blur-2xl pointer-events-none" />

      {/* PAGE HEADER */}
      <motion.header
        className="relative text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          variants={rise}
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[0.95]"
        >
          Find Your{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900">
            Flavour
          </span>
        </motion.h1>
        <motion.p variants={rise} className="text-stone-600 text-sm sm:text-lg mt-4 leading-relaxed font-medium">
          Three botanical sparkling waters, zero sugar, real fruit essence. Pick your favourite or try them all.
        </motion.p>

        {/* Quick jump chips */}
        <motion.div variants={rise} className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
          {flavors.map((f) => (
            <a
              key={f.id}
              href={`#${f.id}`}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm font-semibold transition-transform hover:scale-105 ${f.theme.chip}`}
            >
              {f.name}
            </a>
          ))}
        </motion.div>
      </motion.header>

      {/* FLAVOR ROWS */}
      <div className="relative flex flex-col gap-10 sm:gap-14 lg:gap-20 max-w-7xl mx-auto">
        {flavors.map((f, idx) => {
          const reversed = idx % 2 === 1;
          return (
            <motion.article
              key={f.id}
              id={f.id}
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className={`scroll-mt-28 grid grid-cols-1 md:grid-cols-2 items-center gap-6 sm:gap-8 lg:gap-16 rounded-3xl bg-white/95 border ${f.theme.border} p-5 sm:p-8 lg:p-12 shadow-lg shadow-stone-900/5 overflow-hidden`}
            >
              {/* Can visual */}
              <motion.div
                variants={rise}
                className={`relative w-full h-[300px] sm:h-[380px] md:h-[400px] lg:h-[500px] rounded-2xl ${f.theme.softBg} overflow-hidden ${reversed ? "md:order-last" : ""}`}
              >
                <div aria-hidden className={`absolute inset-0 m-auto w-2/3 h-2/3 rounded-full ${f.theme.glow} blur-3xl`} />

                {/* Sketch accents: top-right & bottom-left */}
                <div aria-hidden className="absolute -top-3 -right-3 w-24 sm:w-32 lg:w-40 aspect-square opacity-80">
                  <Image src={f.sketchImage} alt="" fill sizes="160px" className="object-contain" />
                </div>
                <div aria-hidden className="absolute -bottom-3 -left-3 w-24 sm:w-32 lg:w-40 aspect-square opacity-80 rotate-180">
                  <Image src={f.sketchImage} alt="" fill sizes="160px" className="object-contain" />
                </div>

                <motion.div
                  className="absolute inset-0 m-auto h-[85%] aspect-[7/10]"
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.4 }}
                >
                  <Image
                    src={f.image}
                    alt={`${f.name} can`}
                    fill
                    sizes="(max-width: 768px) 60vw, 30vw"
                    className="object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.14)]"
                    priority={idx === 0}
                  />
                </motion.div>
              </motion.div>

              {/* Details */}
              <div className="flex flex-col items-start text-left">
                <motion.span variants={rise} className="text-xs font-mono text-stone-400">
                  FLAVOUR 0{idx + 1}
                </motion.span>
                <motion.h2
                  variants={rise}
                  className={`text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none mt-2 ${f.theme.text}`}
                >
                  {f.name}
                </motion.h2>
                <motion.p variants={rise} className="text-stone-800 font-semibold text-sm sm:text-base mt-3">
                  {f.tagline}
                </motion.p>
                <motion.p variants={rise} className="text-stone-600 text-sm sm:text-base leading-relaxed mt-3">
                  {f.description}
                </motion.p>

                <motion.div variants={rise} className="flex flex-nowrap gap-1 min-[360px]:gap-1.5 sm:gap-2 mt-5">
                  {f.notes.map((n) => (
                    <span key={n} className={`whitespace-nowrap px-2 min-[360px]:px-2.5 sm:px-3 py-1 rounded-full border text-[10px] min-[360px]:text-[11px] sm:text-xs font-semibold ${f.theme.chip}`}>
                      {n}
                    </span>
                  ))}
                </motion.div>

                <motion.dl variants={rise} className="grid grid-cols-3 gap-2 sm:gap-3 w-full mt-6">
                  {f.specs.map((s) => (
                    <div key={s.label} className="rounded-2xl bg-stone-50 border border-stone-200/80 px-2 sm:px-4 py-3 text-center">
                      <dt className="text-[10px] sm:text-xs font-mono uppercase text-stone-500">{s.label}</dt>
                      <dd className="text-lg sm:text-2xl font-black text-stone-900 mt-0.5">{s.value}</dd>
                    </div>
                  ))}
                </motion.dl>

                <motion.div variants={rise} className="w-full sm:w-auto mt-7">
                  <Link
                    href="/#order"
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 whitespace-nowrap px-4 sm:px-6 py-3 rounded-xl font-bold text-[11px] sm:text-xs tracking-wide sm:tracking-wider uppercase text-white bg-gradient-to-r ${f.theme.button} shadow-md hover:opacity-95 hover:scale-105 transition-all`}
                  >
                    <ShoppingBag className="w-4 h-4 shrink-0" />
                    Pre-Order {f.name}
                  </Link>
                </motion.div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Back home */}
      <div className="relative flex justify-center mt-12 sm:mt-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-stone-300 bg-white/80 text-stone-800 font-bold text-xs tracking-wider uppercase hover:border-emerald-600/50 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </section>
  );
}
