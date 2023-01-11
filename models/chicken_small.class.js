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


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);

        this.loadImages(this.IMAGES_WALKING);

        this.x = 800 + Math.random() * 500; // random number between 200 and 700

        this.speed = 0.15 + Math.random() * 0.5; // Math Random generates a number between 0 and 1

        this.animate();
    }


    animate() {

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}