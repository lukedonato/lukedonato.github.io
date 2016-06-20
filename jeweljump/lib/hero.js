var Platform = require('./platform');

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
