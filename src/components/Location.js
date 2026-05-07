"use client";

import { motion } from "framer-motion";
import { clientData } from "@/config/clientData";
import { MapPin, CalendarPlus, Map, Clock } from "lucide-react";

export default function Location() {
  const { venueName, address, duration, googleMapsUrl, embedMapUrl } = clientData.location;
  
  // Simple Add to Google Calendar Link Generator
  const generateGoogleCalendarLink = () => {
    const text = encodeURIComponent(`Wedding of ${clientData.couple.groom.name} & ${clientData.couple.bride.name}`);
    const details = encodeURIComponent(`Join us in celebrating our wedding!`);
    const locationStr = encodeURIComponent(`${venueName}, ${address}`);
    
    // Convert to ISO string without hyphens/colons for Google Calendar
    const d = new Date(clientData.weddingDate);
    const start = d.toISOString().replace(/-|:|\.\d\d\d/g, "");
    
    // Add 8 hours for end time
    const endD = new Date(d.getTime() + 8 * 60 * 60 * 1000);
    const end = endD.toISOString().replace(/-|:|\.\d\d\d/g, "");
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${locationStr}`;
  };

  return (
    <section className="pt-12 pb-24 px-4 bg-[#F8F7F4]/0 relative overflow-hidden z-10">

      <div className="max-w-2xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-5xl text-[#1E2D2B] mb-5 font-heading">When & Where</h2>
          <div className="w-12 h-[2px] bg-[#C8A24C] mx-auto rounded-full"></div>
        </motion.div>

        {/* Top: Custom Styled Map Card */}
        <motion.a
          href={`https://www.google.com/maps/search/?api=1&query=${clientData.location.lat},${clientData.location.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="block w-full relative h-[300px] md:h-[350px] rounded-[24px] overflow-hidden border-[1.5px] border-[#C8A24C] shadow-[0_0_25px_rgba(200,162,76,0.25)] mb-8 bg-white cursor-pointer hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(200,162,76,0.4)] transition-all duration-500 ease-out group"
        >
          {/* Grayscale Map iFrame */}
          <motion.iframe
            initial={{ scale: 1 }}
            whileInView={{ scale: 1.05 }}
            transition={{ duration: 5, ease: "easeOut" }}
            src={embedMapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full absolute inset-0 pointer-events-none select-none opacity-50 grayscale contrast-125 sepia-[0.2]"
          ></motion.iframe>
          
          {/* Overlay gradient to blend bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8F7F4] via-transparent to-transparent opacity-90 pointer-events-none"></div>
          
          {/* Soft blur overlay to mask raw UI */}
          <div className="absolute inset-0 backdrop-blur-[1px] pointer-events-none bg-[#F8F7F4]/10"></div>
          
          {/* Custom Marker Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
            <motion.div 
              className="relative w-16 h-16 flex items-center justify-center pointer-events-none"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-[#C8A24C] rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-30"></div>
              <div className="absolute inset-0 bg-[#C8A24C] rounded-full animate-[pulse_2s_ease-in-out_infinite] opacity-20 scale-75"></div>
              <div className="w-4 h-4 bg-[#C8A24C] rounded-full shadow-[0_0_15px_rgba(201,161,59,0.8)] relative z-10 border-2 border-white"></div>
            </motion.div>
            <div className="mt-1 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.1)] border border-[#1E2D2B]/5 text-[10px] uppercase tracking-widest font-montserrat font-bold text-[#1E2D2B] pointer-events-none group-hover:-translate-y-1 group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-all duration-300">
              Wedding Location
            </div>
          </div>
        </motion.a>

        {/* Below: Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-[420px] flex flex-col justify-center text-center bg-white p-8 md:p-10 rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-[#1E2D2B]/[0.02]"
        >
          
          {/* Details Section */}
          <div className="flex flex-col items-center space-y-6 mb-10 text-[#1E2D2B]">
            <div className="flex flex-col items-center gap-3">
              <MapPin className="text-[#C8A24C]" size={28} strokeWidth={1.5} />
              <h3 className="text-3xl font-heading mb-1">{venueName}</h3>
              <p className="opacity-70 leading-relaxed font-montserrat text-sm max-w-[280px]">{address}</p>
            </div>
            
            <div className="w-16 h-px bg-[#1E2D2B]/10"></div>
            
            <div className="flex flex-col items-center gap-3">
              <Clock className="text-[#C8A24C]" size={26} strokeWidth={1.5} />
              <p className="opacity-70 font-montserrat font-medium tracking-wide text-sm">{duration}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 w-full">
            <a 
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-[#C8A24C] text-white px-6 py-4 rounded-full transition-all duration-500 font-montserrat tracking-widest text-xs font-bold uppercase shadow-[0_4px_15px_rgba(201,161,59,0.2)] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(201,161,59,0.4)] active:scale-[0.98] group"
            >
              <Map size={18} className="group-hover:scale-110 transition-transform duration-300" />
              Open in Maps
            </a>
            
            <a 
              href={generateGoogleCalendarLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-transparent border border-[#C8A24C] text-[#C8A24C] px-6 py-4 rounded-full transition-all duration-500 font-montserrat tracking-widest text-xs font-bold uppercase hover:bg-[#C8A24C]/5 active:scale-[0.98] group"
            >
              <CalendarPlus size={18} className="group-hover:scale-110 transition-transform duration-300" />
              Add to Calendar
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
