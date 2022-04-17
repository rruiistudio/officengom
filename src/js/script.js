// modules imports
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { TextureLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';
import darkMode from './uicontrols'
import * as MAT from './materials'

import addModels from './geometries'
global.THREE = THREE;

let scene, camera, renderer, controls

let updateBG = new THREE.Color(0x131218)
let initBG = new THREE.Color(0xFFFFFF)

const gltfLoader = new GLTFLoader()
//const animMixer = new AnimationMixer()

const clock = new THREE.Clock();
var update


// ADD 3D MODELS & ANIMATIONS 

var modelPath = 'src/animations/button.glb'
var blob
var value = 0.1

var obj_button
var animation

let mixer

//SEQUENCE FUNCTIONS
init();
animate();
//addModels(gltfLoader, modelPath, mixer, scene)


//EVENT LISTENERS

//interactive window resize
window.addEventListener('resize', onWindowResize, false);

//global document interaction
//document.addEventListener('wheel', onDocumentScrollMove)


function init() {
	createScene()
	createLights()
	blob = createBlobs(blob, MAT.glass, scene)
}

//console.log(obj_button + 'hello')

//------------------------------------------------------
document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
	mouseX = (event.clientX - windowHalfX)
	mouseY = (event.clientY - windowHalfY)

	mouseOrbit(blob, mouseX, mouseY, 0.15)
	mouseOrbit(obj_button, mouseX, mouseY, 0.15)
}


function onDocumentScrollMove(event) {
	//console.log('this has been scrolled')

	if (event.deltaY > 0) {
		blob.scale.x += 0.2;
		console.log(event.deltaY)
	}

	else {
		blob.scale.x -= 0.2;
		console.log(event.deltaY)
	}

}

// GEOMETRIES

import { createBlobs } from './geometries'


// FONT 

/*
const createText = require('three-bmfont-text')
var MSDFShader = require('./msdf')

import font from '../font/roboto.json'
import fontTexture from '../font/roboto.png'

new THREE.TextureLoader().load(fontTexture)


function createGlyph () {

	var geom = createText({
	  text: 'Hello',
	  font: font,
	  align: 'center',
	  flipY: fontTexture.flipY
	})

	var material = new THREE.RawShaderMaterial(MSDFShader({
	  map: fontTexture,
	  color: 0x4000FF
	}))

	var layout = geom.layout
	var text = new THREE.Mesh(geom, material)
	text.position.set(0, -layout.descender + layout.height, 0)
	text.scale.set(50, 50, 50)

	var textAnchor = new THREE.Object3D()
	textAnchor.add(text)
	scene.add(textAnchor)
  }

  createGlyph()
*/

// ANIMATIONS

import { constantRotation, mouseOrbit } from './animations'

import { updateBlob } from './geometries'

function animate() {
	requestAnimationFrame(animate);
	updateBlob(blob, value);

	var delta = clock.getDelta();
	if (mixer) mixer.update(delta);
	//console.log(mixer)

	renderer.render(scene, camera);
};

//UTILITY FUNCTIONS

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}


function createScene() {
	const canvas = document.getElementById('threescene');
	scene = new THREE.Scene();
	scene.background = initBG
	darkMode(scene, updateBG, initBG)

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	renderer = new THREE.WebGLRenderer({ canvas });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	camera.position.set(0, 1, 4)
	controls.update();

}

function createLights() {
	var ambientlight = new THREE.AmbientLight(0xFFFFFF, 0.5)
	var d_light = new THREE.DirectionalLight(0xEE8E8E, 0.5); // directional light
	const p_lightA = new THREE.PointLight(0xFFC300, 1.2, 100);
	const p_lightB = new THREE.PointLight(0xF6732B, 1, 100);
	p_lightA.position.set(0, 15, 50);
	p_lightB.position.set(15, 0, 15);
	//scene.add(p_lightA);
	//scene.add(p_lightB);
	scene.add(ambientlight);
	scene.add(d_light);
}


import handleText from './textanimations'

window.addEventListener('load', handleText)

