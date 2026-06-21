"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bike, ConciergeBell } from "lucide-react";

export default function StartOrderPage() {
  const router = useRouter();

  const handleSelection = (method: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cookiliciousss_fulfillment", method);
    }
    router.push("/box/build");
  };

  return (
    <div className="min-h-screen bg-stone-50/50 text-black font-sans flex flex-col justify-between pt-24">
      
      <main className="max-w-4xl mx-auto w-full px-6 py-12 flex-1 flex flex-col justify-center items-start">
        
        <h1 className="text-4xl md:text-5xl font-sans font-black tracking-tight text-stone-900 mb-8 uppercase">
          Start an Order
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          
          {/* DELIVERY CARD */}
          <button
            onClick={() => handleSelection("delivery")}
            className="bg-[#620f07] text-white p-8 rounded-3xl border-2 border-black flex flex-col items-center justify-center gap-4 h-64 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 group"
          >
            <Bike className="w-16 h-16 stroke-[1.5] text-amber-100 group-hover:scale-105 transition-transform" />
            <span className="text-2xl font-sans font-black tracking-tight uppercase">
              Delivery
            </span>
          </button>

          {/* PICKUP CARD */}
          <button
            onClick={() => handleSelection("pickup")}
            className="bg-[#620f07] text-white p-8 rounded-3xl border-2 border-black flex flex-col items-center justify-center gap-4 h-64 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 group"
          >
            <div className="w-16 h-16 flex items-center justify-center text-amber-100 group-hover:scale-105 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <path d="M9 22V12h6v10"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10H8a15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <span className="text-2xl font-sans font-black tracking-tight uppercase">
              Pickup
            </span>
          </button>

          {/* CATERING CARD */}
          <button
            onClick={() => handleSelection("catering")}
            className="bg-white text-black p-6 rounded-3xl border-2 border-black flex flex-col sm:flex-row items-center justify-center gap-4 md:col-span-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 group"
          >
            <ConciergeBell className="w-6 h-6 text-stone-700 group-hover:rotate-12 transition-transform" />
            <span className="text-lg font-sans font-black tracking-tight uppercase">
              Catering
            </span>
          </button>

        </div>

      </main>

      {/* 👑 PREMIUM BRAND FOOTER SECTION */}
      <footer className="relative w-full bg-[#620f07] text-amber-50 antialiased pt-16 pb-12 select-none border-t border-black/5">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 items-start text-left">
          <div className="space-y-4 md:col-span-2">
            <h2 className="text-4xl font-sans font-black tracking-tighter text-white uppercase lowercase">
              cookiliciousss
            </h2>
            <p className="text-amber-100/70 text-xs font-medium leading-relaxed max-w-sm">
              Crafting giant, thick gourmet cookie concepts packed with molten core centers and premium inclusions.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-white text-base font-sans font-black uppercase tracking-tight">Explore</h4>
            <ul className="space-y-2 text-sm font-semibold text-amber-100/70">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/#flavors" className="hover:text-white transition-colors">Our Menu</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-white text-base font-sans font-black uppercase tracking-tight">Help & Legal</h4>
            <ul className="space-y-2 text-sm font-semibold text-amber-100/70">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </footer>

    </div>
  );
}