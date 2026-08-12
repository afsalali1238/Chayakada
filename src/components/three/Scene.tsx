"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { ParallaxBackground } from './ParallaxBackground';
import { SteamParticles } from './SteamParticles';
import { RainParticles } from './RainParticles';
import { useRef } from 'react';
import * as THREE from 'three';

function InteractiveLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  
  useFrame(({ pointer }) => {
    if (lightRef.current) {
      lightRef.current.position.x += (pointer.x * 5 - lightRef.current.position.x) * 0.1;
      lightRef.current.position.y += (-pointer.y * 3 - lightRef.current.position.y) * 0.1;
    }
  });

  return (
    <pointLight 
      ref={lightRef} 
      color={0xffd700} 
      intensity={50} // R3F uses physically correct lighting by default now, might need higher intensity
      distance={30} 
      position={[0, 0, 2]} 
    />
  );
}

export function Scene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={1.5} color={0xffffff} />
        <InteractiveLight />
        
        <ParallaxBackground />
        <RainParticles />
        <SteamParticles />
      </Canvas>
    </div>
  );
}
