// Importing the THREE library and OrbitControls from the three/examples/jsm/controls/OrbitControls.js file
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Selecting the canvas element from the HTML file
const canvas = document.querySelector('canvas.webgl')

// Creating a new THREE scene
const scene = new THREE.Scene()

/**
 * Object
 */
// Creating a new BufferGeometry object
const geometry = new THREE.BufferGeometry()

// Setting the number of vertices to be created
const count = 50

// Creating an array to hold the positions of the vertices
const positionsArray = new Float32Array(count * 3 * 3)

// Populating the positionsArray with random values
for(let i = 0; i < count * 3 * 3; i++)
{
    positionsArray[i] = (Math.random() - 0.5) * 4
}

// Creating a new BufferAttribute object from the positionsArray
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)

// Setting the position attribute of the geometry to the positionsAttribute
geometry.setAttribute('position', positionsAttribute)

// Creating a new MeshBasicMaterial object with a red color and wireframe set to true
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })

// Creating a new Mesh object from the geometry and material
const mesh = new THREE.Mesh(geometry, material)

// Adding the mesh to the scene
scene.add(mesh)

/**
 * Sizes
 */
// Creating an object to hold the width and height of the window
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Adding an event listener to the window to update the sizes object when the window is resized
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera aspect ratio
    camera.aspect = sizes.width / sizes.height

    // Update camera projection matrix
    camera.updateProjectionMatrix()

    // Update renderer size and pixel ratio
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Creating a new PerspectiveCamera object with a 75 degree field of view, aspect ratio based on the window size, and near and far clipping planes
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

// Setting the camera's position
camera.position.z = 3

// Adding the camera to the scene
scene.add(camera)

// Creating a new OrbitControls object with the camera and canvas as arguments
const controls = new OrbitControls(camera, canvas)

// Enabling damping for smoother camera movement
controls.enableDamping = true

/**
 * Renderer
 */
// Creating a new WebGLRenderer object with the canvas as an argument
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

// Setting the renderer size and pixel ratio
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
// Creating a new Clock object
const clock = new THREE.Clock()

// Defining the tick function
const tick = () =>
{
    // Getting the elapsed time since the clock was created
    const elapsedTime = clock.getElapsedTime()

    // Updating the controls
    controls.update()

    // Rendering the scene with the camera
    renderer.render(scene, camera)

    // Requesting the next frame to call the tick function again
    window.requestAnimationFrame(tick)
}

// Calling the tick function to start the animation loop
tick()