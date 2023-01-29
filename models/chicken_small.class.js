class SmallChicken extends MoveableObject {
    y = 368;
    height = 55;
    width = 55;

    offset = {
        top: 10,
        bottom: 10,
        right: 10,
        left: 10
    }

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGE_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];


    constructor(x) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = x + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animateSmallChicken();
    }


    /**
     * Animation for the smaller chicken for movement and behavior.
     */
    animateSmallChicken() {
        let intervalChicken = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setStopableInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.loadImage(this.IMAGE_DEAD);
                clearInterval(intervalChicken);
            }
        }, 100);
    }
}