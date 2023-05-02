class Character extends MoveableObject {
	x = 50;
	y = 50;
	height = 250;
	speed = 7;
	characterLastMovement = 0;
	isWalking = false;
	isSnooring = false;

	offset = {
		top: 100,
		bottom: 10,
		right: 20,
		left: 20,
	};

	IMAGES_WALKING = [
		"./img/2_character_pepe/2_walk/W-21.png",
		"./img/2_character_pepe/2_walk/W-22.png",
		"./img/2_character_pepe/2_walk/W-23.png",
		"./img/2_character_pepe/2_walk/W-24.png",
		"./img/2_character_pepe/2_walk/W-25.png",
		"./img/2_character_pepe/2_walk/W-26.png",
	];

	IMAGES_JUMPING = [
		"./img/2_character_pepe/3_jump/J-31.png",
		"./img/2_character_pepe/3_jump/J-32.png",
		"./img/2_character_pepe/3_jump/J-33.png",
		"./img/2_character_pepe/3_jump/J-34.png",
		"./img/2_character_pepe/3_jump/J-35.png",
		"./img/2_character_pepe/3_jump/J-36.png",
		"./img/2_character_pepe/3_jump/J-37.png",
		"./img/2_character_pepe/3_jump/J-38.png",
		"./img/2_character_pepe/3_jump/J-39.png",
	];

	IMAGES_HURT = [
		"./img/2_character_pepe/4_hurt/H-41.png",
		"./img/2_character_pepe/4_hurt/H-42.png",
		"./img/2_character_pepe/4_hurt/H-43.png",
	];

	IMAGES_DEAD = [
		"./img/2_character_pepe/5_dead/D-51.png",
		"./img/2_character_pepe/5_dead/D-52.png",
		"./img/2_character_pepe/5_dead/D-53.png",
		"./img/2_character_pepe/5_dead/D-54.png",
		"./img/2_character_pepe/5_dead/D-55.png",
		"./img/2_character_pepe/5_dead/D-56.png",
		"./img/2_character_pepe/5_dead/D-56.png",
		"./img/2_character_pepe/5_dead/D-55.png",
		"./img/2_character_pepe/5_dead/D-54.png",
		"./img/2_character_pepe/5_dead/D-53.png",
		"./img/2_character_pepe/5_dead/D-52.png",
		"./img/2_character_pepe/5_dead/D-51.png",
	];

	IMAGES_IDLE = [
		"./img/2_character_pepe/1_idle/idle/I-1.png",
		"./img/2_character_pepe/1_idle/idle/I-2.png",
		"./img/2_character_pepe/1_idle/idle/I-3.png",
		"./img/2_character_pepe/1_idle/idle/I-4.png",
		"./img/2_character_pepe/1_idle/idle/I-5.png",
		"./img/2_character_pepe/1_idle/idle/I-6.png",
		"./img/2_character_pepe/1_idle/idle/I-7.png",
		"./img/2_character_pepe/1_idle/idle/I-8.png",
		"./img/2_character_pepe/1_idle/idle/I-9.png",
		"./img/2_character_pepe/1_idle/idle/I-10.png",
	];

	IMAGES_SLEEPING = [
		"./img/2_character_pepe/1_idle/long_idle/I-11.png",
		"./img/2_character_pepe/1_idle/long_idle/I-12.png",
		"./img/2_character_pepe/1_idle/long_idle/I-13.png",
		"./img/2_character_pepe/1_idle/long_idle/I-14.png",
		"./img/2_character_pepe/1_idle/long_idle/I-15.png",
		"./img/2_character_pepe/1_idle/long_idle/I-16.png",
		"./img/2_character_pepe/1_idle/long_idle/I-17.png",
		"./img/2_character_pepe/1_idle/long_idle/I-18.png",
		"./img/2_character_pepe/1_idle/long_idle/I-19.png",
		"./img/2_character_pepe/1_idle/long_idle/I-20.png",
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

	/**
	 * Calls the animation functions for the character
	 */
	animateCharacter() {
		setStopableInterval(() => this.moveCharacter(), 50);
		setStopableInterval(() => this.playCharacter(), 150);
	}

	/**
	 * Animation for the character movement.
	 */
	moveCharacter() {
		if (!this.isDead()) {
			if (this.canMoveRight()) this.moveRight();
			if (this.canMoveLeft()) this.moveLeft();
			if (this.canJump()) this.jump();
			this.scrollMap();
		}
	}

	/**
	 * Animation for the behavior of the character.
	 */
	playCharacter() {
		if (this.isDead()) {
			this.dead();
		} else if (this.isHurt()) {
			this.hurt();
		} else if (this.isAboveGround()) {
			this.jumpAnimation();
		} else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
			this.moveAnimation();
		} else if (this.characterMoveTimepassed() > 4) {
			this.sleepAnimation();
		} else {
			this.idleAnimation();
		}
	}

	/**
	 * Checks if the right button is pressed and character has reached the end of level.
	 * @returns {boolean}
	 */
	canMoveRight() {
		let canMove =
			this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;

		if (canMove) {
			this.isWalking = true;
			this.stopSnooring();
			return canMove;
		} else if (this.isWalking && !this.world.keyboard.LEFT) {
			this.stopSound();
		}
	}

	/**
	 * Checks if the left button is pressed.
	 * @returns {boolean}
	 */
	canMoveLeft() {
		let canMove = this.world.keyboard.LEFT && this.x > 0;

		if (canMove) {
			this.isWalking = true;
			this.stopSnooring();
			return canMove;
		} else if (this.isWalking && !this.world.keyboard.RIGHT) {
			this.stopSound();
		}
	}

	stopSound() {
		this.isWalking = false;
		world.AUDIO.walking_sound.pause();
		console.log("stopping");
	}

	stopSnooring() {
		if (this.isSnooring) {
			world.AUDIO.snoring_sound.pause();
			console.log("snooring stop");
			this.isSnooring = false;
		}
	}

	/**
	 * Checks if the spacebar is pressed and character is not above the ground.
	 * @returns {boolean}
	 */
	canJump() {
		return this.world.keyboard.SPACE && !this.isAboveGround();
	}

	/**
	 * Moves the character to the right and plays sound.
	 */
	moveRight() {
		super.moveRight();
		this.otherDirection = false;
		world.AUDIO.walking_sound.play();
	}

	/**
	 * Moves the character to the left and plays sound.
	 */
	moveLeft() {
		super.moveLeft();
		this.otherDirection = true;
		world.AUDIO.walking_sound.play();
	}

	/**
	 * Lets the character jump and plays sound.
	 */
	jump() {
		super.jump();
		world.AUDIO.jumping_sound.play();
	}

	/**
	 * Plays the dead animation for the character incl. sound and calls the gameIsLost fucntion.
	 */
	dead() {
		this.playAnimation(this.IMAGES_DEAD);
		world.AUDIO.walking_sound.pause();
		world.AUDIO.dead_sound.play();
		gameIsLost();
	}

	/**
	 * Plays the hurt animation for the character and plays sound.
	 */
	hurt() {
		this.playAnimation(this.IMAGES_HURT);
		world.AUDIO.hurt_sound.play();
	}

	/**
	 * Plays the jump animation for the character and calls setTimeStamp function.
	 */
	jumpAnimation() {
		this.playAnimation(this.IMAGES_JUMPING);
		this.setTimeStamp();
	}

	/**
	 * Plays walking animation for the character and calls setTimeStamp function.
	 */
	moveAnimation() {
		this.playAnimation(this.IMAGES_WALKING);
		this.setTimeStamp();
	}

	/**
	 * Plays sleeping animation for the character and plays sound.
	 */
	sleepAnimation() {
		this.isSnooring = true;
		this.playAnimation(this.IMAGES_SLEEPING);
		world.AUDIO.snoring_sound.play();
	}

	/**
	 * Plays idle animation for the character.
	 */
	idleAnimation() {
		this.playAnimation(this.IMAGES_IDLE);
	}

	/**
	 * Scrolls the map while moving the character.
	 */
	scrollMap() {
		this.world.camera_x = -this.x + 100;
	}

	/**
	 * Sets the time which is passed since last movement of the character.
	 * @returns {number}
	 */
	characterMoveTimepassed() {
		let timepassed = new Date().getTime() - this.characterLastMovement;
		timepassed = timepassed / 1000;
		return timepassed;
	}

	/**
	 * Sets a time stamp for the last movement of the character.
	 */
	setTimeStamp() {
		this.characterLastMovement = new Date().getTime();
	}
}
