import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GOLD_TRIM_MATERIAL } from '../../utils/materials';

export function HolographicVRPedestal({ position = [-0.8, 0.185, 0.5] }: { position?: [number, number, number] }) {
  const { scene } = useGLTF('/models/vr_headset.glb');
  const floatingGroupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Hologram Glow Ring Material
  const hologramRingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00F0FF'),
        emissive: new THREE.Color('#00D4FF'),
        emissiveIntensity: 2.8,
        roughness: 0.1,
        metalness: 0.9,
        transparent: true,
        opacity: 0.85
      }),
    []
  );

  // Dark Architectural Pedestal Material
  const pedestalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0F131A'),
        roughness: 0.25,
        metalness: 0.85
      }),
    []
  );

  // Calibrate & normalize VR headset geometry
  const normalizedHeadset = useMemo(() => {
    const clone = scene.clone(true);
    clone.updateMatrixWorld(true);

    const rawBox = new THREE.Box3().setFromObject(clone);
    const rawSize = new THREE.Vector3();
    rawBox.getSize(rawSize);

    const targetHeight = 0.24; // 24cm realistic VR headset scale
    const scaleFactor = rawSize.y > 0.0001 ? targetHeight / rawSize.y : 1.0;
    clone.scale.setScalar(scaleFactor);
    clone.updateMatrixWorld(true);

    const scaledBox = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    scaledBox.getCenter(center);

    const wrapper = new THREE.Group();
    clone.position.set(-center.x, -scaledBox.min.y, -center.z);
    wrapper.add(clone);

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.roughness = THREE.MathUtils.clamp(mat.roughness || 0.3, 0.1, 0.8);
          mat.metalness = THREE.MathUtils.clamp(mat.metalness || 0.2, 0.05, 0.9);
          mat.needsUpdate = true;
        }
      }
    });

    return wrapper;
  }, [scene]);

  // Smooth floating levitation and 360 degree slow rotation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (floatingGroupRef.current) {
      floatingGroupRef.current.position.y = 1.16 + Math.sin(time * 1.6) * 0.03;
      floatingGroupRef.current.rotation.y = time * 0.4;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -time * 0.6;
    }
  });

  return (
    <group position={position} name="HolographicVRPedestal">
      {/* 1. Architectural Base & Column */}
      <mesh position={[0, 0.05, 0]} material={pedestalMaterial}>
        <cylinderGeometry args={[0.38, 0.42, 0.1, 32]} />
      </mesh>
      <mesh position={[0, 0.58, 0]} material={pedestalMaterial}>
        <cylinderGeometry args={[0.26, 0.34, 0.96, 32]} />
      </mesh>

      {/* Gold Rim Transition Ring */}
      <mesh position={[0, 1.07, 0]} material={GOLD_TRIM_MATERIAL}>
        <cylinderGeometry args={[0.32, 0.32, 0.04, 32]} />
      </mesh>

      {/* 2. Pulsing Holographic Emitter Plinth */}
      <mesh position={[0, 1.10, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.03, 32]} />
        <meshStandardMaterial color="#050811" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh ref={ringRef} position={[0, 1.12, 0]} rotation={[-Math.PI / 2, 0, 0]} material={hologramRingMaterial}>
        <torusGeometry args={[0.24, 0.008, 16, 32]} />
      </mesh>

      {/* 3. Floating Levitation VR Headset */}
      <group ref={floatingGroupRef} position={[0, 1.16, 0]}>
        <primitive object={normalizedHeadset} />
      </group>

      {/* 4. Local Holographic Lighting Accent */}
      <pointLight position={[0, 1.5, 0]} color="#00F0FF" intensity={1.8} distance={3.5} />
    </group>
  );
}

useGLTF.preload('/models/vr_headset.glb');
