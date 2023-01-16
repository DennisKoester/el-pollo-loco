class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_end_x = 4000;

    constructor(enemies, endboss, clouds, backgroundObjects, bottles, coins) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}