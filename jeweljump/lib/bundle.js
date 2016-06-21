/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(3);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Platform = function (game, x, y, type) {
	  this.game = game;
	  this.X = Math.floor(x);
	  this.Y = y;
	  this.type = type;
	};

	Platform.prototype.render = function () {
	    if (this.type === 0){
	      ctx.fillStyle = "#738b2a";
	    } else {
	      ctx.fillStyle = "#ac1406";
	    }
	    ctx.fillRect(this.X, this.Y, this.game.platformWidth, this.game.platformHeight);
	    return this;
	  };

	module.exports = Platform;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Platform = __webpack_require__(1);

	var Hero = function (game) {
	  this.image = new Image();
	  this.image.src = "./assets/mm.gif";
	  this.width = 40;
	  this.height = 47;
	  this.X = 0;
	  this.Y = 0;
	  this.isJumping = false;
	  this.isFalling = false;
	  this.jumpVel = 0;
	  this.fallVel = 0;
	};

	  Hero.prototype = {
	    setPos: function (x, y) {
	      this.X = x;
	      this.Y = y;
	    },
	    render: function () {
	      ctx.drawImage(this.image, 0, 0, this.width, this.height, this.X, this.Y, this.width, this.height);
	    },
	    jump: function () {
	      if (!this.isJumping && !this.isFalling) {
	        this.fallVel = 0;
	        this.isJumping = true;
	        this.jumpVel = 18;
	      }
	    },
	    fallStop: function () {
	      this.isFalling = false;
	      this.fallVel = 0;
	      this.jump();
	    },
	    moveLeft: function () {
	      if (this.X > 0) {
	        this.setPos(this.X - 10, this.Y);
	      }
	    },
	    moveRight: function () {
	      if (this.X < width - this.width) {
	        this.setPos(this.X + 10, this.Y);
	      }
	    },
	    reset: function () {
	      this.isJumping = false;
	      this.isFalling = false;
	      this.jumpVel = 0;
	      this.fallVel = 0;
	    }
	  };

	module.exports = Hero;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Hero = __webpack_require__(2);
	var Platform = __webpack_require__(1);
	var Jewel = __webpack_require__(4);
	var Cloud = __webpack_require__(5);

	var Game = function () {
	  this.numPlatforms = 6;
	  this.platforms = [];
	  this.platformWidth = 70;
	  this.platformHeight = 10;
	  this.numClouds = 4;
	  this.clouds = [];
	  this.jewel = null;
	  this.score = 0;
	  this.gLoop = null;
	  this.hero = new Hero(this);
	};

	Game.prototype = {
	  clr: function () {
	    ctx.fillStyle = "#00BFFF";
	    ctx.beginPath();
	    ctx.rect(0, 0, width, height);
	    ctx.closePath();
	    ctx.fill();
	  },
	  splash: function () {
	    var img = new Image();

	    img.onload = function () {
	      ctx.drawImage(img, 1, 1);
	    };
	    img.src = "./assets/splash.png";
	  },
	  createClouds: function () {
	    for (var i = 0; i < this.numClouds; i++){
	      this.clouds.push(new Cloud());
	    }
	  },
	  renderClouds: function () {
	    for (var i = 0; i < this.numClouds; i++) {
	      ctx.drawImage(this.clouds[i].image, 0, 0, 100, 100, this.clouds[i].X, this.clouds[i].Y, 100, 100);
	    }
	  },
	  updateClouds: function(dY) {
	    for (var i = 0; i < this.numClouds; i++) {
	      if (this.clouds[i].Y - 20 > height) {
	        this.clouds[i].X = Math.random() * width;
	        this.clouds[i].Y = 0 - 20;
	      } else {
	        this.clouds[i].Y += dY;
	      }
	    }
	  },
	  createJewel: function () {
	    this.jewel = new Jewel();
	  },
	  renderJewel: function () {
	      ctx.drawImage(this.jewel.image, 0, 0, 40, 31, this.jewel.X, this.jewel.Y, 40, 31);
	  },
	  updateJewel: function(dY) {
	      if (this.jewel.Y - 20 > height || this.jewel.hit) {
	        this.jewel.hit = false;
	        this.jewel.X = Math.random() * width;
	        this.jewel.Y = 0 - 20;
	      } else {
	        this.jewel.Y += dY;
	      }
	  },
	  createPlatforms: function () {
	    var position = 0, type;

	    for (var i = 0; i < this.numPlatforms; i++) {
	      type = Math.floor(Math.random() * 8);
	      this.platforms[i] = new Platform(this, Math.random() * (width-this.platformWidth), position, type);
	      if (position < height - this.platformHeight) {
	        position += Math.floor(height / this.numPlatforms);
	      }
	    }
	  },
	  checkMove: function () {
	    if (keyLeft) {
	      this.hero.moveLeft();
	    } else if (keyRight) {
	      this.hero.moveRight();
	    }
	  },
	  jumpCon: function () {
	    var heroContext = this.hero;
	    var gameContext = this;

	    if (heroContext.Y > height*0.5) {
	      heroContext.setPos(heroContext.X, heroContext.Y - heroContext.jumpVel);
	    } else {
	      this.updateClouds(heroContext.jumpVel * 0.5);
	      this.updateJewel(heroContext.jumpVel * 0.5);

	      this.platforms.forEach(function (platform, index) {
	        platform.Y += heroContext.jumpVel;

	        if (platform.Y > height) {
	          var type = Math.floor(Math.random() * 8);

	          gameContext.platforms[index] = new Platform(gameContext, Math.random() * (width - gameContext.platformWidth), platform.Y - height, type);
	        }
	      });
	    }

	    heroContext.jumpVel --;

	    if (heroContext.jumpVel === 0) {
	      heroContext.isJumping = false;
	      heroContext.isFalling = true;
	      heroContext.fallVel = 1;
	    }
	  },
	  fallCon: function () {
	    var heroContext = this.hero;

	    if (heroContext.Y < height - heroContext.height) {
	      heroContext.setPos(heroContext.X, heroContext.Y + heroContext.fallVel);
	      heroContext.fallVel++;
	    } else {
	      heroContext.fallStop();
	    }
	  },
	  checkPlatformCollision: function(){
	    var gameRef = this;

	    for (var i = 0; i < this.platforms.length; i++) {

	      if (
	          (gameRef.hero.isFalling) &&
	          !(gameRef.hero.X + gameRef.hero.width < this.platforms[i].X ||
	            gameRef.hero.X > this.platforms[i].X + this.platformWidth ||
	            gameRef.hero.Y + gameRef.hero.height < this.platforms[i].Y ||
	            gameRef.hero.Y > this.platforms[i].Y + this.platformHeight)

	         ) {
	            gameRef.onPlatformCollision(this.platforms[i].type);
	            break;
	           }
	    }
	   },
	   onPlatformCollision: function (type) {
	     this.hero.fallStop();
	     if (type === 0){
	           this.hero.jumpVel = 40;
	           this.score += 50;
	         }
	     },
	  checkJewelCollision: function(){
	      if (
	           !(this.hero.X > this.jewel.X + 40 ||
	           this.hero.X + this.hero.width < this.jewel.X ||
	           this.hero.Y > this.jewel.Y + 31 ||
	           this.hero.height + this.hero.Y < this.jewel.Y)
	        ) {
	          if (this.jewel.hit === false) {
	            this.jewel.hit = true;
	            this.score += 100;
	        }
	      }
	   },
	   gameLoop: function () {

	     this.checkMove();
	     this.clr();
	     this.renderJewel();
	     this.checkJewelCollision();
	     this.renderClouds();

	     if (this.hero.isJumping) {
	        this.jumpCon();
	      }

	     if (this.hero.isFalling) {
	       this.fallCon();
	     }

	     this.hero.render();

	     this.platforms.forEach(function(platform){
	       platform.render();
	     });
	     this.checkPlatformCollision();


	     ctx.fillStyle = "White";
	     ctx.font = "20px Courier New";
	     ctx.fillText("SCORE: " + this.score, 2, 15);

	     if (!this.gameOver()) {
	       this.gLoop = setTimeout(this.gameLoop.bind(this), 20);
	     } else {
	        setTimeout(this.splash.bind(this), 1000);
	     }
	   },
	   startGame: function() {
	     this.hero.reset();
	     this.score = 0;
	     this.hero.setPos(Math.floor((width-this.hero.width)/2), (height - this.hero.height)/2);
	     this.createPlatforms();
	     this.createClouds();
	     this.createJewel();
	     this.hero.jump();
	     this.gameLoop();
	   },
	   gameOver: function () {
	     if (this.hero.Y > height - this.hero.height) {
	       return true;
	     } else {
	       return false;
	     }
	   }
	};

	module.exports = Game;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var Jewel = function () {

	  var newJewel = {
	    X: Math.random() * width,
	    Y: Math.random() * height,
	    hit: false,
	    image: new Image()
	  };

	  newJewel.image.src = ("./assets/jewel.png");

	  return newJewel;

	};

	module.exports = Jewel;


/***/ },
/* 5 */
/***/ function(module, exports) {

	var Cloud = function () {

	  var newCloud = {
	    X: Math.random() * width,
	    Y: Math.random() * height,
	    image: new Image()
	  };

	  newCloud.image.src = ("./assets/cloud" + Math.floor(Math.random()*3) + ".png");

	  return newCloud;

	};

	module.exports = Cloud;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
