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
