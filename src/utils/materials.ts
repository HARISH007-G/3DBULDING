import * as THREE from 'three';
import {
  createBlackGoldMarbleTexture,
  createCalacattaMarbleTexture,
  createCarbonFiberTexture,
  createCodeScreenTexture,
  createChartScreenTexture,
  createCarpetTexture
} from './proceduralTextures';

// Helper function to safely load image textures from /public/textures/ with repeat wrapping
const textureLoader = new THREE.TextureLoader();

function loadSafeTexture(url: string, repeatX = 4, repeatY = 4, fallbackTexture: THREE.Texture, isColor = true): THREE.Texture {
  try {
    const tex = textureLoader.load(
      url,
      (loadedTex) => {
        loadedTex.wrapS = THREE.RepeatWrapping;
        loadedTex.wrapT = THREE.RepeatWrapping;
        loadedTex.repeat.set(repeatX, repeatY);
        loadedTex.anisotropy = 8;
        loadedTex.colorSpace = isColor ? THREE.SRGBColorSpace : THREE.NoColorSpace;
        loadedTex.generateMipmaps = true;
        loadedTex.minFilter = THREE.LinearMipmapLinearFilter;
        loadedTex.magFilter = THREE.LinearFilter;
        loadedTex.needsUpdate = true;
      },
      undefined,
      () => {
        console.warn(`[TextureLoader] Using fallback for ${url}`);
      }
    );
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
    tex.anisotropy = 8;
    tex.colorSpace = isColor ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    return tex;
  } catch {
    return fallbackTexture;
  }
}

// Fallback procedural textures
const procBlackGold = createBlackGoldMarbleTexture();
const procCalacatta = createCalacattaMarbleTexture();
const procCarbon = createCarbonFiberTexture();
const procDarkCarpet = createCarpetTexture('#212529');
const procAcousticCarpet = createCarpetTexture('#3A3F47');

// Master High-Resolution PBR Texture Maps (loaded from /public/textures/)
export const TEXTURES = {
  // Existing baseline textures
  blackGoldMarble: loadSafeTexture('/textures/floor6_marble.jpg', 4, 4, procBlackGold),
  walnutWood: loadSafeTexture('/textures/floor6_walnut.jpg', 3, 3, procBlackGold),
  carbonFiber: loadSafeTexture('/textures/floor5_carbon.jpg', 6, 6, procCarbon),
  slateMetal: loadSafeTexture('/textures/floor5_metal.jpg', 4, 4, procCarbon),
  studioConcrete: loadSafeTexture('/textures/floor4_concrete.jpg', 4, 4, procBlackGold),
  acousticCarpet: loadSafeTexture('/textures/floor3_carpet.jpg', 4, 4, procAcousticCarpet),
  darkCarpet: loadSafeTexture('/textures/floor2_darkcarpet.jpg', 4, 4, procDarkCarpet),
  bambooTimber: loadSafeTexture('/textures/floor1_bamboo.jpg', 4, 4, procBlackGold),
  calacattaMarble: loadSafeTexture('/textures/floor0_calacatta.jpg', 4, 4, procCalacatta),
  darkStone: loadSafeTexture('/textures/floor0_darkstone.jpg', 4, 4, procBlackGold),
  facadeMetal: loadSafeTexture('/textures/building_facade.jpg', 4, 10, procCarbon),
  
  // High-End Poly Haven & ambientCG PBR Textures
  ceilingAcoustic: loadSafeTexture('/textures/ceiling_acoustic_tiles.jpg', 8, 6, procAcousticCarpet),
  ceilingMetalGrid: loadSafeTexture('/textures/ceiling_metal_grid.jpg', 8, 6, procCarbon),
  wallWhitePlaster: loadSafeTexture('/textures/wall_white_plaster.jpg', 4, 3, procCalacatta),
  wallGreyPlaster: loadSafeTexture('/textures/wall_grey_plaster.jpg', 4, 3, procDarkCarpet),
  wallPaintedPlaster: loadSafeTexture('/textures/wall_painted_plaster.jpg', 4, 3, procCalacatta),
  wallConcreteAccent: loadSafeTexture('/textures/wall_concrete_accent.jpg', 3, 2, procCarbon),
  floorWood: loadSafeTexture('/textures/floor_wood.jpg', 4, 4, procBlackGold),
  floorOakWood: loadSafeTexture('/textures/floor_oak_wood.jpg', 4, 4, procBlackGold),
  floorMarble: loadSafeTexture('/textures/floor_marble.jpg', 4, 4, procCalacatta),
  floorMarbleTiles: loadSafeTexture('/textures/floor_marble_tiles.jpg', 4, 4, procCalacatta),
  floorTiles: loadSafeTexture('/textures/floor_tiles.jpg', 5, 5, procAcousticCarpet),
  floorCarpet: loadSafeTexture('/textures/floor_carpet.jpg', 6, 6, procDarkCarpet),

  codeScreen: createCodeScreenTexture(),
  chartScreen: createChartScreenTexture()
};

