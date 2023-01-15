class StatusbarEndboss extends StatusbarObject {

    IMAGES_STATUSBAR = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR);
        this.x = 500;
        this.y = 0;
        this.setPercentage(100);
    }

}