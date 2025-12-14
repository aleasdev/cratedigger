import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

import Constants from './constants.js';

let camera;
let target;
let cameraTween;
let targetTween;

function updateFOV() {
  if (camera && camera.focalLength && camera.frameSize) {
    camera.fov = 2 * Math.atan(camera.frameSize / (2 * camera.focalLength)) * (180 / Math.PI);
    camera.updateProjectionMatrix();
  }
}

function init(ratio) {
  camera = new THREE.PerspectiveCamera(45, ratio, 0.1, 20000);
  camera.focalLength = 45;
  camera.frameSize = 32;
  // camera.setLens(camera.focalLength, camera.frameSize);
  updateFOV();

  target = new THREE.Object3D();
  camera.lookAt(target.position);

  cameraTween = new TWEEN.Tween();
  targetTween = new TWEEN.Tween();
}

function focusRecord(recordXPos, recordAbsolutePos) {
  cameraTween.stop();
  targetTween.stop();

  targetTween = new TWEEN.Tween(target.position)
    .to({
      x: recordXPos,
      y: 50 + Constants.scene.recordShownY,
      z: recordAbsolutePos.z,
    }, Constants.scene.cameraMoveTime)
    .easing(TWEEN.Easing.Quartic.Out).start();

  cameraTween = new TWEEN.Tween(camera.position)
    .to({
      x: recordXPos + Constants.scene.cameraFocusPosition.x,
      y: Constants.scene.cameraFocusPosition.y,
      z: recordAbsolutePos.z + Constants.scene.cameraFocusPosition.z,
    }, Constants.scene.cameraMoveTime)
    .easing(TWEEN.Easing.Quartic.Out).start();
}

function zoomInRecord(recordXPos, recordAbsolutePos) {
  cameraTween.stop();
  targetTween.stop();

  targetTween = new TWEEN.Tween(target.position)
    .to({
      x: recordXPos,
      y: Constants.scene.recordFlippedY + 50,
      z: recordAbsolutePos.z,
    }, Constants.scene.infoOpenTime)
    .easing(TWEEN.Easing.Quartic.Out).start();

  cameraTween = new TWEEN.Tween(camera.position)
    .to({
      x: recordXPos + Constants.scene.cameraFocusPosition.x + 80,
      y: Constants.scene.cameraFocusPosition.y - 50,
    }, Constants.scene.cameraMoveTime)
    .easing(TWEEN.Easing.Quartic.Out).start();
}

function zoomOutRecord(recordXPos, recordAbsolutePos) {

  cameraTween.stop();
  targetTween.stop();

  targetTween = new TWEEN.Tween(target.position)
    .delay(Constants.scene.infoOpenTime / 2)
    .to({
      x: recordXPos,
      y: 75,
      z: recordAbsolutePos.z,
    }, Constants.scene.infoOpenTime)
    .easing(TWEEN.Easing.Quartic.Out).start();

  cameraTween = new TWEEN.Tween(camera.position)
    .to({
      x: recordXPos + Constants.scene.cameraFocusPosition.x,
      y: Constants.scene.cameraFocusPosition.y,
    }, Constants.scene.cameraMoveTime)
    .easing(TWEEN.Easing.Quartic.Out).start();
}

function resetCamera() {

  cameraTween.stop();
  targetTween.stop();

  targetTween = new TWEEN.Tween(target.position)
    .to({
      x: Constants.scene.targetBasePosition.x,
      y: Constants.scene.targetBasePosition.y,
      z: Constants.scene.targetBasePosition.z,
    }, Constants.scene.cameraMoveTime)
    .easing(TWEEN.Easing.Quartic.Out).start();

  cameraTween = new TWEEN.Tween(camera.position)
    .to({
      x: Constants.scene.cameraBasePosition.x,
      y: Constants.scene.cameraBasePosition.y,
      z: Constants.scene.cameraBasePosition.z,
    }, Constants.scene.cameraMoveTime)
    .easing(TWEEN.Easing.Quartic.Out).start();
}

function updateCameraAspect(ratio) {
  camera.aspect = ratio;
  camera.updateProjectionMatrix();
}

function lookAtTarget() {
  camera.lookAt(target.position);
}

// Helper to expose manual update if needed by cratedigger.js (it was using camera.setLens logic indirectly)
// In cratedigger.js: updateCamera() calls camera.setLens. We should update cratedigger.js to call simple updateFOV logic or expose it here.
// But cratedigger.js accesses camera.focalLength directly and calls updateCamera().
// It would be better if cameraManager exposed a method to update lens.

function setLens(focalLength, frameSize) {
  camera.focalLength = focalLength;
  if (frameSize !== undefined) camera.frameSize = frameSize;
  updateFOV();
}

export default {
  init,
  focusRecord,
  zoomInRecord,
  zoomOutRecord,
  resetCamera,
  updateCameraAspect,
  lookAtTarget,
  setLens, // Exposed for external control

  getCamera: function () {
    return camera;
  },

  getTarget: function () {
    return target;
  },
}
