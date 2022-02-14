import './style.css';
import * as THREE from 'three';
import * as dat from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import waterVertexShader from './shaders/water/vertex.glsl';
import waterFragmentShader from './shaders/water/fragment.glsl';

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 340 });

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Water
 */
// Geometry
const waterGeometry = new THREE.PlaneGeometry(12, 12, 1024, 1024);

const colors = {
    backgroundColor: 0x6695b2,
    surfaceColor: 0x9bd8ff,
    depthColor: 0x186691,
};

// Material
const waterMaterial = new THREE.ShaderMaterial({
    fragmentShader: waterFragmentShader,
    vertexShader: waterVertexShader,
    side: THREE.DoubleSide,
    uniforms: {
        uTime: { value: 0.0 },

        uBigWaveSpeed: { value: 0.75 },
        uBigWaveElevation: { value: 0.2 },
        uBigWaveFrequency: { value: new THREE.Vector2(4, 1.5) },

        uSmallWaveIteration: { value: 4 },
        uSmallWaveFrequency: { value: 3.0 },
        uSmallWaveSpeed: { value: 0.2 },
        uSmallWaveElevation: { value: 0.15 },

        uDepthColor: { value: new THREE.Color(colors.depthColor) },
        uSurfaceColor: { value: new THREE.Color(colors.surfaceColor) },
        uColorOffset: { value: 0.08 },
        uColorMultiply: { value: 5 },
    },
});

gui.add(waterMaterial.uniforms.uBigWaveSpeed, 'value', 0, 5, 0.001).name('Big Wave Speed');
gui.add(waterMaterial.uniforms.uBigWaveElevation, 'value', 0, 1, 0.001).name('Big Wave Elevation');
gui.add(waterMaterial.uniforms.uBigWaveFrequency.value, 'x', 0, 5, 0.01).name('X Wave Frequency');
gui.add(waterMaterial.uniforms.uBigWaveFrequency.value, 'y', 0, 5, 0.01).name('Y Wave Frequency');

gui.addColor(colors, 'depthColor')
    .name('Depth Color')
    .onChange(() => {
        waterMaterial.uniforms.uDepthColor.value.set(colors.depthColor);
    });

gui.addColor(colors, 'surfaceColor')
    .name('Surface Color')
    .onChange(() => {
        waterMaterial.uniforms.uSurfaceColor.value.set(colors.surfaceColor);
    });

gui.add(waterMaterial.uniforms.uColorOffset, 'value', 0, 0.6, 0.01).name('Color Offset');
gui.add(waterMaterial.uniforms.uColorMultiply, 'value', 0, 10, 0.01).name('Color Multiply');
gui.add(waterMaterial.uniforms.uSmallWaveIteration, 'value', 1, 4, 1).name('Small Wave Detail');
gui.add(waterMaterial.uniforms.uSmallWaveFrequency, 'value', 1, 6, 0.01).name('Small Wave Frequency');
gui.add(waterMaterial.uniforms.uSmallWaveSpeed, 'value', 0, 0.6, 0.01).name('Small Wave Speed');
gui.add(waterMaterial.uniforms.uSmallWaveElevation, 'value', 0, 0.3, 0.01).name('Small Wave Elevation');
gui.add(waterMaterial.uniforms.uSmallWaveElevation, 'value', 0, 0.3, 0.01).name('Small Wave Elevation');

gui.addColor(colors, 'backgroundColor')
    .name('Background Color')
    .onChange(() => {
        scene.background = new THREE.Color(colors.backgroundColor);
    });

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI * 0.5;
scene.add(water);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(1, 1, 1);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

scene.background = new THREE.Color(colors.backgroundColor);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    waterMaterial.uniforms.uTime.value = elapsedTime;

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
