import { useMemo } from 'react';
import * as THREE from 'three';
import { useExperienceStore } from '../../store/useExperienceStore';

/**
 * DEVELOPMENT HUMAN SCALE REFERENCE STANDEE (1.75 Meters Tall)
 * Used to visually verify that desks (0.75m), chairs (0.95m), monitors (0.45m), and headphones (0.18m)
 * match 100% human proportion.
 */
export function HumanScaleReference({ position }: { position: [number, number, number] }) {
  const debugMode = useExperienceStore((state) => state.debugMode);

  const humanMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#FF0055'),
        emissive: new THREE.Color('#FF0055'),
        emissiveIntensity: 0.8,
        wireframe: true
      }),
    []
  );

  if (!debugMode) return null;

  return (
    <group position={position} name="HumanScaleReference">
      {/* 1.75m Human Silhouette Standee Body */}
      <mesh position={[0, 0.75, 0]} material={humanMaterial}>
        <cylinderGeometry args={[0.22, 0.16, 1.3, 12]} />
      </mesh>

      {/* Human Head */}
      <mesh position={[0, 1.58, 0]} material={humanMaterial}>
        <sphereGeometry args={[0.13, 16, 16]} />
      </mesh>

      {/* 1.75m Metric Line Marker */}
      <mesh position={[0.3, 0.875, 0]} material={humanMaterial}>
        <boxGeometry args={[0.02, 1.75, 0.02]} />
      </mesh>
    </group>
  );
}

/**
 * 1-METER METRIC GRID OVERLAY
 * Renders a 1x1 meter grid lines on active floor slab for visual dimension verification.
 */
export function MetricFloorGrid({ position }: { position: [number, number, number] }) {
  const debugMode = useExperienceStore((state) => state.debugMode);

  if (!debugMode) return null;

  return (
    <group position={position}>
      <gridHelper args={[18, 18, '#00F0FF', '#334155']} />
    </group>
  );
}
