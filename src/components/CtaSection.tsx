"use client";

/**
 * CtaSection Component (White Cream Theme)
 * Pre-order selection interface with pack options and order feedback.
 * Animated with Framer Motion (scroll-in reveals, floating glows, button shine, spring selection).
 */
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ShoppingBag, Check, Sparkles, Truck, RefreshCw } from "lucide-react";

const packOptions = [
  { count: 12, label: "12-Pack Variety", price: "$29.99", discount: "Popular" },
  { count: 24, label: "24-Pack Variety", price: "$49.99", discount: "Save 20%" },
  { count: 48, label: "48-Pack Master Case", price: "$89.99", discount: "Best Value" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function CtaSection() {
  const [selectedPack, setSelectedPack] = useState(12);
  const [ordered, setOrdered] = useState(false);

  const handleOrder = () => {
    setOrdered(true);
    setTimeout(() => setOrdered(false), 4000);
  };

  return (
    <section id="order" className="pt-8 pb-20 px-4 md:px-6 lg:px-20 text-stone-900 select-none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease }}
        className="rounded-3xl bg-white/95 border border-stone-200/90 p-8 sm:p-14 relative overflow-hidden shadow-lg shadow-stone-900/5"
      >
        {/* Lightweight static ambient glows */}
        <div
          aria-hidden
          className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-100/40 rounded-full blur-2xl pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute -bottom-24 -left-20 w-96 h-96 bg-amber-100/40 rounded-full blur-2xl pointer-events-none"
        />

        <motion.div
          className="relative"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.span
              variants={rise}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase bg-emerald-100/80 border border-emerald-600/20 px-4 py-1.5 rounded-full shadow-sm"
            >
              <motion.span
                className="inline-flex"
                animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.25, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              </motion.span>
              DIRECT TO YOUR DOORSTEP
            </motion.span>
            <motion.h2 variants={rise} className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[0.95] mt-4 text-stone-900">
              Ready to Sip{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900">
                Better?
              </span>
            </motion.h2>
            <motion.p variants={rise} className="text-stone-600 text-xs sm:text-base mt-3 font-medium">
              Select your preferred pack size below. Free expedited cold shipping on all orders over $40.
            </motion.p>
          </div>

          {/* Pack Selector */}
          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {packOptions.map((pack) => {
              const active = selectedPack === pack.count;
              return (
                <motion.div
                  key={pack.count}
                  variants={rise}
                  onClick={() => setSelectedPack(pack.count)}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.97 }}
                  className={`p-6 rounded-2xl border cursor-pointer flex flex-col justify-between relative transition-colors ${
                    active
                      ? "bg-stone-50 border-emerald-600 shadow-lg shadow-emerald-600/10"
                      : "bg-white border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-mono text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-md border border-emerald-600/20">
                      {pack.discount}
                    </span>
                    {active && (
                      <motion.span
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <Check className="w-5 h-5 text-emerald-700" />
                      </motion.span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-stone-900">{pack.label}</h4>
                    <div className="text-3xl font-extrabold text-stone-900 mt-2">{pack.price}</div>
                  </div>

                  <p className="text-xs text-stone-500 mt-4 pt-3 border-t border-stone-200/80 font-mono">
                    Assorted Green Apple, Blueberry & Citrus
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Checkout CTA Button */}
          <motion.div variants={rise} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            <motion.button
              onClick={handleOrder}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="relative overflow-hidden w-full sm:w-auto py-3.5 sm:py-4 px-4 sm:px-6 md:px-8 rounded-2xl font-extrabold text-[11px] sm:text-xs md:text-sm uppercase tracking-normal sm:tracking-wider text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 sm:gap-3 cursor-pointer whitespace-nowrap"
            >
              {/* Light sweep */}
              <motion.span
                aria-hidden
                className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none"
                initial={{ x: "-150%" }}
                animate={{ x: "400%" }}
                transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
              />
              {ordered ? (
                <>
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />
                  <span className="whitespace-nowrap">ORDER PLACED! REFRESHING SOON</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />
                  <span className="whitespace-nowrap">COMPLETE PRE-ORDER NOW</span>
                </>
              )}
            </motion.button>
          </motion.div>

          <motion.div
            variants={rise}
            className="flex flex-wrap items-center justify-center gap-8 mt-10 pt-6 border-t border-stone-200/80 text-xs font-mono text-stone-600"
          >
            <div className="flex items-center gap-2">
              <motion.span
                className="inline-flex"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Truck className="w-4 h-4 text-emerald-700" />
              </motion.span>
              <span>FREE 2-DAY COLD SHIPPING</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.span
                className="inline-flex"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="w-4 h-4 text-teal-700" />
              </motion.span>
              <span>100% MONEY-BACK GUARANTEE</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
