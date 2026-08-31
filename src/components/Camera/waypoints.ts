import * as THREE from 'three';

export interface CameraWaypoint {
  progress: number;       // Normalized scroll progress [0.00 - 1.00]
  floor: number;          // Active floor index (6, 5, 4, 3, 2, 1, 0)
  position: [number, number, number]; // [X, Y, Z] camera position
  target: [number, number, number];   // [X, Y, Z] camera lookAt target
  fov: number;            // Dynamic FOV
  description: string;
  doorOpenProgress?: number; // Optional sliding glass door state [0-1]
  elevatorDoorOpen?: boolean;
}

export const CAMERA_WAYPOINTS: CameraWaypoint[] = [
  // =============================================================
  // PHASE 0: FLOOR 6 SPATIAL XR IMMERSION ARENA (0.00 - 0.13)
  // =============================================================
  {
    progress: 0.00,
    floor: 6,
    position: [0.0, 25.5, 4.5], // Hero landing view: inside XR arena at human eye level
    target: [-1.2, 25.2, 0.2],  // Focused on Hero Floating VR Headset & Arena
    fov: 42,
    doorOpenProgress: 1.0,
    description: 'Floor 6 Hero - Spatial XR Immersion Arena'
  },
  {
    progress: 0.05,
    floor: 6,
    position: [-1.2, 25.4, 3.0], // Hero Floating Headset & Developer Station Focus
    target: [-2.0, 25.2, 0.2],
    fov: 40,
    doorOpenProgress: 1.0,
    description: 'Floor 6 - Hero Spatial Headset Pedestal'
  },
  {
    progress: 0.09,
    floor: 6,
    position: [1.2, 25.4, 3.0], // Active VR Gamer Arena Focus
    target: [2.0, 25.1, 0.0],
    fov: 40,
    doorOpenProgress: 1.0,
    description: 'Floor 6 - Active VR Gamer Arena & XR Display'
  },
  {
    progress: 0.13,
    floor: 6,
    position: [0.0, 25.5, 9.8], // Camera exits Floor 6 facade glass cleanly (Z=9.8m)
    target: [0.0, 25.0, 0.0],
    fov: 44,
    doorOpenProgress: 0.5,
    description: 'Floor 6 - Camera Exits Facade to Exterior'
  },

  // =============================================================
  // PHASE 1: TRANSITION FROM FLOOR 6 TO FLOOR 5 (0.13 - 0.19)
  // =============================================================
  {
    progress: 0.16,
    floor: 6,
    position: [0.0, 23.2, 10.2], // Safe vertical travel outside facade fins (Z=10.2m)
    target: [0.0, 21.5, 0.0],
    fov: 44,
    description: 'Facade Transition - Downward to Floor 5'
  },
  {
    progress: 0.19,
    floor: 5,
    position: [0.0, 21.5, 9.8], // Approach Floor 5 Facade Entrance
    target: [0.0, 21.0, 0.0],
    fov: 44,
    doorOpenProgress: 0.3,
    description: 'Floor 5 - Approaching Facade Entrance'
  },

  // =============================================================
  // PHASE 2: FLOOR 5 — TECHNOLOGY & ENGINEERING HUB (0.19 - 0.30)
  // =============================================================
  {
    progress: 0.22,
    floor: 5,
    position: [0.0, 21.5, 4.5], // Camera enters Floor 5 Dev Pods
    target: [1.5, 21.0, 0.5],
    fov: 42,
    doorOpenProgress: 1.0,
    description: 'Floor 5 - Inside Dev Pods & Workstations'
  },
  {
    progress: 0.26,
    floor: 5,
    position: [-2.0, 21.4, 2.5], // Flashing Server Racks Focus
    target: [-5.5, 21.2, 0.5],
    fov: 38,
    doorOpenProgress: 1.0,
    description: 'Floor 5 - 3D Photo Booth & Dev Pods'
  },
  {
    progress: 0.30,
    floor: 5,
    position: [0.0, 21.5, 9.8], // Camera exits Floor 5 facade (Z=9.8m)
    target: [0.0, 21.0, 0.0],
    fov: 44,
    doorOpenProgress: 0.5,
    description: 'Floor 5 - Camera Exits Facade to Exterior'
  },

  // =============================================================
  // PHASE 3: TRANSITION FROM FLOOR 5 TO FLOOR 4 (0.30 - 0.36)
  // =============================================================
  {
    progress: 0.33,
    floor: 5,
    position: [0.0, 19.2, 10.5], // Safe vertical travel outside facade fins (Z=10.5m)
    target: [0.0, 17.5, 0.0],
    fov: 44,
    description: 'Facade Transition - Downward to Floor 4'
  },
  {
    progress: 0.36,
    floor: 4,
    position: [0.0, 17.5, 9.8], // Approach Floor 4 Facade Entrance
    target: [0.0, 17.0, 0.0],
    fov: 44,
    doorOpenProgress: 0.3,
    description: 'Floor 4 - Approaching Facade Entrance'
  },

  // =============================================================
  // PHASE 4: FLOOR 4 — CREATIVE & DESIGN STUDIO (0.36 - 0.47)
  // =============================================================
  {
    progress: 0.39,
    floor: 4,
    position: [0.0, 17.5, 4.5], // Camera enters Floor 4 Creative Atelier
    target: [-1.0, 17.0, -0.5],
    fov: 42,
    doorOpenProgress: 1.0,
    description: 'Floor 4 - Inside Creative Studio Atelier'
  },
  {
    progress: 0.43,
    floor: 4,
    position: [1.5, 17.4, 2.5], // 3D Prototype Table Focus
    target: [3.5, 17.3, -1.0],
    fov: 38,
    doorOpenProgress: 1.0,
    description: 'Floor 4 - 3D Printing & Physical Prototype Table'
  },
  {
    progress: 0.47,
    floor: 4,
    position: [0.0, 17.5, 9.8], // Camera exits Floor 4 facade (Z=9.8m)
    target: [0.0, 17.0, 0.0],
    fov: 44,
    doorOpenProgress: 0.5,
    description: 'Floor 4 - Camera Exits Facade to Exterior'
  },

  // =============================================================
  // PHASE 5: TRANSITION FROM FLOOR 4 TO FLOOR 3 (0.47 - 0.53)
  // =============================================================
  {
    progress: 0.50,
    floor: 4,
    position: [0.0, 15.2, 10.5], // Safe vertical travel outside facade fins (Z=10.5m)
    target: [0.0, 13.5, 0.0],
    fov: 44,
    description: 'Facade Transition - Downward to Floor 3'
  },
  {
    progress: 0.53,
    floor: 3,
    position: [0.0, 13.5, 9.8], // Approach Floor 3 Facade Entrance
    target: [0.0, 13.0, 0.0],
    fov: 44,
    doorOpenProgress: 0.3,
    description: 'Floor 3 - Approaching Facade Entrance'
  },

  // =============================================================
  // PHASE 6: FLOOR 3 — MEETING & COLLABORATION HUB (0.53 - 0.64)
  // =============================================================
  {
    progress: 0.56,
    floor: 3,
    position: [0.0, 13.5, 4.5], // Camera enters Glass Boardroom
    target: [0.0, 13.2, 0.5],
    fov: 42,
    doorOpenProgress: 1.0,
    description: 'Floor 3 - Inside Glass Boardroom Suite'
  },
  {
    progress: 0.60,
    floor: 3,
    position: [-1.5, 13.4, 2.5], // Smart Display Wall Focus
    target: [-5.5, 13.4, 0.0],
    fov: 38,
    doorOpenProgress: 1.0,
    description: 'Floor 3 - Interactive Telepresence Screen'
  },
  {
    progress: 0.64,
    floor: 3,
    position: [0.0, 13.5, 9.8], // Camera exits Floor 3 facade (Z=9.8m)
    target: [0.0, 13.0, 0.0],
    fov: 44,
    doorOpenProgress: 0.5,
    description: 'Floor 3 - Camera Exits Facade to Exterior'
  },

  // =============================================================
  // PHASE 7: TRANSITION FROM FLOOR 3 TO FLOOR 2 (0.64 - 0.70)
  // =============================================================
  {
    progress: 0.67,
    floor: 3,
    position: [0.0, 11.2, 10.5], // Safe vertical travel outside facade fins (Z=10.5m)
    target: [0.0, 9.5, 0.0],
    fov: 44,
    description: 'Facade Transition - Downward to Floor 2'
  },
  {
    progress: 0.70,
    floor: 2,
    position: [0.0, 9.5, 9.8], // Approach Floor 2 Facade Entrance
    target: [0.0, 9.0, 0.0],
    fov: 44,
    doorOpenProgress: 0.3,
    description: 'Floor 2 - Approaching Facade Entrance'
  },

  // =============================================================
  // PHASE 8: FLOOR 2 — OPEN EMPLOYEE WORKSPACE (0.70 - 0.79)
  // =============================================================
  {
    progress: 0.73,
    floor: 2,
    position: [0.0, 9.5, 4.5], // Camera enters Floor 2 Workspace
    target: [1.0, 9.2, 1.0],
    fov: 42,
    doorOpenProgress: 1.0,
    description: 'Floor 2 - Workstation Clusters & Task Lighting'
  },
  {
    progress: 0.76,
    floor: 2,
    position: [-2.0, 9.4, 2.5], // Coffee Nook Focus
    target: [-6.0, 9.4, -3.5],
    fov: 38,
    doorOpenProgress: 1.0,
    description: 'Floor 2 - Coffee Bar & Printing Hub'
  },
  {
    progress: 0.79,
    floor: 2,
    position: [0.0, 9.5, 9.8], // Camera exits Floor 2 facade (Z=9.8m)
    target: [0.0, 9.0, 0.0],
    fov: 44,
    doorOpenProgress: 0.5,
    description: 'Floor 2 - Camera Exits Facade to Exterior'
  },

  // =============================================================
  // PHASE 9: TRANSITION FROM FLOOR 2 TO FLOOR 1 (0.79 - 0.85)
  // =============================================================
  {
    progress: 0.82,
    floor: 2,
    position: [0.0, 7.2, 10.5], // Safe vertical travel outside facade fins (Z=10.5m)
    target: [0.0, 5.5, 0.0],
    fov: 44,
    description: 'Facade Transition - Downward to Floor 1'
  },

  // =============================================================
  // PHASE 10: FLOOR 1 — WELLNESS & BREAKOUT FLOOR (0.85 - 0.92)
  // =============================================================
  {
    progress: 0.85,
    floor: 1,
    position: [0.0, 5.5, 4.5], // Camera enters Floor 1 Artisanal Bar
    target: [-3.8, 5.2, 2.0],
    fov: 42,
    doorOpenProgress: 1.0,
    description: 'Floor 1 - Artisanal Espresso Bar & Botanical Lounge'
  },
  {
    progress: 0.89,
    floor: 1,
    position: [1.5, 5.4, 2.5], // Ping-Pong & Library Nook Focus
    target: [3.5, 5.3, -1.5],
    fov: 38,
    doorOpenProgress: 1.0,
    description: 'Floor 1 - Ping-Pong Table & Library'
  },

  // =============================================================
  // PHASE 11: FLOOR 00 — HEADQUARTERS GRAND LOBBY (0.92 - 0.97)
  // =============================================================
  {
    progress: 0.92,
    floor: 0,
    position: [0.0, 3.5, 9.8], // Ground Lobby Entrance Approach (Z=9.8m)
    target: [0.0, 3.0, 0.0],
    fov: 44,
    doorOpenProgress: 0.5,
    description: 'Ground Floor - Approaching Grand Lobby Entrance'
  },
  {
    progress: 0.945,
    floor: 0,
    position: [0.0, 2.0, 5.5], // Atrium & Backlit Logo Crest Wall
    target: [0.0, 2.8, -4.8],
    fov: 44,
    doorOpenProgress: 1.0,
    description: 'Ground Floor - Calacatta Atrium & Backlit Logo Wall'
  },
  {
    progress: 0.97,
    floor: 0,
    position: [2.5, 2.0, 2.0], // Visitor Waiting Lounge & Security Turnstiles Focus
    target: [-2.0, 2.5, -1.0],
    fov: 42,
    doorOpenProgress: 1.0,
    description: 'Ground Floor - Visitor Waiting Lounge & Security Turnstiles'
  },

  // =============================================================
  // PHASE 12: GRAND EXTERNAL HEADQUARTERS REVEAL (0.97 - 1.00)
  // =============================================================
  {
    progress: 0.985,
    floor: 0,
    position: [0.0, 8.0, 18.0], // Camera pulls back through Entrance Plaza Canopy
    target: [0.0, 12.0, 0.0],
    fov: 50,
    description: 'Final Reveal - Exiting Entrance Canopy'
  },
  {
    progress: 1.00,
    floor: 0,
    position: [0.0, 22.0, 42.0], // Full Illuminated 6-Floor Headquarters View
    target: [0.0, 14.0, 0.0],
    fov: 54,
    description: 'Final Reveal - Full Illuminated Headquarters View'
  }
];

