export type AssetCategory =
  | 'FURNITURE'
  | 'TECHNOLOGY'
  | 'DESK_PROP'
  | 'LIGHTING'
  | 'SAFETY'
  | 'SECURITY'
  | 'PLANT'
  | 'SERVER'
  | 'RECEPTION'
  | 'MEETING'
  | 'LOUNGE';

export type PlacementType = 'floor' | 'desk' | 'table' | 'counter' | 'wall' | 'ceiling';

export interface TargetDimensionSpec {
  width: [number, number];   // Min/Max expected width in meters
  height: [number, number];  // Min/Max expected height in meters
  depth: [number, number];   // Min/Max expected depth in meters
  idealHeight: number;       // Target height for scale normalization
}

export interface AssetRegistryEntry {
  id: string;
  name: string;
  file: string;
  floor: number;
  room: string;
  category: AssetCategory;
  placementType: PlacementType;
  position: [number, number, number];
  rotation: [number, number, number];
  targetDimensions: TargetDimensionSpec;
  allowedContacts?: string[];
}

/**
 * MASTER ASSET REGISTRY
 * Centralized Single Source of Truth for All 22 GLB Assets across all 7 Floors
 */
export const ASSET_REGISTRY: Record<string, AssetRegistryEntry> = {
  // =============================================================
  // FLOOR 6 — EXECUTIVE SUITE (Y_floor = 24.0m, Surface = 24.185m)
  // Desk Top Surface Y = 24.64m
  // =============================================================
  'f6_exec_desk': {
    id: 'f6_exec_desk',
    name: 'Executive Desk',
    file: '/models/executive_desk.glb',
    floor: 6,
    room: 'CEO Office',
    category: 'FURNITURE',
    placementType: 'floor',
    position: [-2.5, 24.185, -1.5],
    rotation: [0, 0, 0],
    targetDimensions: { width: [1.4, 2.4], height: [0.70, 0.85], depth: [0.70, 1.10], idealHeight: 0.76 }
  },
  'f6_exec_chair': {
    id: 'f6_exec_chair',
    name: 'Executive Chair',
    file: '/models/office_chair.glb',
    floor: 6,
    room: 'CEO Office',
    category: 'FURNITURE',
    placementType: 'floor',
    position: [-2.5, 24.185, -2.25],
    rotation: [0, 0, 0],
    targetDimensions: { width: [0.55, 0.75], height: [0.80, 1.20], depth: [0.55, 0.75], idealHeight: 0.95 }
  },
  'f6_sky_sofa': {
    id: 'f6_sky_sofa',
    name: 'Sky Lounge Sofa',
    file: '/models/sofa.glb',
    floor: 6,
    room: 'Sky Lounge',
    category: 'LOUNGE',
    placementType: 'floor',
    position: [3.5, 24.185, 2.0],
    rotation: [0, -Math.PI / 4, 0],
    targetDimensions: { width: [1.6, 3.2], height: [0.70, 1.00], depth: [0.75, 1.10], idealHeight: 0.80 }
  },
  'f6_laptop': {
    id: 'f6_laptop',
    name: 'CEO Laptop',
    file: '/models/laptop.glb',
    floor: 6,
    room: 'CEO Office',
    category: 'DESK_PROP',
    placementType: 'desk',
    position: [-2.1, 24.64, -1.5],
    rotation: [0, -0.2, 0],
    targetDimensions: { width: [0.30, 0.45], height: [0.12, 0.25], depth: [0.20, 0.35], idealHeight: 0.18 },
    allowedContacts: ['f6_exec_desk']
  },
  'f6_task_lamp': {
    id: 'f6_task_lamp',
    name: 'Executive Task Lamp',
    file: '/models/task_lamp.glb',
    floor: 6,
    room: 'CEO Office',
    category: 'LIGHTING',
    placementType: 'desk',
    position: [-3.1, 24.64, -1.5],
    rotation: [0, 0.4, 0],
    targetDimensions: { width: [0.20, 0.40], height: [0.25, 0.55], depth: [0.20, 0.40], idealHeight: 0.35 },
    allowedContacts: ['f6_exec_desk']
  },
  'f6_coffee_mug': {
    id: 'f6_coffee_mug',
    name: 'Ceramic Coffee Mug',
    file: '/models/coffee_mug.glb',
    floor: 6,
    room: 'CEO Office',
    category: 'DESK_PROP',
    placementType: 'desk',
    position: [-1.7, 24.64, -1.3],
    rotation: [0, 0, 0],
    targetDimensions: { width: [0.08, 0.15], height: [0.08, 0.15], depth: [0.08, 0.15], idealHeight: 0.10 },
    allowedContacts: ['f6_exec_desk']
  },

  // =============================================================
  // FLOOR 5 — TECHNOLOGY & ENGINEERING (Y_floor = 20.0m, Surface = 20.185m)
  // Desk Top Surface Y = 20.72m
  // =============================================================
  'f5_server_rack_1': {
    id: 'f5_server_rack_1',
    name: 'Primary Server Rack',
    file: '/models/server_rack.glb',
    floor: 5,
    room: 'Server Bay',
    category: 'SERVER',
    placementType: 'floor',
    position: [-6.5, 20.185, 0.5],
    rotation: [0, -Math.PI / 2, 0],
    targetDimensions: { width: [0.60, 1.00], height: [1.80, 2.20], depth: [0.70, 1.10], idealHeight: 2.00 }
  },
  'f5_server_rack_2': {
    id: 'f5_server_rack_2',
    name: 'Secondary Server Rack',
    file: '/models/server_rack.glb',
    floor: 5,
    room: 'Server Bay',
    category: 'SERVER',
    placementType: 'floor',
    position: [-5.0, 20.185, 0.5],
    rotation: [0, -Math.PI / 2, 0],
    targetDimensions: { width: [0.60, 1.00], height: [1.80, 2.20], depth: [0.70, 1.10], idealHeight: 2.00 }
  },
  'f5_standing_desk': {
    id: 'f5_standing_desk',
    name: 'Developer Standing Desk',
    file: '/models/standing_desk.glb',
    floor: 5,
    room: 'Dev Pod 1',
    category: 'FURNITURE',
    placementType: 'floor',
    position: [2.0, 20.185, 1.0],
    rotation: [0, 0, 0],
    targetDimensions: { width: [1.20, 1.80], height: [0.70, 0.90], depth: [0.70, 0.90], idealHeight: 0.75 }
  },
  'f5_dev_monitor': {
    id: 'f5_dev_monitor',
    name: 'Dev Ultrawide Monitor',
    file: '/models/monitor.glb',
    floor: 5,
    room: 'Dev Pod 1',
    category: 'TECHNOLOGY',
    placementType: 'desk',
    position: [2.0, 20.72, 1.0],
    rotation: [0, 0, 0],
    targetDimensions: { width: [0.50, 0.80], height: [0.35, 0.55], depth: [0.15, 0.30], idealHeight: 0.45 },
    allowedContacts: ['f5_standing_desk']
  },
  'f5_headphones': {
    id: 'f5_headphones',
    name: 'Dev Studio Headphones',
    file: '/models/headphones.glb',
    floor: 5,
    room: 'Dev Pod 1',
    category: 'DESK_PROP',
    placementType: 'desk',
    position: [2.3, 20.72, 1.0],
    rotation: [0, 0.5, 0],
    targetDimensions: { width: [0.15, 0.25], height: [0.15, 0.25], depth: [0.08, 0.18], idealHeight: 0.18 },
    allowedContacts: ['f5_standing_desk']
  },
  'f5_fire_extinguisher': {
    id: 'f5_fire_extinguisher',
    name: 'Corridor Fire Extinguisher',
    file: '/models/fire_extinguisher.glb',
    floor: 5,
    room: 'Corridor',
    category: 'SAFETY',
    placementType: 'wall',
    position: [-8.2, 20.8, 4.2],
    rotation: [0, Math.PI / 2, 0],
    targetDimensions: { width: [0.18, 0.30], height: [0.45, 0.75], depth: [0.18, 0.30], idealHeight: 0.60 }
  },

  // =============================================================
  // FLOOR 4 — CREATIVE & DESIGN STUDIO (Y_floor = 16.0m, Surface = 16.185m)
  // Desk Top Surface Y = 16.64m
  // =============================================================
  'f4_creative_desk': {
    id: 'f4_creative_desk',
    name: 'Creative Workstation',
    file: '/models/developer_desk.glb',
    floor: 4,
    room: 'Atelier',
    category: 'FURNITURE',
    placementType: 'floor',
    position: [-3.0, 16.185, -1.5],
    rotation: [0, 0, 0],
    targetDimensions: { width: [1.40, 2.00], height: [0.70, 0.85], depth: [0.70, 0.90], idealHeight: 0.75 }
  },
  'f4_3d_printer': {
    id: 'f4_3d_printer',
    name: 'Rapid 3D Printer',
    file: '/models/3d_printer.glb',
    floor: 4,
    room: 'Prototype Lab',
    category: 'TECHNOLOGY',
    placementType: 'table',
    position: [-3.0, 16.64, -1.5],
    rotation: [0, -0.3, 0],
    targetDimensions: { width: [0.40, 0.70], height: [0.35, 0.60], depth: [0.40, 0.70], idealHeight: 0.45 }
  },

  // =============================================================
  // FLOOR 3 — MEETING & COLLABORATION (Y_floor = 12.0m, Surface = 12.185m)
  // =============================================================
  'f3_boardroom_table': {
    id: 'f3_boardroom_table',
    name: 'Boardroom Conference Table',
    file: '/models/meeting_table.glb',
    floor: 3,
    room: 'Glass Boardroom',
    category: 'MEETING',
    placementType: 'floor',
    position: [0.0, 12.185, 0.5],
    rotation: [0, 0, 0],
    targetDimensions: { width: [2.00, 4.00], height: [0.70, 0.85], depth: [1.20, 1.80], idealHeight: 0.75 }
  },
  'f3_chair_1': {
    id: 'f3_chair_1',
    name: 'Boardroom Chair Left',
    file: '/models/office_chair.glb',
    floor: 3,
    room: 'Glass Boardroom',
    category: 'FURNITURE',
    placementType: 'floor',
    position: [-1.5, 12.185, -0.5],
    rotation: [0, Math.PI / 4, 0],
    targetDimensions: { width: [0.55, 0.75], height: [0.80, 1.20], depth: [0.55, 0.75], idealHeight: 0.95 }
  },
  'f3_chair_2': {
    id: 'f3_chair_2',
    name: 'Boardroom Chair Right',
    file: '/models/office_chair.glb',
    floor: 3,
    room: 'Glass Boardroom',
    category: 'FURNITURE',
    placementType: 'floor',
    position: [1.5, 12.185, -0.5],
    rotation: [0, -Math.PI / 4, 0],
    targetDimensions: { width: [0.55, 0.75], height: [0.80, 1.20], depth: [0.55, 0.75], idealHeight: 0.95 }
  },
  'f3_wall_clock': {
    id: 'f3_wall_clock',
    name: 'Minimal Wall Clock',
    file: '/models/wall_clock.glb',
    floor: 3,
    room: 'Glass Boardroom',
    category: 'DESK_PROP',
    placementType: 'wall',
    position: [0.0, 14.2, -4.7],
    rotation: [0, 0, 0],
    targetDimensions: { width: [0.25, 0.50], height: [0.25, 0.50], depth: [0.04, 0.10], idealHeight: 0.35 }
  },
  'f3_exit_sign': {
    id: 'f3_exit_sign',
    name: 'Emergency Exit Sign',
    file: '/models/exit_sign.glb',
    floor: 3,
    room: 'Corridor',
    category: 'SAFETY',
    placementType: 'wall',
    position: [8.5, 15.0, 0.0],
    rotation: [0, Math.PI / 2, 0],
    targetDimensions: { width: [0.30, 0.60], height: [0.18, 0.35], depth: [0.05, 0.12], idealHeight: 0.25 }
  },

  // =============================================================
  // FLOOR 2 — OPEN EMPLOYEE WORKSPACE (Y_floor = 8.0m, Surface = 8.185m)
  // Desk Top Surface Y = 8.64m
  // =============================================================
  'f2_printer': {
    id: 'f2_printer',
    name: 'Print Station Printer',
    file: '/models/office_printer.glb',
    floor: 2,
    room: 'Print Station',
    category: 'TECHNOLOGY',
    placementType: 'floor',
    position: [-3.6, 8.185, 2.5],
    rotation: [0, 0, 0],
    targetDimensions: { width: [0.60, 1.00], height: [0.90, 1.30], depth: [0.55, 0.80], idealHeight: 1.10 }
  },
  'f2_workspace_desk': {
    id: 'f2_workspace_desk',
    name: 'Workspace Pod Desk',
    file: '/models/developer_desk.glb',
    floor: 2,
    room: 'Workstation Pod',
    category: 'FURNITURE',
    placementType: 'floor',
    position: [1.5, 8.185, 1.5],
    rotation: [0, 0, 0],
    targetDimensions: { width: [1.40, 2.00], height: [0.70, 0.85], depth: [0.70, 0.90], idealHeight: 0.75 }
  },
  'f2_workspace_pc': {
    id: 'f2_workspace_pc',
    name: 'Workspace Desktop PC',
    file: '/models/desktop_computer.glb',
    floor: 2,
    room: 'Workstation Pod',
    category: 'TECHNOLOGY',
    placementType: 'desk',
    position: [1.5, 8.64, 1.5],
    rotation: [0, 0, 0],
    targetDimensions: { width: [0.40, 0.70], height: [0.35, 0.55], depth: [0.20, 0.40], idealHeight: 0.45 },
    allowedContacts: ['f2_workspace_desk']
  },
  'f2_workspace_chair': {
    id: 'f2_workspace_chair',
    name: 'Workspace Ergonomic Chair',
    file: '/models/office_chair.glb',
    floor: 2,
    room: 'Workstation Pod',
    category: 'FURNITURE',
    placementType: 'floor',
    position: [1.5, 8.185, 2.25],
    rotation: [0, Math.PI, 0],
    targetDimensions: { width: [0.55, 0.75], height: [0.80, 1.20], depth: [0.55, 0.75], idealHeight: 0.95 }
  },

  // =============================================================
  // FLOOR 1 — WELLNESS & BREAKOUT (Y_floor = 4.0m, Surface = 4.185m)
  // Countertop Surface Y = 4.935m
  // =============================================================
  'f1_espresso_machine': {
    id: 'f1_espresso_machine',
    name: 'Espresso Bar Machine',
    file: '/models/coffee_machine.glb',
    floor: 1,
    room: 'Espresso Bar',
    category: 'TECHNOLOGY',
    placementType: 'table',
    position: [-4.6, 4.935, 2.0],
    rotation: [0, 0, 0],
    targetDimensions: { width: [0.40, 0.70], height: [0.35, 0.55], depth: [0.35, 0.55], idealHeight: 0.45 }
  },
  'f1_coffee_mug_bar': {
    id: 'f1_coffee_mug_bar',
    name: 'Espresso Bar Mug',
    file: '/models/coffee_mug.glb',
    floor: 1,
    room: 'Espresso Bar',
    category: 'DESK_PROP',
    placementType: 'table',
    position: [-3.8, 4.935, 2.2],
    rotation: [0, 0, 0],
    targetDimensions: { width: [0.08, 0.15], height: [0.08, 0.15], depth: [0.08, 0.15], idealHeight: 0.10 }
  },
  'f1_monstera': {
    id: 'f1_monstera',
    name: 'Botanical Monstera Plant',
    file: '/models/monstera_plant.glb',
    floor: 1,
    room: 'Botanical Lounge',
    category: 'PLANT',
    placementType: 'floor',
    position: [-7.5, 4.185, 1.5],
    rotation: [0, 0, 0],
    targetDimensions: { width: [0.60, 1.20], height: [0.90, 1.50], depth: [0.60, 1.20], idealHeight: 1.20 }
  },

  // =============================================================
  // FLOOR 00 — GROUND RECEPTION LOBBY (Y_floor = 0.0m, Surface = 0.185m)
  // =============================================================
  'f0_lobby_sofa': {
    id: 'f0_lobby_sofa',
    name: 'Reception Lounge Sofa',
    file: '/models/sofa.glb',
    floor: 0,
    room: 'Visitor Lounge',
    category: 'LOUNGE',
    placementType: 'floor',
    position: [5.5, 0.185, -2.2],
    rotation: [0, -Math.PI / 2, 0],
    targetDimensions: { width: [1.60, 3.20], height: [0.70, 1.00], depth: [0.75, 1.10], idealHeight: 0.80 }
  },
  'f0_coffee_table': {
    id: 'f0_coffee_table',
    name: 'Lobby Coffee Table',
    file: '/models/coffee_table.glb',
    floor: 0,
    room: 'Visitor Lounge',
    category: 'LOUNGE',
    placementType: 'floor',
    position: [5.5, 0.185, -1.0],
    rotation: [0, 0, 0],
    targetDimensions: { width: [0.80, 1.50], height: [0.35, 0.50], depth: [0.50, 0.80], idealHeight: 0.40 }
  },
  'f0_atrium_monstera': {
    id: 'f0_atrium_monstera',
    name: 'Atrium Monstera Plant',
    file: '/models/monstera_plant.glb',
    floor: 0,
    room: 'Atrium',
    category: 'PLANT',
    placementType: 'floor',
    position: [8.5, 0.185, 1.5],
    rotation: [0, 0, 0],
    targetDimensions: { width: [0.60, 1.20], height: [0.90, 1.50], depth: [0.60, 1.20], idealHeight: 1.20 }
  },
  'f0_cctv_camera': {
    id: 'f0_cctv_camera',
    name: 'Atrium CCTV Dome Camera',
    file: '/models/cctv_camera.glb',
    floor: 0,
    room: 'Atrium',
    category: 'SECURITY',
    placementType: 'ceiling',
    position: [0.0, 3.75, 3.2],
    rotation: [0, 0, 0],
    targetDimensions: { width: [0.15, 0.35], height: [0.12, 0.30], depth: [0.15, 0.35], idealHeight: 0.22 }
  }
};
