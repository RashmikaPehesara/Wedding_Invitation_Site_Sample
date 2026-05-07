"use client";

import { motion } from "framer-motion";
import { clientData } from "@/config/clientData";
import { MapPin, Heart, Wine, Utensils, Music, Sparkles } from "lucide-react";

// Helper to get the elegant icon based on title
const getIcon = (title) => {
  const t = title.toLowerCase();
  if (t.includes("arrival")) return <MapPin size={24} color="#C9A13B" strokeWidth={1.5} />;
  if (t.includes("ceremony") || t.includes("vows")) return <Heart size={24} color="#C9A13B" strokeWidth={1.5} />;
  if (t.includes("cocktail") || t.includes("drinks")) return <Wine size={24} color="#C9A13B" strokeWidth={1.5} />;
  if (t.includes("lunch") || t.includes("dinner") || t.includes("feast")) return <Utensils size={24} color="#C9A13B" strokeWidth={1.5} />;
  if (t.includes("party") || t.includes("music") || t.includes("dance")) return <Music size={24} color="#C9A13B" strokeWidth={1.5} />;
  return <Sparkles size={24} color="#C9A13B" strokeWidth={1.5} />;
};

const VineLine = () => (
  <motion.div
    initial={{ scaleY: 0 }}
    whileInView={{ scaleY: 1 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 2, ease: "easeOut" }}
    className="absolute left-1/2 -translate-x-1/2 top-0 bottom-[-4rem] w-[40px] z-[5] origin-top opacity-70 flex justify-center"
  >
    <svg width="40" height="100%" preserveAspectRatio="none" viewBox="0 0 40 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Curved organic vine path */}
      <path d="M20 0 Q 35 100, 20 200 T 20 400 T 20 600 T 20 800 T 20 1000" stroke="#7A8F7A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Tiny leaves along the vine */}
      <path d="M20 50 Q 10 40, 15 30 Q 25 30, 20 50" fill="#7A8F7A" opacity="0.8" />
      <path d="M20 150 Q 30 140, 25 130 Q 15 130, 20 150" fill="#7A8F7A" opacity="0.8" />
      <path d="M20 250 Q 10 240, 15 230 Q 25 230, 20 250" fill="#7A8F7A" opacity="0.8" />
      <path d="M20 350 Q 30 340, 25 330 Q 15 330, 20 350" fill="#7A8F7A" opacity="0.8" />
      <path d="M20 450 Q 10 440, 15 430 Q 25 430, 20 450" fill="#7A8F7A" opacity="0.8" />
      <path d="M20 550 Q 30 540, 25 530 Q 15 530, 20 550" fill="#7A8F7A" opacity="0.8" />
      <path d="M20 650 Q 10 640, 15 630 Q 25 630, 20 650" fill="#7A8F7A" opacity="0.8" />
      <path d="M20 750 Q 30 740, 25 730 Q 15 730, 20 750" fill="#7A8F7A" opacity="0.8" />
      <path d="M20 850 Q 10 840, 15 830 Q 25 830, 20 850" fill="#7A8F7A" opacity="0.8" />
      <path d="M20 950 Q 30 940, 25 930 Q 15 930, 20 950" fill="#7A8F7A" opacity="0.8" />
    </svg>
  </motion.div>
);

const FloralMandalaSVG = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.3" xmlns="http://www.w3.org/2000/svg">
    {/* Center dot */}
    <circle cx="50" cy="50" r="2" fill="currentColor" />
    {/* Inner ring */}
    <circle cx="50" cy="50" r="5" />
    <circle cx="50" cy="50" r="7" strokeDasharray="0.5 1" />
    
    {/* Layer 1: Small petals */}
    <g>
      {Array.from({ length: 12 }).map((_, i) => (
        <path key={`l1-${i}`} d="M50 43 Q 46 38, 50 32 Q 54 38, 50 43" transform={`rotate(${i * 30} 50 50)`} />
      ))}
    </g>
    
    {/* Layer 2: Ring */}
    <circle cx="50" cy="50" r="20" />
    <circle cx="50" cy="50" r="22" strokeDasharray="1 1.5" />
    
    {/* Layer 3: Main Mehndi Petals */}
    <g>
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={`l3-${i}`} transform={`rotate(${i * 45} 50 50)`}>
          {/* Main outer leaf */}
          <path d="M50 28 Q 30 15, 50 3 Q 70 15, 50 28" />
          {/* Inner detail leaf */}
          <path d="M50 26 Q 38 18, 50 7 Q 62 18, 50 26" strokeWidth="0.2" />
          {/* Center line */}
          <line x1="50" y1="26" x2="50" y2="9" strokeWidth="0.2" />
          {/* Dots inside leaf */}
          <circle cx="50" cy="18" r="0.5" fill="currentColor" />
          <circle cx="50" cy="14" r="0.5" fill="currentColor" />
          <circle cx="50" cy="10" r="0.5" fill="currentColor" />
        </g>
      ))}
    </g>
    
    {/* Layer 4: Secondary leaves between main leaves */}
    <g>
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={`l4-${i}`} transform={`rotate(${i * 45 + 22.5} 50 50)`}>
          <path d="M50 28 Q 40 20, 50 12 Q 60 20, 50 28" fill="currentColor" fillOpacity="0.1" />
          <path d="M50 12 Q 45 6, 50 2 Q 55 6, 50 12" />
        </g>
      ))}
    </g>
    
    {/* Layer 5: Outer scalloped edge */}
    <circle cx="50" cy="50" r="48" strokeWidth="0.1" />
    <g>
      {Array.from({ length: 48 }).map((_, i) => (
        <path key={`l5-${i}`} d="M50 2 C 48 -2, 52 -2, 50 2" transform={`rotate(${i * 7.5} 50 50)`} />
      ))}
    </g>
  </svg>
);

