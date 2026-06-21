import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Header } from "@/components/ui/header";
import "./globals.css";

// Configure elegant theme typography loaders
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans" 
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif"
});

export const metadata: Metadata = {
  title: "cookiliciousss. | Custom Gourmet Cookie Boxes",
  description: "Handcrafted, thick, and fudgy premium cookies baked fresh on-site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen flex flex-col selection:bg-[#620f07] selection:text-white">
        
        {/* Global Navigation Hub Overlay Layer */}
        <Header />
        
        {/* MAIN APP INJECTION FRAME:
          We removed the static 'pt-24' and 'bg-white' class definitions here.
          This permits your gorgeous burgundy catering page hero canvas to sit 
          flush at the very top of the window frame underneath the transparent navbar wrapper!
        */}
        <div className="flex-grow w-full relative">
          {children}
        </div>

      </body>
    </html>
  );
}