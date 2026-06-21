"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    // Base layout styled in the bright minimalist white design language
    <main className="min-h-screen bg-white text-zinc-900 antialiased pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER TRACKING LABEL */}
        <div className="text-center md:text-left mb-12">
          <span className="text-xs font-black uppercase tracking-[0.35em] text-[#620f07]">
            Who We Are
          </span>
          <h1 className="text-5xl md:text-6xl font-sans font-black tracking-tight text-black mt-2">
            Our Story.
          </h1>
        </div>

        {/* CONTRAST PANEL GRID SYSTEM */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* 📸 LEFT COLUMN: YOUR ATTACHED GRADUATION PHOTO CANVAS */}
          <div className="w-full lg:w-[45%] flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-zinc-100 group">
              <Image
                // Pulls directly from your public/about-us.jpg endpoint
                src="/about-us.jpg"
                alt="Cookiliciousss Founders"
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                sizes="(max-w-768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* 📝 RIGHT COLUMN: CHRONOLOGICAL PASSION NARRATIVE */}
          <div className="w-full lg:w-[55%] space-y-6 md:space-y-8 text-left">
            
            <div className="space-y-4">
              {/* FIXED COMPONENT: Stripped lowercase utility so font capitalizes properly */}
              <h2 className="text-3xl md:text-4xl font-sans font-black tracking-tight text-zinc-900 leading-tight">
                From a 3rd year hustle to a lifelong mission.
              </h2>
              <div className="h-1 w-20 bg-[#620f07] rounded-full" />
            </div>

            <div className="space-y-6 text-base md:text-lg text-zinc-600 font-medium leading-relaxed">
              <p>
                Cookiliciousss didn't start in a corporate boardroom or a professional test kitchen. It started right in the middle of my <strong className="text-black font-black">third year of university</strong>. What began as a small, late-night side hustle to make some extra money on the side quickly turned into something much bigger. 
              </p>
              
              <p>
                Every hour spent balancing lecture halls and flour-dusted countertops made one thing absolutely undeniable: baking wasn't just a hobby to pay the bills. It was a true creative passion. I realized that crafting premium, oversized, experiential cookies was exactly what I wanted to pursue for the rest of my life.
              </p>

              <p>
                To bring this full-scale vision of theater-style baking to life, I teamed up with my partner and co-visionary, <strong className="text-[#620f07] font-black">Ahmed Alrayah</strong>. Together, we redesigned our recipes, expanded our culinary horizons, and committed to building a gourmet experience centered around premium quality and unforgettable live baking.
              </p>

              <p>
                Today, Cookiliciousss has grown from those original late-night university batches into a permanent pursuit of indulgence. We pour our hearts into every single stuffed center, melted chocolate puddle, and live-baked sheet behind our glass window panels.
              </p>
            </div>

            {/* CALL TO ACTION BUTTON HUB */}
            <div className="pt-4">
              <Link 
                href="/#flavors"
                className="inline-block text-center bg-[#620f07] text-white py-4 px-8 rounded-full font-black text-xs tracking-widest uppercase shadow-md hover:bg-[#4a0b05] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                See what we are baking today
              </Link>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}