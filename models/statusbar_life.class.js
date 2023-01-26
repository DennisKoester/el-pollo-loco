class StatusbarLife extends StatusbarObject {

    IMAGES_STATUSBAR = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    /*  x = 70;
     y = 0;
     width = 200;
     height = 60; */ // TODO This or down with this.x ?!

    constructor() {
        super().loadImage(this.IMAGES_STATUSBAR[0]);
        this.loadImages(this.IMAGES_STATUSBAR);
        this.x = 60;
        this.y = 0;
        this.setPercentage(100);
    }
}