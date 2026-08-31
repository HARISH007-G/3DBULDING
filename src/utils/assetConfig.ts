import * as THREE from 'three';
import { getSpecForFilename } from './assetManifest';

export interface GLBAssetTransform {
  id: string;
  url: string;
  floor: number;
  room: string;
  position: [number, number, number]; // World position or relative parent position
  rotation?: [number, number, number];
  targetHeight?: number;               // Normalized height in meters
  anchor?: 'floor' | 'desk' | 'table' | 'wall' | 'ceiling';
  parentGroupId?: string;             // Optional Workstation Parent Group ID
  localOffset?: [number, number, number]; // Offset relative to parent workstation center
}

/**
 * MASTER CALIBRATION MATRIX FOR ALL GLB FURNITURE & PROPS
 */
export const ASSET_CONFIGS: GLBAssetTransform[] = [
  // =============================================================
  // FLOOR 6: SPATIAL XR IMMERSION ARENA (Managed by Floor6Executive.tsx)
  // =============================================================

  // =============================================================
  // FLOOR 5: TECH HUB DEV POD & SERVER BAY (Y = 20.185m)
  // =============================================================
  {
    id: 'f5_standing_desk',
    url: '/models/standing_desk.glb',
    floor: 5,
    room: 'dev-pod-1',
    position: [2.0, 20.185, 1.0],
    rotation: [0, 0, 0],
    targetHeight: 0.75,
    anchor: 'floor',
    parentGroupId: 'ws_f5_dev'
  },
  {
    id: 'f5_dev_monitor',
    url: '/models/monitor.glb',
    floor: 5,
    room: 'dev-pod-1',
    position: [2.0, 20.935, 1.0],
    rotation: [0, 0, 0],
    targetHeight: 0.45,
    anchor: 'desk',
    parentGroupId: 'ws_f5_dev'
  },
  {
    id: 'f5_headphones',
    url: '/models/headphones.glb',
    floor: 5,
    room: 'dev-pod-1',
    position: [2.4, 20.935, 1.0],
    rotation: [0, 0.4, 0],
    targetHeight: 0.18,
    anchor: 'desk',
    parentGroupId: 'ws_f5_dev'
  },
  {
    id: 'f5_photo_booth',
    url: '/models/photo_booth.glb',
    floor: 5,
    room: 'photo-booth-zone',
    position: [-5.5, 20.185, 0.5],
    rotation: [0, Math.PI / 6, 0],
    targetHeight: 2.35,
    anchor: 'floor'
  },
  {
    id: 'f5_fire_extinguisher',
    url: '/models/fire_extinguisher.glb',
    floor: 5,
    room: 'corridor',
    position: [-8.2, 20.8, 4.2],
    rotation: [0, Math.PI / 2, 0],
    targetHeight: 0.60,
    anchor: 'wall'
  },

  // =============================================================
  // FLOOR 4: CREATIVE & DESIGN STUDIO (Y = 16.185m)
  // =============================================================
  {
    id: 'f4_creative_desk',
    url: '/models/developer_desk.glb',
    floor: 4,
    room: 'atelier',
    position: [-3.0, 16.185, -1.5],
    rotation: [0, 0, 0],
    targetHeight: 0.75,
    anchor: 'floor',
    parentGroupId: 'ws_f4_creative'
  },
  {
    id: 'f4_3d_printer',
    url: '/models/3d_printer.glb',
    floor: 4,
    room: 'prototype-lab',
    position: [-3.0, 16.935, -1.5],
    rotation: [0, -0.3, 0],
    targetHeight: 0.45,
    anchor: 'table',
    parentGroupId: 'ws_f4_creative'
  },

  // =============================================================
  // FLOOR 3: MEETING & COLLABORATION HUB (Y = 12.185m)
  // =============================================================
  {
    id: 'f3_boardroom_table',
    url: '/models/meeting_table.glb',
    floor: 3,
    room: 'glass-boardroom',
    position: [0.0, 12.185, 0.5],
    rotation: [0, 0, 0],
    targetHeight: 0.75,
    anchor: 'floor'
  },
  {
    id: 'f3_chair_1',
    url: '/models/office_chair.glb',
    floor: 3,
    room: 'glass-boardroom',
    position: [-1.5, 12.185, -0.5],
    rotation: [0, Math.PI / 4, 0],
    targetHeight: 0.95,
    anchor: 'floor'
  },
  {
    id: 'f3_chair_2',
    url: '/models/office_chair.glb',
    floor: 3,
    room: 'glass-boardroom',
    position: [1.5, 12.185, -0.5],
    rotation: [0, -Math.PI / 4, 0],
    targetHeight: 0.95,
    anchor: 'floor'
  },
  {
    id: 'f3_wall_clock',
    url: '/models/wall_clock.glb',
    floor: 3,
    room: 'glass-boardroom',
    position: [0.0, 14.2, -4.7],
    rotation: [0, 0, 0],
    targetHeight: 0.35,
    anchor: 'wall'
  },
  {
    id: 'f3_exit_sign',
    url: '/models/exit_sign.glb',
    floor: 3,
    room: 'corridor',
    position: [8.5, 15.0, 0.0],
    rotation: [0, Math.PI / 2, 0],
    targetHeight: 0.25,
    anchor: 'wall'
  },

  // =============================================================
  // FLOOR 2: OPEN WORKSPACE POD (Y = 8.185m)
  // =============================================================
  {
    id: 'f2_workspace_desk',
    url: '/models/developer_desk.glb',
    floor: 2,
    room: 'workstation-pod',
    position: [1.5, 8.185, 1.5],
    rotation: [0, 0, 0],
    targetHeight: 0.75,
    anchor: 'floor',
    parentGroupId: 'ws_f2_workspace'
  },
  {
    id: 'f2_workspace_pc',
    url: '/models/desktop_computer.glb',
    floor: 2,
    room: 'workstation-pod',
    position: [1.5, 8.935, 1.5],
    rotation: [0, 0, 0],
    targetHeight: 0.45,
    anchor: 'desk',
    parentGroupId: 'ws_f2_workspace'
  },
  {
    id: 'f2_workspace_chair',
    url: '/models/office_chair.glb',
    floor: 2,
    room: 'workstation-pod',
    position: [1.5, 8.185, 2.25],
    rotation: [0, Math.PI, 0],
    targetHeight: 0.95,
    anchor: 'floor',
    parentGroupId: 'ws_f2_workspace'
  },
  {
    id: 'f2_printer',
    url: '/models/office_printer.glb',
    floor: 2,
    room: 'print-station',
    position: [-3.6, 8.185, 2.5],
    rotation: [0, 0, 0],
    targetHeight: 1.10,
    anchor: 'floor'
  },

  // =============================================================
  // FLOOR 1: WELLNESS & BREAKOUT FLOOR (Y = 4.185m)
  // =============================================================
  {
    id: 'f1_espresso_machine',
    url: '/models/coffee_machine.glb',
    floor: 1,
    room: 'espresso-bar',
    position: [-4.6, 4.935, 2.0],
    rotation: [0, 0, 0],
    targetHeight: 0.45,
    anchor: 'table'
  },
  {
    id: 'f1_coffee_mug_bar',
    url: '/models/coffee_mug.glb',
    floor: 1,
    room: 'espresso-bar',
    position: [-3.8, 4.935, 2.2],
    rotation: [0, 0, 0],
    targetHeight: 0.10,
    anchor: 'table'
  },
  {
    id: 'f1_monstera',
    url: '/models/monstera_plant.glb',
    floor: 1,
    room: 'botanical-lounge',
    position: [-7.5, 4.185, 1.5],
    rotation: [0, 0, 0],
    targetHeight: 1.20,
    anchor: 'floor'
  },

  // =============================================================
  // FLOOR 00: GRAND RECEPTION LOBBY (Y = 0.185m)
  // =============================================================
  {
    id: 'f0_lobby_sofa',
    url: '/models/sofa.glb',
    floor: 0,
    room: 'visitor-lounge',
    position: [5.5, 0.185, -2.2],
    rotation: [0, -Math.PI / 2, 0],
    targetHeight: 0.80,
    anchor: 'floor'
  },
  {
    id: 'f0_coffee_table',
    url: '/models/coffee_table.glb',
    floor: 0,
    room: 'visitor-lounge',
    position: [5.5, 0.185, -1.0],
    rotation: [0, 0, 0],
    targetHeight: 0.40,
    anchor: 'floor'
  },
  {
    id: 'f0_atrium_monstera',
    url: '/models/monstera_plant.glb',
    floor: 0,
    room: 'atrium',
    position: [8.5, 0.185, 1.5],
    rotation: [0, 0, 0],
    targetHeight: 1.20,
    anchor: 'floor'
  },
  {
    id: 'f0_cctv_camera',
    url: '/models/cctv_camera.glb',
    floor: 0,
    room: 'atrium',
    position: [0.0, 3.75, 3.2],
    rotation: [0, 0, 0],
    targetHeight: 0.22,
    anchor: 'ceiling'
  }
];

/**
 * Normalization helper for runtime validation
 */
export function normalizeGLBMesh(scene: THREE.Object3D, assetConfig: GLBAssetTransform) {
  scene.updateMatrixWorld(true);
  const rawBox = new THREE.Box3().setFromObject(scene);
  const rawSize = new THREE.Vector3();
  rawBox.getSize(rawSize);

  const spec = getSpecForFilename(assetConfig.url);
  const desiredHeight = assetConfig.targetHeight || spec.targetHeight;

  if (rawSize.y > 0.001 && isFinite(rawSize.y) && desiredHeight > 0) {
    const scaleFactor = desiredHeight / rawSize.y;
    scene.scale.setScalar(scaleFactor);
  }
}
