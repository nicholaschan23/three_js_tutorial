import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function loadModels(modelPaths, scene) {
    const loader = new GLTFLoader();
    const loadedModels = [];

    modelPaths.forEach((path) => {
        // Check if the file exists
        fetch(path, { method: "HEAD" })
            .then((response) => {
                if (response.ok) {
                    // File exists, proceed with loading
                    loader.load(
                        path,
                        (gltf) => {
                            const model = gltf.scene;
                            scene.add(model);
                            loadedModels.push(model);
                        },
                        undefined,
                        (error) => {
                            console.error(`Error loading model from ${path}:`, error);
                        }
                    );
                } else {
                    // File does not exist, log error
                    console.error(`Model file does not exist: ${path}`);
                }
            })
            .catch((error) => {
                console.error(`Error checking model file: ${path}`, error);
            });
    });

    return loadedModels;
}
