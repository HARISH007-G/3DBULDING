import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function VRArenaPlayer({ position = [2.2, 0.185, -0.2] }: { position?: [number, number, number] }) {
  const { scene: headsetScene } = useGLTF('/models/vr_headset.glb');
  const { scene: controllerScene } = useGLTF('/models/vr_controller.glb');

  const playerGroupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);

  // Materials
  const suitMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0F172A'),
        roughness: 0.35,
        metalness: 0.75
      }),
    []
  );

  const neonCyanMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00F0FF'),
        emissive: new THREE.Color('#00D4FF'),
        emissiveIntensity: 2.8,
        roughness: 0.1,
        metalness: 0.9
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

  // Normalize VR Headset for Player Avatar (target height: 0.22m)
  const normalizedHeadset = useMemo(() => {
    const clone = headsetScene.clone(true);
    clone.updateMatrixWorld(true);

    const rawBox = new THREE.Box3().setFromObject(clone);
    const rawSize = new THREE.Vector3();
    rawBox.getSize(rawSize);

    const targetHeight = 0.22;
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
        (child as THREE.Mesh).castShadow = true;
      }
    });

    return wrapper;
  }, [headsetScene]);

  // Normalize VR Controllers (target height: 0.16m)
  const { leftController, rightController } = useMemo(() => {
    const makeCtrl = (isLeft: boolean) => {
      const clone = controllerScene.clone(true);
      clone.updateMatrixWorld(true);

      const rawBox = new THREE.Box3().setFromObject(clone);
      const rawSize = new THREE.Vector3();
      rawBox.getSize(rawSize);

      const targetHeight = 0.16;
      const scaleFactor = rawSize.y > 0.0001 ? targetHeight / rawSize.y : 1.0;
      clone.scale.setScalar(scaleFactor);
      if (isLeft) clone.scale.x *= -1;
      clone.updateMatrixWorld(true);

      const scaledBox = new THREE.Box3().setFromObject(clone);
      const center = new THREE.Vector3();
      scaledBox.getCenter(center);

      const wrapper = new THREE.Group();
      clone.position.set(-center.x, -scaledBox.min.y, -center.z);
      wrapper.add(clone);

      clone.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).castShadow = true;
        }
      });
      return wrapper;
    };

    return {
      leftController: makeCtrl(true),
      rightController: makeCtrl(false)
    };
  }, [controllerScene]);

  // Subtle gaming animation sway & arena ring rotation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = time * 0.3;
      const mat = outerRingRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 2.2 + Math.sin(time * 3.0) * 0.6;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -time * 0.45;
    }
    if (playerGroupRef.current) {
      // Natural gaming action sway (subtle breathing & tracking posture)
      playerGroupRef.current.position.y = 0.02 + Math.sin(time * 1.8) * 0.012;
      playerGroupRef.current.rotation.y = -0.25 + Math.sin(time * 0.7) * 0.06;
    }
  });

  return (
    <group position={position} name="VRArenaPlayer">
      {/* 1. Circular Haptic Arena Platform */}
      <mesh position={[0, 0.01, 0]} material={arenaFloorMat}>
        <cylinderGeometry args={[1.4, 1.45, 0.02, 32]} />
      </mesh>

      {/* Outer Holographic Boundary Pulse Ring */}
      <mesh
        ref={outerRingRef}
        position={[0, 0.025, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={neonCyanMat}
      >
        <ringGeometry args={[1.34, 1.39, 32]} />
      </mesh>

      {/* Inner Concentric Dash Ring */}
      <mesh
        ref={innerRingRef}
        position={[0, 0.025, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={neonCyanMat}
      >
        <ringGeometry args={[0.95, 0.98, 16]} />
      </mesh>

      {/* 2. Sleek Spatial XR Gamer Avatar in Active Gaming Stance (Height: 1.76m) */}
      <group ref={playerGroupRef} position={[0, 0.02, 0]}>
        {/* Athletic Legs in Grounded Stance */}
        {/* Left Leg */}
        <group position={[-0.22, 0.42, -0.05]} rotation={[0.08, 0, -0.06]}>
          <mesh material={suitMaterial}>
            <cylinderGeometry args={[0.075, 0.06, 0.82, 16]} />
          </mesh>
          {/* Shoe */}
          <mesh position={[0, -0.42, 0.06]} material={neonCyanMat}>
            <boxGeometry args={[0.13, 0.08, 0.26]} />
          </mesh>
        </group>

        {/* Right Leg (Slightly back in athletic stance) */}
        <group position={[0.22, 0.42, 0.08]} rotation={[-0.1, 0, 0.06]}>
          <mesh material={suitMaterial}>
            <cylinderGeometry args={[0.075, 0.06, 0.82, 16]} />
          </mesh>
          {/* Shoe */}
          <mesh position={[0, -0.42, 0.06]} material={neonCyanMat}>
            <boxGeometry args={[0.13, 0.08, 0.26]} />
          </mesh>
        </group>

        {/* Torso & Haptic Vest (Forward Lean) */}
        <group position={[0, 1.12, 0.02]} rotation={[0.08, 0, 0]}>
          <mesh material={suitMaterial}>
            <boxGeometry args={[0.42, 0.58, 0.24]} />
          </mesh>
          {/* Haptic Core Glow Badge */}
          <mesh position={[0, 0.08, 0.125]} material={neonCyanMat}>
            <boxGeometry args={[0.14, 0.22, 0.01]} />
          </mesh>
          {/* Spine Tracking LED Strip */}
          <mesh position={[0, 0.02, -0.125]} material={neonCyanMat}>
            <boxGeometry args={[0.03, 0.42, 0.01]} />
          </mesh>
        </group>

        {/* Head & VR Headset */}
        <group position={[0, 1.54, 0.06]} rotation={[0.05, 0, 0]}>
          {/* Stylized Head Form */}
          <mesh material={suitMaterial}>
            <sphereGeometry args={[0.12, 16, 16]} />
          </mesh>
          {/* Mounted VR Headset Visor */}
          <group position={[0, 0.02, 0.05]} rotation={[-0.05, 0, 0]}>
            <primitive object={normalizedHeadset} />
          </group>
        </group>

        {/* Left Arm holding Left VR Controller (Raised in Aiming Pose) */}
        <group position={[-0.26, 1.34, 0.02]}>
          {/* Shoulder */}
          <mesh material={neonCyanMat}>
            <sphereGeometry args={[0.06, 12, 12]} />
          </mesh>
          {/* Upper Arm */}
          <mesh position={[-0.08, -0.16, 0.1]} rotation={[0.6, 0, -0.3]} material={suitMaterial}>
            <cylinderGeometry args={[0.05, 0.045, 0.32, 12]} />
          </mesh>
          {/* Forearm & Hand */}
          <group position={[-0.14, -0.32, 0.24]} rotation={[0.9, -0.2, -0.4]}>
            <mesh material={suitMaterial}>
              <cylinderGeometry args={[0.045, 0.04, 0.3, 12]} />
            </mesh>
            {/* Hand with Controller */}
            <group position={[0, -0.16, 0.04]} rotation={[-0.2, 0, 0]}>
              <primitive object={leftController} />
            </group>
          </group>
        </group>

        {/* Right Arm holding Right VR Controller (Forward Guard Pose) */}
        <group position={[0.26, 1.34, 0.02]}>
          {/* Shoulder */}
          <mesh material={neonCyanMat}>
            <sphereGeometry args={[0.06, 12, 12]} />
          </mesh>
          {/* Upper Arm */}
          <mesh position={[0.08, -0.14, 0.12]} rotation={[0.8, 0, 0.25]} material={suitMaterial}>
            <cylinderGeometry args={[0.05, 0.045, 0.32, 12]} />
          </mesh>
          {/* Forearm & Hand */}
          <group position={[0.12, -0.28, 0.28]} rotation={[1.1, 0.3, 0.3]}>
            <mesh material={suitMaterial}>
              <cylinderGeometry args={[0.045, 0.04, 0.3, 12]} />
            </mesh>
            {/* Hand with Controller */}
            <group position={[0, -0.16, 0.04]} rotation={[-0.2, 0, 0]}>
              <primitive object={rightController} />
            </group>
          </group>
        </group>
      </group>

      {/* 3. Overhead Spatial Arena Spotlight */}
      <spotLight
        position={[0, 3.4, 0]}
        target-position={[0, 0.5, 0]}
        color="#38BDF8"
        intensity={3.0}
        angle={0.55}
        penumbra={0.6}
        castShadow
      />
    </group>
  );
}

useGLTF.preload('/models/vr_headset.glb');
useGLTF.preload('/models/vr_controller.glb');
