const level1 = new Level(
    [
        new Chicken(400),
        new Chicken(500),
        new Chicken(700),
        new Chicken(900),
        new Chicken(1200),
        new Chicken(1300),
        new Chicken(1600),
        new SmallChicken(400),
        new SmallChicken(900),
        new SmallChicken(1100),
        new SmallChicken(1300),
        new SmallChicken(1500),
        new SmallChicken(1700),
        new SmallChicken(1900),
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
    ]
);