import * as THREE from "three";
import GUI from "lil-gui";
import { AxisGridHelper } from "./utils/AxisGridHelper.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { loadModels } from "../js/utils/loadModels";

// Creating the scene, camera, and renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 10, 10);
camera.up.set(0, 1, 0);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create controls for interactive view
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth camera movement
controls.dampingFactor = 0.25;
controls.rotateSpeed = 0.35;
controls.target.set(0, 2.5, 0);

const objects = [];

// Light
const directional_light = new THREE.DirectionalLight(0xffffff, 1);
directional_light.position.set(5, 5, 5);
directional_light.name = "directional_light";
scene.add(directional_light);
objects.push(directional_light);

// Empty scene for sun
const world = new THREE.Object3D();
world.name = "world";
scene.add(world);
objects.push(world);

// Model configurations
const modelConfigurations = [
    {
        name: "lego_batman_minifigure",
        path: "src/assets/models/lego_batman_minifigure/scene.gltf",
        scene: world,
        // position: new THREE.Vector3(0, 0, 0),
        // rotation: new THREE.Euler(0, 0, 0),
        scale: new THREE.Vector3(0.1, 0.1, 0.1),
    },
];
const loadedModels = loadModels(modelConfigurations)
    .then((loadedModels) => {
        console.log("Models loaded:", loadedModels.length);

        loadedModels.forEach((child) => {
            makeAxisGrid(child, child.name);
        });
    })
    .catch((error) => {
        console.error("Error loading models:", error);
    });

// Create GUI to toggle grid and axis visualization
const gui = new GUI();
function makeAxisGrid(node, label, units) {
    const helper = new AxisGridHelper(node, units);
    gui.add(helper, "visible").name(label);
}

// Loop through the children of the scene
objects.forEach((child) => {
    makeAxisGrid(child, child.name);
});

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

// Rendering the scene
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
