import * as THREE from 'three';

import { createMaterialGui, createResizeListener } from './utils';
import { createMuteButton, colors, sizes } from './utils';
import { setupSky, setupLamp, setupWater, setupFog } from './geometry';
import { createControls } from './controls';
import { loadLighthouse } from './models';
import { setupCamera } from './cameras';
import { setupLights } from './lights';

import './style.css';

window.onload = () => createApp();

const createApp = () => {
    const canvas = document.querySelector('.webgl-canvas');
    const scene = new THREE.Scene();

    loadLighthouse(scene);
    const { lamp, pivot } = setupLamp(scene);
    const water = setupWater(scene);
    const sky = setupSky(scene);

    setupLights(scene);
    setupFog(scene);

    const camera = setupCamera(scene);
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvas,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(sizes.width, sizes.height);

    const controls = createControls(camera, renderer.domElement);
    const clock = new THREE.Clock();

    const tick = () => {
        const elapsedTime = clock.getElapsedTime();
        water.material.uniforms.uTime.value = elapsedTime;
        sky.material.uniforms.uTime.value = elapsedTime;
        sky.rotation.z = elapsedTime * Math.PI * 0.01;

        pivot.rotation.y = elapsedTime * Math.PI * 0.1 + 5;

        controls.update();
        renderer.render(scene, camera);
        window.requestAnimationFrame(tick);
    };

    tick();

    createMaterialGui(scene, sky, water, lamp, pivot);
    createResizeListener(camera, renderer);
    createMuteButton();
};
