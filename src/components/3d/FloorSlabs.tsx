import { useMemo } from 'react';
import * as THREE from 'three';
import { DARK_CONCRETE_SLAB_MATERIAL, CHROME_MATERIAL, GOLD_TRIM_MATERIAL, ALUMINUM_FIN_MATERIAL, TEXTURES, ROUGHNESS_MAPS } from '../../utils/materials';

export function FloorSlabs() {
  const floorHeights = [0.0, 4.0, 8.0, 12.0, 16.0, 20.0, 24.0];

  // Soft Cyan/Sky Emergency EXIT Sign Emissive Material
  const exitSignMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#38BDF8'),
        emissive: new THREE.Color('#0284C7'),
        emissiveIntensity: 0.4
      }),
    []
  );

  // Red Security Camera LED Indicator Material
  const cctvLedMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#FF0000'),
        emissive: new THREE.Color('#FF0000'),
        emissiveIntensity: 0.8
      }),
    []
  );

  return (
    <group name="FloorSlabs">
      {floorHeights.map((y, index) => {
        const floorNumber = index; // 0, 1, 2, 3, 4, 5, 6

        return (
          <group key={`floor-slab-${index}`} position={[0, y, 0]}>
            {/* 1. Main Structural Concrete Floor Slab */}
            <mesh position={[0, -0.01, 0]} material={DARK_CONCRETE_SLAB_MATERIAL} receiveShadow castShadow>
              <boxGeometry args={[20.0, 0.36, 14.0]} />
            </mesh>

            {/* 2. Wall Skirting Boards & Transition Strips */}
            <mesh position={[0, 0.23, -6.8]} material={ALUMINUM_FIN_MATERIAL}>
              <boxGeometry args={[19.8, 0.1, 0.04]} />
            </mesh>
            <mesh position={[0, 0.23, 6.8]} material={ALUMINUM_FIN_MATERIAL}>
              <boxGeometry args={[19.8, 0.1, 0.04]} />
            </mesh>

            {/* 3. Suspended Ceiling Grid Infrastructure */}
            {y > 0 && (
              <group position={[0, 3.75, 0]}>
                {/* Ceiling Tiles Base Plane with Real PBR Textures & Roughness Maps */}
                <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <planeGeometry args={[19.6, 13.6]} />
                  <meshStandardMaterial
                    map={
                      floorNumber === 5 || floorNumber === 4
                        ? TEXTURES.ceilingMetalGrid       // Tech & Prototyping Labs
                        : TEXTURES.ceilingAcoustic        // Executive & Workspace Floors
                    }
                    roughnessMap={
                      floorNumber === 5 || floorNumber === 4
                        ? ROUGHNESS_MAPS.ceilingMetalGrid
                        : ROUGHNESS_MAPS.ceilingAcoustic
                    }
                    roughness={floorNumber === 5 ? 0.4 : 0.65}
                    metalness={floorNumber === 5 ? 0.6 : 0.05}
                  />
                </mesh>

                {/* Linear LED Ceiling Strip Lights (Soft Architectural Luminescence) */}
                {[-6.0, -2.0, 2.0, 6.0].map((xPos, idx) => (
                  <mesh key={`ceiling-light-${idx}`} position={[xPos, -0.02, 0]}>
                    <boxGeometry args={[0.2, 0.04, 10.0]} />
                    <meshStandardMaterial
                      color="#F8FAFC"
                      emissive="#F8FAFC"
                      emissiveIntensity={0.5}
                    />
                  </mesh>
                ))}

                {/* Ceiling HVAC Diffusers & Air Vents */}
                {[-4.0, 4.0].map((xPos, idx) => (
                  <group key={`hvac-${idx}`} position={[xPos, -0.02, -2.0]}>
                    <mesh material={ALUMINUM_FIN_MATERIAL}>
                      <boxGeometry args={[0.8, 0.02, 0.8]} />
                    </mesh>
                    <mesh position={[0, -0.01, 0]}>
                      <boxGeometry args={[0.6, 0.01, 0.6]} />
                      <meshStandardMaterial color="#050810" roughness={0.9} />
                    </mesh>
                  </group>
                ))}

                {/* Fire Sprinkler Heads & Smoke Detector Nodes */}
                {[-5.0, 0.0, 5.0].map((xPos, idx) => (
                  <group key={`sprinkler-${idx}`} position={[xPos, -0.04, 3.0]}>
                    <mesh material={CHROME_MATERIAL}>
                      <cylinderGeometry args={[0.12, 0.14, 0.04, 16]} />
                    </mesh>
                    <mesh position={[0.4, -0.02, 0]} material={GOLD_TRIM_MATERIAL}>
                      <cylinderGeometry args={[0.02, 0.04, 0.06, 12]} />
                    </mesh>
                  </group>
                ))}

                {/* Ceiling CCTV Security Dome Camera */}
                <group position={[0.0, -0.08, -5.5]}>
                  <mesh material={ALUMINUM_FIN_MATERIAL}>
                    <sphereGeometry args={[0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                  </mesh>
                  <mesh position={[0, -0.12, 0.08]} material={cctvLedMaterial}>
                    <sphereGeometry args={[0.025, 8, 8]} />
                  </mesh>
                </group>
              </group>
            )}

            {/* 4. Emergency EXIT Signage */}
            <group position={[8.5, 3.2, 0.0]}>
              <mesh material={ALUMINUM_FIN_MATERIAL}>
                <boxGeometry args={[0.08, 0.28, 0.6]} />
              </mesh>
              <mesh position={[-0.05, 0, 0]} material={exitSignMaterial}>
                <boxGeometry args={[0.02, 0.22, 0.54]} />
              </mesh>
            </group>

            {/* 5. Floor Level Wall Electrical Sockets */}
            {[-7.0, 0.0, 7.0].map((xPos, idx) => (
              <group key={`socket-${idx}`} position={[xPos, 0.45, -6.75]}>
                <mesh material={ALUMINUM_FIN_MATERIAL}>
                  <boxGeometry args={[0.18, 0.12, 0.02]} />
                </mesh>
                <mesh position={[-0.04, 0, 0.01]}>
                  <boxGeometry args={[0.04, 0.04, 0.01]} />
                  <meshStandardMaterial color="#111" />
                </mesh>
                <mesh position={[0.04, 0, 0.01]}>
                  <boxGeometry args={[0.04, 0.04, 0.01]} />
                  <meshStandardMaterial color="#111" />
                </mesh>
              </group>
            ))}

            {/* 6. Department Signage Badge Mounted on Corridor Wall */}
            <group position={[-8.8, 2.2, 0.0]} rotation={[0, Math.PI / 2, 0]}>
              <mesh material={GOLD_TRIM_MATERIAL}>
                <boxGeometry args={[1.8, 0.45, 0.04]} />
              </mesh>
              <mesh position={[0, 0, 0.03]}>
                <planeGeometry args={[1.7, 0.38]} />
                <meshStandardMaterial color="#0A0E1A" roughness={0.3} />
              </mesh>
            </group>
          </group>
        );
      })}
    </group>
  );
}
