import { useMemo } from 'react';
import * as THREE from 'three';

export function VRLighthouseTowers() {
  const towerPositions: [number, number, number][] = [
    [-7.5, 0.185, -4.5], // Back-Left
    [7.5, 0.185, -4.5],  // Back-Right
    [-7.5, 0.185, 4.0],   // Front-Left
    [7.5, 0.185, 4.0]    // Front-Right
  ];

  const towerMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0F172A'),
        roughness: 0.3,
        metalness: 0.85
      }),
    []
  );

  const laserLensMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00F0FF'),
        emissive: new THREE.Color('#00E5FF'),
        emissiveIntensity: 3.5,
        roughness: 0.1,
        metalness: 0.9
      }),
    []
  );

  return (
    <group name="VRLighthouseTowers">
      {towerPositions.map(([x, y, z], idx) => {
        // Calculate angle pointing towards center of room [0, 1.5, 0]
        const angleY = Math.atan2(-x, -z);

        return (
          <group key={`lighthouse-tower-${idx}`} position={[x, y, z]} rotation={[0, angleY, 0]}>
            {/* Tripod Base Legs */}
            <mesh position={[0, 0.05, 0]} material={towerMat}>
              <cylinderGeometry args={[0.22, 0.28, 0.08, 16]} />
            </mesh>
            <mesh position={[-0.12, 0.18, -0.08]} rotation={[0.2, 0, 0.3]} material={towerMat}>
              <cylinderGeometry args={[0.015, 0.02, 0.4, 8]} />
            </mesh>
            <mesh position={[0.12, 0.18, -0.08]} rotation={[0.2, 0, -0.3]} material={towerMat}>
              <cylinderGeometry args={[0.015, 0.02, 0.4, 8]} />
            </mesh>
            <mesh position={[0, 0.18, 0.14]} rotation={[-0.3, 0, 0]} material={towerMat}>
              <cylinderGeometry args={[0.015, 0.02, 0.4, 8]} />
            </mesh>

            {/* Vertical Support Column (2.1m height) */}
            <mesh position={[0, 1.15, 0]} material={towerMat}>
              <cylinderGeometry args={[0.025, 0.03, 2.0, 16]} />
            </mesh>

            {/* Top Swivel Mount */}
            <mesh position={[0, 2.18, 0]} material={towerMat}>
              <sphereGeometry args={[0.045, 16, 16]} />
            </mesh>

            {/* Sensor Housing Cube (Angled slightly downwards) */}
            <group position={[0, 2.22, 0.02]} rotation={[0.22, 0, 0]}>
              <mesh material={towerMat}>
                <boxGeometry args={[0.12, 0.12, 0.14]} />
              </mesh>
              {/* Emissive Laser Sensor Window */}
              <mesh position={[0, 0, 0.071]} material={laserLensMat}>
                <boxGeometry args={[0.09, 0.09, 0.005]} />
              </mesh>
              {/* Subtle Cyan Indicator Point Light */}
              <pointLight position={[0, 0, 0.1]} color="#00F0FF" intensity={0.6} distance={2.5} />
            </group>
          </group>
        );
      })}
    </group>
  );
}
