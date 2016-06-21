var Game = require('./game.js');

width = 500;
height = 500;
keyLeft = false;
keyRight = false;



window.addEventListener("keydown", checkKeyPressed, false);
window.addEventListener("keyup", checkKeyLifted, false);

var snd = new Audio("./assets/mm6.mp3");
snd.addEventListener("ended", function() {
  this.currentTime = 0;
  this.play();
}, false);
snd.play();

gameCanvas = document.getElementById("game-canvas");
gameCanvas.width = width;
gameCanvas.height = height;
ctx = gameCanvas.getContext("2d");

var jewelJump = new Game();
jewelJump.splash();

function checkKeyPressed (event) {
    switch(event.keyCode) {
        case 37:
            keyLeft = true;
            break;
        case 39:
            keyRight = true;
            break;
        case 13:
            jewelJump.startGame();
            break;
        case 84:

            if (snd.paused){
              snd.play();
            } else {
              snd.pause();
            }

    }
}

function checkKeyLifted (event) {
  keyLeft = false;
  keyRight = false;
}
