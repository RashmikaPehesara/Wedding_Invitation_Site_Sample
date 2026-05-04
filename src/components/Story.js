"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { clientData } from "@/config/clientData";

const CountdownUnit = ({ value, label }) => (
  <div className="flex flex-col items-center justify-center p-4 min-w-[80px] md:min-w-[100px] glass rounded-xl border border-[var(--primary)]/20">
    <motion.span 
      key={value}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="text-3xl md:text-5xl text-[var(--primary)] font-serif mb-1"
    >
      {value.toString().padStart(2, "0")}
    </motion.span>
    <span className="text-xs md:text-sm uppercase tracking-widest text-[var(--text)] opacity-70">
      {label}
    </span>
  </div>
);

export default function Story() {
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

  // Story start
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

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6"
        >
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Mins" />
          <CountdownUnit value={timeLeft.seconds} label="Secs" />
        </motion.div>
      </div>
    </section>
  );
}
