import ocean from '../../static/ocean.mp3';

export const setupAudio = () => {
    const audio = new Audio(ocean);
    audio.volume = 0.5;
    audio.loop = true;
    audio.play();
};
