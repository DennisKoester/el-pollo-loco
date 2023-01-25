let level1;

function initLevel() {

    level1 = new Level(
        [
            new Chicken(400),
            new Chicken(800),
            new Chicken(1000),
            new Chicken(1300),
            new Chicken(1700),
            new Chicken(1900),
            new Chicken(2400),
            new Chicken(2700),
            new Chicken(3200),
            new Chicken(3500),
            new SmallChicken(600),
            new SmallChicken(900),
            new SmallChicken(1400),
            new SmallChicken(1700),
            new SmallChicken(1900),
            new SmallChicken(2300),
            new SmallChicken(2700),
            new SmallChicken(3100),
            new SmallChicken(3400),
            new SmallChicken(3600)
        ],

        [
            new Endboss()
        ],

        [
            new Cloud('./img/5_background/layers/4_clouds/1.png', 100),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 600),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 1100),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 1600),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 2100),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 2600),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 3100),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 3600),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 4100),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 4600),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 5100),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 5600)
        ],

        [
            new BackgroundObject('./img/5_background/layers/air.png', -719),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', -719),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', -719),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', -719),

            new BackgroundObject('./img/5_background/layers/air.png', 0),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 0),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 0),

            new BackgroundObject('./img/5_background/layers/air.png', 719),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719),

            new BackgroundObject('./img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 2),

            new BackgroundObject('./img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 3),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 3),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 3),

            new BackgroundObject('./img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 4),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 4),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 4),

            new BackgroundObject('./img/5_background/layers/air.png', 719 * 5),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 5),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 5),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 5),

            new BackgroundObject('./img/5_background/layers/air.png', 719 * 6),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 6),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 6),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 6)
        ],

        [
            new Bottle(200),
            new Bottle(450),
            new Bottle(700),
            new Bottle(900),
            new Bottle(1050),
            new Bottle(1200),
            new Bottle(1350),
            new Bottle(1550),
            new Bottle(1700),
            new Bottle(1950),
        ],

        [
            new Coin(200),
            new Coin(450),
            new Coin(550),
            new Coin(700),
            new Coin(750),
            new Coin(750),
            new Coin(830),
            new Coin(950),
            new Coin(1150),
            new Coin(1150),
            new Coin(1250),
            new Coin(1350),
            new Coin(1400),
            new Coin(1400),
            new Coin(1550),
            new Coin(1550),
            new Coin(1650),
            new Coin(1650),
            new Coin(1850),
            new Coin(2000),
        ]
    );
}