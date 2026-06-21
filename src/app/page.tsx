"use client";

import * as React from "react";
import Link from "next/link"; 
import { GooeyTextDemo } from "@/components/ui/demo";

const COOKIE_MENU = [
  {
    id: "01",
    slug: "biscoff-lava", 
    name: "Biscoff Lava", 
    desc: "A warm, decadent Biscoff cookie core nestled inside our signature dough, topped with crispy speculoos crumbs and a rich drizzle of cookie butter cream.",
    img: "/Biscoff.png", 
    activeBg: "bg-[#b45f06]", 
    textColor: "text-white"
  },
  {
    id: "02",
    slug: "cookies-cream",
    name: "Cookies and Cream",
    desc: "A thick vanilla bean dough loaded with crushed Oreo pieces and pockets of rich white chocolate cream chunks that melt beautifully with every single bite.",
    img: "/width_336.webp", 
    activeBg: "bg-[#999896]", 
    textColor: "text-black"
  },
  {
    id: "03",
    slug: "fudgy-brownie",
    name: "Fudgy Brownie",
    desc: "An ultra-rich, deeply decadent chocolate cookie packed with premium fudgy chunks, premium chocolate swirls, and topped with flaky sea salt.",
    img: "/fudgy-brownie.png", 
    activeBg: "bg-[#4a3525]", 
    textColor: "text-white"
  },
  {
    id: "04",
    slug: "red-velvet",
    name: "Red Velvet",
    desc: "Vibrant, classic premium red velvet cake dough baked with a velvety structure, packed heavily with sweet white chocolate chips and a cream cheese swirl core.",
    img: "/red-velvet.png", 
    activeBg: "bg-[#fff7D1]", 
    textColor: "text-black"
  }
];

