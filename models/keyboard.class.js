class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;
    ESC = false;


    constructor() {
        this.eventKeyboardBtns();
        this.eventTouchpadBtns();
    }


    /**
     * Adds event listeners on specific keys for up and down.
     */
    eventKeyboardBtns() {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 32) keyboard.SPACE = true;
            if (e.keyCode == 37) keyboard.LEFT = true;
            if (e.keyCode == 38) keyboard.UP = true;
            if (e.keyCode == 39) keyboard.RIGHT = true;
            if (e.keyCode == 40) keyboard.DOWN = true;
            if (e.keyCode == 68) keyboard.D = true;
            if (e.keyCode == 27) keyboard.ESC = true;
        });


        window.addEventListener('keyup', (e) => {
            if (e.keyCode == 32) keyboard.SPACE = false;
            if (e.keyCode == 37) keyboard.LEFT = false;
            if (e.keyCode == 38) keyboard.UP = false;
            if (e.keyCode == 39) keyboard.RIGHT = false;
            if (e.keyCode == 40) keyboard.DOWN = false;
            if (e.keyCode == 68) keyboard.D = false;
            if (e.keyCode == 27) keyboard.ESC = false;
        });
    }



    /**
    * Adds event listeners on specific keys for up and down. Only for mobile buttons.
    */
    eventTouchpadBtns() {
        setTimeout(() => {
            document.getElementById('btnMobileLeft').addEventListener('touchstart', (event) => {
                event.preventDefault();
                this.LEFT = true;
            });

            document.getElementById('btnMobileLeft').addEventListener('touchend', (event) => {
                event.preventDefault();
                this.LEFT = false;

            });

            document.getElementById('btnMobileRight').addEventListener('touchstart', (event) => {
                event.preventDefault();
                this.RIGHT = true;
            });

            document.getElementById('btnMobileRight').addEventListener('touchend', (event) => {
                event.preventDefault();
                this.RIGHT = false;
            });

            document.getElementById('btnMobileSpace').addEventListener('touchstart', (event) => {
                event.preventDefault();
                this.SPACE = true;
            });

            document.getElementById('btnMobileSpace').addEventListener('touchend', (event) => {
                event.preventDefault();
                this.SPACE = false;
            });

            document.getElementById('btnMobileBottle').addEventListener('touchstart', (event) => {
                event.preventDefault();
                this.D = true;
            });

            document.getElementById('btnMobileBottle').addEventListener('touchend', (event) => {
                event.preventDefault();
                this.D = false;
            });
        }, 500);
    }
}