let canvas;
let world;
let keyboard = new Keyboard();
let isFullScreenMode = false;

i = 1;
intervalIds = [];

/**
 * Handles the preloader
 */
window.addEventListener("load", () => {
	hideLoadingscreen();
});

/**
 * Initializes the game.
 */
function init() {
	setFullScreenHandlers();
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
	playBackgroundMusic();
}

/**
 * Initializes the game.
 */
function initWorld() {
	canvas = document.getElementById("canvas");
	world = new World(canvas, keyboard);
	detectMobileDevice();
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
 * @param {object} fn Function which is called inside of the interval.
 * @param {string} time The interval time in ms.
 */
function setStopableInterval(fn, time) {
	let idInterval = setInterval(fn, time);
	this.intervalIds.push(idInterval);
}

/**
 * Clears all intervals.
 */
function clearAllIntervals() {
	for (let i = 0; i < intervalIds.length; i++) {
		window.clearInterval(intervalIds[i]);
	}
	intervalIds = [];
}

/**
 * Toggles the fullscreen mode
 */
function toggleFullscreen() {
	const elem = document.getElementById("fullscreenContainer");
	if (isFullScreenMode) {
		setParamOnExitFullscreen(false);
		document.exitFullscreen();
	} else {
		setParamOnExitFullscreen(true);
		elem.requestFullscreen();
	}
}

/**
 * Sets the parameters for the control of the fullscreen mode
 * @param {Boolean} statusFullscreen - The status of the fullscreen mode
 */
function setParamOnExitFullscreen(statusFullscreen) {
	const btnsFullScreen = document.querySelectorAll(".toggleFullscreenBtn");
	isFullScreenMode = statusFullscreen;
	for (let i = 0; i < btnsFullScreen.length; i++) {
		if (statusFullscreen) {
			btnsFullScreen[i].src = "./img/icons/icons8-exit_fullscreen.png";
			addStylesForFullscreen();
		} else {
			btnsFullScreen[i].src = "./img/icons/icons8-fullscreen.png";
			removeStylesForFullscreen();
		}
	}
}

/**
 * Sets event listeners for monitoring fullscreen mode
 */
function setFullScreenHandlers() {
	document.addEventListener("fullscreenchange", exitFullscreenHandler);
	document.addEventListener("webkitfullscreenchange", exitFullscreenHandler);
	document.addEventListener("mozfullscreenchange", exitFullscreenHandler);
	document.addEventListener("MSFullscreenChange", exitFullscreenHandler);
}

/**
 * Handles exiting fullscreen
 */
function exitFullscreenHandler() {
	if (
		!document.fullscreenElement &&
		!document.webkitIsFullScreen &&
		!document.mozFullScreen &&
		!document.msFullscreenElement
	) {
		setParamOnExitFullscreen(false);
	}
}

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
	document.getElementById("wrapper").style.height = "480px";
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
	// document.getElementById("wrapper").style.width = "unset";
	document.getElementById("wrapper").style.width = "100%";

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
}

/**
 * Closes the game description.
 */
function closeGameDesc() {
	document.getElementById("containerGameDesc").classList.add("d-none");
	document.getElementById("startScreenContainer").classList.remove("d-none");
}

/**
 * Opens the control description.
 */
function openControlDesc() {
	document.getElementById("containerGameControls").classList.remove("d-none");
	document.getElementById("startScreenContainer").classList.add("d-none");
}

/**
 * Closes the control description.
 */
function closeControlDesc() {
	document.getElementById("containerGameControls").classList.add("d-none");
	document.getElementById("startScreenContainer").classList.remove("d-none");
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
	document.getElementById("wrapper").style.width = "820px";
}

/**
 * Plays the game winning sound.
 */
function playGameWinSound() {
	world.AUDIO.game_win_sound.play();
}

/**
 * Plays the game over sound.
 */
function playGameOverSound() {
	world.AUDIO.game_over_sound.play();
}

/**
 * Plays the endboss sound.
 */
function playEndbossSound() {
	world.AUDIO.background_music.pause();
	world.AUDIO.endboss_fight.play();
}

/**
 * Turns all music and effect sounds off.
 * @param {string} id ID of the first element.
 * @param {string} id2 ID of the second element.
 * @param {string} classList Class which will be toggled.
 */
function turnSoundOff(id, id2, classList) {
	toggleClassList(id, id2, classList);
	world.AUDIO.background_music.muted = true;
	world.AUDIO.chicken_dead_sound.muted = true;
	world.AUDIO.throw_sound.muted = true;
	world.AUDIO.bottle_smash.muted = true;
	world.AUDIO.coin_collect_sound.muted = true;
	world.AUDIO.bottle_collect_sound.muted = true;
	world.AUDIO.walking_sound.muted = true;
	world.AUDIO.jumping_sound.muted = true;
	world.AUDIO.snoring_sound.muted = true;
	world.AUDIO.hurt_sound.muted = true;
	world.AUDIO.dead_sound.muted = true;
	world.AUDIO.game_win_sound.muted = true;
	world.AUDIO.game_over_sound.muted = true;
	world.AUDIO.endboss_fight.muted = true;
}

/**
 * Turns all music and effect sounds on.
 * @param {string} id ID of the first element.
 * @param {string} id2 ID of the second element.
 * @param {string} classList Class which will be toggled.
 */
function turnSoundOn(id, id2, classList) {
	toggleClassList(id, id2, classList);
	world.AUDIO.background_music.muted = false;
	world.AUDIO.chicken_dead_sound.muted = false;
	world.AUDIO.throw_sound.muted = false;
	world.AUDIO.bottle_smash.muted = false;
	world.AUDIO.coin_collect_sound.muted = false;
	world.AUDIO.bottle_collect_sound.muted = false;
	world.AUDIO.walking_sound.muted = false;
	world.AUDIO.jumping_sound.muted = false;
	world.AUDIO.snoring_sound.muted = false;
	world.AUDIO.hurt_sound.muted = false;
	world.AUDIO.dead_sound.muted = false;
	world.AUDIO.game_win_sound.muted = false;
	world.AUDIO.game_over_sound.muted = false;
	world.AUDIO.endboss_fight.muted = false;
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
	setTimeout(() => {
		world.AUDIO.background_music.play();
		world.AUDIO.background_music.volume = 0.1;
	}, 1000);
}

/**
 * Resets all music.
 */
function resetMusic() {
	world.AUDIO.background_music.currentTime = 0;
	world.AUDIO.endboss_fight.currentTime = 0;
	world.AUDIO.background_music.pause();
	world.AUDIO.endboss_fight.pause();
	world.character.stopSnoring();
}

/**
 * "Game won" animation like the winning screen and sound.
 */
function gameIsWon() {
	setTimeout(() => {
		clearAllIntervals();
		showWinScreen();
		playGameWinSound();
		resetMusic();
	}, 2000);
}

/**
 * "Game lost" animation like the lost screen and sound.
 */
function gameIsLost() {
	setTimeout(() => {
		clearAllIntervals();
		showGameOverScreen();
		playGameOverSound();
		resetMusic();
	}, 2000);
}

// Mobile Section //

/**
 * Eventlistener for handleTurnPhonePopup function
 */
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
 * Handles the visibility of the turn your phone screen
 */
function handleTurnPhonePopup() {
	var mql = window.matchMedia("(orientation: portrait)");
	// If there are matches, we're in portrait
	if (mql.matches && window.innerWidth <= 820) {
		turnPhone.classList.remove("d-none");
	} else {
		turnPhone.classList.add("d-none");
	}
}
