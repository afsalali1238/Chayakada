"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Helper for soft particle texture
function createParticleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64; canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.5)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  return new THREE.CanvasTexture(canvas);
}

export function SteamParticles() {
  const count = 80;
  const pTexture = useMemo(() => createParticleTexture(), []);
  
  const [positions, ages] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const age = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = -6.7 + (Math.random() * 0.8);     // x: as requested
      pos[i * 3 + 1] = -0.9 + (Math.random() * 1.5); // y: height as requested
      pos[i * 3 + 2] = -0.5 + Math.random();
      age[i] = Math.random();
    }
    return [pos, age];
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  const geomRef = useRef<THREE.BufferGeometry>(null);

  useFrame((_, delta) => {
    if (!geomRef.current) return;
    const sPos = geomRef.current.attributes.position.array as Float32Array;
    const sAge = geomRef.current.attributes.age.array as Float32Array;

    for (let i = 0; i < count; i++) {
      sAge[i] -= delta * 0.2;
      sPos[i * 3 + 1] += delta * 0.5; // rise up
      sPos[i * 3] += (Math.random() - 0.5) * 0.02; // drift
      
      if (sAge[i] <= 0) {
        sAge[i] = 1.0;
        sPos[i * 3] = -6.7 + (Math.random() * 0.8);
        sPos[i * 3 + 1] = -0.9 + Math.random();
      }
    }
    geomRef.current.attributes.position.needsUpdate = true;
    geomRef.current.attributes.age.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-age" args={[ages, 1]} />
      </bufferGeometry>
      <pointsMaterial 
        color={0xcccccc} 
        size={1.2} 
        map={pTexture} 
        transparent 
        opacity={0.05} 
        depthWrite={false} 
        blending={THREE.AdditiveBlending} 
      />
    </points>
  );
}
