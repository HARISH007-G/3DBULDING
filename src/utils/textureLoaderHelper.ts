import * as THREE from 'three';

export interface TextureMapping {
  floor6_marble: string;
  floor6_walnut: string;
  floor5_carbon: string;
  floor5_metal: string;
  floor4_concrete: string;
  floor3_carpet: string;
  floor2_darkcarpet: string;
  floor1_bamboo: string;
  floor0_calacatta: string;
  floor0_darkstone: string;
  building_facade: string;
}

export const TEXTURE_PATHS = {
  floor6_marble: '/textures/floor6_marble.jpg',
  floor6_walnut: '/textures/floor6_walnut.jpg',
  floor5_carbon: '/textures/floor5_carbon.jpg',
  floor5_metal: '/textures/floor5_metal.jpg',
  floor4_concrete: '/textures/floor4_concrete.jpg',
  floor3_carpet: '/textures/floor3_carpet.jpg',
  floor2_darkcarpet: '/textures/floor2_darkcarpet.jpg',
  floor1_bamboo: '/textures/floor1_bamboo.jpg',
  floor0_calacatta: '/textures/floor0_calacatta.jpg',
  floor0_darkstone: '/textures/floor0_darkstone.jpg',
  building_facade: '/textures/building_facade.jpg'
};

/**
 * Custom Texture Applicator: Configures repeat wrapping & anisotropy for crisp WebGL rendering.
 */
export function applyTextureProps(texture: THREE.Texture, repeatX = 4, repeatY = 4) {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.anisotropy = 16;
  return texture;
}
