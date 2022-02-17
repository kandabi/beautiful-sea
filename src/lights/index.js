import * as THREE from 'three';
import { createLightGui } from '../utils';

import { colors } from '../utils';

export const setupLights = (scene) => {
    const ambient = new THREE.AmbientLight(colors.ambientColor, 0.35);
    scene.add(ambient);

    const directionalLight = new THREE.DirectionalLight(colors.directionalColor, 2);
    directionalLight.position.set(3, 5, 3);
    directionalLight.rotation.x = 0.8;
    scene.add(directionalLight);

    createLightGui(ambient, directionalLight);
};
