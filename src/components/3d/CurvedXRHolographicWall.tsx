import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CurvedXRHolographicWall({ position = [0, 2.0, -4.8] }: { position?: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const hudNodesRef = useRef<THREE.Group>(null);

  // Holographic Cyber Glass Material
  const holographicMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00E5FF'),
        emissive: new THREE.Color('#007799'),
        emissiveIntensity: 1.6,
        roughness: 0.1,
        metalness: 0.8,
        transparent: true,
        opacity: 0.65,
        side: THREE.DoubleSide
      }),
    []
  );

  const gridLineMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#38BDF8'),
        wireframe: true,
        transparent: true,
        opacity: 0.45
      }),
    []
  );

  const glowingFrameMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0F172A'),
        emissive: new THREE.Color('#0284C7'),
        emissiveIntensity: 0.8,
        roughness: 0.3,
        metalness: 0.9
      }),
    []
  );

  // Animated scanline and glowing nodes
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.4 + Math.sin(time * 2.0) * 0.4;
    }
    if (hudNodesRef.current) {
      hudNodesRef.current.position.y = Math.sin(time * 1.2) * 0.04;
    }
  });

  return (
    <group position={position} name="CurvedXRHolographicWall">
      {/* 1. Curved Ultra-Wide Screen Surface (Arc of 120 degrees, radius 9m) */}
      <mesh ref={meshRef} material={holographicMaterial} rotation={[0, Math.PI, 0]}>
        <cylinderGeometry args={[9.0, 9.0, 2.8, 48, 1, true, Math.PI - 0.7, 1.4]} />
      </mesh>

      {/* Wireframe Cyber Grid Overlay */}
      <mesh material={gridLineMaterial} rotation={[0, Math.PI, 0]} position={[0, 0, 0.02]}>
        <cylinderGeometry args={[8.98, 8.98, 2.76, 32, 8, true, Math.PI - 0.7, 1.4]} />
      </mesh>

      {/* 2. Top & Bottom Curved Metallic Frame Bezel */}
      <mesh position={[0, 1.42, 0]} material={glowingFrameMaterial} rotation={[0, Math.PI, 0]}>
        <cylinderGeometry args={[9.02, 9.02, 0.06, 48, 1, true, Math.PI - 0.72, 1.44]} />
      </mesh>
      <mesh position={[0, -1.42, 0]} material={glowingFrameMaterial} rotation={[0, Math.PI, 0]}>
        <cylinderGeometry args={[9.02, 9.02, 0.06, 48, 1, true, Math.PI - 0.72, 1.44]} />
      </mesh>

      {/* 3. Floating 3D Holographic HUD Widgets & Spatial Target Boxes */}
      <group ref={hudNodesRef}>
        {/* Left Status HUD */}
        <group position={[-2.4, 0.4, 0.5]}>
          <mesh>
            <planeGeometry args={[1.2, 0.6]} />
            <meshBasicMaterial color="#00F0FF" transparent opacity={0.3} wireframe />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#38BDF8" />
          </mesh>
        </group>

        {/* Center Target Crosshair Grid */}
        <group position={[0, 0.2, 0.7]}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <ringGeometry args={[0.25, 0.28, 4]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={0.7} side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[0, 0, 0]}>
            <ringGeometry args={[0.4, 0.42, 16]} />
            <meshBasicMaterial color="#00F0FF" transparent opacity={0.5} side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Right Telemetry HUD */}
        <group position={[2.4, 0.4, 0.5]}>
          <mesh>
            <planeGeometry args={[1.2, 0.6]} />
            <meshBasicMaterial color="#00F0FF" transparent opacity={0.3} wireframe />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <boxGeometry args={[0.06, 0.06, 0.06]} />
            <meshBasicMaterial color="#38BDF8" wireframe />
          </mesh>
        </group>
      </group>

      {/* Screen Ambient Glow */}
      <pointLight position={[0, 0, 1.5]} color="#00E5FF" intensity={2.2} distance={8} />
    </group>
  );
}
