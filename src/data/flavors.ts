/**
 * Flavor catalog used by the /flavors page.
 * Tailwind class strings are written out in full so the compiler can detect them.
 */
export interface Flavor {
  id: string;
  name: string;
  tagline: string;
  description: string;
  notes: string[];
  image: string;
  sketchImage: string;
  specs: { label: string; value: string }[];
  theme: {
    text: string;
    softBg: string;
    border: string;
    chip: string;
    glow: string;
    button: string;
  };
}

export const flavors: Flavor[] = [
  {
    id: "green-apple",
    name: "Crisp Green Apple",
    tagline: "Tart, Refreshing, Pure Orchard Extract",
    description:
      "Cold-pressed green apples meet fine micro-bubbles for a bright, tangy sip that wakes up your palate without a gram of added sugar.",
    notes: ["Tart Apple", "Fresh Orchard", "Clean Finish"],
    image: "/images/green_apple_nobg.webp",
    sketchImage: "/images/green_apple_sketch.webp",
    specs: [
      { label: "Calories", value: "0" },
      { label: "Sugar", value: "0g" },
      { label: "Potassium", value: "180mg" },
    ],
    theme: {
      text: "text-emerald-700",
      softBg: "bg-emerald-50",
      border: "border-emerald-600/20",
      chip: "bg-emerald-100/80 text-emerald-800 border-emerald-600/20",
      glow: "bg-emerald-200/50",
      button: "from-emerald-600 via-teal-600 to-emerald-800 shadow-emerald-600/20",
    },
  },
  {
    id: "blueberry",
    name: "Midnight Blueberry",
    tagline: "Rich Violet Antioxidants & Wild Essence",
    description:
      "Wild blueberry essence layered over volcanic mineral water. Deep, juicy and smooth, with antioxidants in every can.",
    notes: ["Wild Berry", "Velvety", "Deep Violet"],
    image: "/images/blueberry_nobg.webp",
    sketchImage: "/images/blueberry_sketch.webp",
    specs: [
      { label: "Calories", value: "0" },
      { label: "Sugar", value: "0g" },
      { label: "Potassium", value: "210mg" },
    ],
    theme: {
      text: "text-indigo-700",
      softBg: "bg-indigo-50",
      border: "border-indigo-600/20",
      chip: "bg-indigo-100/80 text-indigo-800 border-indigo-600/20",
      glow: "bg-indigo-200/50",
      button: "from-indigo-600 via-violet-600 to-indigo-800 shadow-indigo-600/20",
    },
  },
  {
    id: "citrus",
    name: "Citrus Fusion",
    tagline: "Zesty Grapefruit & Electric Sunshine Lemon",
    description:
      "Sun-ripened grapefruit and lemon zest collide in a sparkling burst of sunshine. Zesty up front, crisp and light at the end.",
    notes: ["Grapefruit", "Lemon Zest", "Sparkling"],
    image: "/images/citrus_nobg.webp",
    sketchImage: "/images/citrus_sketch.webp",
    specs: [
      { label: "Calories", value: "0" },
      { label: "Sugar", value: "0g" },
      { label: "Potassium", value: "195mg" },
    ],
    theme: {
      text: "text-amber-600",
      softBg: "bg-amber-50",
      border: "border-amber-600/20",
      chip: "bg-amber-100/80 text-amber-800 border-amber-600/20",
      glow: "bg-amber-200/50",
      button: "from-amber-500 via-orange-500 to-amber-700 shadow-amber-600/20",
    },
  },
];
