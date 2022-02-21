import * as THREE from 'three';

import waterFragmentShader from '../shaders/water/fragment.glsl';
import waterVertexShader from '../shaders/water/vertex.glsl';

import lampFragmentShader from '../shaders/lamp/fragment.glsl';
import lampVertexShader from '../shaders/lamp/vertex.glsl';

import skyFragmentShader from '../shaders/sky/fragment.glsl';
import skyVertexShader from '../shaders/sky/vertex.glsl';

import { colors } from '../utils/colors';

export const createWaterMaterial = () => {
    return new THREE.ShaderMaterial({
        fragmentShader: waterFragmentShader,
        vertexShader: waterVertexShader,
        fog: true,
        uniforms: {
            uTime: { value: 0.0 },

            fogColor: { value: new THREE.Color(colors.depthColor) },
            fogNear: { value: 0.0 },
            fogFar: { value: 0.0 },

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

export const createLampMaterial = () => {
    return new THREE.ShaderMaterial({
        fragmentShader: lampFragmentShader,
        vertexShader: lampVertexShader,
        transparent: true,
        fog: true,
        uniforms: {
            uLampStrength: { value: 0.9 },
            uLampOffset: { value: 0.5 },
            uLampColor: { value: new THREE.Color(colors.lampColor) },

            fogColor: { value: new THREE.Color(colors.depthColor) },
            fogNear: { value: 0.0 },
            fogFar: { value: 0.0 },

            uLampSkyStrength: { value: 1.0 },
        },
    });
};

export const createSkyMaterial = () => {
    return new THREE.ShaderMaterial({
        fragmentShader: skyFragmentShader,
        vertexShader: skyVertexShader,
        transparent: true,
        side: THREE.BackSide,
        fog: true,
        uniforms: {
            uTime: { value: 0.0 },

            fogColor: { value: new THREE.Color(colors.depthColor) },
            fogNear: { value: 0.0 },
            fogFar: { value: 0.0 },

            uStarCount: { value: 60.0 },
            uStarStrength: { value: 0.05 },
            uStarNoiseCount: { value: 50 },
            uStaticNoiseStrength: { value: 0.25 },
            uDynamicNoiseStrength: { value: 1 },
            uDynamicNoiseSpeed: { value: 0.05 },

            uSkyGlowSpeed: { value: 0.5 },
            uSkyColorMultiply: { value: 0.175 },
            uSkyDarkColor: { value: new THREE.Color(colors.darkSkyColor) },
            uSkyLightColor: { value: new THREE.Color(colors.lightSkyColor) },
            uFogSkyStrength: { value: 0.2 },
        },
    });
};
