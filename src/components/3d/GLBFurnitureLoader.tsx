import React, { Suspense, Component } from 'react';
import type { ReactNode } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { ASSET_CONFIGS } from '../../utils/assetConfig';
import type { GLBAssetTransform } from '../../utils/assetConfig';
import { getSpecForFilename } from '../../utils/assetManifest';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackId: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class GLBErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn(`[GLBFurnitureLoader] Skipping asset "${this.props.fallbackId}":`, error.message);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

interface GLBModelProps {
  config: GLBAssetTransform;
}

/**
 * Calibrated GLB Model Mesh Renderer:
 * Calculates bounding box, centers geometry horizontally, aligns bottom/top flush to anchor plane (floor/desk/ceiling),
 * applies exact real-world architectural scale in meters, and sets up PBR lighting & shadows.
 */
function GLBModelMesh({ config }: GLBModelProps) {
  const { scene } = useGLTF(config.url);

  const { rootObject } = React.useMemo(() => {
    const clone = scene.clone(true);
    clone.updateMatrixWorld(true);

    // 1. Calculate raw unscaled bounding box
    const rawBox = new THREE.Box3().setFromObject(clone);
    const rawSize = new THREE.Vector3();
    rawBox.getSize(rawSize);

    // 2. Compute uniform scale
    const spec = getSpecForFilename(config.url);
    const desiredHeight = config.targetHeight || spec.targetHeight;
    const scaleFactor =
      rawSize.y > 0.0001 && isFinite(rawSize.y) && desiredHeight > 0
        ? desiredHeight / rawSize.y
        : 1.0;

    clone.scale.setScalar(scaleFactor);
    clone.updateMatrixWorld(true);

    // 3. Measure scaled bounding box
    const scaledBox = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    scaledBox.getCenter(center);

    // 4. Center horizontally and align bottom to local Y = 0 (or top to Y = 0 for ceiling)
    const wrapper = new THREE.Group();
    wrapper.name = `Normalized_${config.id}`;

    let offsetY = -scaledBox.min.y;
    if (config.anchor === 'ceiling') {
      offsetY = -scaledBox.max.y;
    }

    clone.position.set(-center.x, offsetY, -center.z);
    wrapper.add(clone);

    // 5. Setup shadow casting & PBR material parameters
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.roughness = THREE.MathUtils.clamp(mat.roughness || 0.4, 0.15, 0.85);
          mat.metalness = THREE.MathUtils.clamp(mat.metalness || 0.1, 0.0, 0.85);
          mat.needsUpdate = true;
        }
      }
    });

    return { rootObject: wrapper };
  }, [scene, config]);

  return (
    <primitive
      object={rootObject}
      position={config.position}
      rotation={config.rotation || [0, 0, 0]}
    />
  );
}

export function GLBConfiguredAsset({ config }: { config: GLBAssetTransform }) {
  return (
    <GLBErrorBoundary fallbackId={config.id}>
      <Suspense fallback={null}>
        <GLBModelMesh config={config} />
      </Suspense>
    </GLBErrorBoundary>
  );
}

/**
 * WORKSTATION ASSEMBLY MANAGER
 * Groups workstations into parent assembly containers (ws_f6_ceo, ws_f5_dev, ws_f2_workspace) for unified physical composition.
 */
export function GLBAssetManager() {
  const groupedAssets = React.useMemo(() => {
    const map = new Map<string, GLBAssetTransform[]>();
    ASSET_CONFIGS.forEach((cfg) => {
      const gId = cfg.parentGroupId || 'ungrouped';
      if (!map.has(gId)) map.set(gId, []);
      map.get(gId)!.push(cfg);
    });
    return map;
  }, []);

  return (
    <group name="GLBAssetManager">
      {Array.from(groupedAssets.entries()).map(([gId, assets]) => (
        <group key={`workstation-group-${gId}`} name={`WorkstationGroup_${gId}`}>
          {assets.map((config) => (
            <GLBConfiguredAsset key={config.id} config={config} />
          ))}
        </group>
      ))}
    </group>
  );
}

// Preload active GLB model paths for instant zero-lag WebGL rendering
ASSET_CONFIGS.forEach((config) => {
  try {
    useGLTF.preload(config.url);
  } catch {
    // Ignore preload error
  }
});
