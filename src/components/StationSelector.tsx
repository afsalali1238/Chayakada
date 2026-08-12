"use client";

import { Station, stations } from "@/data/stations";
import { X } from "lucide-react";

interface StationSelectorProps {
  currentStation: Station;
  onSelect: (station: Station) => void;
  onClose: () => void;
}

export default function StationSelector({ currentStation, onSelect, onClose }: StationSelectorProps) {
  return (
    <div className="absolute bottom-[calc(100%+1rem)] left-0 md:left-1/2 md:-translate-x-1/2 w-full md:w-[600px] z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
      <div className="glass-panel rounded-t-3xl md:rounded-3xl p-4 md:p-6 mx-2 md:mx-0 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-medium malayalam-text">
            ഒരു മൂഡ് തിരഞ്ഞെടുക്കുക (Choose a mood)
          </h3>
          <button 
            onClick={onClose}
            className="p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
          {stations.map((station) => (
            <button
              key={station.id}
              onClick={() => onSelect(station)}
              className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                currentStation.id === station.id 
                  ? "bg-white/10 border-white/30" 
                  : "bg-black/20 border-white/5 hover:bg-white/5 hover:border-white/10"
              }`}
            >
              <div className="flex items-center gap-3 mb-1">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: station.accentColor }}
                ></div>
                <span className="text-white font-medium malayalam-text">
                  {station.nameMalayalam}
                </span>
              </div>
              <span className="text-white/50 text-xs pl-6">
                {station.description}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
