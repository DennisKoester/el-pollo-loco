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
let game_win_sound = new Audio('./audio/game_win.mp3');
let game_over_sound = new Audio('./audio/game_over.mp3');
let endboss_fight = new Audio('./audio/enboss_fight.mp3');

i = 1;
intervalIds = [];


function init() {
    showLoadingscreen();
    detectDevice();

    setTimeout(() => {
        hideLoadingscreen();
    }, 2000);
}


function startGame() {
    showLoadingscreen();
    hideStartScreen();
    initLevel();
    start();

    setTimeout(() => {
        hideLoadingscreen();
    }, 3000);
}


function start() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    checkForMobileDevice();
    backgroundMusic();
}


function restartGame() {
    hideAllEndScreens();
    clearAllIntervals();
    resetMusic();
    startGame();
}


function goBackToStartScreen() {
    hideAllEndScreens();
    showStartScreen();
    hideCanvas();
    clearAllIntervals();
}


function setStopableInterval(fn, time) {
    let idIntervall = setInterval(fn, time);
    this.intervalIds.push(idIntervall);
}


function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
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


function showLoadingscreen() {
    document.getElementById('loadingScreen').classList.remove('d-none');
    document.getElementById('wrapper').classList.add('d-none');

}


function hideLoadingscreen() {
    document.getElementById('loadingScreen').classList.add('d-none');
    document.getElementById('wrapper').classList.remove('d-none');
}


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
    document.getElementById('openFullscreen').classList.remove('d-none');
    document.getElementById('closeFullscreen').classList.add('d-none');
}


function showStartScreen() {
    document.getElementById('startScreenContainer').classList.remove('d-none');
}


function hideStartScreen() {
    document.getElementById('loadingScreen').classList.remove('d-none');

    setTimeout(() => {

        document.getElementById('startScreenContainer').classList.add('d-none');
        document.getElementById('canvas').classList.remove('d-none');
        document.getElementById('in-game-btns').classList.remove('d-none');
    }, 3000);
}


function openGameDesc() {
    document.getElementById('containerGameDesc').classList.remove('d-none');
    document.getElementById('startScreenContainer').classList.add('d-none');
    document.getElementById('fullscreenContainer').classList.add('fullscreenMode');
}


function closeGameDesc() {
    document.getElementById('containerGameDesc').classList.add('d-none');
    document.getElementById('startScreenContainer').classList.remove('d-none');
    document.getElementById('fullscreenContainer').classList.remove('fullscreenMode');
}


function openControlDesc() {
    document.getElementById('containerGameControls').classList.remove('d-none');
    document.getElementById('startScreenContainer').classList.add('d-none');
    document.getElementById('fullscreenContainer').classList.add('fullscreenMode');
}


function closeControlDesc() {
    document.getElementById('containerGameControls').classList.add('d-none');
    document.getElementById('startScreenContainer').classList.remove('d-none');
    document.getElementById('fullscreenContainer').classList.remove('fullscreenMode');
}


function showGameOverScreen() {
    document.getElementById('gameOverScreenContainer').classList.remove('d-none');
    document.getElementById('in-game-btns').classList.add('d-none');
    hideMobileBtns();
}


function showWinScreen() {
    document.getElementById('winScreenContainer').classList.remove('d-none');
    document.getElementById('in-game-btns').classList.add('d-none');
    hideMobileBtns();
}


function hideCanvas() {
    document.getElementById('canvas').classList.add('d-none');
}


function showMobileBtns() {
    document.getElementById('mobileBtns').classList.remove('d-none');
}


function hideMobileBtns() {
    document.getElementById('mobileBtns').classList.add('d-none');
}



function hideAllEndScreens() {
    document.getElementById('winScreenContainer').classList.add('d-none');
    document.getElementById('gameOverScreenContainer').classList.add('d-none');
}


function playGameWinSound() {
    game_win_sound.play();
}


function playGameOverSound() {
    game_over_sound.play();
}


function playEndbossSound() {
    background_music.pause();
    endboss_fight.play();
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
    game_win_sound.muted = true;
    game_over_sound.muted = true;
    endboss_fight.muted = true;
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
    game_win_sound.muted = false;
    game_over_sound.muted = false;
    endboss_fight.muted = false;
}


function backgroundMusic() {
    background_music.play();
    background_music.volume = 0.1;
}


function resetMusic() {
    background_music.currentTime = 0;
    endboss_fight.currentTime = 0;
    background_music.pause();
    endboss_fight.pause();
}


function gameIsWon() {
    setTimeout(() => {
        showWinScreen();
        playGameWinSound();
        resetMusic();
        clearAllIntervals();
    }, 3000);
}


function gameIsLost() {
    setTimeout(() => {
        showGameOverScreen();
        playGameOverSound();
        resetMusic();
        clearAllIntervals();
    }, 3000);
}

// Mobile Section //

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
