class Cloud extends MoveableObject {
    y = 20;
    height = 300;
    width = 500;

    constructor(imagePath, x) {
        super().loadImage(imagePath, x);
        this.x = x;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animateClouds();
    }

    /**
     * Animation for the clouds.
     */
    animateClouds() {
        setStopableInterval(() => {
            this.moveLeft();
        }, 50);
    }
}