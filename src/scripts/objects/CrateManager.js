import * as THREE from 'three';
import Constants from '../constants.js';

export class CrateManager {
  constructor(woodMaterial) {
    this.crates = [];
    this.cratesContainer = new THREE.Object3D();
    this.woodMaterial = woodMaterial;
  }

  init() {
    for (let crateId = 0; crateId < Constants.nbCrates; crateId++) {
      const crate = this.createCrate(crateId);
      this.cratesContainer.add(crate);
    }
    this.cratesContainer.position.z = -(110 - (110 * Constants.nbCrates)) / 2;
  }

  createCrate(id) {
    var boxBottom;
    var boxLeft;
    var boxRight;
    var boxBack;
    var boxFront;

    let crates = this.crates;
    let woodMaterial = this.woodMaterial;

    crates[id] = new THREE.Object3D();

    boxBottom = new THREE.Mesh(new THREE.BoxGeometry(200, 10, 100), woodMaterial);
    crates[id].add(boxBottom);

    boxLeft = new THREE.Mesh(new THREE.BoxGeometry(200, 10, 80), woodMaterial);
    boxLeft.position.set(0, 35, -55);
    boxLeft.rotation.x = Math.PI / 2;
    crates[id].add(boxLeft);

    if (id === 0) {
    boxRight = new THREE.Mesh(new THREE.BoxGeometry(200, 10, 80), woodMaterial);
    boxRight.position.set(0, 35, 55);
    boxRight.rotation.x = Math.PI / 2;
    crates[id].add(boxRight);
    }

    boxBack = new THREE.Mesh(new THREE.BoxGeometry(80, 10, 120), woodMaterial);
    boxBack.position.set(-105, 35, 0);
    boxBack.rotation.z = Math.PI / 2;
    crates[id].add(boxBack);

    boxFront = new THREE.Mesh(new THREE.BoxGeometry(40, 10, 100), woodMaterial);
    boxFront.position.set(95, 25, 0);
    boxFront.rotation.z = Math.PI / 2;
    crates[id].add(boxFront);

    crates[id].position.z = -110 * id;
    return crates[id];
  }

  getCrates() {
    return this.crates;
  }

  getContainer() {
    return this.cratesContainer;
  }
}