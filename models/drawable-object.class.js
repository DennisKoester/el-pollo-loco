class DrawableObject {
	x = 150;
	y = 230;
	height = 150;
	width = 100;
	img;
	imageCache = {};
	currentImage = 0;

	/**
	 * Loads an specific image.
	 * @param {string} path The path of the image which will be loaded.
	 */
	loadImage(path) {
		this.img = new Image();
		this.img.src = path;
	}

	/**
	 * Loads an array of images.
	 * @param {array} arr ['img/image01.png', 'img/image2.png', ...]
	 */
	loadImages(arr) {
		arr.forEach((path) => {
			// TODO What is path?!
			let img = new Image();
			img.src = path;
			this.imageCache[path] = img;
		});
	}

	/**
	 * Draws an specific image to a specific postion inside the canvas.
	 * @param {object} ctx The context of the canvas.
	 */
	draw(ctx) {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}

	/**
	 * Draws frames around specific elements to see the actual hit box.
	 * @param {object} ctx The context of the canvas.
	 */
	drawFrame(ctx) {
		if (
			this instanceof Character ||
			this instanceof Chicken ||
			this instanceof Endboss ||
			this instanceof ThrowableObject ||
			this instanceof SmallChicken
		) {
			ctx.beginPath();
			ctx.lineWidth = "5";
			ctx.strokeStyle = "blue";
			ctx.rect(
				this.x + this.offset.left,
				this.y + this.offset.top,
				this.width - this.offset.right - this.offset.left,
				this.height - this.offset.top - this.offset.bottom
			);
			ctx.stroke();
		}
	}
}
