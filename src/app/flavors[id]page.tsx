"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ReviewStars } from "@/components/blocks/animated-cards-stack";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const DYNAMIC_FLAVORS: Record<string, { name: string; tag: string; bg: string; text: string; fullDesc: string; image: string; rating: number }> = {
  "biscoff-lava": {
    name: "Biscoff Lava",
    tag: "The Speculoos Explosion",
    bg: "bg-[#e2ecc8]",
    text: "text-[#1e2d1a]",
    image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=800&h=800&q=80",
    rating: 4.9,
    fullDesc: "Our absolute crowd jewel. This masterpiece features a molten, unctuous cookie butter foundation core wrapped snugly inside our traditional dough structure, blanketed in crushed biscuits and velvet streams of hot speculoos cream."
  },
  "kinder-filling": {
    name: "Kinder Filling",
    tag: "Hazelnut Cream Heaven",
    bg: "bg-[#f5e6d3]",
    text: "text-[#3a2512]",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=800&h=800&q=80",
    rating: 4.8,
    fullDesc: "A complete milk chocolate overload. Stuffed generously with real imported premium hazelnut cream fillings, this cookie collapses under its own gooey weight, delivering warm pools of melted chocolate chords with every bite."
  },
  "salted-swiss-chocolate": {
    name: "Salted Swiss Chocolate",
    tag: "Gourmet Dark Velvet",
    bg: "bg-[#fce4e4]",
    text: "text-[#4a181d]",
    image: "https://images.unsplash.com/photo-1581339121666-4c489c7d4133?auto=format&fit=crop&w=800&h=800&q=80",
    rating: 4.9,
    fullDesc: "An intense, deep imported Swiss dark chocolate cookie dough finished elegantly with gourmet chocolate puddles and a delicate dusting of flaky sea salt for the perfect sweet-to-savory balance."
  },
  "red-velvet": {
    name: "Red Velvet",
    tag: "Classic Crimson Swirl",
    bg: "bg-[#e3f2fd]",
    text: "text-[#122b3d]",
    image: "https://images.unsplash.com/photo-1619149602480-8a9d186096b7?auto=format&fit=crop&w=800&h=800&q=80",
    rating: 4.7,
    fullDesc: "Vibrant, classic premium red velvet cake dough baked with a velvety structure, packed heavily with sweet white chocolate chips and a rich, decadent cream cheese swirl core."
  }
};

const STATIC_COMMENTS = [
  { id: "c1", name: "Sarah M.", text: "The molten core blew my mind completely. It stayed warm even after delivery!", rating: 5, time: "2 hours ago" },
  { id: "c2", name: "Ahmed A.", text: "Unmatched crunch profiles on the rim with a super gooey interior structure. Will buy a full box next week.", rating: 5, time: "Yesterday" },
  { id: "c3", name: "Emma L.", text: "Not overly sweet, but extremely rich. The hint of salt balancing the Swiss chocolate is elite.", rating: 4.8, time: "3 days ago" }
];

