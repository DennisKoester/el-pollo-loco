class StatusbarLife extends StatusbarObject {

    IMAGES_STATUSBAR = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    /*  x = 70;
     y = 0;
     width = 200;
     height = 60; */ // TODO This or down with this.x ?!

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR);
        this.x = 20;
        this.y = 0;
        this.setPercentage(100);
    }
}