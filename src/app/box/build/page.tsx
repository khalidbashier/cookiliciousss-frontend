"use client";

import * as React from "react";
import { ArrowLeft, Check, Clock, User, Phone, MapPin, CheckCircle, Loader2, Mail } from "lucide-react";
import Link from "next/link";

type BoxSize = 6 | 12 | null;

export default function BuildBoxPage() {
  const [boxSize, setBoxSize] = React.useState<BoxSize>(null);
  const [selectedFlavors, setSelectedFlavors] = React.useState<string[]>([]);
  const [showFulfillmentForm, setShowFulfillmentForm] = React.useState(false);
  const [fulfillmentMethod, setFulfillmentMethod] = React.useState<string>("delivery");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  
  // UX Interaction States
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = React.useState(false);

  // Form States
  const [address, setAddress] = React.useState("");
  const [apt, setApt] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");
  const [city, setCity] = React.useState("");
  const [timeSlot, setTimeSlot] = React.useState("");
  const [customerName, setCustomerName] = React.useState("");
  const [customerPhone, setCustomerPhone] = React.useState("");
  const [customerEmail, setCustomerEmail] = React.useState(""); // 📧 New State Field

  const flavors = [
    { id: "biscoff-lava", name: "Biscoff Lava", color: "#b45f06", image: "/Biscoff.png" },
    { id: "cookies-cream", name: "Cookies and Cream", color: "#999896", image: "/width_336.webp" },
    { id: "kinder", name: "Kinder", color: "#E07A5F", image: "/images/kinder.png" },
    { id: "fudgy-brownie", name: "Fudgy Brownie", color: "#A27B5C", image: "/fudgy-brownie.png" },
    { id: "red-velvet", name: "Red Velvet", color: "#C94A4A", image: "/red-velvet.png" },
    { id: "salted-swiss", name: "Salted Swiss Chocolate", color: "#3A96B8", image: "/images/salted-swiss.png" }
  ];

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMethod = localStorage.getItem("cookiliciousss_fulfillment");
      if (storedMethod) {
        setFulfillmentMethod(storedMethod);
      }
    }
  }, []);

  const handleToggleFlavor = (id: string) => {
    if (selectedFlavors.includes(id)) {
      setSelectedFlavors(selectedFlavors.filter((fId) => fId !== id));
    } else {
      if (selectedFlavors.length < 4) {
        setSelectedFlavors([...selectedFlavors, id]);
      }
    }
  };

  const handleProceedToFulfillment = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowFulfillmentForm(true);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 900);
  };

  // 🚀 Dispatches reservation payload directly to your email dispatch service
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingForm(true);

    try {
      const selectedFlavorNames = selectedFlavors.map(
        id => flavors.find(f => f.id === id)?.name || id
      );

      await fetch("/api/send-receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          fulfillmentMethod,
          address: fulfillmentMethod === "delivery" ? `${address} ${apt ? `, Apt ${apt}` : ""}, ${city} ${postalCode}` : "Counter Pickup Location",
          timeSlot,
          boxSize,
          flavors: selectedFlavorNames.join(", ")
        })
      });
    } catch (err) {
      console.error("Failed to transmit email dispatch parameters", err);
    } finally {
      setIsSubmittingForm(false);
      setIsSubmitted(true);
    }
  };

  const totalSelectedCount = selectedFlavors.length;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col justify-between items-center pt-24">
        <main className="max-w-md w-full px-6 py-16 text-center space-y-6 bg-white rounded-[2rem] border border-stone-200 shadow-sm my-auto">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto border border-emerald-100">
            <CheckCircle className="w-8 h-8 stroke-[2]" />
          </div>
          <h2 className="text-3xl font-sans font-black tracking-tight text-stone-900 uppercase">
            Order Locked In!
          </h2>
          <p className="text-sm text-stone-500 font-medium leading-relaxed">
            Your dynamic {boxSize}-pack selection is reserved. A detailed receipt matrix has been routed to <span className="font-bold text-stone-800">{customerEmail}</span>.
          </p>
          <Link href="/" className="inline-block bg-black text-white text-xs font-bold uppercase tracking-widest py-3.5 px-8 rounded-full shadow-md hover:bg-stone-900 transition-all">
            Return Home
          </Link>
        </main>
        <footer className="w-full bg-[#620f07] text-white text-[10px] font-mono uppercase tracking-[0.2em] py-4 text-center select-none">
          © 2026 Cookiliciousss Premium Desserts. All Rights Reserved.
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50/50 text-black font-sans flex flex-col justify-between">
      
      {!boxSize ? (
        <div className="flex-1 flex flex-col md:flex-row w-full overflow-hidden bg-white relative pt-24">
          <div className="hidden md:flex absolute top-28 left-1/2 -translate-x-1/2 z-30 bg-white py-3 px-8 rounded-full border border-black shadow-sm font-serif italic text-base tracking-wide text-black whitespace-nowrap pointer-events-none">
            Choose Your Dream Box
          </div>

          <button
            onClick={() => setBoxSize(6)}
            style={{ "--hover-bg": "#620f07" } as React.CSSProperties}
            className="flex-1 relative group flex flex-col items-center justify-center p-12 bg-white transition-all duration-500 ease-in-out border-b md:border-b-0 border-transparent hover:bg-[var(--hover-bg)]"
          >
            <div className="space-y-4 max-w-2xl text-center flex flex-col items-center">
              <span className="font-mono text-xs tracking-widest uppercase text-amber-900 group-hover:text-amber-200 transition-colors duration-300">Personal Treat</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-black group-hover:text-white transition-colors duration-300">The 6-Pack Box</h2>
              <p className="text-sm text-stone-800 group-hover:text-amber-50/80 transition-colors duration-300 max-w-sm">
                Perfect for a cozy weekend treat or selecting a few of your foundational favorite flavors.
              </p>
              <div className="pt-4 w-[600px] max-w-full px-4">
                <span className="block w-full py-4 rounded-full border border-black text-black text-xs font-bold uppercase tracking-widest bg-white transition-all duration-300 transform group-hover:scale-[1.02] group-hover:bg-black group-hover:text-white group-hover:border-transparent shadow-sm text-center">
                  Select 6 Pack
                </span>
              </div>
            </div>
          </button>

          <button
            onClick={() => setBoxSize(12)}
            style={{ "--hover-bg": "#000000" } as React.CSSProperties}
            className="flex-1 relative group flex flex-col items-center justify-center p-12 bg-white transition-all duration-500 ease-in-out hover:bg-[var(--hover-bg)]"
          >
            <div className="space-y-4 max-w-2xl text-center flex flex-col items-center">
              <span className="font-mono text-xs tracking-widest uppercase text-amber-900 group-hover:text-stone-400 transition-colors duration-300">Ultimate Bundle</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-black group-hover:text-white transition-colors duration-300">The 12-Pack Box</h2>
              <p className="text-sm text-stone-800 group-hover:text-stone-300 transition-colors duration-300 max-w-sm">
                Our flagship custom dynamic party box. Enough thick, fudgy rows to share with the whole crew.
              </p>
              <div className="pt-4 w-[600px] max-w-full px-4">
                <span className="block w-full py-4 rounded-full border border-black text-black text-xs font-bold uppercase tracking-widest bg-white transition-all duration-300 transform group-hover:scale-[1.02] group-hover:bg-white group-hover:text-black group-hover:border-transparent shadow-sm text-center">
                  Select 12 Pack
                </span>
              </div>
            </div>
          </button>
        </div>
      ) : !showFulfillmentForm ? (
        
        <div className="flex-1 flex flex-col justify-between w-full pt-24">
          <main className="max-w-6xl mx-auto w-full px-6 py-10 space-y-8 flex-1">
            <button
              onClick={() => { setBoxSize(null); setSelectedFlavors([]); }}
              className="flex items-center gap-2 text-sm text-stone-500 hover:text-black transition-colors group font-semibold tracking-wide"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Change Box Size ({boxSize}-Pack Selected)
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12 pt-8">
              {flavors.map((flavor) => {
                const isSelected = selectedFlavors.includes(flavor.id);
                const isDisabled = !isSelected && totalSelectedCount >= 4;
                const isSmallerAsset = flavor.id === "cookies-cream" || flavor.id === "red-velvet";

                return (
                  <div
                    key={flavor.id}
                    onClick={() => !isDisabled && handleToggleFlavor(flavor.id)}
                    className={`flex flex-col items-center justify-center relative select-none cursor-pointer group transition-all duration-500 ${
                      isDisabled ? "opacity-30 grayscale pointer-events-none" : ""
                    }`}
                  >
                    <div 
                      className="absolute top-4 right-12 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-500 z-30 shadow-sm"
                      style={{ 
                        backgroundColor: isSelected ? "black" : "rgba(0,0,0,0.05)",
                        transform: isSelected ? "scale(1)" : "scale(0)",
                        opacity: isSelected ? 1 : 0
                      }}
                    >
                      <Check className="w-4 h-4 stroke-[3.5] text-white" />
                    </div>

                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center transition-transform duration-500 ease-out">
                      <div 
                        className={`absolute inset-4 rounded-full transition-all duration-700 blur-2xl opacity-0 scale-75 group-hover:opacity-60 group-hover:scale-100 ${
                          isSelected ? "opacity-80 scale-105" : ""
                        }`}
                        style={{ background: `radial-gradient(circle, ${flavor.color} 0%, transparent 70%)` }}
                      />
                      <img 
                        src={flavor.image} 
                        alt={flavor.name}
                        className={`object-contain relative z-20 select-none pointer-events-none transition-all duration-500 ease-out drop-shadow-xl group-hover:scale-110 group-hover:rotate-3 ${
                          isSmallerAsset ? "w-full h-full" : "w-[90%] h-[90%]"
                        } ${isSelected ? "scale-105 rotate-6" : ""}`}
                      />
                    </div>

                    <div className="text-center mt-4 space-y-1 z-20">
                      <h3 className={`text-xl font-serif font-black tracking-tight transition-colors duration-300 ${isSelected ? "text-stone-900" : "text-stone-700 group-hover:text-black"}`}>
                        {flavor.name}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>

          <footer className="w-full bg-white border-t border-stone-200 sticky bottom-0 z-40 flex flex-col shadow-[0_-8px_30px_rgb(0,0,0,0.02)]">
            <div className="w-full h-2 bg-stone-100 flex relative">
              {selectedFlavors.map((flavorId, index) => {
                const flavorInfo = flavors.find((f) => f.id === flavorId);
                return (
                  <div 
                    key={index} 
                    className="h-full transition-all duration-500 relative"
                    style={{ width: `${100 / totalSelectedCount}%`, backgroundColor: flavorInfo ? flavorInfo.color : "#stone-200" }}
                  />
                );
              })}
            </div>

            <div className="max-w-6xl mx-auto w-full px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center sm:text-left">
                <h4 className="text-xl font-serif font-black text-black tracking-tight">
                  {totalSelectedCount === 0 ? "Box Empty" : `Box Assortment (${totalSelectedCount} of 4 Unique Flavors)`}
                </h4>
              </div>

              <button
                disabled={totalSelectedCount === 0 || isTransitioning}
                onClick={handleProceedToFulfillment}
                className="w-full sm:w-auto min-w-[240px] bg-black disabled:bg-stone-200 text-white font-sans text-xs font-bold uppercase tracking-widest py-4 px-8 rounded-full shadow-md transition-all duration-300 ease-out disabled:cursor-not-allowed hover:bg-[#620f07] hover:scale-105 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 group"
              >
                {isTransitioning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-200" />
                    <span>Mapping Logistics...</span>
                  </>
                ) : (
                  <span>Proceed to Fulfillment</span>
                )}
              </button>
            </div>
          </footer>
        </div>
      ) : (
        
        <div 
          className="flex-1 flex flex-col justify-center items-center pt-36 pb-16 px-6 bg-repeat bg-center relative"
          style={{ backgroundImage: "url('/background.png')", backgroundRepeat: "repeat" }}
        >
          <div className="absolute top-0 inset-x-0 h-24 bg-white border-b border-stone-200/80 pointer-events-none z-0" />
          <div className="absolute inset-0 bg-stone-900/5 pointer-events-none" />

          <div className="max-w-2xl w-full bg-white border border-stone-200 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.1)] space-y-8 text-left relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <button
              onClick={() => setShowFulfillmentForm(false)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Edit Cookie Build Box
            </button>

            <div className="space-y-2">
              <h2 className="text-3xl font-sans font-black tracking-tighter uppercase text-stone-900">
                {fulfillmentMethod === "delivery" ? "Delivery Logistics" : "Pickup Windows"}
              </h2>
              <p className="text-xs font-medium text-stone-500 leading-relaxed">
                Provide your parameters below. A digital confirmation receipt containing setup instructions will route instantly to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-stone-400 absolute left-4" />
                  <input 
                    type="text" 
                    placeholder="First & Last Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-semibold tracking-wide focus:outline-none focus:border-black focus:bg-white transition-all"
                    required
                  />
                </div>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-4" />
                  <input 
                    type="tel" 
                    placeholder="Contact Mobile Phone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-semibold tracking-wide focus:outline-none focus:border-black focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>

              {/* 📧 NEW: Premium Email Slot */}
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-stone-400 absolute left-4" />
                <input 
                  type="email" 
                  placeholder="Email Address (For Order Receipt Routing)"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-semibold tracking-wide focus:outline-none focus:border-black focus:bg-white transition-all"
                  required
                />
              </div>

              {fulfillmentMethod === "delivery" && (
                <div className="space-y-4">
                  <div className="relative flex items-center">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-4" />
                    <input 
                      type="text" 
                      placeholder="Street Address (e.g. 123 Gourmet Way)"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-semibold tracking-wide focus:outline-none focus:border-black focus:bg-white transition-all"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-1">
                      <input 
                        type="text" 
                        placeholder="Apt, Suite"
                        value={apt}
                        onChange={(e) => setApt(e.target.value)}
                        className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-semibold tracking-wide focus:outline-none focus:border-black focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <input 
                        type="text" 
                        placeholder="Postal Code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-semibold tracking-wide focus:outline-none focus:border-black focus:bg-white transition-all"
                        required
                    />
                    </div>
                    <div>
                      <input 
                        type="text" 
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-semibold tracking-wide focus:outline-none focus:border-black focus:bg-white transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="relative flex items-center">
                <Clock className="w-4 h-4 text-stone-400 absolute left-4 z-20" />
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-semibold tracking-wide focus:outline-none focus:border-black focus:bg-white transition-all appearance-none cursor-pointer relative z-10"
                  required
                >
                  <option value="" disabled>Select target schedule window</option>
                  <option value="12:00 PM - 02:00 PM">Midday Drop (12:00 PM - 2:00 PM)</option>
                  <option value="02:00 PM - 04:00 PM">Afternoon Batch (2:00 PM - 4:00 PM)</option>
                  <option value="04:00 PM - 06:00 PM">Evening Rush Delivery (4:00 PM - 6:00 PM)</option>
                  <option value="06:00 PM - 08:00 PM">Late Night Cravings (6:00 PM - 8:00 PM)</option>
                </select>
                <div className="absolute right-4 pointer-events-none z-20 text-stone-400 text-xs">▼</div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmittingForm}
                  className="w-full bg-[#620f07] hover:bg-black text-white font-sans text-xs font-bold uppercase tracking-widest py-4 rounded-full shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmittingForm ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Receipt Data...</span>
                    </>
                  ) : (
                    <span>Lock In Cookie Reservation</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      <footer className="w-full bg-[#620f07] text-white text-[10px] font-mono uppercase tracking-[0.2em] py-4 text-center border-t border-black/10 select-none z-50">
        © 2026 Cookiliciousss Premium Desserts. All Rights Reserved.
      </footer>

    </div>
  );
}