import './style.css';
import * as THREE from 'three';
import * as dat from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import waterVertexShader from './shaders/water/vertex.glsl';
import waterFragmentShader from './shaders/water/fragment.glsl';

import skyVertexShader from './shaders/sky/vertex.glsl';
import skyFragmentShader from './shaders/sky/fragment.glsl';

const gui = new dat.GUI({ width: 340 });
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

const colors = {
    backgroundColor: 0x002266,
    // backgroundColor: 0x00060f,
    surfaceColor: 0xc8d9ee,
    depthColor: 0x2c65af,

    darkSkyColor: 0x002266,
    lightSkyColor: 0x002e6b,
};

scene.background = new THREE.Color(colors.backgroundColor);

const waterGeometry = new THREE.PlaneGeometry(12, 12, 256, 256);
const skyGeometry = new THREE.PlaneGeometry(128, 128, 64, 64);
// const skyGeometry = new THREE.PlaneGeometry(128, 128, 128, 128);

const waterMaterial = new THREE.ShaderMaterial({
    fragmentShader: waterFragmentShader,
    vertexShader: waterVertexShader,
    uniforms: {
        uTime: { value: 0.0 },

        uBigWaveSpeed: { value: 1 },
        uBigWaveElevation: { value: 0.16 },
        uBigWaveCount: { value: new THREE.Vector2(2, 2.1) },

        uSmallWaveIteration: { value: 2 },
        uSmallWaveCount: { value: 2.0 },
        uSmallWaveSpeed: { value: 0.2 },
        uSmallWaveElevation: { value: 0.15 },

        uFoamCount: { value: 35 },
        uFoamStrength: { value: 0.08 },

        uDepthColor: { value: new THREE.Color(colors.depthColor) },
        uSurfaceColor: { value: new THREE.Color(colors.surfaceColor) },

        uColorOffset: { value: 0 },
        uColorMultiply: { value: 1 },
    },
});

const skyMaterial = new THREE.ShaderMaterial({
    fragmentShader: skyFragmentShader,
    vertexShader: skyVertexShader,
    transparent: true,
    uniforms: {
        uTime: { value: 0.0 },
        uStarIntensity: { value: 0.05 },
        uStarSpeed: { value: 0.05 },
        uStarNoise: { value: 1.25 },

        uSkyDarkColor: { value: new THREE.Color(colors.darkSkyColor) },
        uSkyLightColor: { value: new THREE.Color(colors.lightSkyColor) },
    },
});

const water = new THREE.Mesh(waterGeometry, waterMaterial);
const sky = new THREE.Mesh(skyGeometry, skyMaterial);
water.rotation.x = -Math.PI * 0.5;
sky.rotation.x = -Math.PI * 0.5;
sky.rotation.y = Math.PI;
sky.position.y = 6.5;
scene.add(water);
scene.add(sky);

const sizes = {
    height: window.innerHeight,
    width: window.innerWidth,
};

window.addEventListener('resize', () => {
    sizes.height = window.innerHeight;
    sizes.width = window.innerWidth;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(sizes.width, sizes.height);
});

var camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0.2, 0.5, 1.5);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;

controls.maxPolarAngle = Math.PI / 2.2;
controls.minPolarAngle = Math.PI / 8;

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    waterMaterial.uniforms.uTime.value = elapsedTime;
    skyMaterial.uniforms.uTime.value = elapsedTime;

    controls.update();

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();

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

seaFolder.add(waterMaterial.uniforms.uSmallWaveIteration, 'value', 1, 4, 1).name('Small Wave Detail');
seaFolder.add(waterMaterial.uniforms.uSmallWaveCount, 'value', 1, 6, 0.01).name('Small Wave Count');
seaFolder.add(waterMaterial.uniforms.uSmallWaveSpeed, 'value', 0, 0.6, 0.01).name('Small Wave Speed');
seaFolder.add(waterMaterial.uniforms.uSmallWaveElevation, 'value', 0, 0.3, 0.01).name('Small Wave Elevation');
seaFolder.add(waterMaterial.uniforms.uFoamCount, 'value', 0, 100, 0.01).name('Foam Count');
seaFolder.add(waterMaterial.uniforms.uFoamStrength, 'value', 0, 0.25, 0.01).name('Foam Strength');

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
skyFolder.add(skyMaterial.uniforms.uStarIntensity, 'value', 0.001, 0.5, 0.01).name('Star Intensity');
skyFolder.add(skyMaterial.uniforms.uStarNoise, 'value', 0, 15, 0.01).name('Star Noise');

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
