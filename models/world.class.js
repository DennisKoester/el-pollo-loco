class World {
	level = level1;
	canvas;
	ctx;
	keyboard;
	camera_x = 0;
	collectedBottles = 0;
	character = new Character();
	statusBarLife = new StatusbarLife();
	statusBarCoin = new StatusbarCoin();
	statusBarBottle = new StatusbarBottle();
	statusBarEndboss = new StatusbarEndboss();
	statusBarEndbossIcon = new StatusbarEndbossIcon();
	throwAbleObject = [];

	AUDIO = {
		background_music: new Audio("./audio/background_music.mp3"),
		chicken_dead_sound: new Audio("./audio/chicken_dead.mp3"),
		bottle_collect_sound: new Audio("./audio/bottle.mp3"),
		endboss_fight: new Audio("./audio/enboss_fight.mp3"),
		bottle_smash: new Audio("./audio/bottle_smash.mp3"),
		game_over_sound: new Audio("./audio/game_over.mp3"),
		throw_sound: new Audio("./audio/throw_bottle.mp3"),
		coin_collect_sound: new Audio("./audio/coin.mp3"),
		game_win_sound: new Audio("./audio/game_win.mp3"),
		walking_sound: new Audio("./audio/walking.mp3"),
		jumping_sound: new Audio("./audio/jumping.mp3"),
		snoring_sound: new Audio("./audio/snoring.mp3"),
		hurt_sound: new Audio("./audio/pepe_hurt.mp3"),
		dead_sound: new Audio("./audio/pepe_dead.mp3"),
	};

	constructor(canvas, keyboard) {
		this.ctx = canvas.getContext("2d");
		this.canvas = canvas;
		this.keyboard = keyboard;
		this.draw();
		this.setWorld();
		this.checkCollisions();
		this.throwObjectInterval();
		this.checkCollisionsWithThrowingBottle();
	}

	/**
	 * Links the world class with the character class.
	 */
	setWorld() {
		this.character.world = this;
	}

	/**
	 * Checks all collisions between certain objects.
	 */
	checkCollisions() {
		setStopableInterval(() => {
			this.checkCollisionsEnemy();
			this.checkCollisionCoins();
			this.checkCollisonsBottles();
			this.checkCollisionsEndboss();
		}, 1000 / 30);
	}

	/**
	 * Checks the collision of a throwing bottle with the endboss.
	 */
	checkCollisionsWithThrowingBottle() {
		setStopableInterval(() => {
			this.checkCollisionBottleWithEndboss();
		}, 200);
	}

	/**
	 * Sets an interval for the throwing bottle.
	 */
	throwObjectInterval() {
		setStopableInterval(() => {
			this.checkThrowObjects();
		}, 150);
	}

	/**
	 * Throws a bottle if possible. Changes statusbar and plays sound.
	 */
	checkThrowObjects() {
		if (this.canBottleBeThrown()) {
			let bottle = new ThrowableObject(
				this.character.x,
				this.character.y + 100,
				this.character.otherDirection
			);
			this.throwAbleObject.push(bottle);
			this.collectedBottles--;
			this.character.reduceProgressbarBottle();
			this.statusBarBottle.setPercentage(
				this.character.progressBottleBar
			);
			this.AUDIO.throw_sound.play();
		}
	}

	/**
	 * Checks if "D" is pressed and bottles are collected.
	 * @returns {boolean}
	 */
	canBottleBeThrown() {
		return this.keyboard.D && this.collectedBottles > 0;
	}

	/**
	 * Checks collision between character an enemy.
	 */
	checkCollisionsEnemy() {
		this.level.enemies.forEach((enemy) => {
			if (this.character.isColliding(enemy) && !this.character.isHurt()) {
				if (this.character.isAboveGround()) {
					this.killChickenWithJump(enemy);
				} else {
					this.character.hit();
					this.statusBarLife.setPercentage(this.character.energy);
				}
			}
		});
	}

	/**
	 * Checks collision between character and the endboss.
	 */
	checkCollisionsEndboss() {
		this.level.endboss.forEach((endboss) => {
			if (
				this.character.isColliding(endboss) &&
				!this.character.isHurt() &&
				!endboss.isDead()
			) {
				if (this.character.isAboveGround()) {
				} else {
					this.character.hit();
					this.statusBarLife.setPercentage(this.character.energy);
				}
			}
		});
	}

	/**
	 * Checks collision between character and a coin to collect.
	 */
	checkCollisionCoins() {
		this.level.coins.forEach((coin) => {
			if (this.character.isColliding(coin)) {
				this.coinCollected(coin);
				this.character.raiseProgressbarCoin();
				this.statusBarCoin.setPercentage(this.character.progessCoinBar);
				this.AUDIO.coin_collect_sound.play();
			}
		});
	}

	/**
	 * Check collision between character and a bottle to collect.
	 */
	checkCollisonsBottles() {
		this.level.bottles.forEach((bottle) => {
			if (this.character.isColliding(bottle)) {
				this.bottleCollected(bottle);
				this.character.raiseProgressbarBottle();
				this.statusBarBottle.setPercentage(
					this.character.progressBottleBar
				);
				this.AUDIO.bottle_collect_sound.play();
				this.AUDIO.bottle_collect_sound.volume = 1;
			}
		});
	}

	/**
	 * Checks collision between throwing bottle and the endboss.
	 */
	checkCollisionBottleWithEndboss() {
		this.throwAbleObject.forEach((bottle) => {
			this.level.endboss.forEach((endboss) => {
				if (bottle.isColliding(endboss)) {
					endboss.hitEndboss(endboss.energy);
					this.statusBarEndboss.setPercentage(endboss.energy);
					this.AUDIO.bottle_smash.play();
					this.AUDIO.chicken_dead_sound.play();
					setTimeout(() => {
						this.eraseThrowingBottleFromArray(bottle);
					}, 180);
				}
			});
		});
	}

	/**
	 * Removes the coin of the game when collected.
	 */
	coinCollected(coin) {
		let i = this.level.coins.indexOf(coin);
		this.level.coins.splice(i, 1);
	}

	/**
	 * Removes the bottle of the game when collected.
	 */
	bottleCollected(bottle) {
		let i = this.level.bottles.indexOf(bottle);
		this.level.bottles.splice(i, 1);
		this.collectedBottles++;
	}

	/**
	 * Kills the chicken when jumped on. Plays sound and let the character jump.
	 * @param {object} enemy The current enemy.
	 */
	killChickenWithJump(enemy) {
		enemy.chickenKilled();
		this.character.jump();
		this.AUDIO.chicken_dead_sound.play();
		clearInterval(enemy.animateChickenInterval);
		clearInterval(enemy.moveChickenInterval);
		enemy.loadImage(enemy.IMAGE_DEAD);
		setTimeout(() => {
			this.eraseEnemyFromArray(enemy);
		}, 750);
	}

	/**
	 * Removes the enemy from the game when killed.
	 * @param {object} enemy The current enemy.
	 */
	eraseEnemyFromArray(enemy) {
		let i = this.level.enemies.indexOf(enemy);
		this.level.enemies.splice(i, 1);
	}

	/**
	 * Removes the bottle from the array when throwed.
	 * @param {object} bottle The current bottle.
	 */
	eraseThrowingBottleFromArray(bottle) {
		let i = this.throwAbleObject.indexOf(bottle);
		this.throwAbleObject.splice(i, 1);
	}

	/**
	 * Draws all objects in the canvas.
	 */
	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.ctx.translate(this.camera_x, 0);

		this.addWoldGraphics();
		this.addAllMoveableObjects();

		this.ctx.translate(-this.camera_x, 0);

		this.addStatusBars();

		let self = this;
		requestAnimationFrame(function () {
			self.draw();
		});
	}

	/**
	 * Adds all moveable objects to the world.
	 */
	addAllMoveableObjects() {
		this.addObjectsToMap(this.level.bottles);
		this.addObjectsToMap(this.level.coins);
		this.addObjectsToMap(this.level.enemies);
		this.addObjectsToMap(this.level.endboss);
		this.addObjectsToMap(this.throwAbleObject);
		this.addToMap(this.character);
	}

	/**
	 * Adds all graphics from the world inside.
	 */
	addWoldGraphics() {
		this.addObjectsToMap(this.level.backgroundObjects);
		this.addObjectsToMap(this.level.clouds);
	}

	/**
	 * Add all status bars to the canvas.
	 */
	addStatusBars() {
		this.addToMap(this.statusBarLife);
		this.addToMap(this.statusBarCoin);
		this.addToMap(this.statusBarBottle);
		this.addToMap(this.statusBarEndboss);
		this.addToMap(this.statusBarEndbossIcon);
	}

	/**
	 * Adds all the objects from the current array to the map.
	 * @param {object} objects The specific object which shall be added.
	 */
	addObjectsToMap(objects) {
		objects.forEach((o) => {
			this.addToMap(o);
		});
	}

	/**
	 * Adds the moveable object to the map.
	 * @param {object} mo The specific moveable object which shall be added.
	 */
	addToMap(mo) {
		if (mo.otherDirection) {
			this.flipImage(mo);
		}
		mo.draw(this.ctx);
		// mo.drawFrame(this.ctx); For later debugging instances
		if (mo.otherDirection) {
			this.flipImageBack(mo);
		}
	}

	/**
	 * Flips the images of the moveable object when direction is changed.
	 * @param {object} mo The specific moveable object which shall be flipped.
	 */
	flipImage(mo) {
		this.ctx.save();
		this.ctx.translate(mo.width, 0);
		this.ctx.scale(-1, 1);
		mo.x = mo.x * -1;
	}

	/**
	 * Flips the images back of the moveable object when direction is changed.
	 * @param {object} mo The specific moveable object which shall be flipped.
	 */
	flipImageBack(mo) {
		this.ctx.restore();
		mo.x = mo.x * -1;
	}
}
