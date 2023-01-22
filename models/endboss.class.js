class Endboss extends MoveableObject {
    height = 400;
    width = 300;
    y = 55;
    x = 3800;
    hadFirstContact = false;
    speedThroughHit = 50;
    speed = 15;

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

    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png',
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
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animateEndbossOnReach();
    }


   /*  animateEndbossOnReach() {
        setInterval(() => {
            if (world) {
                this.animateEndboss();
            }
            if (world && this.endbossReached()) {
                this.hadFirstContact = true;
            }
        }, 120);
    } */


    animateEndbossOnReach() {
        setInterval(() => {
            console.log('check', this.endbossReached());
            if (world && this.endbossReached()) {
                this.hadFirstContact = true;
                this.animateEndboss();
            }
        }, 120);
    }


    animateEndboss() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (!this.isDead() && !this.isHurtEndboss() && this.endbossFightBegins()) {
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
        } else if (!this.isDead() && !this.endbossFightBegins()) {
            this.playAnimation(this.IMAGES_ALERT);
            console.log('alert');
        } else if (!this.isDead() && this.isHurtEndboss() && !this.hadFirstContact) {
            this.playAnimation(this.IMAGES_HURT);
            this.endbossRushForward();
        }
    }



    endbossReached() {
        return world.character.x > 3500 && !this.hadFirstContact; // TODO What's WRONG ??
    }


    endbossFightBegins() {
        return world.character.x > world.level.endboss[0].x - 400;
    }


    endbossRushForward() {
        let speedIncreaseThroughHit = world.level.endboss[0].x -= this.speedThroughHit;
        return speedIncreaseThroughHit;
    }
}


