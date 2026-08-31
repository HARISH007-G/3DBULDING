import { useMemo } from 'react';
import * as THREE from 'three';
import { FLOOR_PALETTES, ALUMINUM_FIN_MATERIAL, TEXTURES, ROUGHNESS_MAPS } from '../../utils/materials';

export function Floor5Technology({ isActive = true }: { isActive?: boolean }) {
  const palette = FLOOR_PALETTES[5];

  const cyanEmissiveMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(palette.glow),
        emissive: new THREE.Color(palette.glow),
        emissiveIntensity: 0.5,
        roughness: 0.3
      }),
    [palette.glow]
  );

  const y = 20.0; // Floor 5 height Y = 20m

  return (
    <group name="Floor5Technology" position={[0, y, 0]}>
      {/* 1. High-Performance Engineering Carpet Floor */}
      <mesh position={[0, 0.185, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18.0, 11.0]} />
        <meshStandardMaterial map={TEXTURES.floorCarpet} roughnessMap={ROUGHNESS_MAPS.floorCarpet} roughness={0.7} metalness={0.05} />
      </mesh>

      {/* 2. Server Bay Anti-Static Carbon Flooring Area */}
      <mesh position={[-5.8, 0.188, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5.0, 6.0]} />
        <meshStandardMaterial map={TEXTURES.carbonFiber} roughness={0.4} metalness={0.2} />
      </mesh>

      {/* 3. Server Bay Concrete Feature Accent Wall */}
      <mesh position={[-7.5, 1.9, 0.5]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[6.0, 3.4, 0.15]} />
        <meshStandardMaterial map={TEXTURES.wallConcreteAccent} roughnessMap={ROUGHNESS_MAPS.wallConcreteAccent} roughness={0.8} />
      </mesh>

      {/* 4. Engineering Pod Plaster Wall */}
      <mesh position={[0, 1.9, -5.2]}>
        <boxGeometry args={[17.8, 3.4, 0.12]} />
        <meshStandardMaterial map={TEXTURES.wallGreyPlaster} roughnessMap={ROUGHNESS_MAPS.wallGreyPlaster} roughness={0.7} />
      </mesh>

      {/* 5. Overhead Cable Trays */}
      <mesh position={[0, 3.4, 0]} material={ALUMINUM_FIN_MATERIAL}>
        <boxGeometry args={[16.0, 0.1, 0.3]} />
      </mesh>
      <mesh position={[0, 3.35, 0]} material={cyanEmissiveMaterial}>
        <boxGeometry args={[16.0, 0.02, 0.05]} />
      </mesh>

      {/* 6. Photo Booth Zone Illuminated Overhead Marquee */}
      <group position={[-5.5, 2.9, 0.5]}>
        <mesh material={ALUMINUM_FIN_MATERIAL}>
          <boxGeometry args={[1.6, 0.25, 0.08]} />
        </mesh>
        <mesh position={[0, 0, 0.045]} material={cyanEmissiveMaterial}>
          <boxGeometry args={[1.5, 0.18, 0.02]} />
        </mesh>
      </group>

      {/* Floor Spotlight Rigs */}
      <spotLight position={[-5.5, 3.6, 0.5]} target-position={[-5.5, 0.5, 0.5]} color="#FFFBEB" intensity={2.8} angle={0.65} penumbra={0.5} castShadow={isActive} />
      <pointLight position={[-5.5, 2.4, 0.8]} color="#00F0FF" intensity={1.4} distance={4} />
      <pointLight position={[3.5, 3.0, 0.0]} color="#BAE6FD" intensity={1.5} distance={8} />
    </group>
  );
}
