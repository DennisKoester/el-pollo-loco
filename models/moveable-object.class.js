class MoveableObject extends DrawableObject {
    speed = 0.15;
    speedY = 0;
    energy = 100;
    lastHit = 0;
    acceleration = 2;
    progessCoinBar = 0;
    progressBottleBar = 0;
    otherDirection = false;


    /**
     * Applies gravitiy to an element.
     */
    applyGravity() {
        setStopableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                return this.y = 180;
            }
        }, 1000 / 60);
    }


    /**
     * Checks if the moveable object is above the ground.
     * @returns {boolean}
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }


    /**
     * Checks if the element collides with an moveable object.
     * @param {string} mo A moveable object.
     * @returns {number} The collision point of the moveable object and the element.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    /**
     * Decreases life of the character when hit. Sets time stamp for last hit.
     */
    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Decreases life of the endboss when hit. Sets time stamp for last hit.
     */
    hitEndboss() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Calculates the time since the character was last hitted.
     * @returns {number} The time which is passed since last hit.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    /**
     * Calculates the time since the endboss was last hitted.
     * @returns {number} The time which is passed since last hit.
     */
    isHurtEndboss() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }


    /**
     * Checks if the object is dead.
     * @returns {boolean}
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * Sets the energy to 0 when chicken is killed.
     * @returns {number}
     */
    chickenKilled() {
        return this.energy = 0;
    }


    /**
     * Raises the progress in the progress coin bar.
     */
    raiseProgressbarCoin() {
        this.progessCoinBar += 5;
    }


    /**
     * Raises the progress in the progress bottle bar.
     */
    raiseProgressbarBottle() {
        this.progressBottleBar += 10;
    }


    /**
     * Reduces the progress in the progress bottle bar.
     */
    reduceProgressbarBottle() {
        this.progressBottleBar -= 10;
    }


    /**
     * Plays the animation of the images inside of the current array.
     * @param {string} images Path of the current image.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Moves the moveable object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * Moves the moveable object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * Makes the moveable object jump.
     */
    jump() {
        this.speedY = 30;
    }
}