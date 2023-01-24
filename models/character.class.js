class Character extends MoveableObject {
    x = 50;
    y = 50;
    height = 250;
    speed = 7;
    characterLastMovement = 0;
    world; // TODO Why is wold here?!

    walking_sound = new Audio('./audio/walking.mp3');
    jumping_sound = new Audio('./audio/jumping.mp3');
    snoring_sound = new Audio('./audio/snoring.mp3');
    hurt_sound = new Audio('./audio/pepe_hurt.mp3');
    dead_sound = new Audio('./audio/pepe_dead.mp3');

    offset = {
        top: 100,
        bottom: 10,
        right: 20,
        left: 20
    }


    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-51.png'
    ];

    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_SLEEPING = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEPING);

        this.applyGravity();

        this.animateCharacter();

    }


    animateCharacter() {

        setStopableInterval(() => {
            walking_sound.pause();

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                walking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                walking_sound.play();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                jumping_sound.play();
            }

            this.world.camera_x = -this.x + 100;

        }, 1000 / 60);


        tsetStopableInterval(() => {
            snoring_sound.pause();

            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                dead_sound.play();
                this.gameIsLost();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                hurt_sound.play();
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
                this.setTimeStamp();
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.setTimeStamp();
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.characterMoveTimepassed() > 3) {
                this.playAnimation(this.IMAGES_SLEEPING);
                snoring_sound.play();
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
            console.log('still moving');

        }, 150);
    }


    characterMoveTimepassed() {
        let timepassed = new Date().getTime() - this.characterLastMovement;
        timepassed = timepassed / 1000;
        return timepassed;
    }


    setTimeStamp() {
        this.characterLastMovement = new Date().getTime();
    }


    gameIsLost() {
        setTimeout(() => {
            showGameOverScreen();
            resetBackgroundMusic();
            clearAllIntervals();
        }, 3000);
    }
}