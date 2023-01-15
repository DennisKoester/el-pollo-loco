class Coin extends DrawableObject {

    width = 120;
    height = 120;

    IMAGES_COIN = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    constructor(x, y) {
        super().loadImage(this.IMAGES_COIN[0]);

        this.loadImages(this.IMAGES_COIN);

        this.x = x + Math.random() * 2000;

        this.y = y +  Math.random() * 50;

    }
}