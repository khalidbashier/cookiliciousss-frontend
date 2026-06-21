"use client";

import * as React from "react";
import Link from "next/link";

export default function CateringPage() {
  return (
    <main className="min-h-screen bg-[#620f07] text-zinc-900 antialiased">
      
      {/* 🎀 LAYER 1: IMMERSIVE SIGNATURE CATERING HERO BANNER (Perfect Balanced Zoom) */}
      <section 
        className="w-full pt-32 pb-20 md:py-40 relative overflow-hidden px-6 md:px-12 flex items-center bg-no-repeat min-h-[75vh]"
        style={{ 
          backgroundImage: "url('/IMG_0540.jpg')",
          // Tailored zoom to capture the close-cropped look from IMG_0540_2.jpg
          backgroundSize: "135% auto",
          backgroundPosition: "center 30%"
        }}
      >
        {/* Premium Layer Mask Overlay: Darkens the background dynamically so text pops perfectly */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-[#620f07]/45 z-0 pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          
          {/* Main Left-aligned Content Block */}
          <div className="space-y-6 text-left max-w-xl">
            <h1 className="text-5xl md:text-7xl font-sans font-black tracking-tight text-white drop-shadow-md">
              Catering
            </h1>
            <p className="text-sm md:text-base font-bold text-stone-100/95 leading-relaxed drop-shadow-sm">
              Transform every occasion into a sweet celebration. Just coordinate your custom batch selections, tell us about your guest headcount, and schedule your order in a few clicks.
            </p>
            
            {/* Action buttons matching the signature split look */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/box"
                className="bg-white text-[#620f07] py-3 px-6 rounded-full font-black text-xs tracking-widest uppercase shadow-lg hover:bg-zinc-50 active:scale-95 transition-all duration-200"
              >
                Start a Catering Order
              </Link>
              <Link
                href="#schedule-info"
                className="bg-transparent text-white border-2 border-white/60 backdrop-blur-sm py-2.5 px-6 rounded-full font-black text-xs tracking-widest uppercase hover:border-white hover:bg-white/10 active:scale-95 transition-all duration-200 shadow-md"
              >
                Learn More
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 📅 LAYER 2: "SCHEDULE AHEAD" PRODUCT FEATURE ROW */}
      <section id="schedule-info" className="w-full bg-white py-24 pb-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Left Block: Kiosk Showcase Collage Canvas */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square bg-gradient-to-tr from-amber-50 to-rose-50 rounded-[2.5rem] p-8 flex items-center justify-center border border-zinc-100 shadow-sm group">
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&h=800&q=80"
                  alt="Kitchen Preparation Theatre"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
              </div>
            </div>
          </div>

          {/* Right Block: Content info copy rows and action links */}
          <div className="w-full md:w-1/2 space-y-6 text-left">
            <h2 className="text-4xl md:text-5xl font-sans font-black tracking-tight text-black leading-none">
              Schedule Ahead
            </h2>
            
            <div className="space-y-4 text-base text-zinc-600 font-medium leading-relaxed max-w-xl">
              <p>
                Need a mountain of cookies for an upcoming event? Place a bulk order in advance and make your gathering an absolute hit! Whether it's a corporate event, a birthday bash, or a family reunion, we've got you covered with a wide variety of flavor options tailored for your gatherings.
              </p>
              <p>
                Every single cookie is baked fresh on-site behind our glass service panels, ensuring your order arrives with maximum gooey crunch and premium theater presentation.
              </p>
            </div>

            {/* Bottom action triggers */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/box"
                className="bg-black text-white py-3.5 px-8 rounded-full font-black text-xs tracking-widest uppercase shadow-md hover:bg-zinc-900 active:scale-95 transition-all duration-200"
              >
                Start an Order
              </Link>
              <Link
                href="/#flavors"
                className="bg-white text-black border-2 border-zinc-200 py-3 px-8 rounded-full font-black text-xs tracking-widest uppercase hover:border-black active:scale-95 transition-all duration-200"
              >
                View Menu Options
              </Link>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}