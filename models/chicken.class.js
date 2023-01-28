class Chicken extends MoveableObject {
    y = 355;
    height = 70;
    width = 70;
    intervalIds = [];

    offset = {
        top: 10,
        bottom: 10,
        right: 10,
        left: 10
    }

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    constructor(x) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = x + Math.random() * 500; // random number between 200 and 700
        this.speed = 0.20 + Math.random() * 0.5; // Math Random generates a number between 0 and 1
        this.animateChicken();
    }


    animateChicken() {
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