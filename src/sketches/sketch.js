module.exports.settings = {
  duration: 5,
  dimensions: [1920, 1080],
  fps: 25,
  animate: true
};

module.exports.setup = setup;
// Create a new canvas to the browser size
function setup() {
  createCanvas(windowWidth, windowHeight);
}

// On window resize, update the canvas size
module.exports.windowResized = windowResized;
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Render loop that draws shapes with p5
module.exports.draw = draw;
function draw(props) {
  // background
  background("black");

  // Turn off shape filling
  noFill();

  // Set the stroke color
  stroke("white");

  // Get the minimum edge of the canvas
  const dim = Math.min(width, height);

  // And use that edge to make the stroke thickness relative
  strokeWeight(dim * 0.015);

  // number of rings
  const ringCount = 12;

  const time = millis() / 1000;
  const duration = props.duration;
  const playhead = (time / duration) % 1;

  // for each ring
  for (let i = 0; i < ringCount; i++) {
    // Center of screen
    const cx = width / 2;
    const cy = height / 2;

    // save the transformation state
    push();

    // find out the interval between each angle to make a full
    // circle with ringCount steps
    const angleInterval = (PI * 2) / ringCount;

    // now get the angle for this line
    const angle = i * angleInterval + playhead * PI * 2;

    // rotate the line around the center:
    // 1. Translate to point
    // 2. Rotate
    // 3. Un-translate from point
    translate(cx, cy);
    rotate(angle);
    translate(-cx, -cy);

    // The length is some fraction of the screen dimension
    const length = dim * 0.45;

    // Now we draw a line from the center extending vertically upwards
    // The previous transformation will rotate it
    line(cx, cy - length, cx, cy);

    // Finally we 'pop' the state to restore it for the next line
    pop();
  }
}
