import { useMemo } from 'react';
import * as THREE from 'three';
import { GEOMETRIES } from '../../utils/geometryHelpers';
import { FLOOR_PALETTES, TEXTURES, ROUGHNESS_MAPS } from '../../utils/materials';

export function Floor1Wellness({ isActive = true }: { isActive?: boolean }) {
  const palette = FLOOR_PALETTES[1];

  const bambooMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(palette.bamboo),
        roughness: 0.5,
        metalness: 0.1
      }),
    [palette.bamboo]
  );

  const terracottaMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(palette.accent),
        roughness: 0.6,
        metalness: 0.1
      }),
    [palette.accent]
  );

  const y = 4.0; // Floor 1 height Y = 4m

  return (
    <group name="Floor1Wellness" position={[0, y, 0]}>
      {/* 1. Natural Oak Wood Plank Floor */}
      <mesh position={[0, 0.185, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18.0, 11.0]} />
        <meshStandardMaterial map={TEXTURES.floorOakWood} roughnessMap={ROUGHNESS_MAPS.floorOakWood} roughness={0.4} metalness={0.05} />
      </mesh>

      {/* 2. Wellness Lounge Partition Wall with PBR Painted Plaster */}
      <mesh position={[0, 1.9, -5.2]}>
        <boxGeometry args={[17.8, 3.4, 0.12]} />
        <meshStandardMaterial map={TEXTURES.wallPaintedPlaster} roughnessMap={ROUGHNESS_MAPS.wallPaintedPlaster} roughness={0.65} />
      </mesh>

      {/* 3. Artisanal Espresso Bar Counter */}
      <group position={[-3.8, 0.2, 2.0]}>
        {/* Bar Counter Base */}
        <mesh position={[0, 0.55, 0]} material={terracottaMaterial}>
          <boxGeometry args={[3.2, 1.1, 0.9]} />
        </mesh>
        {/* Bamboo Top Surface */}
        <mesh position={[0, 1.12, 0]} material={bambooMaterial}>
          <boxGeometry args={[3.3, 0.06, 0.95]} />
        </mesh>
        {/* Ceramic Coffee Cups */}
        {[-0.2, 0.1, 0.4, 0.7].map((xOffset, idx) => (
          <mesh key={`cup-${idx}`} position={[xOffset, 1.2, 0.2]}>
            <cylinderGeometry args={[0.04, 0.03, 0.08, 12]} />
            <meshStandardMaterial color="#FFF" roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* 4. Ping-Pong Recreation Table & Library Nook */}
      <group position={[3.5, 0.2, -1.5]}>
        <mesh position={[0, 0.76, 0]}>
          <boxGeometry args={[2.7, 0.05, 1.5]} />
          <meshStandardMaterial color="#1E4D2B" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.85, 0]}>
          <boxGeometry args={[0.02, 0.14, 1.52]} />
          <meshStandardMaterial color="#FFF" roughness={0.3} />
        </mesh>
      </group>

      {/* 5. Library Bookcase & Reading Sectional */}
      <group position={[-1.0, 0.2, -4.5]}>
        <mesh position={[0, 1.4, 0]} material={bambooMaterial}>
          <boxGeometry args={[4.0, 2.6, 0.4]} />
        </mesh>
        {[-1.5, -0.8, 0.0, 0.8, 1.5].map((xOffset, idx) => (
          <mesh key={`book-${idx}`} position={[xOffset, 1.2, 0.05]}>
            <boxGeometry args={[0.4, 0.5, 0.25]} />
            <meshStandardMaterial color={idx % 2 === 0 ? palette.accent : palette.primary} roughness={0.5} />
          </mesh>
        ))}
      </group>

      {/* 6. Lush Potted Botanicals */}
      {[-7.5, 7.5].map((xPos, idx) => (
        <group key={`plant-${idx}`} position={[xPos, 0.2, 3.5]}>
          <mesh geometry={GEOMETRIES.plantPot} material={terracottaMaterial} />
          <mesh position={[0, 0.4, 0]} geometry={GEOMETRIES.plantStem} material={bambooMaterial} />
          <mesh position={[0, 0.7, 0]} geometry={GEOMETRIES.leaf}>
            <meshStandardMaterial color="#2E8B57" roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Floor Spotlight Rigs */}
      <spotLight position={[-3.8, 3.6, 2.0]} target-position={[-3.8, 0.2, 2.0]} color="#FFFBEB" intensity={2.8} angle={0.7} penumbra={0.4} castShadow={isActive} />
      <pointLight position={[3.5, 3.0, -1.5]} color="#FDE68A" intensity={1.5} distance={7} />
    </group>
  );
}
