let canvas;
let world;
let keyboard = new Keyboard();
let updateOrientation;

let background_music = new Audio("./audio/background_music.mp3");
let chicken_dead_sound = new Audio("./audio/chicken_dead.mp3");
let bottle_collect_sound = new Audio("./audio/bottle.mp3");
let endboss_fight = new Audio("./audio/enboss_fight.mp3");
let bottle_smash = new Audio("./audio/bottle_smash.mp3");
let game_over_sound = new Audio("./audio/game_over.mp3");
let throw_sound = new Audio("./audio/throw_bottle.mp3");
let coin_collect_sound = new Audio("./audio/coin.mp3");
let game_win_sound = new Audio("./audio/game_win.mp3");
let walking_sound = new Audio("./audio/walking.mp3");
let jumping_sound = new Audio("./audio/jumping.mp3");
let snoring_sound = new Audio("./audio/snoring.mp3");
let hurt_sound = new Audio("./audio/pepe_hurt.mp3");
let dead_sound = new Audio("./audio/pepe_dead.mp3");

i = 1;
intervalIds = [];

/**
 * Initializes the game.
 */
function init() {
	showLoadingscreen();
	// detectDevice();
	setTimeout(() => {
		hideLoadingscreen();
	}, 2000);
}

/**
 * Starts the game.
 */
function startGame() {
	showLoadingscreen();
	hideStartScreen();
	initLevel();
	initWorld();

	setTimeout(() => {
		hideLoadingscreen();
	}, 3000);
}

/**
 * Initializes the game.
 */
function initWorld() {
	canvas = document.getElementById("canvas");
	world = new World(canvas, keyboard);
	detectMobileDevice();
	playBackgroundMusic();
}

/**
 * Restarts the game.
 */
function restartGame() {
	hideAllEndScreens();
	clearAllIntervals();
	resetMusic();
	startGame();
}

/**
 * Directes back to main menu.
 */
function goBackToStartScreen() {
	hideAllEndScreens();
	showStartScreen();
	hideCanvas();
	clearAllIntervals();
}

/**
 * This function sets a stopable interval.
 *
 * @param {string} fn Function which is called inside of the interval.
 * @param {string} time The interval time in ms.
 */
function setStopableInterval(fn, time) {
	let idIntervall = setInterval(fn, time);
	this.intervalIds.push(idIntervall);
}

/**
 * Clears all intervals.
 */
