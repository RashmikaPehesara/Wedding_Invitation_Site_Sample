"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { clientData } from "@/config/clientData";
import { Volume2, VolumeX } from "lucide-react";

const SymmetricalMandala = () => (
  <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <g opacity="0.4">
      {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
        <path key={`outer-${deg}`} d="M50,5 C58,18 70,30 50,45 C30,30 42,18 50,5 Z" transform={`rotate(${deg} 50 50)`} />
      ))}
    </g>
    <g opacity="0.6">
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map(deg => (
        <path key={`mid-${deg}`} d="M50,15 C55,25 62,35 50,50 C38,35 45,25 50,15 Z" transform={`rotate(${deg} 50 50)`} />
      ))}
    </g>
    <g opacity="0.8">
      {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
        <path key={`inner-${deg}`} d="M50,25 C53,32 57,40 50,50 C43,40 47,32 50,25 Z" transform={`rotate(${deg} 50 50)`} />
      ))}
    </g>
    <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="11" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1.5" />
    <circle cx="50" cy="50" r="3" fill="currentColor" />
  </svg>
);

export default function BackgroundEffects() {
  const [petals, setPetals] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // 🌸 PETALS
  useEffect(() => {
    const isMobile =
      typeof window !== "undefined" && window.innerWidth < 768;
    const petalCount = isMobile ? 16 : 28; //petal count 

    const colors = ["#f5c6d6", "#f8dbe3", "#f2b6c6"];

    const newPetals = Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      drift: (Math.random() - 0.5) * 30,
      duration: 12 + Math.random() * 10,
      delay: Math.random() * 10,
      scale: 0.5 + Math.random() * 0.3,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setPetals(newPetals);
  }, []);

  // 🎵 AUDIO UNLOCK SYSTEM (CRITICAL FOR MOBILE/SAFARI)
  useEffect(() => {
  const unlockAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.muted = true;           // 👈 force allow autoplay
      await audio.play();           // 👈 play silently
      audio.pause();
      audio.currentTime = 0;
      audio.muted = false;          // 👈 unmute after unlock
    } catch (err) {
      console.log("unlock failed", err);
    }

    window.removeEventListener("click", unlockAudio);
    window.removeEventListener("touchstart", unlockAudio);
  };

  window.addEventListener("click", unlockAudio);
  window.addEventListener("touchstart", unlockAudio);

  return () => {
    window.removeEventListener("click", unlockAudio);
    window.removeEventListener("touchstart", unlockAudio);
  };
}, []);

useEffect(() => {
  const autoPlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.muted = false;
      audio.volume = 1;
      await audio.play();
      setIsPlaying(true);
    } catch (e) {
      console.log("autoplay blocked");
    }

    window.removeEventListener("click", autoPlay);
  };

  window.addEventListener("click", autoPlay);
}, []);

  // 🎵 NEW TOGGLE LOGIC
  const toggleMusic = async () => {
  const audio = audioRef.current;
  if (!audio) return;

  try {
    if (audio.paused) {
      audio.muted = false;     // 👈 IMPORTANT
      audio.volume = 1;

      const playPromise = audio.play();

      if (playPromise !== undefined) {
        await playPromise;
      }

      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  } catch (err) {
    console.log("Audio blocked:", err);
  }
};

  return (
    <>
      {/* 🌸 GLOBAL SYMMETRICAL MANDALA FLORAL BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Top Left */}
        <motion.div 
          className="absolute -top-[150px] -left-[150px] w-[500px] h-[500px] text-[#C8A24C] opacity-[0.06]"
          animate={{ 
            rotate: [0, 360],
            y: [0, -10, 0], 
            scale: [1, 1.02, 1] 
          }}
          transition={{ 
            rotate: { duration: 150, repeat: Infinity, ease: "linear" },
            y: { duration: 25, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 30, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <SymmetricalMandala />
        </motion.div>
        
        {/* Top Right */}
        <motion.div 
          className="absolute -top-[100px] -right-[100px] w-[450px] h-[450px] text-[#C8A24C] opacity-[0.08]"
          animate={{ 
            rotate: [0, -360],
            y: [0, 12, 0], 
            scale: [1, 1.02, 1] 
          }}
          transition={{ 
            rotate: { duration: 120, repeat: Infinity, ease: "linear" },
            y: { duration: 35, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 28, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <SymmetricalMandala />
        </motion.div>

        {/* Bottom Left */}
        <motion.div 
          className="absolute -bottom-[200px] -left-[100px] w-[600px] h-[600px] text-[#C8A24C] opacity-[0.06]"
          animate={{ 
            rotate: [0, 360],
            y: [0, -15, 0], 
            scale: [1, 1.03, 1] 
          }}
          transition={{ 
            rotate: { duration: 140, repeat: Infinity, ease: "linear" },
            y: { duration: 40, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 35, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <SymmetricalMandala />
        </motion.div>

        {/* Bottom Right */}
        <motion.div 
          className="absolute -bottom-[120px] -right-[120px] w-[400px] h-[400px] text-[#C8A24C] opacity-[0.12]"
          animate={{ 
            rotate: [0, -360],
            y: [0, 10, 0], 
            scale: [1, 1.02, 1] 
          }}
          transition={{ 
            rotate: { duration: 110, repeat: Infinity, ease: "linear" },
            y: { duration: 28, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 25, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <SymmetricalMandala />
        </motion.div>
      </div>

      {/* 🌸 FLOATING PETALS */}
      <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            initial={{
              top: "-10%",
              left: `${petal.x}%`,
              rotate: petal.rotation,
              opacity: 0,
              scale: petal.scale,
            }}
            animate={{
              top: "110%",
              left: [
                `${petal.x}%`,
                `${petal.x + petal.drift}%`,
                `${petal.x}%`,
              ],
              rotate: [
                petal.rotation,
                petal.rotation + 180,
                petal.rotation + 360,
              ],
              opacity: [0, 0.65, 0.65, 0], //petal opacity
            }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: "linear",
            }}
            className="absolute"
            style={{ filter: `blur(${Math.random() * 0.8}px)` }}
          >
            <svg width="28" height="28" viewBox="0 0 20 20" fill={petal.color}>
              <path d="M10 0 C20 0 20 10 10 20 C0 10 0 0 10 0 Z" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* 🎵 MUSIC BUTTON */}
      {clientData.toggles.showMusic && (
        <>
          <audio
            ref={audioRef}
            src="/audio/romantic-bg.mp3"
            loop
            preload="auto"
            playsInline
          />

          <button
            onClick={toggleMusic}
            className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9999] pointer-events-auto p-4 rounded-full bg-[#C8A24C] text-white shadow-[0_4px_20px_rgba(201,161,59,0.35)] active:scale-90 ${
              isPlaying ? "animate-[pulse_3s_ease-in-out_infinite]" : ""
            }`}
          >
            <motion.div
              key={isPlaying ? "playing" : "paused"}
              initial={{ scale: 0.8, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isPlaying ? <Volume2 size={22} /> : <VolumeX size={22} />}
            </motion.div>
          </button>
        </>
      )}
    </>
  );
}