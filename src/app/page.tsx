"use client";

import { useState } from "react";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import Couple from "@/components/Couple";
import Story from "@/components/Story";
import Timeline from "@/components/Timeline";
import Location from "@/components/Location";
import Gallery from "@/components/Gallery";
import RSVP from "@/components/RSVP";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/BackgroundEffects";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="min-h-screen relative overflow-x-clip">
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      
      {/* Background effects like petals and music toggle */}
      <BackgroundEffects />

      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <Hero />
        <Couple />
        <Story />
        <Timeline />
        <Location />
        <Gallery />
        <RSVP />
        <Footer />
      </div>
    </main>
  );
}