export default function FlavorDetailPage() {
  const params = useParams();
  const flavorId = typeof params?.id === "string" ? params.id : "biscoff-lava";
  const data = DYNAMIC_FLAVORS[flavorId] || DYNAMIC_FLAVORS["biscoff-lava"];
  
  const storageKey = `cookiliciousss_reviews_${flavorId}`;

  const [commentInput, setCommentInput] = React.useState("");
  const [reviewsList, setReviewsList] = React.useState<typeof STATIC_COMMENTS>(STATIC_COMMENTS);
  
  // 🔑 Hydration gatekeeper variable stops empty arrays from writing to disk on boot
  const [isHydrated, setIsHydrated] = React.useState(false);
  
  const [userRating, setUserRating] = React.useState<number>(5);
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);

  // 📥 Phase 1: Safely read from storage AFTER hydration finishes
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setReviewsList(JSON.parse(saved));
      }
      setIsHydrated(true);
    }
  }, [storageKey]);

  // 💾 Phase 2: Save to disk only when reviews array changes and page is hydrated
  React.useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      localStorage.setItem(storageKey, JSON.stringify(reviewsList));
    }
  }, [reviewsList, storageKey, isHydrated]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    
    const nextReview = { 
      id: Date.now().toString(), 
      name: "Gourmet Guest", 
      text: commentInput, 
      rating: userRating, 
      time: "Just now" 
    };

    setReviewsList([nextReview, ...reviewsList]);
    setCommentInput("");
    setUserRating(5);
  };

  return (
    <main className="bg-white min-h-screen text-zinc-900 pb-24 antialiased block w-full">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start h-full">
        
        {/* LEFT CONTENT SUB-PANEL */}
        <div className="space-y-8 text-left lg:sticky lg:top-36 max-h-[calc(100vh-12rem)] lg:overflow-y-auto pb-4 scrollbar-none w-full">
          <div className="space-y-4">
            <div>
              <span className="inline-block bg-zinc-900 text-white text-[10px] uppercase tracking-[0.2em] font-black px-3 py-1 rounded-full">
                {data.tag}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-black lowercase">
              {data.name}.
            </h1>
            <div className="flex items-center gap-3 pt-1">
              <ReviewStars rating={data.rating} className="text-amber-500" />
              <span className="text-sm font-bold text-zinc-400">({data.rating} out of 5 stars)</span>
            </div>
          </div>

          <div className="aspect-square relative w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl border border-zinc-100 bg-zinc-50">
            <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
          </div>

          <p className="text-zinc-600 font-medium leading-relaxed max-w-md text-sm md:text-base">
            {data.fullDesc}
          </p>

          <form onSubmit={handleSubmitComment} className="space-y-4 pt-6 border-t border-zinc-100 max-w-sm pb-4">
            <div className="flex flex-col gap-1">
              <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400">Share your indulgence</h4>
              <div className="flex items-center gap-1 py-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const activeStar = hoverRating !== null ? star <= hoverRating : star <= userRating;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="transition-transform active:scale-90 focus:outline-none"
                    >
                      <svg className={`size-5 transition-colors ${activeStar ? "text-amber-500" : "text-zinc-200"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                      </svg>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <input 
                type="text" 
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Leave a public comment..."
                className="flex-1 bg-zinc-50 border border-zinc-200 rounded-full px-5 py-2.5 text-sm font-medium outline-none focus:border-zinc-400 transition-all"
              />
              <button type="submit" className="bg-[#620f07] text-white font-black text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-[#4a0b05] transition-all shadow-md">
                Post
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT PANEL: Live Review Feed */}
        <div className="w-full h-[calc(100vh-14rem)] min-h-[400px] flex flex-col text-left border-l border-zinc-100/80 pl-8 relative lg:sticky lg:top-36">
          <div className="pb-4 mb-4 border-b border-zinc-100/60 bg-white">
            <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Guest Ledger</span>
            <h2 className="text-3xl font-black text-black mt-0.5">Live Reviews</h2>
          </div>

          <div className="flex-1 overflow-y-auto pr-4 space-y-4 scrollbar-thin pb-8">
            {/* Show local storage comments list immediately once browser matches keys */}
            {isHydrated ? (
              reviewsList.map((review) => (
                <div key={review.id} className="w-full border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-50/80 transition-colors rounded-3xl p-6 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <ReviewStars rating={review.rating} className="text-amber-500" />
                      <span className="text-[10px] font-mono font-bold text-zinc-400">{review.time}</span>
                    </div>
                    <blockquote className="text-zinc-700 font-medium leading-relaxed text-sm md:text-base italic">
                      "{review.text}"
                    </blockquote>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-zinc-100/60">
                    <Avatar className="w-9 h-9 border border-zinc-200">
                      <AvatarFallback className="font-black text-[10px] text-zinc-500 uppercase bg-white">
                        {review.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="block text-xs font-black text-black">{review.name}</span>
                      <span className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Verified Indulger</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Clean placeholder state holds down layout line while data hydrates
              <div className="text-sm font-bold text-zinc-400 animate-pulse py-8">
                Syncing ledger database...
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}