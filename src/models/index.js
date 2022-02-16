import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import lightHouseModel from '../../static/lighthouse.glb';
import { createModelGui } from '../utils';

const loader = new GLTFLoader();

export const loadLighthouse = (scene) => {
    return loader
        .loadAsync(lightHouseModel)
        .then((model) => setupLighthouse(scene, model))
        .catch((error) => console.log('error', error));
};

const setupLighthouse = (scene, model) => {
    const lighthouse = model.scene;
    lighthouse.position.set(-3.23, -0.3, -3.23);
    lighthouse.scale.set(0.07, 0.07, 0.07);
    scene.add(lighthouse);
    createModelGui(lighthouse);
};
