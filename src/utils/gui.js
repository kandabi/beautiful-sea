import * as THREE from 'three';
import * as dat from 'dat.gui';
import initThreeDebug from 'three-dat.gui';
initThreeDebug(dat);

import Stats from 'stats.js';

import { colors } from '.';

const gui = new dat.GUI({ width: 340 });
const stats = new Stats();

export const createFpsGui = () => {
    document.body.appendChild(stats.dom);
    return stats;
};

export const createMaterialGui = (scene, skyMaterial, waterMaterial) => {
    gui.addColor(colors, 'backgroundColor')
        .name('Background Color')
        .onChange(() => {
            scene.background = new THREE.Color(colors.backgroundColor);
        });

    const seaFolder = gui.addFolder('Sea');

    seaFolder.add(waterMaterial.uniforms.uBigWaveSpeed, 'value', 0, 5, 0.001).name('Big Wave Speed');
    seaFolder.add(waterMaterial.uniforms.uBigWaveElevation, 'value', 0, 1, 0.001).name('Big Wave Elevation');
    seaFolder.add(waterMaterial.uniforms.uBigWaveCount.value, 'x', 0, 5, 0.01).name('X Wave Count');
    seaFolder.add(waterMaterial.uniforms.uBigWaveCount.value, 'y', 0, 5, 0.01).name('Y Wave Count');

    seaFolder.add(waterMaterial.uniforms.uSmallWaveCount, 'value', 1, 6, 0.01).name('Small Wave Count');
    seaFolder.add(waterMaterial.uniforms.uSmallWaveSpeed, 'value', 0, 0.6, 0.01).name('Small Wave Speed');
    seaFolder.add(waterMaterial.uniforms.uSmallWaveElevation, 'value', 0, 0.3, 0.01).name('Small Wave Elevation');
    seaFolder.add(waterMaterial.uniforms.uFoamCount, 'value', 0, 100, 0.01).name('Foam Count');
    seaFolder.add(waterMaterial.uniforms.uFoamStrength, 'value', 0, 0.1, 0.001).name('Foam Strength');

    seaFolder.add(waterMaterial.uniforms.uColorOffset, 'value', -1, 1, 0.01).name('Color Offset');
    seaFolder.add(waterMaterial.uniforms.uColorMultiply, 'value', 1, 10, 0.01).name('Color Multiply');

    seaFolder
        .addColor(colors, 'depthColor')
        .name('Depth Color')
        .onChange(() => {
            waterMaterial.uniforms.uDepthColor.value.set(colors.depthColor);
        });

    seaFolder
        .addColor(colors, 'surfaceColor')
        .name('Surface Color')
        .onChange(() => {
            waterMaterial.uniforms.uSurfaceColor.value.set(colors.surfaceColor);
        });

    const skyFolder = gui.addFolder('Sky');
    skyFolder.add(skyMaterial.uniforms.uStarSpeed, 'value', 0, 0.3, 0.001).name('Star Speed');
    skyFolder.add(skyMaterial.uniforms.uStarIntensity, 'value', 0.001, 1.0, 0.01).name('Star Intensity');
    skyFolder.add(skyMaterial.uniforms.uStarNoiseCount, 'value', 0, 50, 0.01).name('Star Noise Count');
    skyFolder.add(skyMaterial.uniforms.uStarNoiseIntensity, 'value', 0, 1, 0.001).name('Star Noise Intensity');

    skyFolder.add(skyMaterial.uniforms.uSkyColorMultiply, 'value', 0, 1, 0.001).name('Sky Color Multiply');
    skyFolder
        .addColor(colors, 'darkSkyColor')
        .name('Dark Sky Color')
        .onChange(() => {
            skyMaterial.uniforms.uSkyDarkColor.value.set(colors.darkSkyColor);
        });

    skyFolder
        .addColor(colors, 'lightSkyColor')
        .name('Light Sky Color')
        .onChange(() => {
            skyMaterial.uniforms.uSkyLightColor.value.set(colors.lightSkyColor);
        });

    gui.close();
    skyFolder.close();
    seaFolder.close();
};

export const createCameraGui = (camera) => {
    const cameraFolder = gui.addFolder('Camera');
    cameraFolder.add(camera.position, 'x', -10, 10, 0.1).name('Position X');
    cameraFolder.add(camera.position, 'y', -10, 10, 0.1).name('Position Y');
    cameraFolder.add(camera.position, 'z', -10, 10, 0.1).name('Position Z');

    cameraFolder.add(camera.rotation, 'x', -10, 10, 0.1).name('Rotation X');
    cameraFolder.add(camera.rotation, 'y', -10, 10, 0.1).name('Rotation Y');
    cameraFolder.add(camera.rotation, 'z', -10, 10, 0.1).name('Rotation Z');
    cameraFolder.close();
};

export const createModelGui = (model) => {
    const modelFolder = gui.addFolder('Model');
    modelFolder.add(model.position, 'x', -4, 4, 0.01).name('Position X');
    modelFolder.add(model.position, 'y', -4, 4, 0.01).name('Position Y');
    modelFolder.add(model.position, 'z', -4, 4, 0.01).name('Position Z');

    modelFolder.add(model.rotation, 'x', -4, 4, 0.01).name('Rotation X');
    modelFolder.add(model.rotation, 'y', -4, 4, 0.01).name('Rotation Y');
    modelFolder.add(model.rotation, 'z', -4, 4, 0.01).name('Rotation Z');
    modelFolder.add(model.scale, 'x', 0, 1.0, 0.01).name('Scale X');
    modelFolder.add(model.scale, 'y', 0, 1.0, 0.01).name('Scale Y');
    modelFolder.add(model.scale, 'z', 0, 1.0, 0.01).name('Scale Z');
    modelFolder.close();
};

export const createLightGui = (ambient) => {
    const lightFolder = gui.addFolder('Lights');
    lightFolder.addLight('Ambient', ambient);
    lightFolder.close();
};
