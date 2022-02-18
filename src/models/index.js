import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import lightHouseModel from '../../static/lighthouse.glb';
import { setupLighthouse } from '../geometry';

const loader = new GLTFLoader();

export const loadLighthouse = (scene) => {
    return loader
        .loadAsync(lightHouseModel)
        .then((model) => {
            return setupLighthouse(scene, model);
        })
        .catch((error) => console.log('error', error));
};
