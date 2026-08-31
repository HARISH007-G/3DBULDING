import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function VRArenaPlayer({ position = [2.2, 0.185, -0.2] }: { position?: [number, number, number] }) {
  const { scene: playerScene } = useGLTF('/models/vr_player.glb');
  const { scene: controllerScene } = useGLTF('/models/vr_controller.glb');

  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const playerGroupRef = useRef<THREE.Group>(null);

  // Holographic Arena Ring Materials
  const neonRingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00F0FF'),
        emissive: new THREE.Color('#00C8FF'),
        emissiveIntensity: 3.0,
        roughness: 0.1,
        metalness: 0.9,
        transparent: true,
        opacity: 0.9
      }),
    []
  );

  const arenaFloorMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#060B14'),
        roughness: 0.3,
        metalness: 0.85
      }),
    []
  );

  // Normalize & scale VR Player Character (height: 1.75m)
  const normalizedPlayer = useMemo(() => {
    const clone = playerScene.clone(true);
    clone.updateMatrixWorld(true);

    const rawBox = new THREE.Box3().setFromObject(clone);
    const rawSize = new THREE.Vector3();
    rawBox.getSize(rawSize);

    const targetHeight = 1.75;
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
          mat.roughness = THREE.MathUtils.clamp(mat.roughness || 0.4, 0.2, 0.85);
          mat.metalness = THREE.MathUtils.clamp(mat.metalness || 0.1, 0.0, 0.8);
          mat.needsUpdate = true;
        }
      }
    });

    return wrapper;
  }, [playerScene]);

  // Normalize & scale Left/Right VR Controller (target length: 0.18m)
  const { leftController, rightController } = useMemo(() => {
    const makeCtrl = (isLeft: boolean) => {
      const clone = controllerScene.clone(true);
      clone.updateMatrixWorld(true);

      const rawBox = new THREE.Box3().setFromObject(clone);
      const rawSize = new THREE.Vector3();
      rawBox.getSize(rawSize);

      const targetHeight = 0.18;
      const scaleFactor = rawSize.y > 0.0001 ? targetHeight / rawSize.y : 1.0;
      clone.scale.setScalar(scaleFactor);
      if (isLeft) {
        clone.scale.x *= -1; // Mirror for left hand
      }
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
          if (mesh.material) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            mat.roughness = 0.3;
            mat.metalness = 0.4;
          }
        }
      });
      return wrapper;
    };

    return {
      leftController: makeCtrl(true),
      rightController: makeCtrl(false)
    };
  }, [controllerScene]);

  // Subtle gaming animation sway & pulsing arena ring
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = time * 0.3;
      const mat = outerRingRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 2.4 + Math.sin(time * 3.0) * 0.8;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -time * 0.45;
    }
    if (playerGroupRef.current) {
      // Subtle immersive gameplay breathing sway
      playerGroupRef.current.position.y = Math.sin(time * 1.8) * 0.015;
      playerGroupRef.current.rotation.y = -0.3 + Math.sin(time * 0.8) * 0.08;
    }
  });

  return (
    <group position={position} name="VRArenaPlayer">
      {/* 1. Circular Haptic Play Mat / Base (Radius: 1.4m) */}
      <mesh position={[0, 0.01, 0]} material={arenaFloorMat}>
        <cylinderGeometry args={[1.4, 1.45, 0.02, 32]} />
      </mesh>

      {/* Outer Holographic Boundary Pulse Ring */}
      <mesh
        ref={outerRingRef}
        position={[0, 0.025, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={neonRingMaterial}
      >
        <ringGeometry args={[1.34, 1.39, 32]} />
      </mesh>

      {/* Inner Rotating Concentric Dash Ring */}
      <mesh
        ref={innerRingRef}
        position={[0, 0.025, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={neonRingMaterial}
      >
        <ringGeometry args={[0.95, 0.98, 16]} />
      </mesh>

      {/* 2. Character Model & Controllers */}
      <group ref={playerGroupRef} position={[0, 0.02, 0]}>
        <primitive object={normalizedPlayer} />

        {/* Left VR Motion Controller in Hand Position */}
        <group position={[-0.32, 1.05, 0.28]} rotation={[0.4, 0.2, -0.3]}>
          <primitive object={leftController} />
        </group>

        {/* Right VR Motion Controller in Hand Position */}
        <group position={[0.32, 1.15, 0.35]} rotation={[0.3, -0.2, 0.2]}>
          <primitive object={rightController} />
        </group>
      </group>

      {/* 3. Dedicated Arena Overhead Spotlight */}
      <spotLight
        position={[0, 3.4, 0]}
        target-position={[0, 0.5, 0]}
        color="#38BDF8"
        intensity={2.8}
        angle={0.55}
        penumbra={0.6}
        castShadow
      />
    </group>
  );
}

useGLTF.preload('/models/vr_player.glb');
useGLTF.preload('/models/vr_controller.glb');
