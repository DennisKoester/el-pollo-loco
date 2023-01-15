class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarLife = new StatusbarLife();
    statusBarCoin = new StatusbarCoin();
    statusBarBottle = new StatusbarBottle();
    statusBarEndboss = new StatusbarEndboss();
    statusBarEndbossIcon = new StatusbarEndbossIcon();
    throwAbleObject = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollisionCoins();
            this.checkCollisonBottles();
        }, 100); // TODO May adjust this
    }


    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100);
            this.throwAbleObject.push(bottle);
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isHurt()) {
                if (this.character.isAboveGround()) {
                    this.killChickenWithJump(enemy);
                    console.log('Enmemy smashed');
                }
                else {
                    this.character.hit();
                    this.statusBarLife.setPercentage(this.character.energy);
                    console.log('Chicken NOT Smashed');
                }
            }
        });
    }


    checkCollisionCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.coinCollected(coin);
                this.character.raiseProgressbarCoin();
                this.statusBarCoin.setPercentage(this.character.progessCoinBar);
            }
        });
    }


    checkCollisonBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottleCollected(bottle);
                this.character.raiseProgressbarBottle();
                console.log('Progess is', this.character.progressBottleBar);
                this.statusBarBottle.setPercentage(this.character.progressBottleBar);
            }
        })
    }


    coinCollected(coin) {
        let i = this.level.coins.indexOf(coin);
        this.level.coins.splice(i, 1);
    }


    bottleCollected(bottle) {
        let i = this.level.bottles.indexOf(bottle);
        this.level.bottles.splice(i, 1);
    }


    killChickenWithJump(enemy) {
        enemy.chickenKilled();
        this.character.speedY = 30;

        setTimeout(() => {
            this.eraseEnemyFromArray(enemy);
        }, 750);
    }


    eraseEnemyFromArray(enemy) {
        let i = this.level.enemies.indexOf(enemy);
        this.level.enemies.splice(i, 1);
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        // ----- Space for fixed objects ----- 
        this.addToMap(this.statusBarLife);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarEndboss);
        this.addToMap(this.statusBarEndbossIcon);
        this.ctx.translate(this.camera_x, 0);


        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwAbleObject);
        this.addToMap(this.character);


        this.ctx.translate(-this.camera_x, 0);


        // this.backgroundObjects.forEach(bgo => {
        //     this.addToMap(bgo);
        // }) // ! Long version


        // Draw() repeats all the time
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });

    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }
}
