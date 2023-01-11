class ThrowableObject extends MoveableObject {

    bottlehit = false;

    offset = {
        top: 5,
        bottom: 5,
        right: 5,
        left: 5
    }

    IMAGES_BOTTLE_ROTATION = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    IMAGES_BOTTLE_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    constructor(x, y) {
        super().loadImage('./img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
        this.checkHitBottle();
        this.animate();
    }


    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            if (!world.character.otherDirection && world.keyboard.RIGHT) {
                this.x += 15 + 5;
            } else
                if (world.character.otherDirection && world.keyboard.LEFT) {
                    this.x -= 15 + 5;
                }
            if (!world.character.otherDirection) {
                this.x += 15;
            }
            if (world.character.otherDirection) {
                this.x -= 15;
            }
        }, 25);
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
        }, 50);
    }


    splash() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        }, 50);
    }


    checkHitBottle() {

        for (let i = 0; i < world.throwAbleObject.length; i++) {
            const bottle = world.throwAbleObject[i];

            world.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    console.log('Bottle hit');
                    clearInterval(this.animate);
                    this.splash();
                }

            });
        }
    }
}