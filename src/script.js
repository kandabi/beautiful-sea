import * as THREE from 'three';

import { createMaterialGui, createResizeListener, toggleAudio } from './utils';
import { setupAudio, colors, sizes } from './utils';
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
    const water = setupWater(scene);
    const lamp = setupLamp(scene);
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
    const speed = Math.PI * 0.1;

    const tick = () => {
        const elapsedTime = clock.getElapsedTime();
        lamp.pivot.rotation.y = elapsedTime * speed + Math.sin(elapsedTime) * speed + 5.0;
        sky.rotation.y = -elapsedTime * Math.PI * 0.01 - 3.8;
        water.material.uniforms.uTime.value = elapsedTime;
        sky.material.uniforms.uTime.value = elapsedTime;

        controls.update();
        renderer.render(scene, camera);
        window.requestAnimationFrame(tick);
    };

    tick();

    createMaterialGui(scene, sky, water, lamp);
    createResizeListener(camera, renderer);
    setupAudio(canvas);
};
