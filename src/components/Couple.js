"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { clientData } from "@/config/clientData";
import { Instagram, Facebook } from "lucide-react";

const PersonCard = ({ person, index }) => {
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-md mt-0 pt-0">
      {/* Image Block */}
      <motion.div
        ref={cardRef}
        onClick={() => setIsActive(!isActive)}
        onMouseEnter={() => { if (window.innerWidth >= 768) setIsActive(true); }}
        onMouseLeave={() => { if (window.innerWidth >= 768) setIsActive(false); }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
        className="relative w-full aspect-[3.2/4] rounded-[30px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.08)] cursor-pointer mb-10" // Increased gap below photo
      >
        <Image
          src={person.image}
          alt={person.fullName}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Tap Interaction Overlay */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
              style={{
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              <h3 className="text-3xl md:text-4xl text-white font-heading mb-4 font-medium tracking-wide">
                {person.fullName}
              </h3>
              
              <div className="w-12 h-px bg-[var(--accent)] mb-6"></div>
              
              <p className="text-sm md:text-base text-white/95 font-body leading-relaxed mb-8 max-w-[250px]">
                {person.description}
              </p>
              
              {clientData.toggles.showSocialLinks && (
                <div className="flex gap-6">
                  {person.socials?.instagram && (
                    <a href={person.socials.instagram} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-white hover:text-[var(--accent)] transition-colors duration-300">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                  )}
                  {person.socials?.facebook && (
                    <a href={person.socials.facebook} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-white hover:text-[var(--accent)] transition-colors duration-300">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Label BELOW the Image */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.3, ease: "easeOut" }}
        className="text-center"
      >
        <h2 className="text-3xl text-[var(--primary)] font-heading font-medium tracking-wide mb-2">
          {person.name}
        </h2>
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] font-montserrat font-medium">
          {person.role}
        </p>
      </motion.div>
    </div>
  );
};

export default function Couple() {
  const { groom, bride } = clientData.couple;

  return (
    <section className="pt-20 md:pt-[350px] pb-8 px-6 bg-[var(--background)] relative">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 justify-center items-start w-full">
          <PersonCard person={groom} index={0} />
          <PersonCard person={bride} index={1} />
        </div>
      </div>
    </section>
  );
}