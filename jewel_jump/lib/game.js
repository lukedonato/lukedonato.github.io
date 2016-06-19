var Hero = require('./hero.js');
var Platform = require('./platform.js');
var Jewel = require('./jewel.js');
var Cloud = require('./cloud.js');

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


     ctx.fillStyle = "Black";
     ctx.fillText("SCORE: " + this.score, 10, 10);

     if (!this.gameOver()) {
       this.gLoop = setTimeout(this.gameLoop.bind(this), 20);
     } else {
       setTimeout(this.startGame.bind(this), 1000);
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
