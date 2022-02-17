import ocean from '../../static/ocean.mp3';

let isPlaying = false;
const audio = new Audio(ocean);
audio.volume = 0.25;
audio.loop = true;

export const setupAudio = () => {
    audio.play();
    isPlaying = true;
};

export const toggleAudio = () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
        audio.play();
    } else {
        audio.pause();
    }
};
