import { useMemo } from 'react';
import * as THREE from 'three';
import { FLOOR_PALETTES, GOLD_TRIM_MATERIAL, TEXTURES, ROUGHNESS_MAPS } from '../../utils/materials';

export function Floor4Creative({ isActive = true }: { isActive?: boolean }) {
  const palette = FLOOR_PALETTES[4];

  const violetGlowMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(palette.primary),
        emissive: new THREE.Color(palette.primary),
        emissiveIntensity: 1.2
      }),
    [palette.primary]
  );

  const orangeAccentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(palette.accent),
        emissive: new THREE.Color(palette.accent),
        emissiveIntensity: 1.0,
        roughness: 0.2
      }),
    [palette.accent]
  );

  const y = 16.0; // Floor 4 height Y = 16m

  return (
    <group name="Floor4Creative" position={[0, y, 0]}>
      {/* 1. Studio Oak Wood Flooring Plane */}
      <mesh position={[0, 0.185, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18.0, 11.0]} />
        <meshStandardMaterial map={TEXTURES.floorOakWood} roughnessMap={ROUGHNESS_MAPS.floorOakWood} roughness={0.4} metalness={0.05} />
      </mesh>

      {/* 2. Creative Studio Partition Wall with PBR Painted Plaster */}
      <mesh position={[0, 1.9, -5.2]}>
        <boxGeometry args={[17.8, 3.4, 0.12]} />
        <meshStandardMaterial map={TEXTURES.wallPaintedPlaster} roughnessMap={ROUGHNESS_MAPS.wallPaintedPlaster} roughness={0.65} />
      </mesh>

      {/* 3. Creative Design Atelier & Mood Board Display Wall */}
      <group position={[-3.0, 0.2, -1.5]}>
        {/* Large Mood Board Gallery Frame */}
        <mesh position={[0, 1.8, -3.2]} material={GOLD_TRIM_MATERIAL}>
          <boxGeometry args={[4.5, 2.2, 0.08]} />
        </mesh>
        {/* Swatch Panels */}
        {[-1.5, -0.5, 0.5, 1.5].map((xOffset, idx) => (
          <mesh key={`swatch-${idx}`} position={[xOffset, 1.8, -3.15]}>
            <planeGeometry args={[0.8, 1.8]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? palette.primary : palette.accent}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>

      {/* 4. Colorful Acoustic Wall Fins (Right Wall: X: 8.5) */}
      {[-3.0, -1.5, 0.0, 1.5, 3.0].map((zPos, idx) => (
        <mesh key={`acoustic-${idx}`} position={[8.5, 2.0, zPos]} material={idx % 2 === 0 ? violetGlowMaterial : orangeAccentMaterial}>
          <boxGeometry args={[0.1, 2.4, 0.8]} />
        </mesh>
      ))}

      {/* Floor Spotlight Rigs */}
      <spotLight position={[-3.0, 3.6, -1.5]} target-position={[-3.0, 0.2, -1.5]} color="#FFFFFF" intensity={2.5} angle={0.6} penumbra={0.5} castShadow={isActive} />
      <pointLight position={[3.5, 3.2, -1.0]} color="#FDE68A" intensity={1.5} distance={7} />
    </group>
  );
}
