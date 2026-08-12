"use client";

import { useEffect, useRef, useCallback } from 'react';

export function useAudioEffects() {
  const rainAudioRef = useRef<HTMLAudioElement | null>(null);
  const staticAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio elements
    const rain = new Audio('https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg');
    rain.loop = true;
    rain.volume = 0; // Start at 0, fade in
    rainAudioRef.current = rain;

    const radioStatic = new Audio('https://actions.google.com/sounds/v1/science_fiction/tv_static.ogg');
    radioStatic.volume = 0.3; // Lower volume for static
    staticAudioRef.current = radioStatic;

    return () => {
      rain.pause();
      rain.src = "";
      radioStatic.pause();
      radioStatic.src = "";
    };
  }, []);

  // Listen for first interaction to unlock audio
  useEffect(() => {
    const handleInteraction = () => {
      if (rainAudioRef.current && rainAudioRef.current.paused && rainAudioRef.current.volume > 0) {
        rainAudioRef.current.play().catch(() => {});
      }
    };
    window.addEventListener('click', handleInteraction);
    return () => window.removeEventListener('click', handleInteraction);
  }, []);

  const playStatic = useCallback(() => {
    if (staticAudioRef.current) {
      staticAudioRef.current.currentTime = 0;
      staticAudioRef.current.play().catch(e => console.log("Audio play failed:", e));
      
      // Stop static after 600ms to simulate the tuning sound
      setTimeout(() => {
        if (staticAudioRef.current) {
          staticAudioRef.current.pause();
        }
      }, 600);
    }
  }, []);

  const setRainVolume = useCallback((targetVolume: number) => {
    if (rainAudioRef.current) {
      // If it's paused and we want volume, play it
      if (rainAudioRef.current.paused && targetVolume > 0) {
        rainAudioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      
      // Simple fade effect
      const current = rainAudioRef.current.volume;
      const step = (targetVolume - current) / 10;
      let steps = 0;
      
      const fadeInterval = setInterval(() => {
        steps++;
        if (rainAudioRef.current) {
          let newVol = current + (step * steps);
          if (newVol < 0) newVol = 0;
          if (newVol > 1) newVol = 1;
          rainAudioRef.current.volume = newVol;
        }
        
        if (steps >= 10) {
          clearInterval(fadeInterval);
          if (targetVolume === 0 && rainAudioRef.current) {
            rainAudioRef.current.pause();
          }
        }
      }, 50);
    }
  }, []);

  return { playStatic, setRainVolume };
}
