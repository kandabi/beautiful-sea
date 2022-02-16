import * as THREE from 'three';
import { createLightGui } from '../utils';

import { colors } from '../utils';

export const setupLights = (scene) => {
    const ambient = new THREE.AmbientLight(colors.ambientColor);
    scene.add(ambient);

    createLightGui(ambient);
};
