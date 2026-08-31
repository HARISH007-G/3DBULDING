import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function PhotoBooth({ position = [-5.5, 0.185, 0.5], rotation = [0, Math.PI / 6, 0] }: { position?: [number, number, number]; rotation?: [number, number, number] }) {
  const { scene } = useGLTF('/models/photo_booth.glb');

  const normalizedBooth = useMemo(() => {
    const clone = scene.clone(true);
    clone.updateMatrixWorld(true);

    const rawBox = new THREE.Box3().setFromObject(clone);
    const rawSize = new THREE.Vector3();
    rawBox.getSize(rawSize);

    const targetHeight = 2.40; // 2.40m realistic booth height
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
          mat.metalness = THREE.MathUtils.clamp(mat.metalness || 0.1, 0.0, 0.7);
        }
      }
    });

    return wrapper;
  }, [scene]);

  return (
    <group position={position} rotation={rotation} name="Floor5_PhotoBooth">
      <primitive object={normalizedBooth} />
    </group>
  );
}

useGLTF.preload('/models/photo_booth.glb');