const MandalaDecoration = () => (
  <>
    {/* Top left large corner mandala */}
    <motion.div
      initial={{ y: -10 }}
      animate={{ y: 10, rotate: 360 }}
      transition={{
        y: { duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
        rotate: { duration: 120, repeat: Infinity, ease: "linear" }
      }}
      className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] md:w-[600px] md:h-[600px] opacity-[0.12] pointer-events-none z-[1] text-[#d6c3a3] blur-[0.5px]"
    >
      <FloralMandalaSVG />
    </motion.div>

    {/* Bottom right large corner mandala */}
    <motion.div
      initial={{ y: 10 }}
      animate={{ y: -10, rotate: -360 }}
      transition={{
        y: { duration: 25, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
        rotate: { duration: 100, repeat: Infinity, ease: "linear" }
      }}
      className="absolute bottom-[-150px] right-[-150px] w-[550px] h-[550px] opacity-[0.15] pointer-events-none z-[1] text-[#d6c3a3] blur-[0.5px]"
    >
      <FloralMandalaSVG />
    </motion.div>
    
    {/* Mid right smaller mandala */}
    <motion.div
      initial={{ y: -5 }}
      animate={{ y: 5, rotate: 360 }}
      transition={{
        y: { duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
        rotate: { duration: 80, repeat: Infinity, ease: "linear" }
      }}
      className="absolute top-[30%] right-[-120px] w-[350px] h-[350px] opacity-[0.1] pointer-events-none z-[1] text-[#d6c3a3] blur-[1px]"
    >
      <FloralMandalaSVG />
    </motion.div>

    {/* Mid left smaller mandala */}
    <motion.div
      initial={{ y: 5 }}
      animate={{ y: -5, rotate: -360 }}
      transition={{
        y: { duration: 22, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
        rotate: { duration: 90, repeat: Infinity, ease: "linear" }
      }}
      className="absolute top-[65%] left-[-100px] w-[280px] h-[280px] opacity-[0.12] pointer-events-none z-[1] text-[#d6c3a3] blur-[0.5px]"
    >
      <FloralMandalaSVG />
    </motion.div>
  </>
);

const TimelineItem = ({ item, index }) => {
  const isLeft = index % 2 === 0;
  const delay = index * 0.2;

  return (
    <div className={`relative flex items-center w-full mb-20 md:mb-16 z-10 ${isLeft ? "justify-start" : "justify-end"}`}>
      
      {/* Centered Node */}
      <div className="absolute left-1/2 -translate-x-1/2 flex justify-center group cursor-pointer z-10">
        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: delay, type: "spring", stiffness: 120, damping: 10 }}
          className="w-16 h-16 rounded-full flex items-center justify-center transition-shadow duration-300 group-hover:shadow-[0_12px_25px_rgba(0,0,0,0.08)] group-active:shadow-[0_12px_25px_rgba(0,0,0,0.08)] bg-[#F8F7F4] border-2 border-[#E5DED6] shadow-[0_8px_20px_rgba(0,0,0,0.05)]"
        >
          {/* Icon Fade In */}
          <motion.div
            initial={{ scale: 0, rotate: -20, opacity: 0 }}
            whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: delay + 0.1, ease: "easeOut" }}
            className="transition-transform duration-300 group-hover:scale-110 group-active:scale-110"
          >
            {getIcon(item.title)}
          </motion.div>
        </motion.div>
      </div>

      {/* Content Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: delay + 0.2, ease: "easeOut" }}
        className={`w-[50%] ${isLeft ? "pr-10 md:pr-16 text-right" : "pl-10 md:pl-16 text-left"}`}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: delay + 0.3 }}
          className="inline-block px-4 py-1.5 rounded-full mb-3 shadow-sm bg-[#C9A13B]"
        >
          <span className="text-xs tracking-widest text-white font-montserrat uppercase font-semibold">
            {item.time}
          </span>
        </motion.div>
        <h3 className="text-xl md:text-2xl text-[var(--primary)] font-heading font-medium mb-2">
          {item.title}
        </h3>
        <p className="text-[var(--text-muted)] text-xs md:text-sm leading-relaxed font-body">
          {item.description}
        </p>
      </motion.div>
    </div>
  );
};

export default function Timeline() {
  if (!clientData.toggles.showTimeline) return null;
  return (
    <section className="py-[80px] px-4 bg-[var(--background)] relative overflow-hidden">
      <MandalaDecoration />
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl text-[var(--primary)] mb-4 font-heading font-medium">Event Timeline</h2>
          <div className="w-16 h-px bg-[var(--text-muted)]/30 mx-auto"></div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative w-full">
          <VineLine />
          
          {clientData.timeline.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
