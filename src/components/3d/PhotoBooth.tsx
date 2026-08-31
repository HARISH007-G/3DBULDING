import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';

export function PhotoBooth({
  position = [-5.2, 0.185, 0.5],
  rotation = [0, Math.PI / 4, 0]
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const { scene } = useGLTF('/models/photo_booth.glb');

  const boothObject = useMemo(() => {
    // Clone SkinnedMesh hierarchy preserving skeleton bindings
    const clone = SkeletonUtils.clone(scene);
    clone.updateMatrixWorld(true);

    // Height of original booth is 2.96m. Scale factor 0.80 gives 2.37m height.
    const scaleFactor = 0.80;
    clone.scale.setScalar(scaleFactor);

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = false; // Ensure skinned meshes are never culled
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.roughness = THREE.MathUtils.clamp(mat.roughness || 0.4, 0.15, 0.85);
          mat.metalness = THREE.MathUtils.clamp(mat.metalness || 0.1, 0.0, 0.8);
          mat.needsUpdate = true;
        }
      }
    });

    return clone;
  }, [scene]);

  return (
    <group position={position} rotation={rotation} name="Floor5_PhotoBooth">
      <primitive object={boothObject} />
    </group>
  );
}

useGLTF.preload('/models/photo_booth.glb');
