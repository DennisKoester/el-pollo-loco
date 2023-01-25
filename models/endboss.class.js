class Endboss extends MoveableObject {
    height = 400;
    width = 300;
    y = 55;
    x = 3800;
    hadFirstContact = false;
    speedThroughHit = 50;
    speed = 15;
    sameHeight = false;

    offset = {
        top: 90,
        bottom: 20,
        right: 20,
        left: 20
    }

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animateEndbossOnReach();
    }


    animateEndbossOnReach() {
        setStopableInterval(() => {
            if (world) {
                this.endbossReached();  //maybe start from world to cut the if statement
            }
            if (world && this.hadFirstContact == true) {
                this.animateEndboss();
            }
        }, 120);
    }


    animateEndboss() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);

        } else if (!this.isDead() && !this.isHurtEndboss() && this.endbossFightBegins() && !this.facingEachOther()) {
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
            this.otherDirection = false;

        } else if (!this.isDead() && !this.isHurtEndboss() && this.endbossFightBegins() && this.facingEachOther()) {
            this.playAnimation(this.IMAGES_WALKING);
            this.moveRight();
            this.otherDirection = true;

        } else if (!this.isDead() && !this.endbossFightBegins()) {
            this.playAnimation(this.IMAGES_ALERT);

        } else if (!this.isDead() && this.isHurtEndboss()) {
            this.playAnimation(this.IMAGES_HURT);
            this.endbossRushForward();
        }
    }


    sameHeight() {
        return world.level.endboss[0].x == world.character.x; // TODO Not working. Only animate if not the same x height.
    }


    facingEachOther() {
        return world.level.endboss[0].x < world.character.x - 100;
    }


    endbossReached() {
        if (world.character.x > 3400 && !this.hadFirstContact) {
            this.hadFirstContact = true;
        }
    }


    endbossFightBegins() {
        return world.character.x > world.level.endboss[0].x - 500;
    }


    endbossRushForward() {
        let speedIncreaseThroughHit = world.level.endboss[0].x -= this.speedThroughHit;
        return speedIncreaseThroughHit;
    }
}