function clearAllIntervals() {
	for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Opens the fullscreen mode.
 */
function openFullscreen() {
	let fullscreen = document.getElementById("fullscreenContainer");

	if (fullscreen.requestFullScreen) {
		fullscreen.requestFullScreen();
	} else if (fullscreen.msRequestFullscreen) {
		fullscreen.msRequestFullscreen();
	} else if (fullscreen.webkitRequestFullScreen) {
		fullscreen.webkitRequestFullScreen();
	}
	addStylesForFullscreen();
}

/**
 * Closes the fullscreen mode.
 */
function closeFullscreen() {
	if (
		window.fullScreen ||
		(window.innerWidth == screen.width &&
			window.innerHeight == screen.height)
	) {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (fullscreen.webkitRequestFullScreen) {
			fullscreen.webkitCancelFullScreen();
		}
		removeStylesForFullscreen();
	}
}

/**
 * This function can close the fullscreen mode on ESC and bring back all the styles.
 */
window.addEventListener("keyup", function (event) {
	if (event.key === "Escape") {
		console.log("ESCAPE");
		removeStylesForFullscreen();
	}
});

/**
 * Shows the loading screen.
 */
function showLoadingscreen() {
	document.getElementById("loadingScreen").classList.remove("d-none");
	document.getElementById("wrapper").classList.add("d-none");
}

/**
 * Hides the loading screen.
 */
function hideLoadingscreen() {
	document.getElementById("loadingScreen").classList.add("d-none");
	document.getElementById("wrapper").classList.remove("d-none");
}

/**
 * Adds styles for the fullscreen mode.
 */
function addStylesForFullscreen() {
	document.getElementById("fullscreenContainer").classList.add("flex-center");
	document.getElementById("canvas").classList.add("fullscreenMode");
	document.getElementById("wrapper").classList.add("fullscreenMode");
	document.getElementById("wrapper").classList.remove("bg-color");
	document.getElementById("wrapper").classList.add("flex-center");
	document.getElementById("wrapper").style.height = "unset";
	document.getElementById("closeFullscreen").classList.remove("d-none");
	document.getElementById("openFullscreen").classList.add("d-none");
}

/**
 * Removes all styles from the fullscreen mode.
 */
function removeStylesForFullscreen() {
	document
		.getElementById("fullscreenContainer")
		.classList.remove("flex-center");
	document.getElementById("canvas").classList.remove("fullscreenMode");
	document.getElementById("wrapper").classList.remove("fullscreenMode");
	document.getElementById("wrapper").classList.add("bg-color");
	document.getElementById("wrapper").classList.remove("flex-center");
	document.getElementById("openFullscreen").classList.remove("d-none");
	document.getElementById("closeFullscreen").classList.add("d-none");
}

/**
 * Shows the start screen.
 */
function showStartScreen() {
	document.getElementById("startScreenContainer").classList.remove("d-none");
}

/**
 * Hides the start screen.
 */
function hideStartScreen() {
	document.getElementById("loadingScreen").classList.remove("d-none");

	setTimeout(() => {
		document.getElementById("startScreenContainer").classList.add("d-none");
		document.getElementById("canvas").classList.remove("d-none");
		document.getElementById("in-game-btns").classList.remove("d-none");
	}, 3000);
}

/**
 * Opens the game description.
 */
function openGameDesc() {
	document.getElementById("containerGameDesc").classList.remove("d-none");
	document.getElementById("startScreenContainer").classList.add("d-none");
	document
		.getElementById("fullscreenContainer")
		.classList.add("fullscreenMode");
}

/**
 * Closes the game description.
 */
function closeGameDesc() {
	document.getElementById("containerGameDesc").classList.add("d-none");
	document.getElementById("startScreenContainer").classList.remove("d-none");
	document
		.getElementById("fullscreenContainer")
		.classList.remove("fullscreenMode");
}

/**
 * Opens the control description.
 */
function openControlDesc() {
	document.getElementById("containerGameControls").classList.remove("d-none");
	document.getElementById("startScreenContainer").classList.add("d-none");
	document
		.getElementById("fullscreenContainer")
		.classList.add("fullscreenMode");
}

/**
 * Closes the control description.
 */
function closeControlDesc() {
	document.getElementById("containerGameControls").classList.add("d-none");
	document.getElementById("startScreenContainer").classList.remove("d-none");
	document
		.getElementById("fullscreenContainer")
		.classList.remove("fullscreenMode");
}

/**
 * Shows the game over screen.
 */
function showGameOverScreen() {
	document
		.getElementById("gameOverScreenContainer")
		.classList.remove("d-none");
	document.getElementById("in-game-btns").classList.add("d-none");
	hideMobileBtns();
}

/**
 * Hides the game over screen.
 */
function showWinScreen() {
	document.getElementById("winScreenContainer").classList.remove("d-none");
	document.getElementById("in-game-btns").classList.add("d-none");
	hideMobileBtns();
}

/**
 * Hides the canvas.
 */
function hideCanvas() {
	document.getElementById("canvas").classList.add("d-none");
}

/**
 * Shows the mobile buttons in game.
 */
function showMobileBtns() {
	document.getElementById("mobileBtns").classList.remove("d-none");
}

/**
 * Hides the mobile buttons in game.
 */
function hideMobileBtns() {
	document.getElementById("mobileBtns").classList.add("d-none");
}

/**
 * Hides the all end screens like "win" and "game over" screen.
 */
function hideAllEndScreens() {
	document.getElementById("winScreenContainer").classList.add("d-none");
	document.getElementById("gameOverScreenContainer").classList.add("d-none");
}

/**
 * Plays the game winning sound.
 */
function playGameWinSound() {
	game_win_sound.play();
}

/**
 * Plays the game over sound.
 */
function playGameOverSound() {
	game_over_sound.play();
}

/**
 * Plays the endboss sound.
 */
function playEndbossSound() {
	background_music.pause();
	endboss_fight.play();
}

/**
 * Turns all music and effect sounds off.
 * @param {string} id ID of the first element.
 * @param {string} id2 ID of the second element.
 * @param {string} classList Class which will be toggled.
 */
function turnSoundOff(id, id2, classList) {
	toggleClassList(id, id2, classList);
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

/**
 * Turns all music and effect sounds on.
 * @param {string} id ID of the first element.
 * @param {string} id2 ID of the second element.
 * @param {string} classList Class which will be toggled.
 */
function turnSoundOn(id, id2, classList) {
	toggleClassList(id, id2, classList);
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

/**
 * Toggle a certain class of an element.
 * @param {string} id ID of the first element.
 * @param {string} id2 ID of the second element.
 * @param {string} classList Class which will be toggled.
 */
function toggleClassList(id, id2, classList) {
	document.getElementById(id).classList.toggle(classList);
	document.getElementById(id2).classList.toggle(classList);
}

/**
 * Plays the background music.
 */
function playBackgroundMusic() {
	background_music.play();
	background_music.volume = 0.1;
}

/**
 * Resets all music.
 */
function resetMusic() {
	background_music.currentTime = 0;
	endboss_fight.currentTime = 0;
	background_music.pause();
	endboss_fight.pause();
}

/**
 * "Game won" animation like the winning screen and sound.
 */
function gameIsWon() {
	setTimeout(() => {
		closeFullscreen();
		showWinScreen();
		playGameWinSound();
		resetMusic();
		clearAllIntervals();
	}, 3000);
}

/**
 * "Game lost" animation like the lost screen and sound.
 */
function gameIsLost() {
	setTimeout(() => {
		closeFullscreen();
		showGameOverScreen();
		playGameOverSound();
		resetMusic();
		clearAllIntervals();
	}, 3000);
}

// Mobile Section //

document.addEventListener("DOMContentLoaded", handleTurnPhonePopup);
window.addEventListener("resize", handleTurnPhonePopup);

/**
 * Detects the mobile device and shows or hides the mobile buttons.
 */
function detectMobileDevice() {
	if (
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		)
	) {
		showMobileBtns();
	} else {
		hideMobileBtns();
	}
}

/**
 * Handles the visibility of the turn yout phone message
 */
function handleTurnPhonePopup() {
	var mql = window.matchMedia("(orientation: portrait)");
	// If there are matches, we're in portrait
	console.log(mql);
	if (mql.matches && window.innerWidth <= 820) {
		turnPhone.classList.remove("d-none");
	} else {
		turnPhone.classList.add("d-none");
	}
}
