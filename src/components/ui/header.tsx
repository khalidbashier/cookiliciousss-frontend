"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  const isCateringPage = pathname === "/catering"; 

  const [isVisible, setIsVisible] = React.useState(true);
  const [isAtTop, setIsAtTop] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setIsAtTop(true);
        setIsVisible(true);
      } else {
        setIsAtTop(false);
        
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          setIsVisible(false);
        } 
        else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // SMART COLOR & VISUAL LOGIC UPDATED FOR CATERING INTEGRATION
  const getHeaderBackgroundStyle = () => {
    if (!isVisible) return "-translate-y-full bg-transparent";
    
    if (isAtTop) {
      if (isCateringPage) return "translate-y-0 bg-[#620f07] border-transparent shadow-none";
      if (isMainPage) return "translate-y-0 bg-transparent border-transparent shadow-none";
      return "translate-y-0 bg-transparent border-transparent shadow-none";
    }
    
    return "translate-y-0 bg-[#620f07] border-b border-black/10 shadow-md";
  };

  const getMenuTriggerStyle = () => {
    if (isAtTop) {
      if (isMainPage || isCateringPage) {
        return "text-white hover:text-stone-200 group-hover:text-stone-200";
      }
      return "text-[#620f07] hover:text-[#000000] group-hover:text-[#000000]";
    }
    return "text-white hover:text-black group-hover:text-black";
  };

  const getLogoStyle = () => {
    if (isAtTop) {
      if (isMainPage || isCateringPage) {
        return "text-white hover:text-stone-200 group-hover:text-stone-200";
      }
      return "text-[#620f07] hover:text-[#000000] group-hover:text-[#000000]";
    }
    return "text-white hover:text-black group-hover:text-black";
  };

  const getUnderlineStyle = () => {
    if (isAtTop) {
      if (isMainPage || isCateringPage) return "bg-white/60";
      return "bg-black";
    }
    return "bg-white";
  };

  const getOrderButtonStyle = () => {
    if (isAtTop) {
      if (isMainPage || isCateringPage) {
        return "bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#620f07] shadow-md";
      }
      return "bg-transparent text-[#620f07] border-2 border-[#620f07] hover:bg-[#620f07] hover:text-white shadow-sm";
    }
    return "bg-white text-[#620f07] hover:bg-zinc-50 hover:shadow-lg";
  };

  return (
    <>
      {/* 🧭 NAVIGATION HEADER BAR CONTAINER */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 w-full px-6 h-24 flex items-center transition-all duration-300 ease-in-out ${getHeaderBackgroundStyle()}`}
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-3 items-center">
          
          {/* 1. LEFT SIDE: Menu Action Toggle */}
          <div className="flex justify-start">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="group flex items-center gap-2 font-black text-xs uppercase tracking-widest cursor-pointer select-none pb-1 active:scale-95 drop-shadow-sm"
            >
              <svg 
                className={`w-5 h-5 transition-transform duration-500 cubic-bezier(0.25, 1, 0.5, 1) group-hover:translate-x-1 ${getMenuTriggerStyle()}`} 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <span className={`relative transition-colors duration-500 cubic-bezier(0.25, 1, 0.5, 1) ${getMenuTriggerStyle()}`}>
                Menu
                <span className={`absolute bottom-0 left-1/2 h-[2px] w-0 transition-all duration-500 cubic-bezier(0.25, 1, 0.5, 1) group-hover:left-0 group-hover:w-full ${getUnderlineStyle()}`} />
              </span>
            </button>
          </div>
          
          {/* 2. MIDDLE SIDE: Brand Identity Logo */}
          <div className="flex justify-center items-center">
            <Link 
              href="/" 
              className={`relative font-sans font-black text-3xl tracking-tighter select-none active:scale-95 transition-colors duration-500 cubic-bezier(0.25, 1, 0.5, 1) lowercase pb-1 group ${getLogoStyle()}`}
            >
              cookiliciousss
              <span className={`absolute bottom-0 left-1/2 h-[2.5px] w-0 transition-all duration-500 cubic-bezier(0.25, 1, 0.5, 1) group-hover:left-0 group-hover:w-full ${getUnderlineStyle()}`} />
            </Link>
          </div>
          
          {/* 3. RIGHT SIDE: Core Order Action Button */}
          <div className="flex justify-end">
            <Link 
              href="/box" 
              className={`px-6 py-2.5 rounded-full text-xs font-black tracking-widest uppercase transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.97] ${getOrderButtonStyle()}`}
            >
              Order Box
            </Link>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 🚪 OVERLAY DRAWER PANEL SIDEBAR */}
      {/* ========================================================================= */}
      <div 
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-400 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div 
        className={`fixed top-0 left-0 bottom-0 z-50 w-full max-w-[340px] sm:max-w-[380px] bg-[#620f07] text-white p-8 md:p-12 shadow-2xl flex flex-col justify-start transition-transform duration-500 ease-in-out transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        
        {/* UPPER HEADER SEGMENT */}
        <div className="flex justify-between items-center w-full pb-6 border-b border-white/10">
          <span className="font-sans font-black text-2xl tracking-tighter lowercase select-none opacity-40">
            cookiliciousss.
          </span>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/90 border border-white/10 hover:bg-white/20 hover:border-white/30 active:scale-90 transition-all duration-200 cursor-pointer group"
          >
            <svg className="w-4 h-4 stroke-[3] transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* MIDDLE NAVIGATION ROW LINKS */}
        <nav className="flex flex-col items-start gap-8 md:gap-10 mt-12 w-full pl-1">
          <Link 
            href="/" 
            onClick={() => setIsMenuOpen(false)}
            className="group relative font-sans font-black text-4xl md:text-5xl lg:text-6xl tracking-tight text-white/90 hover:text-white transition-colors duration-200 block w-full text-left pb-1"
          >
            <span className="relative z-10">Home</span>
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-300 ease-out group-hover:w-24 rounded-full opacity-90" />
          </Link>

          <Link 
            href="/#flavors" 
            onClick={() => setIsMenuOpen(false)}
            className="group relative font-sans font-black text-4xl md:text-5xl lg:text-6xl tracking-tight text-white/90 hover:text-white transition-colors duration-200 block w-full text-left pb-1"
          >
            <span className="relative z-10">Menu</span>
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-300 ease-out group-hover:w-24 rounded-full opacity-90" />
          </Link>
          
          <Link 
            href="/about" 
            onClick={() => setIsMenuOpen(false)}
            className="group relative font-sans font-black text-4xl md:text-5xl lg:text-6xl tracking-tight text-white/90 hover:text-white transition-colors duration-200 block w-full text-left pb-1"
          >
            <span className="relative z-10">Who we are</span>
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-300 ease-out group-hover:w-48 rounded-full opacity-90" />
          </Link>
          
          <Link 
            href="/catering" 
            onClick={() => setIsMenuOpen(false)}
            className="group relative font-sans font-black text-4xl md:text-5xl lg:text-6xl tracking-tight text-white/90 hover:text-white transition-colors duration-200 block w-full text-left pb-1"
          >
            <span className="relative z-10">Catering</span>
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-300 ease-out group-hover:w-36 rounded-full opacity-90" />
          </Link>
        </nav>

        {/* LOWER FOOTNOTE SEGMENT */}
        <div className="mt-auto pt-6 border-t border-white/10 text-left select-none opacity-30">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
            Ottawa, ON
          </p>
          <p className="text-[9px] font-medium tracking-wide font-mono text-white mt-0.5">
            © {new Date().getFullYear()} Cookiliciousss Ltd.
          </p>
        </div>

      </div>
    </>
  );
}