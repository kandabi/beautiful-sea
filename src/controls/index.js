import * as THREE from 'three';
import { createLimitPan } from '@ocio/three-camera-utils';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createCameraGui } from '../utils';

export const createControls = (camera, canvas) => {
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.minDistance = 1.0;
    controls.maxDistance = 7.0;

    controls.minPolarAngle = Math.PI / 12;
    controls.maxPolarAngle = Math.PI / 2;

    controls.target = new THREE.Vector3(-0.8, 0.16, -2.6);
    const limitPan = createLimitPan({ camera, controls });
    controls.addEventListener('change', (e) => {
        limitPan({ minX: -2.5, maxX: 2.5, minY: -0.2, maxY: 3, minZ: -2.5, maxZ: 4.0 });
    });

    createCameraGui(camera);
    return controls;
};