// PBR Roughness Maps (matched to color maps for authentic surface micro-roughness)
export const ROUGHNESS_MAPS = {
  ceilingAcoustic: loadSafeTexture('/textures/ceiling_acoustic_tiles_rough.jpg', 8, 6, procAcousticCarpet, false),
  ceilingMetalGrid: loadSafeTexture('/textures/ceiling_metal_grid_rough.jpg', 8, 6, procCarbon, false),
  wallWhitePlaster: loadSafeTexture('/textures/wall_white_plaster_rough.jpg', 4, 3, procCalacatta, false),
  wallGreyPlaster: loadSafeTexture('/textures/wall_grey_plaster_rough.jpg', 4, 3, procDarkCarpet, false),
  wallPaintedPlaster: loadSafeTexture('/textures/wall_painted_plaster_rough.jpg', 4, 3, procCalacatta, false),
  wallConcreteAccent: loadSafeTexture('/textures/wall_concrete_accent_rough.jpg', 3, 2, procCarbon, false),
  floorWood: loadSafeTexture('/textures/floor_wood_rough.jpg', 4, 4, procBlackGold, false),
  floorOakWood: loadSafeTexture('/textures/floor_oak_wood_rough.jpg', 4, 4, procBlackGold, false),
  floorMarble: loadSafeTexture('/textures/floor_marble_rough.jpg', 4, 4, procCalacatta, false),
  floorMarbleTiles: loadSafeTexture('/textures/floor_marble_tiles_rough.jpg', 4, 4, procCalacatta, false),
  floorTiles: loadSafeTexture('/textures/floor_tiles_rough.jpg', 5, 5, procAcousticCarpet, false),
  floorCarpet: loadSafeTexture('/textures/floor_carpet_rough.jpg', 6, 6, procDarkCarpet, false)
};

// Color Palette Constants per Floor
export const FLOOR_PALETTES = {
  6: {
    name: 'Executive Suite',
    primary: '#D4AF37', // Luxury Gold
    accent: '#B8860B',  // Dark Gold
    wood: '#2B1B17',    // Dark Walnut Wood
    marble: '#121212',  // Polished Black Marble
    glass: '#1A2332',   // Smoked Glass
    metal: '#D4AF37',   // Gold Metal
    glow: '#FFD700'
  },
  5: {
    name: 'Technology & Engineering',
    primary: '#00F0FF', // Electric Cyan
    accent: '#0055FF',  // Neon Blue
    steel: '#1E222A',   // Dark Steel
    carbon: '#15181C',  // Carbon Fiber
    glass: '#002B36',   // Cyan Glass
    metal: '#00F0FF',   // Cyan Metal
    glow: '#00F0FF'
  },
  4: {
    name: 'Creative & Design Studio',
    primary: '#8A2BE2', // Deep Violet
    accent: '#FF5500',  // Sunset Orange
    white: '#F5F5F7',   // Crisp White
    brass: '#C5A059',   // Brushed Brass
    glass: '#2A1B3D',   // Violet Tinted Glass
    metal: '#FF5500',   // Orange Accent Metal
    glow: '#FF5500'
  },
  3: {
    name: 'Meeting & Collaboration Hub',
    primary: '#0F52BA', // Sapphire Blue
    accent: '#00C853',  // Emerald Accent
    glass: '#E8ECEF',   // Frosted Glass
    chrome: '#E0E0E0',  // Silver Chrome
    acoustic: '#3A3F47',// Acoustic Grey
    metal: '#0F52BA',   // Blue Anodized Aluminum
    glow: '#4169E1'
  },
  2: {
    name: 'Open Employee Workspace',
    primary: '#00C853', // Fresh Emerald Green
    accent: '#00E676',  // Bright Green
    oak: '#5C4033',     // Warm Oak Wood
    charcoal: '#212529',// Neutral Charcoal
    glass: '#1C2826',   // Forest Tinted Glass
    metal: '#00C853',   // Emerald Anodized Steel
    glow: '#00E676'
  },
  1: {
    name: 'Wellness & Breakout Floor',
    primary: '#FFBF00', // Warm Amber
    accent: '#E2725B',  // Terracotta
    bamboo: '#D4B595',  // Natural Bamboo
    foliage: '#2E8B57', // Terrarium Greenery
    glass: '#2E261D',   // Amber Tinted Glass
    metal: '#E2725B',   // Warm Copper Metal
    glow: '#FFA500'
  },
  0: {
    name: 'Grand Reception Lobby',
    primary: '#FFD700', // Calacatta Gold
    accent: '#FFFFFF',  // Crisp White
    marble: '#F8F9FA',  // White Calacatta Marble
    goldTrim: '#D4AF37',// Polished Gold Trim
    glass: '#EBF4F6',   // Ultra Clear Architectural Glass
    metal: '#D4AF37',   // Gold Architectural Finishes
    glow: '#FFF8DC'
  }
};

