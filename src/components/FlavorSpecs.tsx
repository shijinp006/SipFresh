"use client";

/**
 * FlavorSpecs Component (White Cream Theme)
 * Highlights organic ingredients, nutrition highlights, and cold extraction specs.
 * Animated with Framer Motion (scroll-in reveals, floating glows, hover lift).
 */
import { motion, type Variants } from "framer-motion";
import { Leaf, ShieldCheck, Flame, Droplet, CheckCircle } from "lucide-react";

const specsList = [
  {
    icon: Leaf,
    title: "100% Cold-Pressed Organic",
    desc: "Single-origin fruit essences extracted below 38°F to preserve vital polyphenols and natural aromatics.",
    color: "from-emerald-600 to-teal-700",
  },
  {
    icon: ShieldCheck,
    title: "Zero Artificial Sugars",
    desc: "Naturally sweetened with real fruit botanical essence. No erythritol, no stevia aftertaste, 0 calories.",
    color: "from-teal-600 to-cyan-700",
  },
  {
    icon: Flame,
    title: "Volcanic Mineral Water Base",
    desc: "Sourced from ancient underground mineral springs rich in natural electrolytes, magnesium, and silica.",
    color: "from-amber-600 to-orange-700",
  },
  {
    icon: Droplet,
    title: "Micro-Carbonated Texture",
    desc: "Fine champagne-grade bubbles for a smooth velvet mouthfeel that enhances natural botanical notes.",
    color: "from-emerald-700 to-green-800",
  },
];

const headerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const riseVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function FlavorSpecs() {
  return (
    <section id="specs" className="relative overflow-hidden pt-20 pb-10 px-4 md:px-6 lg:px-20 text-stone-900 select-none">
      {/* Lightweight static ambient glows */}
      <div
        aria-hidden
        className="absolute -top-10 -left-24 w-96 h-96 rounded-full bg-emerald-200/30 blur-2xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-10 -right-24 w-96 h-96 rounded-full bg-amber-200/30 blur-2xl pointer-events-none"
      />

      <motion.div
        className="relative text-center mb-16"
        variants={headerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2
          variants={riseVariants}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900"
        >
          Crafted Without Compromise
        </motion.h2>
        <motion.p
          variants={riseVariants}
          className="text-stone-600 text-sm sm:text-lg mt-3 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Every can is engineered with clean, uncompromised botanical science to keep your body energized and refreshed.
        </motion.p>
      </motion.div>

      <motion.div
        className="relative grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {specsList.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="p-6 sm:p-10 rounded-3xl bg-white/95 border border-stone-200/90 hover:border-emerald-600/40 relative group overflow-hidden shadow-lg shadow-stone-900/5 hover:shadow-xl transition-[border-color,box-shadow,transform] duration-300"
            >
              <div className="flex items-center justify-between mb-5">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-md shadow-emerald-600/20`}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <span className="text-xs font-mono text-stone-400">SPEC 0{idx + 1}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2.5 flex items-center gap-2">
                {item.title}
                <CheckCircle className="w-5 h-5 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
