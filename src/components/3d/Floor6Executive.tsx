import { useMemo } from 'react';
import * as THREE from 'three';
import { FLOOR_PALETTES, GOLD_TRIM_MATERIAL, TEXTURES, ROUGHNESS_MAPS } from '../../utils/materials';

export function Floor6Executive({ isActive = true }: { isActive?: boolean }) {
  const palette = FLOOR_PALETTES[6];

  // Pre-allocated wall material — NOT inside JSX render path
  const wallPlasterMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: TEXTURES.wallWhitePlaster,
        roughnessMap: ROUGHNESS_MAPS.wallWhitePlaster,
        roughness: 0.7
      }),
    []
  );

  const woodMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(palette.wood),
        roughness: 0.4,
        metalness: 0.1
      }),
    [palette.wood]
  );

  const y = 24.0; // Floor 6 height Y = 24m

  return (
    <group name="Floor6Executive" position={[0, y, 0]}>
      {/* 1. Master Hardwood Floor Plane with PBR Wood Texture */}
      <mesh position={[0, 0.185, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18.0, 11.0]} />
        <meshStandardMaterial map={TEXTURES.floorWood} roughnessMap={ROUGHNESS_MAPS.floorWood} roughness={0.3} metalness={0.05} />
      </mesh>

      {/* 2. Executive Desk Marble Inlay Area */}
      <mesh position={[-2.5, 0.188, -1.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6.0, 5.0]} />
        <meshStandardMaterial map={TEXTURES.blackGoldMarble} roughness={0.2} metalness={0.15} />
      </mesh>

      {/* 3. Executive Back & Side Partition Walls with PBR White Plaster */}
      <mesh position={[0, 1.9, -5.2]} material={wallPlasterMaterial}>
        <boxGeometry args={[17.8, 3.4, 0.12]} />
      </mesh>

      {/* 4. Luxury Gold-Framed Executive Artwork Canvas (Back Wall) */}
      <group position={[-2.5, 2.0, -4.8]}>
        <mesh material={GOLD_TRIM_MATERIAL}>
          <boxGeometry args={[3.2, 1.8, 0.06]} />
        </mesh>
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[3.0, 1.6]} />
          <meshStandardMaterial color="#2B1B17" roughness={0.3} />
        </mesh>
      </group>

      {/* 5. Sky Lounge Bar Counter */}
      <group position={[3.5, 0.2, 3.2]}>
        <mesh position={[0, 0.5, 0]} material={woodMaterial}>
          <boxGeometry args={[2.2, 1.0, 0.6]} />
        </mesh>
        <mesh position={[0, 1.02, 0]} material={GOLD_TRIM_MATERIAL}>
          <boxGeometry args={[2.3, 0.04, 0.65]} />
        </mesh>
      </group>

      {/* Floor Spotlight Rigs */}
      <spotLight position={[-2.5, 3.6, -1.5]} target-position={[-2.5, 0.2, -1.5]} color="#FFFBEB" intensity={2.4} angle={0.6} penumbra={0.5} castShadow={isActive} />
      <pointLight position={[3.5, 3.2, 2.0]} color="#FDE68A" intensity={1.5} distance={7} />
    </group>
  );
}
