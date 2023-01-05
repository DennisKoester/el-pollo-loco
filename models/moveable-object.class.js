class MoveableObject {
    x = 150;
    y = 230;
    img;
    height = 150;
    width = 100;
    imageCache = {};

    //loadImage('img/test.png')
    loadImage(path) {
        this.img = new Image(); // document.getElementById('image') <img id="image>" src>
        this.img.src = path;
    }


    /**
     * 
     * @param {array} arr ['img/image01.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    moveRight() {

    }

    moveLeft() {

    }
}