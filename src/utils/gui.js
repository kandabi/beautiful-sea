import * as THREE from 'three';
import * as dat from 'dat.gui';
import initThreeDebug from 'three-dat.gui';
import { toggleAudio, colors } from './';
initThreeDebug(dat);

const gui = new dat.GUI({ width: 340 });

export const createMaterialGui = (scene, sky, water, lamp, pivot) => {
    const seaFolder = gui.addFolder('Sea');

    seaFolder.add(water.material.uniforms.uBigWaveSpeed, 'value', 0, 5, 0.001).name('Big Wave Speed');
    seaFolder.add(water.material.uniforms.uBigWaveElevation, 'value', 0, 1, 0.001).name('Big Wave Elevation');
    seaFolder.add(water.material.uniforms.uBigWaveCount.value, 'x', 0, 5, 0.01).name('X Wave Count');
    seaFolder.add(water.material.uniforms.uBigWaveCount.value, 'y', 0, 5, 0.01).name('Y Wave Count');

    seaFolder.add(water.material.uniforms.uSmallWaveCount, 'value', 1, 6, 0.01).name('Small Wave Count');
    seaFolder.add(water.material.uniforms.uSmallWaveSpeed, 'value', 0, 0.6, 0.01).name('Small Wave Speed');
    seaFolder.add(water.material.uniforms.uSmallWaveElevation, 'value', 0, 0.3, 0.01).name('Small Wave Elevation');
    seaFolder.add(water.material.uniforms.uFoamCount, 'value', 0, 100, 0.01).name('Foam Count');
    seaFolder.add(water.material.uniforms.uFoamStrength, 'value', 0, 0.1, 0.001).name('Foam Strength');

    seaFolder.add(water.material.uniforms.uColorOffset, 'value', -1, 1, 0.01).name('Color Offset');
    seaFolder.add(water.material.uniforms.uColorMultiply, 'value', -5, 10, 0.01).name('Color Multiply');

    seaFolder
        .addColor(colors, 'depthColor')
        .name('Depth Color')
        .onChange(() => {
            water.material.uniforms.uDepthColor.value.set(colors.depthColor);
        });

    seaFolder
        .addColor(colors, 'surfaceColor')
        .name('Surface Color')
        .onChange(() => {
            water.material.uniforms.uSurfaceColor.value.set(colors.surfaceColor);
        });

    const skyFolder = gui.addFolder('Sky');
    skyFolder.add(sky.material.uniforms.uStarCount, 'value', 0, 120.0, 1.0).name('Star Count');
    skyFolder.add(sky.material.uniforms.uStarStrength, 'value', 0.001, 1.0, 0.01).name('Star Strength');
    skyFolder.add(sky.material.uniforms.uStarNoiseCount, 'value', 0, 50, 0.01).name('Star Noise Count');

    skyFolder.add(sky.material.uniforms.uStaticNoiseStrength, 'value', 0, 1, 0.001).name('Static Noise Strength');
    skyFolder.add(sky.material.uniforms.uDynamicNoiseStrength, 'value', 0, 1, 0.001).name('Dynamic Noise Strength');
    skyFolder.add(sky.material.uniforms.uDynamicNoiseSpeed, 'value', 0, 0.8, 0.001).name('Dynamic Noise Speed');

    skyFolder.add(sky.material.uniforms.uSkyColorMultiply, 'value', 0, 1, 0.001).name('Sky Color Multiply');
    skyFolder
        .addColor(colors, 'backgroundColor')
        .name('Background Color')
        .onChange(() => {
            scene.background = new THREE.Color(colors.backgroundColor);
        });

    skyFolder
        .addColor(colors, 'darkSkyColor')
        .name('Dark Sky Color')
        .onChange(() => {
            sky.material.uniforms.uSkyDarkColor.value.set(colors.darkSkyColor);
        });

    skyFolder
        .addColor(colors, 'lightSkyColor')
        .name('Light Sky Color')
        .onChange(() => {
            sky.material.uniforms.uSkyLightColor.value.set(colors.lightSkyColor);
        });

    skyFolder.add(sky.material.uniforms.uFogSkyStrength, 'value', 0, 1, 0.001).name('Sky Fog Strength');

    const lampFolder = gui.addFolder('Lamp');
    lampFolder.add(lamp.material.uniforms.uLampStrength, 'value', -1, 1, 0.01).name('Lamp Strength');
    lampFolder.add(lamp.material.uniforms.uLampOffset, 'value', -1, 1, 0.01).name('Lamp Offset');
    lampFolder.add(lamp.material.uniforms.uLampSkyStrength, 'value', -1, 2, 0.01).name('Lamp Fog Strength');

    lampFolder.add(pivot.position, 'x', -2, 3, 0.01).name('Position X');
    lampFolder.add(pivot.position, 'y', -2, 3, 0.01).name('Position Y');
    lampFolder.add(pivot.position, 'z', -2, 3, 0.01).name('Position Z');

    lampFolder.add(lamp.rotation, 'x', -4, 4, 0.01).name('Rotation X');
    lampFolder.add(lamp.rotation, 'y', -4, 4, 0.01).name('Rotation Y');
    lampFolder.add(lamp.rotation, 'z', -4, 4, 0.01).name('Rotation Z');

    gui.close();
    lampFolder.close();
    seaFolder.close();
    skyFolder.close();
};

export const createCameraGui = (camera) => {
    gui.addCamera('Camera', camera);
};

export const createLighthouseGui = (lighthouse) => {
    const lighthouseModel = gui.addFolder('Lighthouse');
    lighthouseModel.add(lighthouse.position, 'x', -4, 4, 0.01).name('Position X');
    lighthouseModel.add(lighthouse.position, 'y', -4, 4, 0.01).name('Position Y');
    lighthouseModel.add(lighthouse.position, 'z', -4, 4, 0.01).name('Position Z');

    lighthouseModel.add(lighthouse.rotation, 'x', -4, 4, 0.01).name('Rotation X');
    lighthouseModel.add(lighthouse.rotation, 'y', -4, 4, 0.01).name('Rotation Y');
    lighthouseModel.add(lighthouse.rotation, 'z', -4, 4, 0.01).name('Rotation Z');
    lighthouseModel.add(lighthouse.scale, 'x', 0, 1.0, 0.01).name('Scale X');
    lighthouseModel.add(lighthouse.scale, 'y', 0, 1.0, 0.01).name('Scale Y');
    lighthouseModel.add(lighthouse.scale, 'z', 0, 1.0, 0.01).name('Scale Z');
    lighthouseModel.close();
};

export const createLampGui = (lamp) => {
    const lightFolder = gui.addFolder('Lights');
    lightFolder.addLight('Directional', directionalLight);
    lightFolder.addLight('Ambient', ambient);
    lightFolder.close();
};

export const createLightGui = (ambient, directionalLight) => {
    const lightFolder = gui.addFolder('Lights');
    lightFolder.addLight('Directional', directionalLight);
    lightFolder.addLight('Ambient', ambient);
    lightFolder.close();
};

export const createFogGui = (fog) => {
    const fogFolder = gui.addFolder('Fog');
    fogFolder.add(fog, 'near', 0, 10.0, 0.01).name('Fog Near');
    fogFolder.add(fog, 'far', 0, 30.0, 0.01).name('Fog Far');
    fogFolder.close();
};

export const createMuteButton = () => {
    document.getElementById('mute-btn').onclick = (event) => {
        toggleAudio(event.target);
    };
};
