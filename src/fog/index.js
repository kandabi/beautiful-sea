import * as THREE from 'three';
import { colors, createFogGui } from '../utils';

export const setupFog = (scene) => {
    scene.fog = new THREE.Fog(colors.darkSkyColor);
    scene.fog.near = 4;
    scene.fog.far = 10;

    createFogGui(scene.fog);
};
