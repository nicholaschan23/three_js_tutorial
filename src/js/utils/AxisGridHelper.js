import * as THREE from "three";

/**
 * Helper class to toggle visibility of axes and grid in a scene.
 */
export class AxisGridHelper {
    /**
     * Constructs an AxisGridHelper.
     * @param {THREE.Object3D} node - The node to which the axes and grid will be added.
     * @param {number} units - The size of the grid.
     */
    constructor(node, units = 10) {
        // Create axes
        const axes = new THREE.AxesHelper();
        axes.material.depthTest = false;
        axes.renderOrder = 2; // Render after the grid
        node.add(axes);

        // Create grid
        const grid = new THREE.GridHelper(units, units);
        grid.material.depthTest = false;
        grid.renderOrder = 1;
        node.add(grid);

        // Initialize visibility
        this.grid = grid;
        this.axes = axes;
        this.visible = false;
    }

    /**
     * Get the visibility status of the axes and grid.
     * @returns {boolean} The visibility status.
     */
    get visible() {
        return this._visible;
    }

    /**
     * Set the visibility of the axes and grid.
     * @param {boolean} v - The visibility status.
     */
    set visible(v) {
        this._visible = v;
        this.grid.visible = v;
        this.axes.visible = v;
    }
}
