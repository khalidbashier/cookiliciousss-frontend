"use client";

import * as React from "react";
import Link from "next/link";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

export function GooeyTextDemo() {
  return (
    <div className="w-full flex flex-col items-center justify-center px-4">
      
      {/* Immersive Playful Morph Loop Canvas */}
      <div className="w-full max-w-5xl min-h-[240px] flex items-center justify-center overflow-visible select-none">
        <GooeyText
          texts={["cookiliciousss", "don't forget to", "treat yourself."]}
          morphTime={1.2}
          cooldownTime={0.5}
          className="font-black tracking-tight overflow-visible"
          textClassName="text-white font-sans font-black drop-shadow-[0_4px_16px_rgba(0,0,0,0.3)] block overflow-visible tracking-wide"
        />
      </div>

      {/* Core Action Call To Action Buttons */}
      <div className="relative z-50 mt-2 flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-sm">
        <Link 
          href="/box" 
          className="w-full text-center bg-white text-[#620f07] px-8 py-4 rounded-full font-black text-xs tracking-widest uppercase shadow-xl transition-all duration-300 transform hover:bg-zinc-50 hover:-translate-y-0.5 hover:shadow-2xl active:scale-[0.97] cursor-pointer"
        >
          Build Your Box
        </Link>
        <button 
          onClick={() => {
            const el = document.getElementById("flavors");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="w-full text-center bg-transparent text-white border-2 border-white/30 backdrop-blur-sm px-8 py-3.5 rounded-full font-black text-xs tracking-widest uppercase transition-all duration-300 transform hover:bg-white/10 hover:border-white/80 hover:-translate-y-0.5 active:scale-[0.97] cursor-pointer"
        >
          See the Flavors
        </button>
      </div>

    </div>
  );
}