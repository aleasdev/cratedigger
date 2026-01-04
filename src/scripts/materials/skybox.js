import * as THREE from 'three';

export function createSkybox(filename) {
  // Helper function to create path strings for all 6 sides
  function createPathStrings(filename) {
    const basePath = "../images/skybox/"; // Adjust this to your path
    const baseFilename = basePath + filename;
    const fileType = ".jpg"; // or .jpg depending on your images
    const sides = ["ft", "bk", "up", "dn", "rt", "lf"];
    
    const pathStrings = sides.map(side => {
      return baseFilename + "_" + side + fileType;
    });
    // console.log("Skybox paths:", pathStrings); // DEBUG
    return pathStrings;
  }
  
  // Helper function to create material array from images
  function createMaterialArray(filename) {
    const skyboxImagePaths = createPathStrings(filename);
    const materialArray = skyboxImagePaths.map((image, index) => {
      let texture = new THREE.TextureLoader().load(
        image,
        // onLoad callback
        (tex) => {
          // console.log(`Loaded texture ${index}: ${image}`);
        },
        // onProgress callback
        undefined,
        // onError callback
        (err) => {
          console.error(`Failed to load texture ${index}: ${image}`, err);
        }
      );
      
      // BackSide is CRITICAL - it renders the inside of the cube
      return new THREE.MeshBasicMaterial({ 
        map: texture, 
        side: THREE.BackSide 
      });
    });
    
    return materialArray;
  }
  
  return createMaterialArray(filename);
}