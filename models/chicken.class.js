class Chicken extends MoveableObject {

    y = 355;
    height = 70;
    width = 70;

    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 200 + Math.random() * 500; // random number between 200 and 700
        this.animate();
    }
    animate() {
        setInterval(() => {
            this.x -= 0.2;
        }, 1000 / 60)
    }
}