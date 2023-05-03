class ThrowableObject extends MoveableObject {
	offset = {
		top: 10,
		bottom: 10,
		right: 10,
		left: 10,
	};

	IMAGES_BOTTLE_ROTATION = [
		"./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
		"./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
		"./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
		"./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
	];

	IMAGES_BOTTLE_SPLASH = [
		"./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
		"./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
		"./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
		"./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
		"./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
		"./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
	];

	constructor(x, y, otherDirection) {
		super().loadImage("./img/7_statusbars/3_icons/icon_salsa_bottle.png");
		this.x = x;
		this.y = y;
		this.height = 90;
		this.width = 80;
		this.otherDirection = otherDirection;
		this.loadImages(this.IMAGES_BOTTLE_ROTATION);
		this.loadImages(this.IMAGES_BOTTLE_SPLASH);
		this.throwBottle();
	}

	/**
	 * Animates the throwing bottle and adds gravity to it.
	 */
	throwBottle() {
		this.applyGravityToBottle();
		this.animateBottle();
	}

	/**
	 * Applies gravity to the bottle.
	 */
	applyGravityToBottle() {
		this.applyGravity();
		this.speedY = 25;
		setStopableInterval(() => {
			if (this.otherDirection) {
				this.x -= 20;
			} else {
				this.otherDirection;
				this.x += 20;
			}
		}, 25);
		world.character.stopSnoring();
	}

	/**
	 * Animates the bottle while flying and on collision.
	 */
	animateBottle() {
		setStopableInterval(() => {
			if (world.level.endboss[0].isHurtEndboss()) {
				this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
			} else {
				this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
			}
		}, 1000 / 25);
	}
}
