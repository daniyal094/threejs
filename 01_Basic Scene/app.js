// all the things you will see in this file is required for three js to work

// A scene is basically a world where you will put objects
const scene = new THREE.Scene();

// Every object you create in this world/scene is called mesh
// mesh is just a physical object that require a shape(geometry) and a matter(material)

// Red Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

// We will add this red cube to our scene
scene.add(mesh); // Note: You will not be able to see the cube in your world/scene just yet

// we have to create a size for our world and we will use this in camera as well
// size
const size = {
  width: 800,
  height: 600,
};

// to see this world we need to an eye from which we can see this world/scene and that is camera let's create our camera
// First arg for camera is FOV (Field of View) and the second arg would be aspect ratio
// Note you will not be able to see the cube just yet because we have not yet set the position of our camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 3;
scene.add(camera);
// Note there are multiple camera type in Three js in this example we will use the most basic camera a perspective camera

// This will be the last step Lets create a Renderer
// renderer is used to render what ever is on screen or visible from camera's point of view
// it takes canvas elements as arg
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);
