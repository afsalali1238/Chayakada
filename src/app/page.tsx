"use client";

import { useState, useEffect } from "react";
import { Station, stations, Provider } from "@/data/stations";
import Background from "@/components/Background";
import Header from "@/components/Header";
import Player from "@/components/Player";
import StationSelector from "@/components/StationSelector";
import { useAudioEffects } from "@/hooks/useAudioEffects";

export default function Home() {
  const [hasInteracted, setHasInteracted] = useState(true);
  const [provider, setProvider] = useState<Provider>("youtube");
  const [station, setStation] = useState<Station>(stations[0]);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { playStatic, setRainVolume } = useAudioEffects();

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

  // Handle rain volume based on current station
  useEffect(() => {
    if (hasInteracted) {
      if (station.backgroundVariant === 'heavy-rain') setRainVolume(0.5);
      else if (station.backgroundVariant === 'moody') setRainVolume(0.3);
      else if (station.backgroundVariant === 'midnight') setRainVolume(0.1);
      else if (station.backgroundVariant === 'sepia') setRainVolume(0.1);
      else setRainVolume(0); // festive has no rain
    }
  }, [station.backgroundVariant, hasInteracted, setRainVolume]);

  const handleProviderChange = (newProvider: Provider) => {
    setProvider(newProvider);
    localStorage.setItem("chayakada-provider", newProvider);
  };

  const handleStationChange = (newStation: Station) => {
    // Only play static if changing to a different station, and user has interacted
    if (newStation.id !== station.id && hasInteracted) {
      playStatic();
    }
    
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

      {/* 6. Footer signature (Removed) */}

    </main>
  );
}
