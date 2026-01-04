import * as THREE from 'three';
import Constants from '../constants.js';

export function getRecordMaterial(src, hasSleeve) {
    var img = new Image();
  var imgWidth = 400;
  var imgHeight = 400;
  var mapCanvas = document.createElement('canvas');
  var texture = new THREE.Texture(mapCanvas);
  var sleeve;
  var sleeveMaterial;
  var materials;

  img.crossOrigin = 'Anonymous';
  img.src = src ? src : '';

  mapCanvas.width = mapCanvas.height = 400;
  texture.minFilter = THREE.LinearFilter;

  img.onload = function () {
    var ctx;

    if (hasSleeve) {
      sleeve = new Image();
      sleeve.src = Constants.sleeveMaskTexture;

      sleeve.onload = function () {
        ctx = mapCanvas.getContext('2d');
        ctx.translate(imgWidth / 2, imgHeight / 2);
        ctx.rotate(Math.PI / 2);
        ctx.translate(-imgWidth / 2, -imgHeight / 2);
        ctx.drawImage(img, 130, 130, 135, 135);
        ctx.drawImage(sleeve, 0, 0, 400, 400);
        texture.needsUpdate = true;
      };
    } else {
      ctx = mapCanvas.getContext('2d');
      ctx.translate(imgWidth / 2, imgHeight / 2);
      ctx.rotate(Math.PI / 2);
      ctx.translate(-imgWidth / 2, -imgHeight / 2);
      ctx.drawImage(img, 0, 0, 400, 400);
      texture.needsUpdate = true;
    }
  };

  sleeveMaterial = new THREE.MeshLambertMaterial({
    color: Constants.sleeveColor,
  });

  materials = [
    sleeveMaterial,
    sleeveMaterial,
    sleeveMaterial,

    // texture
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: texture,
    }),
    sleeveMaterial,
    sleeveMaterial,
  ];

  return materials;
}