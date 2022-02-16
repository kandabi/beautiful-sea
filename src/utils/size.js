export const sizes = {
    height: window.innerHeight,
    width: window.innerWidth,
};

export const resizeListener = (camera, renderer) => {
    window.addEventListener('resize', () => {
        sizes.height = window.innerHeight;
        sizes.width = window.innerWidth;

        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(sizes.width, sizes.height);
    });
};
