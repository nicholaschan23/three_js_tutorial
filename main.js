import * as THREE from 'three';

// creating the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 50, 0);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// an array of objects whose rotation to update
const objects = [];

// use just one sphere for everything
const radius = 1;
const widthSegments = 6;
const heightSegments = 6;
const sphereGeometry = new THREE.SphereGeometry(
    radius, widthSegments, heightSegments);

const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xFFFF00 });
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5);  // make the sun large
scene.add(sunMesh);
objects.push(sunMesh);

// point of light in the center of the scene
{
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.PointLight(color, intensity);
    scene.add(light);
}

// rendering the scene
function animate() {
    requestAnimationFrame(animate);
    objects.forEach((obj) => {
        obj.rotation.y += 0.01;
    });
    renderer.render(scene, camera);
}
animate();