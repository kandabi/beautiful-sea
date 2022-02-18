import * as THREE from 'three';

import { createWaterMaterial, createLampMaterial, createSkyMaterial } from '../shaders';
import { createLighthouseGui, createFogGui, colors } from '../utils';

export const setupLighthouse = (scene, model) => {
    const lighthouse = model.scene;
    lighthouse.position.set(0, -0.3, 0);
    // lighthouse.position.set(-1, -0.3, -1);
    lighthouse.scale.set(0.07, 0.07, 0.07);
    scene.add(lighthouse);
    createLighthouseGui(lighthouse);
    return lighthouse;
};

export const setupWater = (scene) => {
    const waterMaterial = createWaterMaterial();
    const waterGeometry = new THREE.PlaneGeometry(28, 28, 256, 256);
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.rotation.x = -Math.PI * 0.5;
    scene.add(water);
    return water;
};

export const setupSky = (scene) => {
    scene.background = new THREE.Color(colors.backgroundColor);
    const skyMaterial = createSkyMaterial();
    const skyGeometry = new THREE.PlaneGeometry(96, 96, 128, 128);
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    sky.rotation.set(-Math.PI * 0.5, Math.PI, 0.0);
    sky.position.y = 5;
    scene.add(sky);
    return sky;
};

export const setupLamp = (scene) => {
    const lampMaterial = createLampMaterial();
    const lampGeometry = new THREE.CylinderGeometry(0.25, 0.035, 20, 64);
    const lamp = new THREE.Mesh(lampGeometry, lampMaterial);
    lamp.rotation.x = Math.PI * 0.5 + 0.05;
    lamp.position.set(0, 0, 10); //*** Offsets the lamp to be half the total width of the light, to enable pivoting it on the edge.

    const pivot = new THREE.Group();
    pivot.position.set(-0.04, 1.04, -0.16);

    scene.add(pivot);
    pivot.add(lamp);

    return { lamp, pivot };
};

export const setupFog = (scene) => {
    scene.fog = new THREE.Fog(colors.darkSkyColor);
    scene.fog.near = 4;
    scene.fog.far = 10;

    createFogGui(scene.fog);
};
