"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full">
      <div className="px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Medium: Centered nav */}
          <div className="hidden md:flex lg:hidden items-center justify-center py-6">
            <nav className="flex items-center gap-8 font-body text-xs uppercase tracking-[0.25em]">
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/gallery" className="hover:underline">Gallery</Link>
              <Link href="/blog" className="hover:underline">Blog</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </nav>
          </div>

          {/* Mobile: Button + card dropdown */}
          <div className="flex md:hidden items-center justify-between py-4">
            <Link href="/" className="font-serif text-xl font-black tracking-tight">Fotonyarama</Link>
            
            <button
              aria-label="Toggle menu"
              className="inline-flex items-center justify-center h-9 w-9 border border-black rounded-sm active:scale-95"
              onClick={() => setIsOpen((v) => !v)}
            >
              <div className="relative h-4 w-4">
                <span className={`absolute left-0 top-0 h-[2px] w-full bg-black transition-transform ${isOpen ? "translate-y-[6px] rotate-45" : ""}`}/>
                <span className={`absolute left-0 top-[6px] h-[2px] w-full bg-black transition-opacity ${isOpen ? "opacity-0" : "opacity-100"}`}/>
                <span className={`absolute left-0 top-[12px] h-[2px] w-full bg-black transition-transform ${isOpen ? "-translate-y-[6px] -rotate-45" : ""}`}/>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile card dropdown - positioned absolutely above content */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 z-50 bg-white border border-black/10 shadow-lg mx-4 mt-2 rounded-sm overflow-hidden animate-in slide-in-from-top-2 duration-200">
          <div className="p-4 flex flex-col gap-3 font-body text-xs uppercase tracking-[0.25em]">
            <Link href="/about" onClick={() => setIsOpen(false)} className="py-2 hover:bg-black/5 px-2 rounded">About</Link>
            <Link href="/gallery" onClick={() => setIsOpen(false)} className="py-2 hover:bg-black/5 px-2 rounded">Gallery</Link>
            <Link href="/blog" onClick={() => setIsOpen(false)} className="py-2 hover:bg-black/5 px-2 rounded">Blog</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="py-2 hover:bg-black/5 px-2 rounded">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}


