"use client";

import { clientData } from "@/config/clientData";
import { Heart, Phone } from "lucide-react";

export default function Footer() {
  const { groom, bride } = clientData.couple;

  return (
    <footer className="relative py-12 text-center text-[var(--text)] overflow-hidden mandana-pattern">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl mb-3 text-[#1E2D2B] font-heading">
          {groom.name} & {bride.name}
        </h2>
        
        <div className="flex flex-col items-center mb-8">
          <p className="text-sm md:text-base text-[#1E2D2B] tracking-[0.2em] uppercase font-montserrat font-bold mb-3">
            {clientData.weddingDateFormatted}
          </p>
          <p className="text-[#1E2D2B] opacity-60 font-serif italic text-sm md:text-[15px] tracking-wide">
            "A celebration of love, laughter & forever"
          </p>
        </div>
        
        {/* Premium Contact Pills */}
        {clientData.contact?.showPhones && (
          <div className="flex flex-row flex-wrap justify-center items-center gap-3 md:gap-4 mb-10 px-2">
            
            {/* Groom Contact Pill */}
            <a 
              href={`tel:${groom.phoneTel}`}
              className="flex items-center gap-3 bg-white/90 backdrop-blur-sm pr-5 pl-1.5 py-1.5 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-[#1E2D2B]/5 hover:-translate-y-0.5 hover:shadow-[0_5px_20px_rgba(200,162,76,0.15)] hover:border-[#C8A24C]/30 active:scale-95 transition-all duration-300 group"
            >
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden shrink-0 border border-white shadow-sm bg-[#F8F7F4]">
                <img 
                  src={groom.image} 
                  alt={groom.name} 
                  className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#1E2D2B]/50 font-montserrat font-bold leading-none mb-1">{groom.name}</span>
                <span className="text-[#1E2D2B] font-montserrat font-semibold text-[13px] md:text-sm tracking-wide leading-none">{groom.phoneLocal}</span>
              </div>
            </a>
            
            {/* Bride Contact Pill */}
            <a 
              href={`tel:${bride.phoneTel}`}
              className="flex items-center gap-3 bg-white/90 backdrop-blur-sm pr-5 pl-1.5 py-1.5 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-[#1E2D2B]/5 hover:-translate-y-0.5 hover:shadow-[0_5px_20px_rgba(200,162,76,0.15)] hover:border-[#C8A24C]/30 active:scale-95 transition-all duration-300 group"
            >
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden shrink-0 border border-white shadow-sm bg-[#F8F7F4]">
                <img 
                  src={bride.image} 
                  alt={bride.name} 
                  className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#1E2D2B]/50 font-montserrat font-bold leading-none mb-1">{bride.name}</span>
                <span className="text-[#1E2D2B] font-montserrat font-semibold text-[13px] md:text-sm tracking-wide leading-none">{bride.phoneLocal}</span>
              </div>
            </a>
            
          </div>
        )}

        <div className="border-t border-[var(--primary)]/20 pt-6 flex flex-col items-center justify-center gap-2 text-sm opacity-70">
          <p className="flex items-center gap-1">
            Handcrafted with <Heart size={14} className="text-red-500 fill-red-500" />
          </p>
          <p>
            Designed by{" "}
            <a 
              href="https://wa.me/94701234567" // Placeholder for Pixora Studio WA
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline font-semibold"
            >
              Pixora Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
