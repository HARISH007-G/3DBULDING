import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useExperienceStore } from '../../store/useExperienceStore';
import { getCameraStateAtProgress } from '../Camera/waypoints';
import { ALUMINUM_FIN_MATERIAL, GLASS_FACADE_MATERIAL, CHROME_MATERIAL } from '../../utils/materials';

export function CentralElevator() {
  const floors = [0, 1, 2, 3, 4, 5, 6];

  const cabinRef = useRef<THREE.Group>(null);
  const leftDoorRef = useRef<THREE.Mesh>(null);
  const rightDoorRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const scrollProgress = useExperienceStore.getState().scrollProgress;
    const cameraState = getCameraStateAtProgress(scrollProgress);

    const cabinY = cameraState.activeFloor * 4.0;
    const isDoorOpen = cameraState.elevatorDoorOpen;
    const slideOffset = isDoorOpen ? 1.1 : 0;

    if (cabinRef.current) {
      cabinRef.current.position.y = cabinY + 0.2;
    }

    if (leftDoorRef.current) {
      leftDoorRef.current.position.x = -0.85 - slideOffset;
    }

    if (rightDoorRef.current) {
      rightDoorRef.current.position.x = 0.85 + slideOffset;
    }
  });

  const floorNumberTextMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#00F0FF',
        emissive: '#00F0FF',
        emissiveIntensity: 2.2
      }),
    []
  );

  return (
    <group name="CentralElevator">
      {/* Central Structural Elevator Shaft Enclosure (Back: Z = -8.0) */}
      <mesh position={[0, 14, -8.0]} material={GLASS_FACADE_MATERIAL}>
        <boxGeometry args={[4.4, 28.0, 3.6]} />
      </mesh>

      {/* Shaft Steel Corner Columns */}
      <mesh position={[-2.2, 14, -6.2]} material={ALUMINUM_FIN_MATERIAL}>
        <boxGeometry args={[0.2, 28.0, 0.2]} />
      </mesh>
      <mesh position={[2.2, 14, -6.2]} material={ALUMINUM_FIN_MATERIAL}>
        <boxGeometry args={[0.2, 28.0, 0.2]} />
      </mesh>

      {/* Animated Elevator Cabin (Moves vertically to active floor Y) */}
      <group ref={cabinRef} position={[0, 0.2, -8.0]}>
        {/* Cabin Steel Frame */}
        <mesh position={[0, 1.4, 0]} material={ALUMINUM_FIN_MATERIAL}>
          <boxGeometry args={[3.8, 2.6, 3.2]} />
        </mesh>

        {/* Interior Brushed Chrome Walls & Handrail */}
        <mesh position={[0, 1.4, -1.5]} material={CHROME_MATERIAL}>
          <boxGeometry args={[3.6, 2.4, 0.05]} />
        </mesh>
        <mesh position={[0, 1.0, -1.4]} material={CHROME_MATERIAL}>
          <boxGeometry args={[3.2, 0.06, 0.1]} />
        </mesh>

        {/* Ceiling Diffused Light Fixture */}
        <mesh position={[0, 2.65, 0]}>
          <boxGeometry args={[2.0, 0.02, 2.0]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FFF8DC" emissiveIntensity={2.0} />
        </mesh>

        {/* Sliding Elevator Shaft Doors (Front of cabin: Z = +1.6) */}
        <group position={[0, 1.2, 1.6]}>
          <mesh ref={leftDoorRef} position={[-0.85, 0, 0]} material={CHROME_MATERIAL}>
            <boxGeometry args={[1.6, 2.4, 0.06]} />
          </mesh>
          <mesh ref={rightDoorRef} position={[0.85, 0, 0]} material={CHROME_MATERIAL}>
            <boxGeometry args={[1.6, 2.4, 0.06]} />
          </mesh>
        </group>
      </group>

      {/* Floor Indicator Display Badges above Elevator Doors on every floor */}
      {floors.map((floor) => {
        const y = floor * 4.0;
        return (
          <group key={`elev-badge-${floor}`} position={[0, y + 2.7, -6.3]}>
            <mesh material={ALUMINUM_FIN_MATERIAL}>
              <boxGeometry args={[0.8, 0.3, 0.04]} />
            </mesh>
            <mesh position={[0, 0, 0.03]} material={floorNumberTextMaterial}>
              <boxGeometry args={[0.6, 0.2, 0.01]} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
