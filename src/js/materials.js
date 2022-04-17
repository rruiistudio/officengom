import * as THREE from 'three'
import RGBELoader from 'three/examples/jsm/loaders/GLTFLoader.js'
var transparentMaterial

export default transparentMaterial = new THREE.MeshPhongMaterial({
    shininess: 100,
    color: 0xffffff,
    specular: 0xffffff,
    transparent: true,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

export var normalMaterial = new THREE.MeshNormalMaterial; 

/*
var hdri = new THREE.RGBELoader().load(
    "src/images/hdri/snow_field_4k.exr",  
    () => { 
      hdrEquirect.mapping = THREE.EquirectangularReflectionMapping; 
    }
  );
*/
export var glass = new THREE.MeshPhysicalMaterial({  
    roughness: 0.8,  
    color: 0x000000,
    transmission: 0.8, // Add transparency
    transparent: true,
    wireframe: true,
  });