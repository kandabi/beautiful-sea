import * as THREE from 'three';

import waterVertexShader from '../shaders/water/vertex.glsl';
import waterFragmentShader from '../shaders/water/fragment.glsl';

import skyVertexShader from '../shaders/sky/vertex.glsl';
import skyFragmentShader from '../shaders/sky/fragment.glsl';

import { colors } from '../utils/colors';

export const createWaterMaterial = () => {
    return new THREE.ShaderMaterial({
        fragmentShader: waterFragmentShader,
        vertexShader: waterVertexShader,
        uniforms: {
            uTime: { value: 0.0 },

            uBigWaveSpeed: { value: 1 },
            uBigWaveElevation: { value: 0.16 },
            uBigWaveCount: { value: new THREE.Vector2(2, 2) },

            uSmallWaveCount: { value: 2.0 },
            uSmallWaveSpeed: { value: 0.2 },
            uSmallWaveElevation: { value: 0.15 },

            uFoamCount: { value: 35 },
            uFoamStrength: { value: 0.04 },

            uDepthColor: { value: new THREE.Color(colors.depthColor) },
            uSurfaceColor: { value: new THREE.Color(colors.surfaceColor) },

            uColorOffset: { value: 0 },
            uColorMultiply: { value: 1 },
        },
    });
};

export const createSkyMaterial = () => {
    return new THREE.ShaderMaterial({
        fragmentShader: skyFragmentShader,
        vertexShader: skyVertexShader,
        transparent: true,
        uniforms: {
            uTime: { value: 0.0 },
            uStarSpeed: { value: 0.1 },
            uStarIntensity: { value: 0.2 },
            uStarNoiseCount: { value: 20 },
            uStarNoiseIntensity: { value: 0.2 },

            uSkyColorMultiply: { value: 0.25 },
            uSkyDarkColor: { value: new THREE.Color(colors.darkSkyColor) },
            uSkyLightColor: { value: new THREE.Color(colors.lightSkyColor) },
        },
    });
};
