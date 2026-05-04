"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { clientData } from "@/config/clientData";
import { Calendar, Clock } from "lucide-react";

export default function Hero() {
  const { groom, bride } = clientData.couple;

  const dateObj = new Date(clientData.weddingDate);
  const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  const dateNum = dateObj.getDate();
  const monthName = dateObj.toLocaleDateString('en-US', { month: 'long' });
  const monthShort = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const year = dateObj.getFullYear();

  const letterVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(8px)" },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.08,
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-visible bg-[var(--background)]">
      {/* Background Image without full mask */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={clientData.hero.backgroundImage}
            alt="Couple Background"
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>
        
        {/* Gradient only at the bottom 35% to provide text readability without muddying the image */}
        <div 
          className="absolute bottom-0 left-0 w-full h-[43vh] z-10"
          style={{
            background: "linear-gradient(to bottom, rgba(248, 247, 244, 0.0) 0%, rgba(248, 247, 244, 0.8) 40%, rgba(248, 247, 244, 1) 100%)"
          }}
        />
      </div>

      {/* Floating Particles for Cinematic Feel (Optional, but keeping it elegant and minimal) */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-visible">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0,
              y: "100%",
              x: `${Math.random() * 100}%`
            }}
            animate={{
              opacity: [0, 0.3, 0],
              y: "-20%",
              x: `${Math.random() * 100}%`
            }}
            transition={{
              duration: 15 + Math.random() * 15,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
          />
        ))}
      </div>

      {/* Text Container in the gradient zone */}
      <div className="relative z-20 flex flex-col items-center text-center w-full px-4 pb-0 mt-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase mb-4 text-[var(--text-muted)] font-montserrat font-medium">
            {clientData.hero.welcomeText}
          </p>
        </motion.div>

        <h1
  key={groom.name + bride.name} // 🔥 force re-animation on reload
  className="text-6xl md:text-8xl text-[#1E2D2B] mb-4 font-normal tracking-wide flex flex-col items-center"
  style={{ fontFamily: "'Playfair Display', serif", lineHeight: "1.15" }}
>
  {/* Groom Name */}
  <div className="flex overflow-hidden">
    {groom.name.split("").map((char, index) => (
      <motion.span
        key={`groom-${index}`}
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          delay: index * 0.06,
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1], // smoother luxury easing
        }}
        className="inline-block"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </div>

  {/* Ampersand */}
  <motion.span
    initial={{ opacity: 0, scale: 0.6, filter: "blur(8px)" }}
    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
    transition={{
      delay: groom.name.length * 0.06 + 0.2,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="block text-5xl md:text-7xl text-[#D4B671] my-2 font-light opacity-90"
    style={{ fontFamily: "'Playfair Display', serif" }}
  >
    &amp;
  </motion.span>

  {/* Bride Name */}
  <div className="flex overflow-hidden">
    {bride.name.split("").map((char, index) => (
      <motion.span
        key={`bride-${index}`}
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          delay: (groom.name.length + index) * 0.06 + 0.3,
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="inline-block"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </div>
</h1>

        {/* Editorial Single Row Date Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="flex flex-row items-center justify-between w-full max-w-[320px] md:max-w-[420px] mt-3 mb-[-10px]"
        >
          {/* 1. Left (Day) */}
          <div className="flex-1 flex justify-end pr-4 md:pr-6 translate-y-4 md:translate-y-6">
            <span className="text-[13px] md:text-xs tracking-[0.3em] uppercase text-[#1E2D2B] opacity-60 font-montserrat font-bold">
              {dayName}
            </span>
          </div>

          {/* 2. Center (Vertical Date Card) */}
          <div className="flex flex-col items-center justify-center 
w-[80px] h-[105px] md:w-[110px] md:h-[130px] 
bg-white rounded-2xl 
border border-[#C8A24C]/30 
px-2 py-2 
relative z-20 shrink-0 
translate-y-4 md:translate-y-6

shadow-[0_0_25px_rgba(200,162,76,0.35),0_0_60px_rgba(200,162,76,0.25),0_12px_30px_rgba(0,0,0,0.1)]
">
            <span className="text-[12px] md:text-[10px] text-[#1E2D2B] font-montserrat tracking-widest opacity-70 mt-2.5 font-semibold">
              {monthShort}
            </span>
            <span className="text-5xl md:text-6xl text-[#C8A24C] font-normal leading-none drop-shadow-[0_0_12px_rgba(200,162,76,0.3)]" style={{ fontFamily: "'Playfair Display', serif" }}>
              {dateNum}
            </span>
            <span className="text-[12px] md:text-[10px] text-[#1E2D2B] font-montserrat tracking-widest opacity-70 mt-2.5 font-semibold">
              {year}
            </span>
          </div>

          {/* 3. Right (Time) */}
          <div className="flex-1 flex justify-start pl-4 md:pl-6 translate-y-4 md:translate-y-6">
            <span className="text-[13px] md:text-xs tracking-[0.3em] uppercase text-[#1E2D2B] opacity-60 font-montserrat font-bold whitespace-nowrap">
              {clientData.weddingTime}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
