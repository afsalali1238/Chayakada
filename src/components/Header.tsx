"use client";

import { useEffect, useState } from "react";
import { Music, PlayCircle } from "lucide-react";
import { Provider } from "@/data/stations";

interface HeaderProps {
  provider: Provider;
  setProvider: (provider: Provider) => void;
}

export default function Header({ provider, setProvider }: HeaderProps) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 p-4 md:p-6 z-50 flex items-start justify-between pointer-events-none">
      
      {/* Left: Location & Time */}
      <div className="pointer-events-auto flex flex-col drop-shadow-md">
        <span className="text-2xl md:text-3xl font-light text-white tracking-wider">
          {time || "--:--"}
        </span>
        <span className="text-xs md:text-sm text-white/70 uppercase tracking-widest mt-1 font-medium">
          Kozhikode, Kerala
        </span>
      </div>

      {/* Center: Live indicator */}
      <div className="hidden md:flex pointer-events-auto items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 drop-shadow-lg">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow shadow-[0_0_8px_2px_rgba(34,197,94,0.6)]"></div>
        <span className="text-xs text-white/90 font-semibold tracking-widest uppercase">Live</span>
      </div>

      {/* Right: Provider Toggle */}
      <div className="pointer-events-auto flex items-center bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10 drop-shadow-lg">
        <button
          onClick={() => setProvider("spotify")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            provider === "spotify" 
              ? "bg-[#1DB954] text-white shadow-lg" 
              : "text-white/60 hover:text-white"
          }`}
        >
          <Music className="w-3 h-3" />
          <span className="hidden sm:inline">Spotify</span>
        </button>
        <button
          onClick={() => setProvider("youtube")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            provider === "youtube" 
              ? "bg-[#FF0000] text-white shadow-lg" 
              : "text-white/60 hover:text-white"
          }`}
        >
          <PlayCircle className="w-3 h-3" />
          <span className="hidden sm:inline">YouTube</span>
        </button>
      </div>

    </header>
  );
}
