"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { clientData } from "@/config/clientData";

const CountdownUnit = ({ value, label }) => {
  if (!clientData.toggles.showCountdown) return null;
  return (
    <div className="flex flex-col items-center justify-center 
w-[84px] h-[90px]
sm:w-[92px] sm:h-[112px]
md:w-[108px] md:h-[128px]
px-3 py-4 md:px-4 md:py-5
glass rounded-2xl border border-[var(--primary)]/20 shrink-0">
      <motion.span 
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-[1.9rem] sm:text-[2.3rem] md:text-5xl text-[var(--primary)] font-serif mb-0"
      >
        {value.toString().padStart(2, "0")}
      </motion.span>
      <span className="text-[12px] sm:text-xs md:text-sm uppercase tracking-widest text-[var(--text)] opacity-70">
        {label}
      </span>
    </div>
  );
};

export default function Story() {
  if (!clientData.toggles.showLoveStory) return null;

  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date(clientData.weddingDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-2 px-4 bg-[var(--background)] relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl text-[var(--primary)] mb-8">{clientData.story.title}</h2>
          <p className="text-lg md:text-xl text-[var(--text)] leading-relaxed opacity-80 max-w-2xl mx-auto mb-16">
            {clientData.story.description}
          </p>
        </motion.div>

        {clientData.toggles.showCountdown && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-nowrap justify-center gap-3 sm:gap-4 md:gap-6 pb-10 md:pb-0"
          >
            <CountdownUnit value={timeLeft.days} label="Days" />
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <CountdownUnit value={timeLeft.minutes} label="Mins" />
            <CountdownUnit value={timeLeft.seconds} label="Secs" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
