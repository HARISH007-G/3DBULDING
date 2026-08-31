import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GOLD_TRIM_MATERIAL } from '../../utils/materials';

export function VRDeveloperStation({ position = [-4.6, 0.185, -0.8] }: { position?: [number, number, number] }) {
  const { scene: dockHeadsetScene } = useGLTF('/models/vr_headset_dock.glb');
  const { scene: controllerScene } = useGLTF('/models/vr_controller.glb');
  const { scene: gamingChairScene } = useGLTF('/models/gaming_chair.glb');

  const stationWoodMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#141820'),
        roughness: 0.35,
        metalness: 0.4
      }),
    []
  );

  const chargingLedMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00E676'),
        emissive: new THREE.Color('#00C853'),
        emissiveIntensity: 2.5
      }),
    []
  );

  // Normalize Dock VR Headset (height: 0.18m, bottom flush at Y=0)
  const normalizedDockHeadset = useMemo(() => {
    const clone = dockHeadsetScene.clone(true);
    clone.updateMatrixWorld(true);

    const rawBox = new THREE.Box3().setFromObject(clone);
    const rawSize = new THREE.Vector3();
    rawBox.getSize(rawSize);

    const targetHeight = 0.18;
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
  }, [dockHeadsetScene]);

  // Normalize VR Controller (height: 0.16m)
  const normalizedDockController = useMemo(() => {
    const clone = controllerScene.clone(true);
    clone.updateMatrixWorld(true);

    const rawBox = new THREE.Box3().setFromObject(clone);
    const rawSize = new THREE.Vector3();
    rawBox.getSize(rawSize);

    const targetHeight = 0.16;
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
  }, [controllerScene]);

  // Normalize Gaming Chair (height: 1.22m, centered and flush to floor)
  const normalizedGamingChair = useMemo(() => {
    const clone = gamingChairScene.clone(true);
    clone.updateMatrixWorld(true);

    const rawBox = new THREE.Box3().setFromObject(clone);
    const rawSize = new THREE.Vector3();
    rawBox.getSize(rawSize);

    const targetHeight = 1.22;
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
          mat.roughness = THREE.MathUtils.clamp(mat.roughness || 0.4, 0.2, 0.8);
          mat.metalness = THREE.MathUtils.clamp(mat.metalness || 0.1, 0.0, 0.7);
        }
      }
    });

    return wrapper;
  }, [gamingChairScene]);

  return (
    <group position={position} name="VRDeveloperStation">
      {/* 1. Sleek Hardware Bench / Counter (Width: 2.2m, Depth: 0.8m) */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.48, 0]} material={stationWoodMat}>
          <boxGeometry args={[2.2, 0.96, 0.8]} />
        </mesh>
        <mesh position={[0, 0.98, 0]} material={GOLD_TRIM_MATERIAL}>
          <boxGeometry args={[2.26, 0.04, 0.86]} />
        </mesh>
      </group>

      {/* 2. Magnetic VR Charging Base Stand */}
      <group position={[-0.4, 1.0, 0]}>
        <mesh position={[0, 0.02, 0]} material={stationWoodMat}>
          <boxGeometry args={[0.65, 0.04, 0.42]} />
        </mesh>
        {/* Charging LED indicators */}
        <mesh position={[-0.18, 0.045, 0.16]} material={chargingLedMat}>
          <sphereGeometry args={[0.015, 8, 8]} />
        </mesh>
        <mesh position={[0.18, 0.045, 0.16]} material={chargingLedMat}>
          <sphereGeometry args={[0.015, 8, 8]} />
        </mesh>

        {/* Docked Secondary Headset */}
        <group position={[0, 0.04, 0]} rotation={[0, 0, 0]}>
          <primitive object={normalizedDockHeadset} />
        </group>
      </group>

      {/* 3. Docked Dual VR Controllers on Charging Mounts */}
      <group position={[0.4, 1.02, -0.05]} rotation={[-0.3, 0.3, 0]}>
        <primitive object={normalizedDockController} />
      </group>
      <group position={[0.7, 1.02, 0.05]} rotation={[-0.3, -0.3, 0]}>
        <primitive object={normalizedDockController} />
      </group>

      {/* 4. Ergonomic Gaming Chair (Situated right in front of the desk, facing the desk) */}
      <group position={[0, 0, 1.05]} rotation={[0, 0, 0]}>
        <primitive object={normalizedGamingChair} />
      </group>
    </group>
  );
}

useGLTF.preload('/models/vr_headset_dock.glb');
useGLTF.preload('/models/vr_controller.glb');
useGLTF.preload('/models/gaming_chair.glb');
