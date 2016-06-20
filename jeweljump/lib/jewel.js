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
