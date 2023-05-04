class Endboss extends MoveableObject {
	height = 400;
	width = 300;
	y = 55;
	x = 3800;
	speed = 15;
	speedThroughHit = 50;
	hadFirstContact = false;

	offset = {
		top: 90,
		bottom: 20,
		right: 20,
		left: 20,
	};

	IMAGES_WALKING = [
		"./img/4_enemie_boss_chicken/1_walk/G1.png",
		"./img/4_enemie_boss_chicken/1_walk/G2.png",
		"./img/4_enemie_boss_chicken/1_walk/G3.png",
		"./img/4_enemie_boss_chicken/1_walk/G4.png",
	];

	IMAGES_ALERT = [
		"./img/4_enemie_boss_chicken/2_alert/G5.png",
		"./img/4_enemie_boss_chicken/2_alert/G6.png",
		"./img/4_enemie_boss_chicken/2_alert/G7.png",
		"./img/4_enemie_boss_chicken/2_alert/G8.png",
		"./img/4_enemie_boss_chicken/2_alert/G9.png",
		"./img/4_enemie_boss_chicken/2_alert/G10.png",
		"./img/4_enemie_boss_chicken/2_alert/G11.png",
		"./img/4_enemie_boss_chicken/2_alert/G12.png",
	];

	IMAGES_HURT = [
		"./img/4_enemie_boss_chicken/4_hurt/G21.png",
		"./img/4_enemie_boss_chicken/4_hurt/G22.png",
		"./img/4_enemie_boss_chicken/4_hurt/G23.png",
	];

	IMAGES_DEAD = [
		"./img/4_enemie_boss_chicken/5_dead/G24.png",
		"./img/4_enemie_boss_chicken/5_dead/G25.png",
		"./img/4_enemie_boss_chicken/5_dead/G26.png",
	];

	constructor() {
		super().loadImage(this.IMAGES_WALKING[0]);
		this.loadImages(this.IMAGES_WALKING);
		this.loadImages(this.IMAGES_ALERT);
		this.loadImages(this.IMAGES_HURT);
		this.loadImages(this.IMAGES_DEAD);
		this.animateEndbossOnReach();
	}

	/**
	 * Calls the animations for the endboss only in reach.
	 */
	animateEndbossOnReach() {
		setStopableInterval(() => {
			this.endbossReached();
			if (this.hadFirstContact) {
				this.animateEndboss();
			}
		}, 120);
	}

	/**
	 * Animations for the endboss behavior.
	 */
	animateEndboss() {
		if (this.isDead()) {
			this.dead();
		} else if (
			!this.isDead() &&
			!this.isHurtEndboss() &&
			this.endbossFightBegins() &&
			!this.endbossInReach()
		) {
			this.moveLeft();
		} else if (
			!this.isDead() &&
			!this.isHurtEndboss() &&
			this.endbossFightBegins() &&
			this.endbossInReach()
		) {
			this.moveRight();
		} else if (!this.isDead() && this.isHurtEndboss()) {
			this.hurt();
		} else {
			this.alert();
		}
	}

	/**
	 * Plays the dead animation for the endboss and calls the gameIsWon fucntion.
	 */
	dead() {
		this.playAnimation(this.IMAGES_DEAD);
		gameIsWon();
	}

	/**
	 * Animates the endboss while moving right.
	 */
	moveRight() {
		setTimeout(() => {
			super.moveRight();
			this.playAnimation(this.IMAGES_WALKING);
			this.otherDirection = true;
		}, 500);
	}

	/**
	 * Starts the animation for the endboss. Endboss is moving left and endboss sound starts.
	 */
	moveLeft() {
		setTimeout(() => {
			super.moveLeft();
			this.playAnimation(this.IMAGES_WALKING);
			this.otherDirection = false;
		}, 500);
	}

	/**
	 * Plays alert animation for the endboss.
	 */
	alert() {
		this.playAnimation(this.IMAGES_ALERT);
	}

	/**
	 * Plays the hurt animation for the endboss and let him rush forward.
	 */
	hurt() {
		this.playAnimation(this.IMAGES_HURT);
		this.endbossRushForward();
	}

	/**
	 * Checks if the character is close enough to the endboss to let him move.
	 * @returns {boolean}
	 */
	endbossInReach() {
		return world.level.endboss[0].x < world.character.x - 100;
	}

	/**
	 * Sets the first contact on true when the character has reached a specific position.
	 */
	endbossReached() {
		if (world.character.x > 3100) {
			playEndbossSound();
			this.hadFirstContact = true;
		}
	}

	/**
	 * Checks if the character has a certain distance to the endboss.
	 * @returns {boolean}
	 */
	endbossFightBegins() {
		return world.character.x > world.level.endboss[0].x - 500;
	}

	/**
	 * Gives the endboss a boost forward when hitted.
	 */
	endbossRushForward() {
		if (!this.otherDirection) {
			world.level.endboss[0].x -= this.speedThroughHit;
		} else {
			world.level.endboss[0].x += this.speedThroughHit;
		}
	}
}
