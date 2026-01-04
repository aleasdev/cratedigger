import * as THREE from 'three';

export function createWoodMaterial(renderer, textureUrl) {
  const woodTexture = new THREE.TextureLoader().load(textureUrl);
  woodTexture.colorSpace = THREE.NoColorSpace;
  woodTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  
  return new THREE.MeshLambertMaterial({
    map: woodTexture,
  });
}