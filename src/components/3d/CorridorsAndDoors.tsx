import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useExperienceStore } from '../../store/useExperienceStore';
import { getCameraStateAtProgress } from '../Camera/waypoints';
import { CHROME_MATERIAL, FLOOR_GLASS_MATERIALS, ALUMINUM_FIN_MATERIAL, GOLD_TRIM_MATERIAL } from '../../utils/materials';

export function CorridorsAndDoors() {
  const leftDoorRefs = useRef<THREE.Group[]>([]);
  const rightDoorRefs = useRef<THREE.Group[]>([]);

  const floorHeights = [0.0, 4.0, 8.0, 12.0, 16.0, 20.0, 24.0];

  // Green LED RFID Security Access Indicator Material
  const rfidLedMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00E676'),
        emissive: new THREE.Color('#00C853'),
        emissiveIntensity: 2.8
      }),
    []
  );

  useFrame(() => {
    const scrollProgress = useExperienceStore.getState().scrollProgress;
    const { doorOpenProgress } = getCameraStateAtProgress(scrollProgress);
    const doorSlideX = doorOpenProgress * 1.4;

    leftDoorRefs.current.forEach((ref) => {
      if (ref) ref.position.x = -doorSlideX;
    });
    rightDoorRefs.current.forEach((ref) => {
      if (ref) ref.position.x = doorSlideX;
    });
  });

  return (
    <group name="CorridorsAndDoors">
      {floorHeights.map((y, index) => {
        const glassMaterial = FLOOR_GLASS_MATERIALS[index] || FLOOR_GLASS_MATERIALS[0];

        return (
          <group key={`corridor-door-${index}`} position={[0, y, 0]}>
            {/* 1. Metallic Floor Threshold Transition Strip */}
            <mesh position={[0, 0.19, 4.5]} material={GOLD_TRIM_MATERIAL}>
              <boxGeometry args={[3.2, 0.01, 0.12]} />
            </mesh>

            {/* 2. Entrance Corridor Wall & Door Frame */}
            <group position={[0, 0.2, 4.5]}>
              {/* Outer Door Frame Posts */}
              <mesh position={[-1.6, 1.4, 0]} material={ALUMINUM_FIN_MATERIAL}>
                <boxGeometry args={[0.12, 2.8, 0.12]} />
              </mesh>
              <mesh position={[1.6, 1.4, 0]} material={ALUMINUM_FIN_MATERIAL}>
                <boxGeometry args={[0.12, 2.8, 0.12]} />
              </mesh>
              <mesh position={[0, 2.74, 0]} material={ALUMINUM_FIN_MATERIAL}>
                <boxGeometry args={[3.32, 0.12, 0.12]} />
              </mesh>

              {/* RFID Security Card Scanner Panel Mounted Next to Door Frame */}
              <group position={[1.82, 1.4, 0.05]}>
                <mesh material={ALUMINUM_FIN_MATERIAL}>
                  <boxGeometry args={[0.14, 0.28, 0.04]} />
                </mesh>
                <mesh position={[0, 0.06, 0.02]} material={rfidLedMaterial}>
                  <sphereGeometry args={[0.025, 8, 8]} />
                </mesh>
                <mesh position={[0, -0.04, 0.02]}>
                  <boxGeometry args={[0.08, 0.08, 0.01]} />
                  <meshStandardMaterial color="#111" />
                </mesh>
              </group>

              {/* 3. Automatic Sliding Real Glass Doors with Floor-Specific Tint & Reflections */}
              <group 
                position={[0, 0, 0]} 
                ref={(el) => { if (el) leftDoorRefs.current[index] = el; }}
              >
                <mesh position={[-0.75, 1.35, 0]} material={glassMaterial}>
                  <boxGeometry args={[1.4, 2.6, 0.03]} />
                </mesh>
                {/* Chrome Tubular Pull Handle */}
                <mesh position={[-0.15, 1.2, 0]} material={CHROME_MATERIAL}>
                  <cylinderGeometry args={[0.02, 0.02, 0.8, 16]} />
                </mesh>
              </group>

              <group 
                position={[0, 0, 0]} 
                ref={(el) => { if (el) rightDoorRefs.current[index] = el; }}
              >
                <mesh position={[0.75, 1.35, 0]} material={glassMaterial}>
                  <boxGeometry args={[1.4, 2.6, 0.03]} />
                </mesh>
                {/* Chrome Tubular Pull Handle */}
                <mesh position={[0.15, 1.2, 0]} material={CHROME_MATERIAL}>
                  <cylinderGeometry args={[0.02, 0.02, 0.8, 16]} />
                </mesh>
              </group>
            </group>
          </group>
        );
      })}
    </group>
  );
}
