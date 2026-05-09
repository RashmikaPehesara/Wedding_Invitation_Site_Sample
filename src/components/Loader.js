"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clientData } from "@/config/clientData";

export default function Loader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Match this with your video length (e.g. 4s)
    const timer = setTimeout(() => {
      setIsVisible(false);

      // wait for fade-out before calling parent
      setTimeout(() => {
        onComplete?.();
      }, 1200);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--background)]"
        >
          {/* Soft overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 to-white/90 backdrop-blur-sm z-0" />

          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
          >
            {/* 🎥 VIDEO LOADER */}
            <motion.div
              className="mb-8 w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full overflow-hidden border border-[#C8A24C]/20 shadow-[0_10px_40px_rgba(200,162,76,0.25)]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <video
                src="/Loader.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Names */}
            <h1 className="text-5xl md:text-7xl text-[var(--primary)] mb-6 font-script text-center">
              {clientData.couple.groom.name} &amp;{" "}
              {clientData.couple.bride.name}
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1.2 }}
              className="text-sm md:text-base text-[var(--accent)] tracking-[0.3em] uppercase font-sans text-center"
            >
              A New Beginning
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}