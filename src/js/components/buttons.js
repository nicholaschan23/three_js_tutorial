import * as THREE from "three";
import { scene } from "../index.js";

export function createButton() {
    const buttons = [];

    // Create a mesh for the button
    const buttonGeometry = new THREE.PlaneGeometry(1, 1);
    const buttonMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.5,
    });
    const buttonMesh = new THREE.Mesh(buttonGeometry, buttonMaterial);
    buttonMesh.position.set(0, 0, 3);
    scene.add(buttonMesh);

    buttons.push(buttonMesh);
    return buttons;
}