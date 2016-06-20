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
