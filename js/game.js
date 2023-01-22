let canvas;
let world;
let keyboard = new Keyboard();


function startGame() {
    hideStartScreen();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}



function hideStartScreen() {
    document.getElementById('startScreenContainer').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
}


function openGameDesc(){
    document.getElementById('containerGameDesc').classList.remove('d-none');
    document.getElementById('startScreenContainer').classList.add('d-none');
    
}


function closeGameDesc(){
    document.getElementById('containerGameDesc').classList.add('d-none');
    document.getElementById('startScreenContainer').classList.remove('d-none');
}


function openControlDesc(){
    document.getElementById('containerGameControls').classList.remove('d-none');
    document.getElementById('startScreenContainer').classList.add('d-none');
}


function closeControlDesc(){
    document.getElementById('containerGameControls').classList.add('d-none');
    document.getElementById('startScreenContainer').classList.remove('d-none');
}



window.addEventListener('keydown', (e) => {

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});


window.addEventListener('keyup', (e) => {
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});
