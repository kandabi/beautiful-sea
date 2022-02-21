import * as THREE from 'three';
import { createLimitPan } from '@ocio/three-camera-utils';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createCameraGui } from '../utils';

export const createControls = (camera, canvas) => {
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.minDistance = 1.0;
    controls.maxDistance = 7.0;

    controls.minPolarAngle = Math.PI / 24;
    controls.maxPolarAngle = Math.PI / 1.9;

    controls.target = new THREE.Vector3(0, 0.16, -2.6);
    const limitPan = createLimitPan({ camera, controls });
    controls.addEventListener('change', (e) => {
        limitPan({ minX: -3, maxX: 3, minY: 0.3, maxY: 3, minZ: -3, maxZ: 3.0 });
    });

    createCameraGui(camera);
    return controls;
};
