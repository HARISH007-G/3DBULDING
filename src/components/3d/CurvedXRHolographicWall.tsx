import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CurvedXRHolographicWall({ position = [0, 2.0, -4.7] }: { position?: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const hudNodesRef = useRef<THREE.Group>(null);

  // Holographic Cyber Glass Material
  const holographicMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00E5FF'),
        emissive: new THREE.Color('#007799'),
        emissiveIntensity: 1.4,
        roughness: 0.15,
        metalness: 0.8,
        transparent: true,
        opacity: 0.55,
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
        opacity: 0.35
      }),
    []
  );

  const glowingFrameMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0F172A'),
        emissive: new THREE.Color('#0284C7'),
        emissiveIntensity: 0.6,
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
      mat.emissiveIntensity = 1.2 + Math.sin(time * 2.0) * 0.3;
    }
    if (hudNodesRef.current) {
      hudNodesRef.current.position.y = Math.sin(time * 1.2) * 0.03;
    }
  });

  return (
    <group position={position} name="CurvedXRHolographicWall">
      {/* 1. Curved Back Wall Display (Radius: 12m, arc: 0.7 rad ~ 8.4m width, depth forward is only ~0.35m) */}
      <mesh ref={meshRef} material={holographicMaterial} rotation={[0, Math.PI, 0]} position={[0, 0, -11.65]}>
        <cylinderGeometry args={[12.0, 12.0, 2.6, 32, 1, true, Math.PI - 0.35, 0.7]} />
      </mesh>

      {/* Wireframe Cyber Grid Overlay */}
      <mesh material={gridLineMaterial} rotation={[0, Math.PI, 0]} position={[0, 0, -11.63]}>
        <cylinderGeometry args={[11.98, 11.98, 2.56, 24, 6, true, Math.PI - 0.35, 0.7]} />
      </mesh>

      {/* Top & Bottom Bezel Frames */}
      <mesh position={[0, 1.32, -11.65]} material={glowingFrameMaterial} rotation={[0, Math.PI, 0]}>
        <cylinderGeometry args={[12.02, 12.02, 0.05, 32, 1, true, Math.PI - 0.36, 0.72]} />
      </mesh>
      <mesh position={[0, -1.32, -11.65]} material={glowingFrameMaterial} rotation={[0, Math.PI, 0]}>
        <cylinderGeometry args={[12.02, 12.02, 0.05, 32, 1, true, Math.PI - 0.36, 0.72]} />
      </mesh>

      {/* 2. Floating 3D Holographic HUD Widgets & Telemetry */}
      <group ref={hudNodesRef} position={[0, 0, 0.1]}>
        {/* Left Telemetry HUD */}
        <group position={[-2.8, 0.3, 0]}>
          <mesh>
            <planeGeometry args={[1.2, 0.5]} />
            <meshBasicMaterial color="#00F0FF" transparent opacity={0.25} wireframe />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#38BDF8" />
          </mesh>
        </group>

        {/* Center Target Reticle */}
        <group position={[0, 0.2, 0.05]}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <ringGeometry args={[0.22, 0.25, 4]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[0, 0, 0]}>
            <ringGeometry args={[0.35, 0.37, 16]} />
            <meshBasicMaterial color="#00F0FF" transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Right Status HUD */}
        <group position={[2.8, 0.3, 0]}>
          <mesh>
            <planeGeometry args={[1.2, 0.5]} />
            <meshBasicMaterial color="#00F0FF" transparent opacity={0.25} wireframe />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <boxGeometry args={[0.05, 0.05, 0.05]} />
            <meshBasicMaterial color="#38BDF8" wireframe />
          </mesh>
        </group>
      </group>

      {/* Soft Cyan Screen Ambient Backlight */}
      <pointLight position={[0, 0, 0.5]} color="#00E5FF" intensity={1.5} distance={6} />
    </group>
  );
}
