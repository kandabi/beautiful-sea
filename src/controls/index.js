import * as THREE from 'three';
import { createLimitPan } from '@ocio/three-camera-utils';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const createControls = (camera, canvas) => {
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.minDistance = 1.0;
    controls.maxDistance = 7.0;

    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 12;

    controls.target = new THREE.Vector3(-1.5, 0.16, -2.6);
    const limitPan = createLimitPan({ camera, controls });
    controls.addEventListener('change', (e) => {
        limitPan({ minX: -4, maxX: 4, minY: -0.2, maxY: 3, minZ: -4, maxZ: 4 });
    });

    return controls;
};
