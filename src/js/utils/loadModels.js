import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Loads models into the scene.
 *
 * @param {Object[]} modelConfigurations - Array of model configuration objects.
 * @param {string} modelConfigurations.path - Path to the model relative to index.html.
 * @param {THREE.Scene} modelConfigurations.scene - The THREE.js scene to which the model will be added.
 * @param {THREE.Vector3} [modelConfigurations.position] - The position to place the model.
 * @param {THREE.Euler} [modelConfigurations.rotation] - The rotation to apply to the model.
 * @param {THREE.Vector3} [modelConfigurations.scale] - The scale to apply to the model.
 * @returns {THREE.Object3D[]} An array of loaded models.
 */
export function loadModels(modelConfigurations) {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        const loadedModels = [];

        let loadedCount = 0;

        modelConfigurations.forEach(({ name, path, scene, position, rotation, scale }) => {
            loader.load(
                path,
                (gltf) => {
                    const model = gltf.scene;
                    model.name = name;

                    if (position) model.position.copy(position);
                    if (rotation) model.rotation.copy(rotation);
                    if (scale) model.scale.copy(scale);

                    scene.add(model);
                    loadedModels.push(model);

                    loadedCount++;

                    if (loadedCount === modelConfigurations.length) {
                        resolve(loadedModels);
                    }
                },
                undefined,
                (error) => {
                    reject(error);
                }
            );
        });
    });
}


// export function loadModels(modelConfigurations) {
//     const loader = new GLTFLoader();
//     const loadedModels = [];

//     modelConfigurations.forEach(({ name, path, scene, position, rotation, scale }) => {
//         loader.load(
//             path,
//             (gltf) => {
//                 const model = gltf.scene;
//                 // model.name = name;

//                 // Apply position, rotation, and scale if provided
//                 if (position) model.position.copy(position);
//                 // else {
//                 //     // Calculate the bounding box of the model's geometry
//                 //     const bbox = new THREE.Box3().setFromObject(model);

//                 //     // Calculate the center of the bounding box
//                 //     const center = bbox.getCenter(new THREE.Vector3());
//                 //     model.position.sub(center);
//                 // }
//                 if (rotation) model.rotation.copy(rotation);
//                 if (scale) model.scale.copy(scale);

//                 scene.add(model);
//                 loadedModels.push(model);
//             },
//             undefined,
//             (error) => {
//                 console.error(`Error loading model from ${path}:`, error);
//             }
//         );
//     });

//     return loadedModels;
// }