// Ultra-Clear Facade Glass Material (Physical material with realistic transmission, IOR 1.5)
export const GLASS_FACADE_MATERIAL = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#A2C4D8'),
  transparent: true,
  opacity: 0.15,
  roughness: 0.04,
  metalness: 0.05,
  transmission: 0.88,
  ior: 1.5,
  thickness: 0.04,
  depthWrite: false,
  side: THREE.DoubleSide
});

// Architectural Physical Transmission Glass Creator for Realistic Office Doors
export function createArchitecturalGlass(options: {
  color: string;
  roughness?: number;
  opacity?: number;
  transmission?: number;
  ior?: number;
  thickness?: number;
}) {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(options.color),
    transparent: true,
    opacity: options.opacity ?? 0.18,
    roughness: options.roughness ?? 0.04,
    metalness: 0.05,
    transmission: options.transmission ?? 0.9,
    ior: options.ior ?? 1.5,
    thickness: options.thickness ?? 0.03,
    depthWrite: false,
    side: THREE.DoubleSide
  });
}

// Floor-by-Floor Door Glass Materials (Custom tuned tint & transmission per floor)
export const FLOOR_GLASS_MATERIALS: Record<number, THREE.Material> = {
  6: createArchitecturalGlass({ color: '#2A2E39', roughness: 0.03, opacity: 0.25, transmission: 0.82 }), // Smoked Executive Glass
  5: createArchitecturalGlass({ color: '#E0F2FE', roughness: 0.04, opacity: 0.14, transmission: 0.92 }), // Cool Tech Tint
  4: createArchitecturalGlass({ color: '#FFFFFF', roughness: 0.03, opacity: 0.12, transmission: 0.95 }), // Studio Clear
  3: createArchitecturalGlass({ color: '#F1F5F9', roughness: 0.28, opacity: 0.32, transmission: 0.72 }), // Frosted Meeting Glass
  2: createArchitecturalGlass({ color: '#FFFFFF', roughness: 0.02, opacity: 0.12, transmission: 0.95 }), // Bright Workspace Glass
  1: createArchitecturalGlass({ color: '#FFFBEB', roughness: 0.05, opacity: 0.15, transmission: 0.90 }), // Warm Wellness Glass
  0: createArchitecturalGlass({ color: '#FFFFFF', roughness: 0.01, opacity: 0.10, transmission: 0.96 })  // Crystal Reception Glass
};

export const SMOKED_GLASS_MATERIAL = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#1A2332'),
  transparent: true,
  opacity: 0.25,
  roughness: 0.12,
  metalness: 0.1,
  transmission: 0.80,
  ior: 1.5,
  thickness: 0.03,
  depthWrite: false,
  side: THREE.DoubleSide
});

export const DARK_CONCRETE_SLAB_MATERIAL = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#181A1F'),
  roughness: 0.7,
  metalness: 0.2
});

export const ALUMINUM_FIN_MATERIAL = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#2C3038'),
  roughness: 0.2,
  metalness: 0.85
});

export const GOLD_TRIM_MATERIAL = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#D4AF37'),
  roughness: 0.2,
  metalness: 0.9
});

export const CHROME_MATERIAL = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#E0E0E0'),
  roughness: 0.1,
  metalness: 0.95
});

export const EMISSIVE_SCREEN_MATERIAL = (colorHex: string) => new THREE.MeshStandardMaterial({
  color: new THREE.Color(colorHex),
  emissive: new THREE.Color(colorHex),
  emissiveIntensity: 1.8,
  roughness: 0.2,
  metalness: 0.5
});
