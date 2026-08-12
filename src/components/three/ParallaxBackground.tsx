"use client";

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function ParallaxBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture('/background.jpg');
  const { viewport, camera, pointer } = useThree();

  const geomArgs = useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.repeat.set(1.0, 0.8);
    texture.offset.set(0.0, 0.05);

    const image = texture.image as HTMLImageElement;
    const croppedHeight = image.height * 0.8;
    const imgAspect = image.width / croppedHeight;

    const distance = 7; // camera z (5) - mesh z (-2)
    const vFov = ((camera as THREE.PerspectiveCamera).fov * Math.PI) / 180;
    const visibleHeight = 2 * Math.tan(vFov / 2) * distance;
    const visibleWidth = visibleHeight * viewport.aspect;
    
    const parallaxMargin = 1.1; 
    const targetW = visibleWidth * parallaxMargin;
    const targetH = visibleHeight * parallaxMargin;
    
    let pWidth, pHeight;
    if (targetW / targetH > imgAspect) {
      pWidth = targetW;
      pHeight = targetW / imgAspect;
    } else {
      pHeight = targetH;
      pWidth = targetH * imgAspect;
    }

    return [pWidth, pHeight] as const;
  }, [texture, viewport.aspect, camera]);

  useFrame(() => {
    if (meshRef.current) {
      // Smooth interpolation for parallax
      const targetX = pointer.x;
      const targetY = pointer.y;
      meshRef.current.rotation.y += (targetX * 0.05 - meshRef.current.rotation.y) * 0.05;
      meshRef.current.rotation.x += (-targetY * 0.05 - meshRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <planeGeometry args={geomArgs} />
      <meshBasicMaterial map={texture} color={0xdddddd} />
    </mesh>
  );
}
