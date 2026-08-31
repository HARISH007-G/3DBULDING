import { useMemo } from 'react';
import * as THREE from 'three';
import { FLOOR_PALETTES, ALUMINUM_FIN_MATERIAL, SMOKED_GLASS_MATERIAL, TEXTURES, ROUGHNESS_MAPS } from '../../utils/materials';

export function Floor2Workspace({ isActive = true }: { isActive?: boolean }) {
  const palette = FLOOR_PALETTES[2];

  const softAccentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(palette.accent),
        emissive: new THREE.Color(palette.primary),
        emissiveIntensity: 0.4,
        roughness: 0.3
      }),
    [palette.accent, palette.primary]
  );

  const y = 8.0; // Floor 2 height Y = 8m

  return (
    <group name="Floor2Workspace" position={[0, y, 0]}>
      {/* 1. Dark Commercial Carpet Floor */}
      <mesh position={[0, 0.185, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18.0, 11.0]} />
        <meshStandardMaterial map={TEXTURES.floorCarpet} roughnessMap={ROUGHNESS_MAPS.floorCarpet} roughness={0.7} metalness={0.05} />
      </mesh>

      {/* 2. Workspace Partition Wall with PBR White Plaster */}
      <mesh position={[0, 1.9, -5.2]}>
        <boxGeometry args={[17.8, 3.4, 0.12]} />
        <meshStandardMaterial map={TEXTURES.wallWhitePlaster} roughnessMap={ROUGHNESS_MAPS.wallWhitePlaster} roughness={0.7} />
      </mesh>

      {/* 3. Soundproof Privacy Phone Booths (Left Wall: X: -6.0, Z: -1.0) */}
      {[-2.0, 0.0, 2.0].map((zPos, idx) => (
        <group key={`booth-${idx}`} position={[-6.0, 0.2, zPos]}>
          {/* Acoustic Wall Frame */}
          <mesh position={[0, 1.2, 0]} material={ALUMINUM_FIN_MATERIAL}>
            <boxGeometry args={[1.4, 2.4, 1.2]} />
          </mesh>
          {/* Glass Privacy Door */}
          <mesh position={[0.7, 1.2, 0]} material={SMOKED_GLASS_MATERIAL}>
            <boxGeometry args={[0.05, 2.3, 1.1]} />
          </mesh>
          {/* Interior Stool */}
          <mesh position={[0, 0.5, 0]} material={softAccentMaterial}>
            <cylinderGeometry args={[0.2, 0.2, 0.5, 16]} />
          </mesh>
        </group>
      ))}

      {/* Floor Spotlight Rigs (Warm Neutral Workspace Lighting) */}
      <spotLight position={[3.0, 3.6, 1.0]} target-position={[3.0, 0.2, 1.0]} color="#F8FAFC" intensity={2.8} angle={0.7} penumbra={0.4} castShadow={isActive} />
      <pointLight position={[-6.0, 3.0, 0.0]} color="#E2E8F0" intensity={1.5} distance={7} />
    </group>
  );
}
