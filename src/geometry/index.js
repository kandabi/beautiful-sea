import * as THREE from 'three';

import { createWaterMaterial, createLampMaterial, createSkyMaterial } from '../shaders';
import { createLighthouseGui, createFogGui, colors } from '../utils';

export const setupLighthouse = (scene, model) => {
    const lighthouse = model.scene;
    lighthouse.position.set(0, -0.4, -2);
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
    const skyGeometry = new THREE.SphereGeometry(72, 128, 64, 0, Math.PI * 2.0, Math.PI * 2.0, Math.PI * 0.25);
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    sky.scale.set(0.6, 0.4, 0.6);
    sky.position.y = -23;
    scene.add(sky);
    return sky;
};

export const setupLamp = (scene) => {
    const lampMaterial = createLampMaterial();
    const lampGeometry = new THREE.CylinderGeometry(0.25, 0.02, 17, 64);

    const first = new THREE.Mesh(lampGeometry, lampMaterial);
    first.rotation.x = Math.PI * 0.5 + 0.05;
    first.position.set(0, 0, 8.5);

    const second = new THREE.Mesh(lampGeometry, lampMaterial);
    second.rotation.x = Math.PI * 0.5 - 0.05;
    second.rotation.z = Math.PI;
    second.position.set(0, 0, -8.5);

    const pivot = new THREE.Group();
    pivot.position.set(-0.04, 1.02, -2.16);

    scene.add(pivot);
    pivot.add(first);
    pivot.add(second);

    return { first, second, pivot };
};

export const setupFog = (scene) => {
    scene.fog = new THREE.Fog(colors.darkSkyColor);
    scene.fog.near = 4;
    scene.fog.far = 10;

    createFogGui(scene.fog);
};
