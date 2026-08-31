import { useMemo } from 'react';
import * as THREE from 'three';
import { GEOMETRIES } from '../../utils/geometryHelpers';
import { GOLD_TRIM_MATERIAL, ALUMINUM_FIN_MATERIAL, TEXTURES, ROUGHNESS_MAPS } from '../../utils/materials';

export function GroundReception({ isActive = true }: { isActive?: boolean }) {
  const darkStoneAccentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1A1D24'),
        roughness: 0.3,
        metalness: 0.5
      }),
    []
  );

  const logoGlowMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#FFFFFF'),
        emissive: new THREE.Color('#FFF8DC'),
        emissiveIntensity: 2.8
      }),
    []
  );

  const y = 0.0; // Ground Floor height Y = 0m

  return (
    <group name="GroundReception" position={[0, y, 0]}>
      {/* 1. Master Marble Tiles Atrium Floor */}
      <mesh position={[0, 0.185, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20.0, 14.0]} />
        <meshStandardMaterial map={TEXTURES.floorMarbleTiles} roughnessMap={ROUGHNESS_MAPS.floorMarbleTiles} roughness={0.15} metalness={0.1} />
      </mesh>

      {/* Dark Stone Borders & Entrance Inlay */}
      <mesh position={[0, 0.188, 5.5]} material={darkStoneAccentMaterial}>
        <boxGeometry args={[12.0, 0.01, 2.5]} />
      </mesh>
      <mesh position={[0, 0.19, 0]} material={GOLD_TRIM_MATERIAL}>
        <boxGeometry args={[20.2, 0.01, 14.2]} />
      </mesh>

      {/* Visitor Lounge Carpet Area (Right Zone) */}
      <mesh position={[5.5, 0.189, -1.0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7.0, 6.0]} />
        <meshStandardMaterial map={TEXTURES.floorCarpet} roughnessMap={ROUGHNESS_MAPS.floorCarpet} roughness={0.7} metalness={0.05} />
      </mesh>

      {/* 2. Grand Reception Desk & Backlit Crest Wall */}
      <group position={[0, 0.2, -1.0]}>
        {/* Curled Marble Front Desk Counter */}
        <mesh position={[0, 0.6, 0]} geometry={GEOMETRIES.sofaSeat} material={darkStoneAccentMaterial} />
        <mesh position={[0, 1.12, 0]} material={GOLD_TRIM_MATERIAL}>
          <boxGeometry args={[3.8, 0.05, 1.25]} />
        </mesh>

        {/* Receptionist Computer, Keyboard & Phone */}
        <mesh position={[-0.6, 1.25, 0]} geometry={GEOMETRIES.monitorFrame} material={ALUMINUM_FIN_MATERIAL} />
        <mesh position={[-0.6, 1.25, 0.02]} geometry={GEOMETRIES.monitorScreen}>
          <meshStandardMaterial map={TEXTURES.chartScreen} emissive="#00F0FF" emissiveIntensity={1.5} roughness={0.2} />
        </mesh>
        <mesh position={[-0.6, 1.14, 0.25]} geometry={GEOMETRIES.keyboard} material={ALUMINUM_FIN_MATERIAL} />
        <mesh position={[0.6, 1.16, 0.2]} material={ALUMINUM_FIN_MATERIAL}>
          <boxGeometry args={[0.22, 0.08, 0.22]} />
        </mesh>
        <mesh position={[1.1, 1.16, 0.2]} rotation={[-0.4, 0, 0]}>
          <boxGeometry args={[0.24, 0.01, 0.18]} />
          <meshStandardMaterial color="#111" roughness={0.2} />
        </mesh>
      </group>

      {/* 3. Backlit NEXUS HQ Corporate Crest Feature Wall with Polished Marble */}
      <group position={[0, 0.2, -4.8]}>
        <mesh position={[0, 2.4, 0]}>
          <boxGeometry args={[9.0, 4.5, 0.2]} />
          <meshStandardMaterial map={TEXTURES.floorMarble} roughnessMap={ROUGHNESS_MAPS.floorMarble} roughness={0.15} metalness={0.1} />
        </mesh>
        <mesh position={[0, 2.4, 0.11]} material={GOLD_TRIM_MATERIAL}>
          <boxGeometry args={[9.2, 4.6, 0.02]} />
        </mesh>
        <mesh position={[0, 3.2, 0.13]} material={logoGlowMaterial}>
          <torusGeometry args={[0.75, 0.08, 16, 32]} />
        </mesh>
        <mesh position={[0, 2.0, 0.13]} material={logoGlowMaterial}>
          <boxGeometry args={[3.6, 0.45, 0.04]} />
        </mesh>
      </group>

      {/* 4. Digital Information Wall */}
      <group position={[-6.5, 0.2, -1.0]}>
        <mesh position={[0, 2.0, 0]} material={GOLD_TRIM_MATERIAL}>
          <boxGeometry args={[0.1, 2.6, 4.5]} />
        </mesh>
        <mesh position={[0.06, 2.0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[4.3, 2.4]} />
          <meshStandardMaterial map={TEXTURES.chartScreen} emissive="#00F0FF" emissiveIntensity={1.5} roughness={0.2} />
        </mesh>
      </group>

      {/* 5. Security Access Control Turnstiles */}
      {[-2.2, -0.75, 0.75, 2.2].map((xPos, idx) => (
        <group key={`turnstile-${idx}`} position={[xPos, 0.2, 3.5]}>
          <mesh position={[0, 0.5, 0]} material={GOLD_TRIM_MATERIAL}>
            <boxGeometry args={[0.16, 1.0, 1.3]} />
          </mesh>
          <mesh position={[0, 0.5, 0]} material={GOLD_TRIM_MATERIAL}>
            <boxGeometry args={[0.5, 0.7, 0.02]} />
          </mesh>
          <mesh position={[0, 1.02, 0]} material={logoGlowMaterial}>
            <cylinderGeometry args={[0.04, 0.04, 0.02, 12]} />
          </mesh>
        </group>
      ))}

      {/* Floor Spotlight Rigs */}
      <spotLight position={[0.0, 4.4, 0.0]} target-position={[0.0, 0.2, 0.0]} color="#FFF8DC" intensity={3.5} angle={0.8} penumbra={0.3} castShadow={isActive} />
      <pointLight position={[5.5, 3.0, -1.0]} color="#FFA500" intensity={1.8} distance={8} />
      <pointLight position={[-6.5, 3.0, -1.0]} color="#00F0FF" intensity={1.5} distance={8} />
    </group>
  );
}
