class Coin extends MoveableObject {

    width = 120;
    height = 120;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }

    IMAGES_COIN = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    constructor(x) {
        super();

        this.loadImages(this.IMAGES_COIN);

        this.x = x + Math.random() * 2000;

        this.y = 100 + Math.random() * 100;

        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 350);
    }
}