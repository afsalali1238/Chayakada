"use client";

import { useState, useEffect } from "react";
import { Station, stations, Provider } from "@/data/stations";
import Background from "@/components/Background";
import Header from "@/components/Header";
import Player from "@/components/Player";
import Overlay from "@/components/Overlay";
import StationSelector from "@/components/StationSelector";

export default function Home() {
  const [hasInteracted, setHasInteracted] = useState(true);
  const [provider, setProvider] = useState<Provider>("youtube");
  const [station, setStation] = useState<Station>(stations[0]);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedProvider = localStorage.getItem("chayakada-provider") as Provider;
    const savedStationId = localStorage.getItem("chayakada-station");
    
    if (savedProvider) setProvider(savedProvider);
    if (savedStationId) {
      const found = stations.find(s => s.id === savedStationId);
      if (found) setStation(found);
    }
  }, []);

  const handleProviderChange = (newProvider: Provider) => {
    setProvider(newProvider);
    localStorage.setItem("chayakada-provider", newProvider);
  };

  const handleStationChange = (newStation: Station) => {
    setStation(newStation);
    localStorage.setItem("chayakada-station", newStation.id);
    setIsSelectorOpen(false);
  };

  const handleInitialSelect = (newStation: Station) => {
    handleStationChange(newStation);
    setHasInteracted(true);
  };

  if (!isMounted) return null;

  return (
    <main className="relative w-full h-[100dvh] overflow-hidden bg-slate-900">
      
      {/* 1. Environment Background */}
      <Background variant={station.backgroundVariant} />

      {/* 2. Header */}
      <Header provider={provider} setProvider={handleProviderChange} />

      {/* Title text removed as requested */}

      {/* 4. Player & Selector */}
      {hasInteracted && (
        <>
          <Player 
            station={station} 
            provider={provider} 
            onOpenSelector={() => setIsSelectorOpen(!isSelectorOpen)} 
          />
          {isSelectorOpen && (
            <StationSelector 
              currentStation={station} 
              onSelect={handleStationChange} 
              onClose={() => setIsSelectorOpen(false)} 
            />
          )}
        </>
      )}

      {/* 5. Initial Overlay (Removed) */}

      {/* 6. Footer signature */}
      <div className="absolute bottom-4 right-4 z-20 text-white/30 text-xs font-light malayalam-text pointer-events-none drop-shadow-md hidden sm:block">
        മഴ ആസ്വദിക്കൂ. പാട്ടും കേൾക്കൂ. (Enjoy the rain. Listen to the music.)
      </div>

    </main>
  );
}
