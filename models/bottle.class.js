class Bottle extends DrawableObject {
    width = 100;
    height = 80;
    index = Math.floor(Math.random() * 2);
    
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }

    IMAGES_BOTTLE = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    
    constructor(x) {
        super().loadImage(this.IMAGES_BOTTLE[this.index]);
        this.x = x + Math.random() * 2000;
        this.y = 340;

    }

}