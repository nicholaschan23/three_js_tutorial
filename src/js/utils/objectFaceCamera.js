import * as THREE from "three";
import { camera, buttons } from "../index.js";

// Function to update the mesh rotation to face the camera
export function updateMeshRotation() {
    buttons.forEach((buttonMesh) => {
        // // Get the vector from the mesh position to the camera position
        // const lookAtVector = new THREE.Vector3();
        // camera.getWorldPosition(lookAtVector);
        // lookAtVector.sub(buttonMesh.position).normalize();

        // // Calculate the quaternion rotation to make the mesh face the camera
        // buttonMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), lookAtVector);
        // Function to make the mesh face the camera while staying upright
        const targetPosition = camera.position.clone();
        buttonMesh.lookAt(targetPosition); // Make the mesh look at the camera

        // Adjust the mesh rotation to ensure it stays upright
        // buttonMesh.rotation.x = 0;
        // buttonMesh.rotation.z = 0;
    });
}
