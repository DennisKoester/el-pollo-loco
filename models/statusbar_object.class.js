class StatusbarObject extends DrawableObject {
	width = 200;
	height = 60;
	percentage = 100;

	/**
	 * Displays image of the statusbar in relation to the current percentage.
	 * @param {number} percentage The current percentage.
	 */
	setPercentage(percentage) {
		this.percentage = percentage;
		let path = this.IMAGES_STATUSBAR[this.resolveImageIndex()];
		this.img = this.imageCache[path];
	}

	/**
	 * Returns an index in relation to the percentage to show the right image of the statusbar.
	 * @returns {number} Current image index.
	 */
	resolveImageIndex() {
		if (this.percentage == 100) {
			return 5;
		} else if (this.percentage > 70) {
			return 4;
		} else if (this.percentage > 50) {
			return 3;
		} else if (this.percentage > 30) {
			return 2;
		} else if (this.percentage > 10) {
			return 1;
		} else {
			return 0;
		}
	}
}
