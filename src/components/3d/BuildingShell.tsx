import { useMemo } from 'react';
import {
  GLASS_FACADE_MATERIAL,
  ALUMINUM_FIN_MATERIAL,
  DARK_CONCRETE_SLAB_MATERIAL,
  GOLD_TRIM_MATERIAL
} from '../../utils/materials';

export function BuildingShell() {
  // Generate vertical architectural fins along the facade edges (left & right wings only, leaving center glass clear)
  const fins = useMemo(() => {
    const positions = [-10.0, -8.6, -7.2, -5.8, 5.8, 7.2, 8.6, 10.0];
    return positions;
  }, []);

  return (
    <group name="BuildingShell">
      {/* Exterior Glass Curtain Facade (Front — renderOrder={10} guarantees interior items render first) */}
      <mesh position={[0, 14, 6.2]} material={GLASS_FACADE_MATERIAL} renderOrder={10}>
        <boxGeometry args={[22.4, 27.8, 0.15]} />
      </mesh>

      {/* Exterior Glass Curtain Facade (Back — renderOrder={10}) */}
      <mesh position={[0, 14, -10.2]} material={GLASS_FACADE_MATERIAL} renderOrder={10}>
        <boxGeometry args={[22.4, 27.8, 0.15]} />
      </mesh>

      {/* Side Glass Facades */}
      <mesh position={[11.2, 14, -2.0]} rotation={[0, Math.PI / 2, 0]} material={GLASS_FACADE_MATERIAL} renderOrder={10}>
        <boxGeometry args={[16.4, 27.8, 0.15]} />
      </mesh>
      <mesh position={[-11.2, 14, -2.0]} rotation={[0, Math.PI / 2, 0]} material={GLASS_FACADE_MATERIAL} renderOrder={10}>
        <boxGeometry args={[16.4, 27.8, 0.15]} />
      </mesh>

      {/* Structural Corner Columns (4 Main Pillars) */}
      <mesh position={[11.2, 14, 6.2]} material={ALUMINUM_FIN_MATERIAL}>
        <boxGeometry args={[0.8, 28.0, 0.8]} />
      </mesh>
      <mesh position={[-11.2, 14, 6.2]} material={ALUMINUM_FIN_MATERIAL}>
        <boxGeometry args={[0.8, 28.0, 0.8]} />
      </mesh>
      <mesh position={[11.2, 14, -10.2]} material={ALUMINUM_FIN_MATERIAL}>
        <boxGeometry args={[0.8, 28.0, 0.8]} />
      </mesh>
      <mesh position={[-11.2, 14, -10.2]} material={ALUMINUM_FIN_MATERIAL}>
        <boxGeometry args={[0.8, 28.0, 0.8]} />
      </mesh>

      {/* Vertical Architectural Accent Fins (Wing Facades) */}
      {fins.map((x, idx) => (
        <mesh key={`fin-front-${idx}`} position={[x, 14, 6.35]} material={idx % 2 === 0 ? GOLD_TRIM_MATERIAL : ALUMINUM_FIN_MATERIAL}>
          <boxGeometry args={[0.12, 27.6, 0.35]} />
        </mesh>
      ))}

      {/* Entrance Canopy (Ground Floor Front Plaza) */}
      <group position={[0, 4.2, 8.5]}>
        {/* Canopy Roof Slab */}
        <mesh material={ALUMINUM_FIN_MATERIAL}>
          <boxGeometry args={[10.0, 0.25, 4.5]} />
        </mesh>
        {/* Gold Trim Trim Line */}
        <mesh position={[0, 0, 2.26]} material={GOLD_TRIM_MATERIAL}>
          <boxGeometry args={[10.1, 0.28, 0.05]} />
        </mesh>
        {/* Canopy Pillars */}
        <mesh position={[-4.5, -2.1, 2.0]} material={ALUMINUM_FIN_MATERIAL}>
          <cylinderGeometry args={[0.15, 0.15, 4.0, 16]} />
        </mesh>
        <mesh position={[4.5, -2.1, 2.0]} material={ALUMINUM_FIN_MATERIAL}>
          <cylinderGeometry args={[0.15, 0.15, 4.0, 16]} />
        </mesh>
      </group>

      {/* Rooftop Equipment & HVAC Structure */}
      <group position={[0, 28.3, -2.0]}>
        {/* Perimeter Parapet Railing */}
        <mesh position={[0, 0.4, 8.1]} material={ALUMINUM_FIN_MATERIAL}>
          <boxGeometry args={[22.4, 0.8, 0.1]} />
        </mesh>
        {/* HVAC Unit 1 */}
        <mesh position={[-6.0, 0.8, -3.0]} material={ALUMINUM_FIN_MATERIAL}>
          <boxGeometry args={[3.2, 1.4, 2.4]} />
        </mesh>
        {/* HVAC Unit 2 */}
        <mesh position={[-2.0, 0.8, -3.0]} material={ALUMINUM_FIN_MATERIAL}>
          <boxGeometry args={[3.2, 1.4, 2.4]} />
        </mesh>
        {/* Rooftop Solar Arrays */}
        <mesh position={[5.0, 0.6, 1.0]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[6.0, 0.1, 4.0]} />
          <meshStandardMaterial color="#1A2B4C" roughness={0.1} metalness={0.9} />
        </mesh>
      </group>

      {/* Ground Plaza & Surrounding Pavement */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} material={DARK_CONCRETE_SLAB_MATERIAL}>
        <planeGeometry args={[70, 70]} />
      </mesh>
    </group>
  );
}
