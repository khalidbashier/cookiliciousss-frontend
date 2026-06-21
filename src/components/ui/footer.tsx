"use client";

import * as React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full flex flex-col bg-white">
      
      {/* 📱 TOP SEGMENT: Pristine White Social Media Matrix Row */}
      <div className="w-full h-20 flex items-center justify-center gap-6 border-t border-zinc-100">
        
        {/* Instagram Profile Trigger */}
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-black hover:opacity-70 active:scale-90 transition-all duration-200"
          aria-label="Instagram"
        >
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>

        {/* Facebook Route */}
        <a 
          href="https://facebook.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-black hover:opacity-70 active:scale-90 transition-all duration-200"
          aria-label="Facebook"
        >
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0 -5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        </a>

        {/* TikTok Route */}
        <a 
          href="https://tiktok.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-black hover:opacity-70 active:scale-90 transition-all duration-200"
          aria-label="TikTok"
        >
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
          </svg>
        </a>

        {/* X (Twitter) Route */}
        <a 
          href="https://x.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-black hover:opacity-70 active:scale-90 transition-all duration-200"
          aria-label="X (Twitter)"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.056-4.425 5.056H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.6.75zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633z"/>
          </svg>
        </a>

      </div>

      {/* ========================================================================= */}
      {/* 🎪 BOTTOM SEGMENT: Massive Signature Burgundy Brand Banner Panel */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#620f07] text-white py-16 px-4 flex flex-col items-center justify-center text-center shadow-inner">
        
        {/* Core Brand Circular Identity Logo */}
        <div className="mb-6 flex items-center justify-center select-none pointer-events-none">
          <img 
            src="/1.png" 
            alt="cookiliciousss logo" 
            className="w-24 h-24 object-cover rounded-full shadow-xl border border-white/10"
            onError={(e) => {
              // Graceful fallback structure if local asset isn't mounted yet
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent && !parent.querySelector('.text-brand-fallback')) {
                const textSpan = document.createElement('span');
                textSpan.className = 'text-brand-fallback font-sans font-black text-5xl lg:text-6xl tracking-tighter text-white block lowercase';
                textSpan.innerText = 'cookiliciousss';
                parent.appendChild(textSpan);
              }
            }}
          />
        </div>

        {/* Informative Fine Print Copyright & Map Citation details */}
        <div className="space-y-2 max-w-2xl text-[11px] font-medium tracking-wide text-white/60 font-sans">
          <p className="flex flex-wrap items-center justify-center gap-1.5 leading-relaxed">
            <span>© {new Date().getFullYear()} cookiliciousss all rights reserved.</span>
            <span className="hidden sm:inline opacity-30">|</span>
            <span>Map data © OpenStreetMap contributors</span>
          </p>
          
          {/* Regulatory Navigation Hyperlinks mapped seamlessly underneath */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 pt-1 text-white/50">
            <Link href="/privacy" className="hover:text-white transition-colors duration-150">Privacy policy</Link>
            <span className="opacity-20">•</span>
            <Link href="/terms" className="hover:text-white transition-colors duration-150">Terms and Conditions</Link>
            <span className="opacity-20">•</span>
            <Link href="/voucher-terms" className="hover:text-white transition-colors duration-150">Gift Card/Voucher Terms</Link>
            <span className="opacity-20">•</span>
            <Link href="/cookie-preferences" className="hover:text-white transition-colors duration-150">Cookie Preferences</Link>
          </div>
        </div>

      </div>

    </footer>
  );
}