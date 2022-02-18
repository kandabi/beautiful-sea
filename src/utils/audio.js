import ocean from '../../static/ocean.mp3';

let isPlaying = false;
const audio = new Audio(ocean);
audio.volume = 0.5;
audio.loop = true;

export const toggleAudio = (button) => {
    isPlaying = !isPlaying;
    if (isPlaying) {
        button.classList.remove('is-muted');
        audio.play();
    } else {
        button.classList.add('is-muted');
        audio.pause();
    }
};
