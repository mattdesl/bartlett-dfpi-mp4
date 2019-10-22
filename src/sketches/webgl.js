let myModel;
let myImage;

module.exports.settings = {
  duration: 5,
  dimensions: [1920, 1080],
  fps: 25,
  animate: true
};

module.exports.preload = preload;
function preload() {
  const modelUrl = "assets/monkey-uv.obj";
  myModel = loadModel(modelUrl, true);

  const imageUrl = "assets/cage.png";
  myImage = loadImage(imageUrl);
}

// Create a new canvas to the browser size
module.exports.setup = setup;
// Create a new canvas to the browser size
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

// On window resize, update the canvas size
module.exports.windowResized = windowResized;
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

module.exports.draw = draw;
function draw(props) {
  const duration = props.duration;
  background(0);

  const time = millis() / 1000;

  const playhead = (time / duration) % 1;

  const angle = playhead * PI * 2;
  rotateY(angle);

  rotateX(PI);

  fill(255);
  noStroke();
  texture(myImage);
  scale(height * 0.0035);
  model(myModel);
}
