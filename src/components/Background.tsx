"use client";

import { useEffect, useState, useRef } from "react";
import { Scene } from "./three/Scene";

export default function Background({ variant }: { variant: string }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const requestRef = useRef<number>(0);
  const targetPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animateParallax = () => {
      setMousePos((prev) => ({
        x: prev.x + (targetPos.current.x - prev.x) * 0.05,
        y: prev.y + (targetPos.current.y - prev.y) * 0.05,
      }));
      requestRef.current = requestAnimationFrame(animateParallax);
    };
    
    requestRef.current = requestAnimationFrame(animateParallax);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Variant classes for color overlay
  const overlayClasses = {
    "heavy-rain": "bg-blue-900/40 mix-blend-overlay",
    "sepia": "bg-amber-700/40 mix-blend-color",
    "midnight": "bg-indigo-950/70 mix-blend-multiply",
    "moody": "bg-slate-900/60 mix-blend-multiply",
    "festive": "bg-orange-500/20 mix-blend-overlay",
  }[variant] || "bg-transparent";

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-slate-800 pointer-events-none select-none transition-colors duration-1000">
      
      {/* 3D WebGL Scene replacing the fake DOM background */}
      <Scene />

      {/* 6. Dynamic Mood Overlay */}
      <div className={`absolute inset-0 z-40 transition-colors duration-1000 ${overlayClasses} pointer-events-none`}></div>
      <div className="film-grain"></div>
    </div>
  );
}
