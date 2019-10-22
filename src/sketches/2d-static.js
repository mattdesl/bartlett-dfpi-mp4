let circles = [];

module.exports.settings = {
  duration: 5,
  dimensions: [1920, 1080],
  fps: 25,
  // Turn off animation
  animate: false
};

// Create a new canvas to the browser size
module.exports.setup = setup;
function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 10; i++) {
    circles.push({
      x: random(0.25, 0.75),
      y: random(0.25, 0.75),
      scale: random(0, 1)
    });
  }
}

// On window resize, update the canvas size
module.exports.windowResized = windowResized;
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Render loop that draws shapes with p5
module.exports.draw = draw;
function draw() {
  // reset blend mode to default
  blendMode(BLEND);

  // draw background
  background("black");

  // Min size of screen
  const dim = min(width, height);

  // Use 'xor' blend mode for all subsequent shapes
  blendMode(DIFFERENCE);
  for (let i = 0; i < circles.length; i++) {
    const c = circles[i];

    // Scale the diameter by a fraction of the screen size
    const diameter = dim * 0.25;

    // white fill
    noStroke();
    fill(255);
    circle(c.x * width, c.y * height, c.scale * diameter);
  }
}
