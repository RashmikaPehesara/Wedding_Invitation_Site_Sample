"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clientData } from "@/config/clientData";
import { Send, Check } from "lucide-react";

const AnimatedInput = ({ label, type = "text", value, onChange, placeholder, required }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="relative w-full mb-8">
      <label className="block text-xs md:text-sm uppercase tracking-widest text-[#1E2D2B]/70 mb-2 font-montserrat font-medium">
        {label} {required && <span className="text-[#C8A24C]">*</span>}
      </label>
      <div className="relative">
        <input 
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          className="w-full bg-transparent border-b border-[#1E2D2B]/10 py-3 text-[#1E2D2B] font-montserrat text-lg focus:outline-none placeholder:text-[#1E2D2B]/20 transition-all duration-300"
        />
        {/* Animated Gold Underline */}
        <div className={`absolute bottom-0 left-0 h-[2px] bg-[#C8A24C] transition-all duration-500 ease-out ${isFocused ? 'w-full' : 'w-0'}`} />
      </div>
    </div>
  );
};

export default function RSVP() {
  if (!clientData.toggles.showRSVP) return null;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    attending: "",
    guests: "1",
    foodPreference: [],
    allergies: "",
    message: ""
  });
  
  const [errorMsg, setErrorMsg] = useState("");

  const [isFocusedMsg, setIsFocusedMsg] = useState(false);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData(prev => ({ ...prev, foodPreference: [...prev.foodPreference, value] }));
    } else {
      setFormData(prev => ({ ...prev, foodPreference: prev.foodPreference.filter(item => item !== value) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Validation
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg("Please provide both your name and phone number.");
      return;
    }
    
    if (!formData.attending) {
      setErrorMsg("Please select whether you will attend.");
      return;
    }
    
    // Construct WhatsApp message exactly as requested
    const attendanceText = formData.attending === "accept" ? "Joyfully Accept" : "Regretfully Decline";
    
   let rawMessage = `*RSVP Confirmation* 💍\n\n`;

rawMessage += `👤 Name: ${formData.name}\n`;
rawMessage += `📞 Phone: ${formData.phone}\n`;
rawMessage += `✅ Attendance: ${attendanceText}\n`;

if (formData.attending === "accept") {
  rawMessage += `👥 Guests: ${formData.guests}\n`;
  rawMessage += `🍽️ Food Preferences: ${
    formData.foodPreference.length > 0
      ? formData.foodPreference.join(", ")
      : "None"
  }\n`;
  rawMessage += `⚠️ Allergies: ${
    formData.allergies.trim() || "None"
  }\n`;
}

rawMessage += `\n💬 Message:\n${formData.message || "-"}`;

    // 🔥 FORCE UTF-8 SAFE ENCODING (fixes � emoji issue)
const whatsappUrl =
  "https://api.whatsapp.com/send?phone=" +
  clientData.whatsappNumber +
  "&text=" +
  encodeURIComponent(rawMessage);

window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="py-24 px-4 bg-[#F8F7F4]/0 relative z-10 overflow-hidden">

      <div className="w-full max-w-[420px] md:max-w-[650px] mx-auto relative z-10">
        
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl text-[#1E2D2B] mb-5 font-heading">Are you attending?</h2>
          <div className="w-12 h-[2px] bg-[#C8A24C] mx-auto rounded-full mb-5"></div>
          <p className="text-[#1E2D2B]/70 font-montserrat font-medium text-sm tracking-wide">
            Kindly respond by November 15th, 2026
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white p-8 md:p-10 rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-[#1E2D2B]/[0.02]"
        >
          
          <AnimatedInput 
            label="Full Name" 
            placeholder="Kasun Silva" 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
          />
          
          <AnimatedInput 
            label="Phone Number" 
            type="tel"
            placeholder="+94 76 978 5263" 
            value={formData.phone} 
            onChange={(e) => setFormData({...formData, phone: e.target.value})} 
            required 
          />

          {/* Attendance Selection */}
          <div className="flex flex-col gap-3 mb-8">
            <label className="block text-xs md:text-sm uppercase tracking-widest text-[#1E2D2B]/70 mb-2 font-montserrat font-medium">Will you attend?</label>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setFormData({...formData, attending: "accept"})}
                className={`w-full py-4 px-6 rounded-full font-montserrat font-medium tracking-wide transition-all duration-300 active:scale-[0.98] ${
                  formData.attending === "accept" 
                    ? "bg-[#1E2D2B] text-white shadow-[0_8px_20px_rgba(30,45,43,0.2)] border border-[#1E2D2B]" 
                    : "bg-transparent border border-[#1E2D2B]/20 text-[#1E2D2B] hover:border-[#1E2D2B]/50 hover:bg-[#1E2D2B]/5"
                }`}
              >
                Joyfully Accept
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, attending: "decline"})}
                className={`w-full py-4 px-6 rounded-full font-montserrat font-medium tracking-wide transition-all duration-300 active:scale-[0.98] ${
                  formData.attending === "decline" 
                    ? "bg-[#1E2D2B] text-white shadow-[0_8px_20px_rgba(30,45,43,0.2)] border border-[#1E2D2B]" 
                    : "bg-transparent border border-[#1E2D2B]/20 text-[#1E2D2B] hover:border-[#1E2D2B]/50 hover:bg-[#1E2D2B]/5"
                }`}
              >
                Regretfully Decline
              </button>
            </div>
          </div>

          <AnimatePresence>
            {formData.attending === "accept" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-[#F8F7F4]/50 rounded-[20px] p-6 mb-8 border border-[#1E2D2B]/5">
                   
                   {/* Guest Count Dropdown */}
                   <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#1E2D2B]/10">
                     <label className="text-xs uppercase tracking-widest text-[#1E2D2B]/80 font-montserrat font-semibold">Guests Attending</label>
                     <select 
                       value={formData.guests} 
                       onChange={e => setFormData({...formData, guests: e.target.value})}
                       className="bg-white border border-[#1E2D2B]/10 rounded-full px-5 py-2.5 text-[#1E2D2B] font-montserrat font-bold focus:outline-none focus:ring-2 focus:ring-[#C8A24C]/30 shadow-sm appearance-none cursor-pointer text-center"
                       style={{ 
                         backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="none" viewBox="0 0 24 24" stroke="%231E2D2B"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>')`, 
                         backgroundRepeat: 'no-repeat', 
                         backgroundPosition: 'right 12px center', 
                         backgroundSize: '14px', 
                         paddingRight: '40px' 
                       }}
                     >
                       {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                     </select>
                   </div>

                   {/* Custom Checkboxes for Food */}
                   <div>
                     <label className="block text-xs uppercase tracking-widest text-[#1E2D2B]/80 mb-4 font-montserrat font-semibold">Food Preferences</label>
                     <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                       {["Vegetarian", "Non-Veg", "Non-Pork", "Non-Beef"].map(pref => (
                         <label key={pref} className="flex items-center gap-3 cursor-pointer group w-fit">
                           <div className="relative flex items-center justify-center w-5 h-5 rounded-[6px] border border-[#1E2D2B]/20 transition-colors duration-300 overflow-hidden shrink-0">
                             <input 
                               type="checkbox"
                               value={pref}
                               checked={formData.foodPreference.includes(pref)}
                               onChange={handleCheckboxChange}
                               className="absolute opacity-0 w-full h-full cursor-pointer"
                             />
                             <div className={`w-full h-full flex items-center justify-center transition-all duration-300 ${formData.foodPreference.includes(pref) ? "bg-[#1E2D2B] border-none" : "bg-transparent group-hover:bg-[#1E2D2B]/5"}`}>
                               <motion.div
                                  initial={false}
                                  animate={{ scale: formData.foodPreference.includes(pref) ? 1 : 0 }}
                                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                               >
                                 <Check size={14} className="text-white" strokeWidth={3} />
                               </motion.div>
                             </div>
                           </div>
                           <span className="text-[#1E2D2B] font-montserrat text-sm font-medium">{pref}</span>
                         </label>
                       ))}
                     </div>
                   </div>
                   
                   {/* Allergies */}
                   <div className="mt-6">
                     <AnimatedInput 
                       label="Allergies (if any)" 
                       placeholder="e.g. Peanuts, Dairy..." 
                       value={formData.allergies} 
                       onChange={(e) => setFormData({...formData, allergies: e.target.value})} 
                       required={false}
                     />
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animated Textarea */}
          <div className="relative w-full mb-10 group">
            <label className="block text-xs md:text-sm uppercase tracking-widest text-[#1E2D2B]/70 mb-2 font-montserrat font-medium">Message for the couple</label>
            <div className="relative">
              <textarea 
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                onFocus={() => setIsFocusedMsg(true)}
                onBlur={() => setIsFocusedMsg(false)}
                placeholder="Leave a message for the couple..."
                className={`w-full bg-transparent border-b border-[#1E2D2B]/10 py-3 text-[#1E2D2B] font-montserrat focus:outline-none placeholder:text-[#1E2D2B]/20 transition-all duration-500 ease-out resize-none overflow-hidden ${isFocusedMsg ? 'min-h-[120px]' : 'min-h-[50px]'}`}
              />
              <div className={`absolute bottom-0 left-0 h-[2px] bg-[#C8A24C] transition-all duration-500 ease-out ${isFocusedMsg ? 'w-full' : 'w-0'}`} />
            </div>
          </div>

          {/* Validation Error */}
          {errorMsg && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm font-montserrat font-medium text-center mb-6"
            >
              {errorMsg}
            </motion.p>
          )}

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-[#C8A24C] text-white py-4 rounded-full flex items-center justify-center gap-3 transition-all duration-500 font-montserrat tracking-widest text-xs font-bold uppercase shadow-[0_4px_15px_rgba(201,161,59,0.2)] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(201,161,59,0.4)] active:scale-[0.98] group animate-[pulse_3s_ease-in-out_infinite]"
          >
            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            Send via WhatsApp
          </button>

        </motion.form>
      </div>
    </section>
  );
}
