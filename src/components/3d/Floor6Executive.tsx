import { useMemo } from 'react';
import * as THREE from 'three';
import { TEXTURES, ROUGHNESS_MAPS } from '../../utils/materials';
import { HolographicVRPedestal } from './HolographicVRPedestal';
import { CurvedXRHolographicWall } from './CurvedXRHolographicWall';
import { VRArenaPlayer } from './VRArenaPlayer';
import { VRLighthouseTowers } from './VRLighthouseTowers';
import { VRDeveloperStation } from './VRDeveloperStation';

export function Floor6Executive({ isActive = true }: { isActive?: boolean }) {
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

  const y = 24.0; // Floor 6 height Y = 24m

  return (
    <group name="Floor6Executive" position={[0, y, 0]}>
      {/* 1. Master Hardwood Floor Plane with PBR Wood Texture */}
      <mesh position={[0, 0.185, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18.0, 11.0]} />
        <meshStandardMaterial
          map={TEXTURES.floorWood}
          roughnessMap={ROUGHNESS_MAPS.floorWood}
          roughness={0.3}
          metalness={0.05}
        />
      </mesh>

      {/* 2. Cyber-Polished Inlay under Central VR Area */}
      <mesh position={[0, 0.188, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14.0, 7.5]} />
        <meshStandardMaterial map={TEXTURES.blackGoldMarble} roughness={0.18} metalness={0.2} />
      </mesh>

      {/* 3. Executive Back & Side Partition Walls with PBR White Plaster */}
      <mesh position={[0, 1.9, -5.2]} material={wallPlasterMaterial}>
        <boxGeometry args={[17.8, 3.4, 0.12]} />
      </mesh>

      {/* 4. Massive Curved 180° Holographic XR Game Wall (Back Wall) */}
      <CurvedXRHolographicWall position={[0, 2.0, -5.0]} />

      {/* 5. Hero Floating VR Headset Pedestal (Center-Left) */}
      <HolographicVRPedestal position={[-2.2, 0.185, 0.2]} />

      {/* 6. Active VR Gamer Character inside Pulsing Holographic Arena Ring (Center-Right) */}
      <VRArenaPlayer position={[2.4, 0.185, -0.2]} />

      {/* 7. 4x Corner Lighthouse Tracking Towers with Laser Beams */}
      <VRLighthouseTowers />

      {/* 8. VR Developer Hardware Station (Charging Dock, Controllers, Gaming Chair) */}
      <VRDeveloperStation position={[-5.2, 0.185, 2.0]} />

      {/* 9. Architectural Floor Lighting Rigs */}
      <spotLight
        position={[-2.2, 3.6, 0.2]}
        target-position={[-2.2, 0.5, 0.2]}
        color="#FFFBEB"
        intensity={2.2}
        angle={0.55}
        penumbra={0.5}
        castShadow={isActive}
      />
      <pointLight position={[0, 3.2, 0]} color="#38BDF8" intensity={1.8} distance={10} />
    </group>
  );
}
