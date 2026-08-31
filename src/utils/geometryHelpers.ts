import * as THREE from 'three';

/**
 * Procedural Geometry Generator for High-Detail Architectural Visualization.
 * STRICT RULE: No raw primitive cubes for primary items. All furniture uses multi-part chamfered/beveled assemblies.
 */

// Create a rounded Box geometry using ExtrudeGeometry or Shape
export function createRoundedBoxGeometry(
  width: number,
  height: number,
  depth: number,
  radius: number = 0.02,
  smoothness: number = 4
): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  const eps = 0.00001;
  const r = Math.min(radius, width / 2 - eps, height / 2 - eps);
  const w = width / 2;
  const h = height / 2;

  shape.moveTo(-w + r, -h);
  shape.lineTo(w - r, -h);
  shape.quadraticCurveTo(w, -h, w, -h + r);
  shape.lineTo(w, h - r);
  shape.quadraticCurveTo(w, h, w - r, h);
  shape.lineTo(-w + r, h);
  shape.quadraticCurveTo(-w, h, -w, h - r);
  shape.lineTo(-w, -h + r);
  shape.quadraticCurveTo(-w, -h, -w + r, -h);

  const extrudeSettings = {
    steps: 1,
    depth: depth,
    bevelEnabled: true,
    bevelThickness: r,
    bevelSize: r,
    bevelOffset: 0,
    bevelSegments: smoothness
  };

  const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geom.center();
  return geom;
}

// Reusable Procedural Geometries (Cached for performance)
export const GEOMETRIES = {
  // Desks
  deskTop: createRoundedBoxGeometry(1.6, 0.05, 0.8, 0.015),
  deskLeg: new THREE.CylinderGeometry(0.025, 0.025, 0.72, 16),
  deskCrossbar: new THREE.BoxGeometry(1.4, 0.04, 0.04),

  // Ergonomic Chair Parts
  chairSeat: createRoundedBoxGeometry(0.5, 0.06, 0.48, 0.02),
  chairBack: createRoundedBoxGeometry(0.48, 0.55, 0.04, 0.02),
  chairArmrest: new THREE.BoxGeometry(0.05, 0.03, 0.25),
  chairStem: new THREE.CylinderGeometry(0.02, 0.02, 0.35, 12),
  chairBaseWheel: new THREE.CylinderGeometry(0.24, 0.24, 0.03, 5),

  // Monitors & Tech
  monitorFrame: createRoundedBoxGeometry(0.7, 0.42, 0.02, 0.008),
  monitorScreen: new THREE.PlaneGeometry(0.66, 0.38),
  monitorStandArm: new THREE.BoxGeometry(0.04, 0.25, 0.03),
  monitorStandBase: new THREE.CylinderGeometry(0.12, 0.14, 0.015, 16),
  ultrawideFrame: createRoundedBoxGeometry(1.2, 0.45, 0.025, 0.01),
  ultrawideScreen: new THREE.PlaneGeometry(1.15, 0.41),
  keyboard: createRoundedBoxGeometry(0.44, 0.012, 0.14, 0.005),
  mouse: createRoundedBoxGeometry(0.06, 0.02, 0.1, 0.01),

  // Server Racks
  serverFrame: createRoundedBoxGeometry(0.8, 2.1, 0.9, 0.02),
  serverUnit: new THREE.BoxGeometry(0.74, 0.08, 0.85),
  serverDoorGlass: new THREE.PlaneGeometry(0.74, 1.95),

  // Conference & Executive
  execDeskTop: createRoundedBoxGeometry(2.4, 0.08, 1.1, 0.03),
  conferenceTableTop: createRoundedBoxGeometry(3.6, 0.08, 1.4, 0.04),
  confLeg: new THREE.CylinderGeometry(0.06, 0.06, 0.72, 16),

  // Sofas & Lounges
  sofaSeat: createRoundedBoxGeometry(1.8, 0.22, 0.8, 0.04),
  sofaBack: createRoundedBoxGeometry(1.8, 0.45, 0.2, 0.04),
  sofaArm: createRoundedBoxGeometry(0.22, 0.45, 0.8, 0.04),
  coffeeTableTop: createRoundedBoxGeometry(1.1, 0.04, 0.6, 0.02),

  // Decor & Plants
  plantPot: new THREE.CylinderGeometry(0.22, 0.16, 0.45, 16),
  plantStem: new THREE.CylinderGeometry(0.015, 0.02, 0.6, 8),
  leaf: new THREE.SphereGeometry(0.15, 8, 8),

  // Lighting & Fixtures
  pendantLight: new THREE.ConeGeometry(0.2, 0.25, 16),
  lightStrip: new THREE.BoxGeometry(2.4, 0.03, 0.08),
  recessedSpot: new THREE.CylinderGeometry(0.08, 0.08, 0.03, 16),

  // Structural & Architectural
  doorPanel: createRoundedBoxGeometry(1.3, 2.2, 0.04, 0.01),
  doorFrame: new THREE.BoxGeometry(1.4, 2.3, 0.08),
  corridorWall: new THREE.BoxGeometry(0.1, 3.8, 12),
  signPanel: new THREE.BoxGeometry(0.6, 0.25, 0.02),
  turnstileHousing: createRoundedBoxGeometry(0.25, 0.95, 1.1, 0.03),
  turnstileGlass: new THREE.BoxGeometry(0.01, 0.75, 0.4)
};
