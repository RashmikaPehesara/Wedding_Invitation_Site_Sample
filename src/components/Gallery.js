"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { clientData } from "@/config/clientData";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";

const flipVariants = {
  initial: { 
    rotateY: 90, 
    opacity: 0, 
    scale: 0.95,
    filter: "blur(4px)" // Subtle blur during transition
  },
  animate: (custom) => ({
    rotateY: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay: custom * 0.1, ease: "easeInOut" }
  }),
  exit: (custom) => ({
    rotateY: -90,
    opacity: 0,
    scale: 0.95,
    filter: "blur(4px)",
    transition: { duration: 0.8, delay: custom * 0.1, ease: "easeInOut" }
  })
};

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    scale: 0.98
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: (direction) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.4, ease: "easeIn" }
  })
};

// Simple mobile detection for performance
const isMobileDevice = typeof window !== "undefined" && window.innerWidth < 768;

export default function Gallery() {
  if (!clientData.toggles.showGallery) return null;

  const images = clientData.gallery; // exactly 16 images
  const itemsPerPage = 4;
  const totalPages = Math.ceil(images.length / itemsPerPage);
  
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [direction, setDirection] = useState(0);

  // Auto-swap system (every 3 seconds)
  useEffect(() => {
    if (selectedIndex !== null) return; // Pause if modal is open
    
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [totalPages, selectedIndex]);

  const openModal = (index) => {
    setDirection(0);
    setSelectedIndex(index);
  };
  const closeModal = () => setSelectedIndex(null);
  const nextImage = (e) => { 
    if (e) e.stopPropagation(); 
    setDirection(1); 
    setSelectedIndex((prev) => (prev + 1) % images.length); 
  };
  const prevImage = (e) => { 
    if (e) e.stopPropagation(); 
    setDirection(-1); 
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length); 
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextImage(e);
      if (e.key === "ArrowLeft") prevImage(e);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <section className="py-[80px] bg-[var(--background)] relative z-20">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center relative z-10">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-[var(--primary)] mb-4 font-heading font-medium">Capturing Moments</h2>
          <div className="w-16 h-px bg-[var(--text-muted)]/30 mx-auto"></div>
        </motion.div>

        {/* 2x2 Grid Auto-Swapping Album */}
        <div 
          className="grid grid-cols-2 gap-3 md:gap-6 w-full max-w-[700px] mx-auto"
          style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
        >
          {[0, 1, 2, 3].map((cellIndex) => {
            const globalIndex = currentPage * itemsPerPage + cellIndex;
            const src = images[globalIndex];
            
            // Fallback safety if images length is not exactly divisible by 4
            if (!src) return <div key={cellIndex} />;

            return (
              <div 
                key={cellIndex} 
                className="relative aspect-[4/5] md:aspect-square w-full rounded-2xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={currentPage} // Mounts new div on page change
                    custom={cellIndex}
                    variants={flipVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0 rounded-[16px] md:rounded-[24px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.12)] cursor-pointer bg-[#F8F7F4]"
                    onClick={() => openModal(globalIndex)}
                    style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                  >
                    <Image
                      src={src}
                      alt={`Gallery ${globalIndex + 1}`}
                      fill
                      loading="lazy"
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 350px"
                    />
                    
                    {/* Depth overlay (inner shadow) */}
                    <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] pointer-events-none"></div>
                    {/* Hover interaction (desktop only) */}
                    <div className="hidden md:block absolute inset-0 bg-black/5 hover:bg-transparent transition-colors duration-300 pointer-events-none"></div>
                  </motion.div>
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Dot Indicators */}
        <div className="mt-10 flex gap-2.5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentPage(i)}
              aria-label={`Go to image set ${i + 1}`}
              className={`transition-all duration-500 rounded-full ${
                i === currentPage 
                  ? 'w-6 h-2 bg-[var(--accent)] shadow-[0_0_8px_rgba(201,161,59,0.4)]' 
                  : 'w-2 h-2 bg-[var(--accent)]/30 hover:bg-[var(--accent)]/60'
              }`} 
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal (Global) */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[998] flex items-center justify-center bg-black/60 backdrop-blur-[8px] p-4 md:p-8"
            onClick={closeModal}
          >
            {/* Top Right Controls */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 z-50">
              <a 
                href={images[selectedIndex]}
                download={`wedding-photo-${selectedIndex + 1}.jpg`}
                className="p-3 text-white/70 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer rounded-full hover:bg-white/10"
                onClick={(e) => e.stopPropagation()}
                title="Save Image"
              >
                <Download size={28} />
              </a>
              <button 
                className="p-3 text-white/70 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer rounded-full hover:bg-white/10"
                onClick={(e) => { e.stopPropagation(); closeModal(); }}
                title="Close"
              >
                <X size={32} />
              </button>
            </div>
            
            {/* Prev Button */}
            <button 
              className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 z-50 rounded-full hover:bg-white/10"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft size={40} className="md:w-12 md:h-12" />
            </button>

            {/* Image Container with AnimatePresence for Slide */}
            <div 
              className="relative w-full max-w-5xl aspect-[4/3] md:aspect-video flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={selectedIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-transparent"
                >
                  <Image
                    src={images[selectedIndex]}
                    alt={`Expanded image ${selectedIndex + 1}`}
                    fill
                    priority
                    className="object-contain"
                    sizes="100vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next Button */}
            <button 
              className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 z-50 rounded-full hover:bg-white/10"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight size={40} className="md:w-12 md:h-12" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
