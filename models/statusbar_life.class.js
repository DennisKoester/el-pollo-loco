class StatusbarLife extends StatusbarObject {
	x = 60;
	y = 0;

	IMAGES_STATUSBAR = [
		"./img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
		"./img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
		"./img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
		"./img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
		"./img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
		"./img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
	];

	constructor() {
		super().loadImage(this.IMAGES_STATUSBAR[0]);
		this.loadImages(this.IMAGES_STATUSBAR);
		this.setPercentage(100);
	}
}
