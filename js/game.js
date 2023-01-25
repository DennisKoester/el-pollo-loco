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

i = 1;
intervalIds = [];


function init() {
    detectDevice();
}


function startGame() {
    initLevel();
    start();
}


function start() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    hideStartScreen();
    checkForMobileDevice();
    backgroundMusic();
}


function restartGame() {
    document.getElementById('gameOverScreenContainer').classList.add('d-none');
    document.getElementById('winScreenContainer').classList.add('d-none');
    clearAllIntervals();
    startGame();
}


function setStopableInterval(fn, time) {
    let idIntervall = setInterval(fn, time);
    this.intervalIds.push(idIntervall);
}


function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}



document.addEventListener("DOMContentLoaded", initDetect)


function initDetect() {
    window.addEventListener("resize", detectDevice);
}


detectDevice = () => {
    let detectObj = {
        device: !!navigator.maxTouchPoints ? 'mobile' : 'computer',
        orientation: !navigator.maxTouchPoints ? 'desktop' : !window.screen.orientation.angle ? 'portrait' : 'landscape'
    };

    if (detectObj['device'] == 'mobile') {
        openFullscreen();
        document.getElementById('closeFullscreen').classList.add('d-none');
        // document.getElementById('fullscreenContainer').classList.add('rotate90');
        console.log('mobile');
    }

    console.log(detectObj);
    return detectObj;
}


function checkForMobileDevice() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.getElementById('mobileBtns').classList.remove('d-none');
    } else {
        document.getElementById('mobileBtns').classList.add('d-none');
    }

}


function openFullscreen() {
    let fullscreen = document.getElementById('fullscreenContainer');

    if (fullscreen.requestFullScreen) {
        fullscreen.requestFullScreen();
    } else if (fullscreen.msRequestFullscreen) {
        fullscreen.msRequestFullscreen();
    } else if (fullscreen.webkitRequestFullScreen) {
        fullscreen.webkitRequestFullScreen();
    }
    addStylesForFullscreen();
}


function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
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
    document.getElementById('fullscreenContainer').classList.add('flex-center');
    document.getElementById('canvas').classList.add('fullscreenMode');
    document.getElementById('wrapper').classList.add('fullscreenMode');
    document.getElementById('wrapper').classList.remove('bg-color');
    document.getElementById('wrapper').classList.add('flex-center');
    document.getElementById('wrapper').style.height = "unset";
    document.getElementById('closeFullscreen').classList.remove('d-none');
    document.getElementById('openFullscreen').classList.add('d-none');
}


function removeStylesForFullscreen() {
    document.getElementById('fullscreenContainer').classList.remove('flex-center');
    document.getElementById('canvas').classList.remove('fullscreenMode');
    document.getElementById('wrapper').classList.remove('fullscreenMode');
    document.getElementById('wrapper').classList.add('bg-color');
    document.getElementById('wrapper').classList.remove('flex-center');
    // document.getElementById('wrapper').style.height = "480px";
    document.getElementById('openFullscreen').classList.remove('d-none');
    document.getElementById('closeFullscreen').classList.add('d-none');
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


function showGameOverScreen() {
    document.getElementById('gameOverScreenContainer').classList.remove('d-none');
    document.getElementById('in-game-btns').classList.add('d-none');
}


function showWinScreen() {
document.getElementById('winScreenContainer').classList.remove('d-none');
document.getElementById('in-game-btns').classList.add('d-none');
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


function resetBackgroundMusic() {
    background_music.currentTime = 0;
    background_music.pause();
}



