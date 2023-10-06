import * as THREE from "three";

// you can mode an object with the object position in three direction X Y and Z
// mostly X will move left and right Y will move an object up and down and Z will move in object back and forward
// Note: position can also depend where your VOF(view of reference) is

// With valued you can see we are using number like 1 1 1 in geometry you can think of one as vector like inch feet km
// depending upon your use case

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.x = 0.7;
mesh.position.y = -0.7;
mesh.position.z = 0.5;

// This will give you the distance from the center of the scene to our object
console.log(mesh.position.length());

//normalize will set the obj length to 1
mesh.position.normalize();
console.log(mesh.position.length());

// You can also set the position of the obj by using a set function in X Y and Z order
mesh.position.set(0.5, -0.7, 0.5);

// Scale will grow or shrink the obj you can also set the scale in 2 ways as bellow set order is same as position
mesh.scale.x = 3;
mesh.scale.y = 0.5;
mesh.scale.set(1, 1, 1);

// Rotation of an object
//Reorder will update the order in which rotation take place
// PI is half of the rotation on a certain axis
mesh.rotation.reorder("YXZ");
mesh.rotation.x = Math.PI;
mesh.rotation.y = Math.PI;

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

// Axes helper can help you see the axis it takes size as a single arg
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// This will give us the distance from our object to the camera
// Note you can pass any Vector object in distanceTo to find the distance between 2 objs
console.log(mesh.position.distanceTo(camera.position));

// lookAt this is yet another function that inherit from a Vector 3 obj and take Vector 3 as an arg this will make the -z position of
// an object to face the other obj

camera.lookAt(mesh.position);

// you can group multiple Vector 3 object by using group to apply changes on a whole group
const group = new THREE.Group();

scene.add(group);

const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh2 = new THREE.Mesh(geometry, material2);
group.add(mesh);
group.add(mesh2);
group.position.x = 0.5

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
