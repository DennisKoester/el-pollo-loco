class StatusbarBottle extends StatusbarObject {
	IMAGES_STATUSBAR = [
		"./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
		"./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
		"./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
		"./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
		"./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
		"./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
	];

	constructor() {
		super().loadImage(this.IMAGES_STATUSBAR[0]);
		this.loadImages(this.IMAGES_STATUSBAR);
		this.x = 20;
		this.y = 80;
		this.setPercentage(0);
	}
}