export default function Home() {
  const [activeFlavor, setActiveFlavor] = React.useState<number | null>(null);

  return (
    <main className="bg-white text-zinc-900 antialiased min-h-screen flex flex-col justify-between">
      
      <div>
        {/* 📺 Immersive Landing Hero Stage */}
        <section className="relative w-full h-[85vh] min-h-[650px] pt-32 pb-16 flex items-center justify-center overflow-hidden bg-[#620f07]">
          <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
            <img 
              src="/IMG_5018.jpg" 
              alt="Cookiliciousss Extended Canvas"
              className="w-full h-full object-cover scale-105 brightness-[0.5] contrast-[1.05]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-white" />
          <div className="relative z-10 w-full flex items-center justify-center py-4">
            <GooeyTextDemo />
          </div>
        </section>

        {/* 🍪 Core Brand Dynamic Section Head */}
        <section id="flavors" className="pt-24 pb-8 text-center scroll-mt-12 bg-white">
          <h2 className="text-xs font-sans font-black uppercase tracking-[0.35em] text-zinc-400">
            Our Weekly Flavors
          </h2>
        </section>

        {/* 🥞 THE UN-SEGREGATED FULL-WIDTH COLOR INTERACTIVE CANVAS LIST */}
        <div className="w-full flex flex-col">
          {COOKIE_MENU.map((cookie, idx) => {
            const isSelected = activeFlavor === idx;
            const isEven = idx % 2 === 0;

            return (
              <section
                key={cookie.id}
                onClick={() => setActiveFlavor(isSelected ? null : idx)}
                onMouseEnter={() => setActiveFlavor(idx)}
                onMouseLeave={() => setActiveFlavor(null)}
                className={`w-full transition-all duration-500 ease-in-out cursor-pointer py-16 md:py-24 px-6 md:px-12 flex items-center justify-center border-b border-zinc-100/80 last:border-0 ${
                  isSelected ? cookie.activeBg : "bg-white"
                }`}
              >
                <div className={`max-w-6xl w-full flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center justify-between gap-12 md:gap-16`}>
                  
                  {/* 📝 DESCRIPTION CONTENT SUB-PANEL */}
                  <div className="w-full md:w-1/2 space-y-6 md:space-y-8 text-left">
                    <div className="space-y-3">
                      <h3 className={`text-4xl md:text-5xl lg:text-6xl font-sans font-black tracking-tight leading-none transition-colors duration-300 ${
                        isSelected ? cookie.textColor : "text-black"
                      }`}>
                        {cookie.name}
                      </h3>
                    </div>

                    <p className={`text-sm md:text-base font-medium leading-relaxed max-w-lg transition-colors duration-300 ${
                      isSelected ? cookie.textColor : "text-zinc-500"
                    }`}>
                      {cookie.desc}
                    </p>

                    {/* Clean Action Button Hub Layout */}
                    <div className="pt-4 flex items-center gap-4">
                      <Link 
                        href={`/flavors/${cookie.slug}`}
                        onClick={(e) => e.stopPropagation()} 
                        className={`inline-block text-center py-3.5 px-8 rounded-full font-black text-xs tracking-widest uppercase transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 ${
                          isSelected 
                            ? "bg-black text-white hover:bg-zinc-900 shadow-md" 
                            : "bg-transparent text-black border-2 border-black/20 hover:border-black"
                        }`}
                      >
                        explore our indulgence
                      </Link>
                    </div>
                  </div>

                  {/* 🍪 ORGANIC IMAGE CONTAINER CANVAS PANEL */}
                  <div className="w-full md:w-1/2 flex items-center justify-center">
                    <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[420px] lg:h-[420px] transition-transform duration-500 transform group-hover:scale-105 flex items-center justify-center">
                      <img 
                        src={cookie.img} 
                        alt={cookie.name}
                        className={`object-contain select-none pointer-events-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.15)] transition-transform duration-500 ${
                          cookie.slug === "cookies-cream" 
                            ? "w-[96%] h-[96%] scale-108" 
                            : cookie.slug === "red-velvet"
                            ? "w-[100%] h-[100%] scale-113" 
                            : "w-[90%] h-[90%]"
                        }`}
                      />
                    </div>
                  </div>

                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* 👑 PREMIUM CARVED BRAND FOOTER SECTION */}
      {/* Fixed: Carving SVG divider block completely removed for a sleek, straight flat upper rule */}
      <footer className="relative w-full bg-[#620f07] text-amber-50 antialiased pt-24 pb-12 select-none border-t border-black/5">

        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 items-start text-left">
          
          {/* COLUMN 1: LOWERCASE BRAND TITLE */}
          <div className="space-y-6 md:col-span-2">
            <h2 className="text-4xl font-sans font-black tracking-tighter text-white uppercase">
              cookiliciousss
            </h2>
            <p className="text-amber-100/70 text-xs font-medium leading-relaxed max-w-sm">
              Crafting giant, thick gourmet cookie concepts packed with molten core centers and premium inclusions. Baked fresh, delivered straight to your door.
            </p>
            
            <div className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#620f07] transition-all duration-300 text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#620f07] transition-all duration-300 text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.73 4.1 1.13 1.08 2.66 1.64 4.23 1.71v3.31c-1.16-.02-2.31-.32-3.32-.91-.77-.45-1.41-1.07-1.89-1.81L17.11 15c-.15 2.13-1.2 4.12-2.91 5.37-1.79 1.34-4.14 1.73-6.26 1.05-2.11-.66-3.83-2.28-4.57-4.35-.76-2.14-.4-4.56.98-6.35 1.43-1.88 3.79-2.87 6.13-2.61v3.42c-1.31-.16-2.66.31-3.51 1.32-.82.97-.99 2.37-.44 3.5.53 1.13 1.68 1.87 2.93 1.88 1.29.02 2.5-.64 3.12-1.77.34-.63.48-1.34.45-2.05v-12.8c0-.65.01-1.3.01-1.95z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#620f07] transition-all duration-300 text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163c-.272-.98-1.04-1.755-2.008-2.03C19.716 3.5 12 3.5 12 3.5s-7.717 0-9.49.433c-.968.274-1.735 1.05-2.008 2.03C0 7.944 0 12 0 12s0 4.056.434 5.837c.272.98.44 1.755 2.008 2.03C4.283 20.5 12 20.5 12 20.5s7.717 0 9.49-.433c.968-.274 1.735-1.05 2.008-2.03C24 16.056 24 12 24 12s0-4.056-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* COLUMN 2: EXPLORE LINKS */}
          <div className="space-y-4">
            <h4 className="text-white text-base font-sans font-black uppercase tracking-tight">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li><Link href="/" className="hover:text-white text-amber-100/70 transition-colors">Home</Link></li>
              <li><Link href="#flavors" className="hover:text-white text-amber-100/70 transition-colors">Our Menu</Link></li>
              <li><Link href="/box" className="hover:text-white text-amber-100/70 transition-colors">Build a Box</Link></li>
              <li><Link href="/about" className="hover:text-white text-amber-100/70 transition-colors">Who We Are</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: HELP & LEGAL LINKS */}
          <div className="space-y-4">
            <h4 className="text-white text-base font-sans font-black uppercase tracking-tight">
              Help & Legal
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li><a href="#" className="hover:text-white text-amber-100/70 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white text-amber-100/70 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white text-amber-100/70 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM RIGHTS ATTRIBUTION STRIP */}
        <div className="max-w-6xl mx-auto px-8 mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-amber-100/40 uppercase tracking-[0.15em]">
          <p>© 2026 Cookiliciousss Desserts. All Rights Reserved.</p>
          <p>Baked with love globally</p>
        </div>

      </footer>

    </main>
  );
}