/**
 * Interpolate camera position, lookAt target, and FOV smoothly from normalized progress [0 - 1]
 */
export function getCameraStateAtProgress(progress: number): {
  position: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
  activeFloor: number;
  doorOpenProgress: number;
  elevatorDoorOpen: boolean;
} {
  const clampedProgress = THREE.MathUtils.clamp(progress, 0, 1);

  // Find bounding keyframe indices
  let index = 0;
  while (index < CAMERA_WAYPOINTS.length - 1 && CAMERA_WAYPOINTS[index + 1].progress <= clampedProgress) {
    index++;
  }

  if (index >= CAMERA_WAYPOINTS.length - 1) {
    const wp = CAMERA_WAYPOINTS[CAMERA_WAYPOINTS.length - 1];
    return {
      position: new THREE.Vector3(...wp.position),
      target: new THREE.Vector3(...wp.target),
      fov: wp.fov,
      activeFloor: wp.floor,
      doorOpenProgress: wp.doorOpenProgress ?? 0,
      elevatorDoorOpen: wp.elevatorDoorOpen ?? false
    };
  }

  const wpCurrent = CAMERA_WAYPOINTS[index];
  const wpNext = CAMERA_WAYPOINTS[index + 1];

  const factor = (clampedProgress - wpCurrent.progress) / (wpNext.progress - wpCurrent.progress);
  // Smooth cubic easing (easeInOutQuad) to prevent camera velocity spikes
  const smoothFactor = factor < 0.5 ? 2 * factor * factor : 1 - Math.pow(-2 * factor + 2, 2) / 2;

  const posCurr = new THREE.Vector3(...wpCurrent.position);
  const posNext = new THREE.Vector3(...wpNext.position);
  const posInterp = new THREE.Vector3().lerpVectors(posCurr, posNext, smoothFactor);

  const tgtCurr = new THREE.Vector3(...wpCurrent.target);
  const tgtNext = new THREE.Vector3(...wpNext.target);
  const tgtInterp = new THREE.Vector3().lerpVectors(tgtCurr, tgtNext, smoothFactor);

  const fovInterp = THREE.MathUtils.lerp(wpCurrent.fov, wpNext.fov, smoothFactor);
  const doorInterp = THREE.MathUtils.lerp(wpCurrent.doorOpenProgress ?? 0, wpNext.doorOpenProgress ?? 0, smoothFactor);

  return {
    position: posInterp,
    target: tgtInterp,
    fov: fovInterp,
    activeFloor: wpCurrent.floor,
    doorOpenProgress: doorInterp,
    elevatorDoorOpen: wpCurrent.elevatorDoorOpen || wpNext.elevatorDoorOpen || false
  };
}
