class Cloud extends MoveableObject {
    y = 20;
    height = 300;
    width = 500;

    constructor(imagePath) {
        super().loadImage(imagePath);

        this.x = Math.random() * 500;

        this.speed = 0.15 + Math.random() * 0.5; // Math Random generates a number between 0 and 1

        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}