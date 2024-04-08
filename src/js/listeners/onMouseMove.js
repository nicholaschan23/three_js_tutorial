import * as THREE from "three";
import { camera, buttons } from "../index";

// Raycaster for mouse interactions
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Function to handle mouse move event
export function onMouseMove(event) {
    // Calculate normalized mouse coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update raycaster
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections with button meshes
    buttons.forEach((buttonMesh) => {
        const intersects = raycaster.intersectObject(buttonMesh);

        // Store the original material color
        const originalColor = buttonMesh.material.color.clone();

        // Clone the original color and adjust its properties for the hover effect
        const hoverColor = originalColor.clone();
        // hoverColor.setHex(0x000000); // Set color to black
        hoverColor.multiplyScalar(0.1); // Darken the color by 50%
        // hoverColor.setOpacity(0.5); // Set opacity to 50%

        if (intersects.length > 0) {
            // Mouse is hovering over the button mesh
            buttonMesh.material.color.copy(hoverColor);
        } else {
            // Mouse is not hovering over the button mesh
            // buttonMesh.material.color.copy(originalColor);
            buttonMesh.material.color.setHex(0xffffff);
        }
    });
}
