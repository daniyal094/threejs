// requestAnimationFrame has one draw back for animation it runs on your computer FPS(Frame Per Second)
// we need some constant metrics for animation to work other wise it will run faster on high end computer and slower on low end computer
// in bellow example we are using js Date obj and Three js clock class
import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

let time = Date.now();
const clock = new THREE.Clock();
// Animations
const tick = () => {
  // commenting this because using three js clock
  //   const currentTime = Date.now();
  //   const deltaTime = time - currentTime;
  //   time = currentTime;

  // Update your Vector 3 obj
  // we are using time to make animation work same on every machine even if its FPS is different
  //   mesh.rotation.y += 0.001 * deltaTime;

  // we are using Three js clock to make animation work same on every machine even if its FPS is different
  const elapsedTIme = clock.getElapsedTime();
  mesh.rotation.y = elapsedTIme;
  // Render on each updated frame
  renderer.render(scene, camera);

  // requestAnimationFrame will pass the callback function to the next frame
  window.requestAnimationFrame(tick);
};

tick();
