let canvas;
let world;
let keyboard = new Keyboard();

let background_music = new Audio('./audio/background_music.mp3');
let chicken_dead_sound = new Audio('./audio/chicken_dead.mp3');
let throw_sound = new Audio('./audio/throw_bottle.mp3');
let bottle_smash = new Audio('./audio/bottle_smash.mp3');
let coin_collect_sound = new Audio('./audio/coin.mp3');
let bottle_collect_sound = new Audio('./audio/bottle.mp3');
let walking_sound = new Audio('./audio/walking.mp3');
let jumping_sound = new Audio('./audio/jumping.mp3');
let snoring_sound = new Audio('./audio/snoring.mp3');
let hurt_sound = new Audio('./audio/pepe_hurt.mp3');
let dead_sound = new Audio('./audio/pepe_dead.mp3');


function startGame() {
    hideStartScreen();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    backgroundMusic();
    checkForMobileDevice();
}


function openFullscreen() {

    let fs = document.getElementById('fullscreenContainer');

    if (fs.webkitRequestFullScreen) {
        fs.webkitRequestFullScreen();
    }
    else {
        fs.mozRequestFullScreen();
    }
    addStylesForFullscreen();
}


function closeFullscreen() {

    let el = document.getElementById('fullscreenContainer');

    if (document.fullscreenElement || /* Standard syntax */ document.webkitFullscreenElement || /* Safari and Opera syntax */  document.msFullscreenElement /* IE11 syntax */) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }
    removeStylesForFullscreen();
}


window.addEventListener('keyup', function (event) {
    if (event.key === 'Escape') {
        console.log('ESCAPE');
        removeStylesForFullscreen();
    }
});


function addStylesForFullscreen() {
    document.getElementById('canvas-overlay').classList.add('fullscreenMode');
    document.getElementById('canvas').classList.add('fullscreenMode');
    document.getElementById('closeFullscreen').classList.remove('d-none');
    document.getElementById('openFullscreen').classList.add('d-none');
    document.getElementById('canvas-overlay').classList.remove('bg-color');
    document.getElementById('canvas-overlay').style.width = "100%";
    document.getElementById('canvas-overlay').style.height = "unset";
}


function removeStylesForFullscreen() {
    document.getElementById('canvas-overlay').classList.remove('fullscreenMode');
    document.getElementById('canvas').classList.remove('fullscreenMode');
    document.getElementById('openFullscreen').classList.remove('d-none');
    document.getElementById('closeFullscreen').classList.add('d-none');
    document.getElementById('canvas-overlay').classList.add('bg-color');
    document.getElementById('canvas-overlay').style.width = "820px";
    document.getElementById('canvas-overlay').style.height = "480px";

}


function hideStartScreen() {
    document.getElementById('startScreenContainer').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('in-game-btns').classList.remove('d-none');
}


function openGameDesc() {
    document.getElementById('containerGameDesc').classList.remove('d-none');
    document.getElementById('startScreenContainer').classList.add('d-none');

}


function closeGameDesc() {
    document.getElementById('containerGameDesc').classList.add('d-none');
    document.getElementById('startScreenContainer').classList.remove('d-none');
}


function openControlDesc() {
    document.getElementById('containerGameControls').classList.remove('d-none');
    document.getElementById('startScreenContainer').classList.add('d-none');
}


function closeControlDesc() {
    document.getElementById('containerGameControls').classList.add('d-none');
    document.getElementById('startScreenContainer').classList.remove('d-none');
}


function checkForMobileDevice() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.getElementById('mobileBtns').classList.remove('d-none');
        console.log('mobile');
    } else {
        document.getElementById('mobileBtns').classList.add('d-none');
        console.log('desktop');
    }

}


function showMobileBtns() {
    document.getElementById('mobileBtns').classList.remove('d-none');
}


function hideMobileBtns() {
    document.getElementById('mobileBtns').classList.add('d-none');

}



function turnSoundOff() {
    background_music.muted = true;
    chicken_dead_sound.muted = true;
    throw_sound.muted = true;
    bottle_smash.muted = true;
    coin_collect_sound.muted = true;
    bottle_collect_sound.muted = true;
    walking_sound.muted = true;
    jumping_sound.muted = true;
    snoring_sound.muted = true;
    hurt_sound.muted = true;
    dead_sound.muted = true;
}


function turnSoundOn() {
    background_music.muted = false;
    chicken_dead_sound.muted = false;
    throw_sound.muted = false;
    bottle_smash.muted = false;
    coin_collect_sound.muted = false;
    bottle_collect_sound.muted = false;
    walking_sound.muted = false;
    jumping_sound.muted = false;
    snoring_sound.muted = false;
    hurt_sound.muted = false;
    dead_sound.muted = false;
}


function backgroundMusic() {
    background_music.play();
    background_music.volume = 0.1;
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

    if (e.keyCode == 27) {
        keyboard.ESC = true;
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

    if (e.keyCode == 27) {
        keyboard.ESC = false;
    }
});
