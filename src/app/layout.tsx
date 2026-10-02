import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SIP FRESH — Premium Organic Botanical Beverage | Awwwards Showcase",
  description: "High-performance organic sparkling beverage experience with smooth Lenis inertia scroll, GSAP ScrollTrigger pinning, and 3D visual physics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-emerald-600 selection:text-white`}
    >
      <body
        suppressHydrationWarning
        className="bg-[#FAF8F5] text-stone-900 min-h-screen font-sans overflow-x-hidden"
      >
        {children}
      </body>
    </html>
  );
}
