"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Star, Send, User, Award } from "lucide-react";

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

// Map layout database structure
const COOKIE_DATA: Record<string, { name: string; desc: string; img: string; bg: string; text: string }> = {
  "biscoff-lava": {
    name: "Biscoff Lava",
    desc: "A warm, decadent Biscoff cookie core nestled inside our signature dough, topped with crispy speculoos crumbs and a rich drizzle of cookie butter cream.",
    img: "/Biscoff.png",
    bg: "bg-[#b45f06]",
    text: "text-white"
  },
  "cookies-cream": {
    name: "Cookies and Cream",
    desc: "A thick vanilla bean dough loaded with crushed Oreo pieces and pockets of rich white chocolate cream chunks that melt beautifully with every single bite.",
    img: "/width_336.webp",
    bg: "bg-[#999896]",
    text: "text-black"
  },
  "fudgy-brownie": {
    name: "Fudgy Brownie",
    desc: "An ultra-rich, deeply decadent chocolate cookie packed with premium fudgy chunks, premium chocolate swirls, and topped with flaky sea salt.",
    img: "/fudgy-brownie.png",
    bg: "bg-[#4a3525]",
    text: "text-white"
  },
  "red-velvet": {
    name: "Red Velvet",
    desc: "Vibrant, classic premium red velvet cake dough baked with a velvety structure, packed heavily with sweet white chocolate chips and a cream cheese swirl core.",
    img: "/red-velvet.png",
    bg: "bg-[#fff7D1]",
    text: "text-black"
  }
};

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export default function FlavorDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  const id = typeof params?.id === "string" ? params.id : "";
  const flavor = COOKIE_DATA[id];

  const [comments, setComments] = React.useState<Comment[]>([]);
  const [newComment, setNewComment] = React.useState("");
  const [authorName, setAuthorName] = React.useState("");
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    if (id) {
      const savedComments = localStorage.getItem(`cookiliciousss_comments_${id}`);
      if (savedComments) {
        try {
          setComments(JSON.parse(savedComments));
        } catch (e) {
          console.error("Failed to parse persisted comments database logs.", e);
        }
      }
      setIsReady(true);
    }
  }, [id]);

  React.useEffect(() => {
    if (isReady && !flavor) {
      router.push("/");
    }
  }, [flavor, isReady, router]);

  if (!isReady || (!flavor && id === "")) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-sans">
        <p className="text-sm font-bold text-stone-400 uppercase tracking-widest animate-pulse">
          Loading Indulgence Stage...
        </p>
      </div>
    );
  }

  if (!flavor) return null;

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const freshComment: Comment = {
      id: Math.random().toString(36).substring(2, 9),
      author: authorName.trim() || "Anonymous Connoisseur",
      text: newComment.trim(),
      timestamp: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    };

    const updatedComments = [freshComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem(`cookiliciousss_comments_${id}`, JSON.stringify(updatedComments));
    
    setNewComment("");
    setAuthorName("");
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col justify-between">
      
      {/* 🚀 PRODUCT SHOWCASE STAGE AREA */}
      <section className={`w-full py-20 md:py-32 px-6 md:px-12 flex items-center justify-center transition-all duration-500 ${flavor.bg}`}>
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 relative">

          <div className="w-full md:w-1/2 space-y-6 text-left">
            <h1 className={`text-4xl md:text-6xl font-sans font-black tracking-tight leading-none uppercase ${flavor.text}`}>
              {flavor.name}
            </h1>
            <p className={`text-sm md:text-base font-medium leading-relaxed max-w-lg opacity-90 ${flavor.text}`}>
              {flavor.desc}
            </p>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] flex items-center justify-center">
              <img 
                src={flavor.img} 
                alt={flavor.name}
                className="object-contain select-none pointer-events-none drop-shadow-[0_25px_55px_rgba(0,0,0,0.25)] scale-110 w-full h-full"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 💬 EXCLUSIVE HIGH-END TASTING NOTES REVIEW HUB */}
      <section className="bg-stone-50 py-20 px-6 md:px-12 flex-1 flex justify-center border-t border-stone-200/60">
        <div className="max-w-3xl w-full space-y-12">
          
          {/* Layout Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6 text-left">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-amber-500 stroke-amber-500" />
                {/* Fixed: Font properties swapped to font-sans font-black tracking-tighter uppercase */}
                <h2 className="text-3xl font-sans font-black tracking-tighter text-stone-900 uppercase">
                  The Tasting Room
                </h2>
              </div>
              <p className="text-xs font-medium text-stone-500 tracking-wide">
                Exclusive flavor profiles and feedback from verified cookie enthusiasts.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center bg-stone-900 text-amber-50 px-4 py-1.5 rounded-full text-xs font-bold font-mono uppercase tracking-widest shadow-sm">
              Notes <span className="text-amber-400 ml-1.5">{comments.length}</span>
            </div>
          </div>

          <form onSubmit={handlePostComment} className="bg-white p-8 rounded-[2rem] border border-stone-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.02)] space-y-5">
            <div className="relative flex items-center">
              <User className="w-4 h-4 text-stone-400 absolute left-4" />
              <input 
                type="text" 
                placeholder="Connoisseur name (e.g. Chef Alex)"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-stone-50/60 rounded-xl text-sm border border-stone-200 focus:outline-none focus:border-stone-900 focus:bg-white font-semibold tracking-wide transition-all duration-300"
              />
            </div>

            <div className="relative">
              <textarea 
                rows={4}
                placeholder="Describe your first bite... Note down text textures, core melting, sweetness balance, or flavor intensity notes."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-4 bg-stone-50/60 rounded-xl text-sm border border-stone-200 focus:outline-none focus:border-stone-900 focus:bg-white font-medium leading-relaxed resize-none transition-all duration-300"
                required
              />
            </div>

            <div className="flex justify-end pt-1">
              <button 
                type="submit"
                className="bg-[#620f07] hover:bg-stone-950 text-white font-sans text-xs font-bold uppercase tracking-widest py-3.5 px-8 rounded-full flex items-center gap-2.5 transition-all duration-300 shadow-sm active:scale-98"
              >
                Publish Tasting Note <Send className="w-3 h-3" />
              </button>
            </div>
          </form>

          <div className="space-y-6">
            {comments.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-[2rem] border border-dashed border-stone-200 p-8 shadow-sm">
                <Award className="w-8 h-8 text-stone-300 mx-auto mb-3" />
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest max-w-xs mx-auto leading-loose">
                  This reserve timeline is currently empty. Be the first to catalog your notes!
                </p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-start gap-5 text-left transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-stone-950 text-amber-100 flex items-center justify-center font-serif font-black text-base shrink-0 uppercase tracking-wider border border-stone-800 shadow-inner">
                    {comment.author.charAt(0)}
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h4 className="text-sm font-black tracking-wide text-stone-900">
                          {comment.author}
                        </h4>
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 text-[9px] font-mono font-bold px-2 py-0.5 rounded border border-amber-200/50 uppercase tracking-wider select-none">
                          <Award className="w-2.5 h-2.5 stroke-[2.5]" /> Verified Taster
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-stone-600 font-medium leading-relaxed break-words">
                      "{comment.text}"
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </section>

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
              <li><Link href="/box" className="hover:text-white transition-colors">Build a Box</Link></li>
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