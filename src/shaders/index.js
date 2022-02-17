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
        fog: true,
        uniforms: {
            uTime: { value: 0.0 },

            fogNear: { value: 0.0 },
            fogFar: { value: 0.0 },
            fogColor: { value: new THREE.Color(colors.depthColor) },

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

            uColorOffset: { value: 0.55 },
            uColorMultiply: { value: 2 },
        },
    });
};

export const createSkyMaterial = () => {
    return new THREE.ShaderMaterial({
        fragmentShader: skyFragmentShader,
        vertexShader: skyVertexShader,
        transparent: true,
        fog: true,
        uniforms: {
            uTime: { value: 0.0 },

            fogNear: { value: 0.0 },
            fogFar: { value: 0.0 },
            fogColor: { value: new THREE.Color(colors.depthColor) },

            uStarCount: { value: 70.0 },
            uStarIntensity: { value: 0.14 },
            uStarNoiseCount: { value: 25 },
            uStaticNoiseIntensity: { value: 0.2 },
            uDynamicNoiseIntensity: { value: 0.5 },
            uDynamicNoiseSpeed: { value: 0.2 },

            uSkyColorMultiply: { value: 0.14 },
            uSkyDarkColor: { value: new THREE.Color(colors.darkSkyColor) },
            uSkyLightColor: { value: new THREE.Color(colors.lightSkyColor) },
            uFogSkyIntensity: { value: 0.2 },
        },
    });
};
