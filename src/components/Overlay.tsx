"use client";

import { Station, stations } from "@/data/stations";

interface OverlayProps {
  onSelect: (station: Station) => void;
}

export default function Overlay({ onSelect }: OverlayProps) {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-500">
      
      <h1 className="text-4xl md:text-5xl text-yellow-500 mb-2 malayalam-text drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">
        നാടൻ ചായക്കട
      </h1>
      <p className="text-white/60 mb-12 tracking-widest uppercase text-sm font-medium">
        മലയാളികളുടെ സ്വന്തം റേഡിയോ
      </p>

      <h2 className="text-xl text-white mb-8 font-light malayalam-text">
        ഒരു മൂഡ് തിരഞ്ഞെടുക്കുക (Choose a mood)
      </h2>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        {stations.map((station) => (
          <button
            key={station.id}
            onClick={() => onSelect(station)}
            className="group relative px-6 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden text-left"
            style={{ 
              borderLeftColor: station.accentColor,
              borderLeftWidth: "4px"
            }}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              style={{ background: `linear-gradient(90deg, ${station.accentColor}, transparent)` }}
            ></div>
            <div className="relative z-10">
              <h3 className="text-xl text-white font-medium malayalam-text mb-1">
                {station.nameMalayalam}
              </h3>
              <p className="text-white/50 text-sm">
                {station.description}
              </p>
            </div>
          </button>
        ))}
      </div>

    </div>
  );
}
