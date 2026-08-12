"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

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

export function RainParticles() {
  const count = 3000;
  const pTexture = useMemo(() => createParticleTexture(), []);
  
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = -4.5 + (Math.random() * 8);       // x (-4.5 to 3.5: Between pillars)
      pos[i * 3 + 1] = -3 + (Math.random() * 5.5);   // y (-3 to 2.5: Roof to ground)
      pos[i * 3 + 2] = -1.5 - (Math.random() * 2);   // z (-1.5 to -3.5: Behind foreground)
      vel[i] = 0.08 + Math.random() * 0.15;          // downward velocity
    }
    return [pos, vel];
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  const geomRef = useRef<THREE.BufferGeometry>(null);

  useFrame(() => {
    if (!geomRef.current) return;
    const rPos = geomRef.current.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      rPos[i * 3 + 1] -= velocities[i];
      if (rPos[i * 3 + 1] < -3) { // Reset when it hits the "ground"
        rPos[i * 3 + 1] = 2.5; // Spawn at roofline
        rPos[i * 3] = -4.5 + (Math.random() * 8);
      }
    }
    geomRef.current.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial 
        color={0xaaccff} 
        size={0.05} 
        map={pTexture} 
        transparent 
        opacity={0.4} 
        depthWrite={false} 
      />
    </points>
  );
}
