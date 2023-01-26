class StatusbarCoin extends StatusbarObject {

    IMAGES_STATUSBAR = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];


    constructor() {
        super().loadImage(this.IMAGES_STATUSBAR[0]);
        this.loadImages(this.IMAGES_STATUSBAR);
        this.x = 40;
        this.y = 40;
        this.setPercentage(0);
    }

}
