import * as THREE from 'three';

import { createWaterMaterial, createSkyMaterial } from './shaders';
import { createFpsGui, createModelGui, createMaterialGui, createCameraGui } from './utils';
import { colors, sizes, resizeListener } from './utils';
import { createControls } from './controls';
import { loadLighthouse } from './models';
import { setupLights } from './lights';

import './style.css';

window.onload = () => {
    const canvas = document.querySelector('canvas.webgl');
    const scene = new THREE.Scene();
    const stats = createFpsGui();

    const lighthouse = loadLighthouse(scene);

    const waterGeometry = new THREE.PlaneGeometry(12, 12, 256, 256);
    const skyGeometry = new THREE.PlaneGeometry(64, 64, 64, 64);

    const waterMaterial = createWaterMaterial();
    const skyMaterial = createSkyMaterial();
    createMaterialGui(scene, skyMaterial, waterMaterial);

    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    water.rotation.x = -Math.PI * 0.5;
    sky.rotation.set(-Math.PI * 0.5, Math.PI, 0.0);
    sky.position.y = 5;
    scene.add(water);
    scene.add(sky);

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.01, 65);
    camera.position.set(-1.08, 0.55, 1.3);
    // camera.position.set(0, 9, 0);
    scene.add(camera);
    createCameraGui(camera);

    setupLights(scene);

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvas,
    });

    resizeListener(camera, renderer);

    const controls = createControls(camera, renderer.domElement);

    scene.background = new THREE.Color(colors.backgroundColor);
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const clock = new THREE.Clock();

    const tick = () => {
        stats.begin();
        const elapsedTime = clock.getElapsedTime();
        waterMaterial.uniforms.uTime.value = elapsedTime;
        skyMaterial.uniforms.uTime.value = elapsedTime;
        sky.rotation.z = elapsedTime * Math.PI * 0.02;

        console.log('camera', camera.position, camera.rotation);

        controls.update();
        renderer.render(scene, camera);

        stats.end();
        window.requestAnimationFrame(tick);
    };

    tick();
};
