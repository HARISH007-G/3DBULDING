/**
 * DATA-DRIVEN REAL-WORLD ASSET DIMENSION MANIFEST
 * Standard Architectural Baseline (1.0 Three.js unit = 1.0 meter)
 */

export interface AssetCategorySpec {
  category: 'desk' | 'seating' | 'lounge' | 'electronics' | 'desktop-prop' | 'safety' | 'security' | 'foliage';
  expectedHeight: [number, number]; // [minHeight, maxHeight] in meters
  expectedWidth: [number, number];  // [minWidth, maxWidth] in meters
  targetHeight: number;             // Ideal target height in meters
}

export const ASSET_MANIFEST: Record<string, AssetCategorySpec> = {
  // Furniture — Desks & Tables
  'executive_desk': { category: 'desk', expectedHeight: [0.70, 0.85], expectedWidth: [1.40, 2.40], targetHeight: 0.75 },
  'developer_desk': { category: 'desk', expectedHeight: [0.70, 0.85], expectedWidth: [1.40, 2.00], targetHeight: 0.75 },
  'standing_desk': { category: 'desk', expectedHeight: [0.70, 0.90], expectedWidth: [1.20, 1.80], targetHeight: 0.75 },
  'meeting_table': { category: 'desk', expectedHeight: [0.70, 0.85], expectedWidth: [2.00, 4.00], targetHeight: 0.75 },
  'coffee_table': { category: 'lounge', expectedHeight: [0.35, 0.50], expectedWidth: [0.80, 1.50], targetHeight: 0.40 },

  // Seating
  'office_chair': { category: 'seating', expectedHeight: [0.80, 1.20], expectedWidth: [0.55, 0.75], targetHeight: 0.95 },
  'gaming_chair': { category: 'seating', expectedHeight: [1.10, 1.40], expectedWidth: [0.60, 0.85], targetHeight: 1.25 },
  'sofa': { category: 'lounge', expectedHeight: [0.70, 1.00], expectedWidth: [1.60, 3.20], targetHeight: 0.80 },

  // VR & Spatial Computing Hardware
  'vr_headset': { category: 'desktop-prop', expectedHeight: [0.12, 0.28], expectedWidth: [0.18, 0.35], targetHeight: 0.22 },
  'vr_headset_dock': { category: 'desktop-prop', expectedHeight: [0.12, 0.28], expectedWidth: [0.18, 0.35], targetHeight: 0.20 },
  'vr_controller': { category: 'desktop-prop', expectedHeight: [0.10, 0.25], expectedWidth: [0.08, 0.20], targetHeight: 0.18 },
  'vr_player': { category: 'electronics', expectedHeight: [1.50, 1.95], expectedWidth: [0.50, 1.00], targetHeight: 1.75 },

  // Heavy Equipment
  'server_rack': { category: 'electronics', expectedHeight: [1.80, 2.20], expectedWidth: [0.60, 1.00], targetHeight: 2.00 },
  'office_printer': { category: 'electronics', expectedHeight: [0.90, 1.30], expectedWidth: [0.60, 1.00], targetHeight: 1.10 },
  '3d_printer': { category: 'electronics', expectedHeight: [0.35, 0.60], expectedWidth: [0.40, 0.70], targetHeight: 0.45 },
  'coffee_machine': { category: 'electronics', expectedHeight: [0.35, 0.55], expectedWidth: [0.40, 0.70], targetHeight: 0.45 },

  // Displays & Computers
  'desktop_computer': { category: 'electronics', expectedHeight: [0.35, 0.55], expectedWidth: [0.40, 0.70], targetHeight: 0.45 },
  'monitor': { category: 'electronics', expectedHeight: [0.35, 0.55], expectedWidth: [0.50, 0.80], targetHeight: 0.45 },

  // Desktop Micro-Props
  'laptop': { category: 'desktop-prop', expectedHeight: [0.12, 0.25], expectedWidth: [0.30, 0.45], targetHeight: 0.18 },
  'headphones': { category: 'desktop-prop', expectedHeight: [0.15, 0.25], expectedWidth: [0.15, 0.25], targetHeight: 0.18 },
  'task_lamp': { category: 'desktop-prop', expectedHeight: [0.25, 0.55], expectedWidth: [0.20, 0.40], targetHeight: 0.35 },
  'coffee_mug': { category: 'desktop-prop', expectedHeight: [0.08, 0.15], expectedWidth: [0.08, 0.15], targetHeight: 0.10 },

  // Wall & Ceiling Infrastructure
  'cctv_camera': { category: 'security', expectedHeight: [0.12, 0.30], expectedWidth: [0.15, 0.35], targetHeight: 0.22 },
  'exit_sign': { category: 'safety', expectedHeight: [0.18, 0.35], expectedWidth: [0.30, 0.60], targetHeight: 0.25 },
  'fire_extinguisher': { category: 'safety', expectedHeight: [0.45, 0.75], expectedWidth: [0.18, 0.30], targetHeight: 0.60 },
  'wall_clock': { category: 'desktop-prop', expectedHeight: [0.25, 0.50], expectedWidth: [0.25, 0.50], targetHeight: 0.35 },

  // Greenery
  'monstera_plant': { category: 'foliage', expectedHeight: [0.90, 1.50], expectedWidth: [0.60, 1.20], targetHeight: 1.20 }
};

export function getSpecForFilename(url?: string): AssetCategorySpec {
  if (!url || typeof url !== 'string') {
    return {
      category: 'desktop-prop',
      expectedHeight: [0.10, 1.50],
      expectedWidth: [0.10, 1.50],
      targetHeight: 0.50
    };
  }
  const cleanName = url.replace('/models/', '').replace('.glb', '');
  return (
    ASSET_MANIFEST[cleanName] || {
      category: 'desktop-prop',
      expectedHeight: [0.10, 1.50],
      expectedWidth: [0.10, 1.50],
      targetHeight: 0.50
    }
  );
}
