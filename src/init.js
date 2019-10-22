const canvasSketch = require("canvas-sketch");
const sketch = require("./sketches/sketch.js");

const settings = {
  // We can specify WebGL context if we want
  context: "2d",
  // Optional loop duration
  duration: 10,
  // Turn on a render loop (it's off by default in canvas-sketch)
  animate: true,
  resizeCanvas: false,
  styleCanvas: false,
  scaleContext: false,
  // scaleToView: true,
  // Enable MSAA
  attributes: {
    preserveDrawingBuffer: true,
    antialias: true
  },
  ...sketch.settings,
  p5: true
};

// Optionally preload before you load the sketch
window.preload = () => {
  if (typeof sketch.preload === "function") {
    return sketch.preload();
  }
};

new p5();
canvasSketch(async props => {
  updateParams();
  if (!sketch.setup) {
    throw new Error(
      `You didn't add a setup() function to module.exports, try this:

module.exports.setup = setup;
function setup () {
  // your setup function
}`
    );
  }
  patchFunctions();
  sketch.setup(props);
  props.canvas = window._renderer.elt;
  props.context = window._renderer.drawingContext;

  if (!sketch.draw) {
    throw new Error(
      `You didn't add a draw() function to module.exports, try this:

module.exports.draw = draw;
function draw () {
  // your draw function
}`
    );
  }

  return {
    resize(props) {
      updateParams();
      if (sketch.windowResized) sketch.windowResized(props);
    },
    render(props) {
      updateParams();
      if (sketch.draw) sketch.draw(props);
    }
  };

  function updateCanvas() {
    window.canvas.width = props.canvasWidth;
    window.canvas.height = props.canvasHeight;
    window.canvas.style.width = `${props.styleWidth}px`;
    window.canvas.style.height = `${props.styleHeight}px`;
  }

  function updateParams() {
    window.windowWidth = props.viewportWidth;
    window.windowHeight = props.viewportHeight;
    window.width = props.width;
    window.height = props.height;
    window.frameCount = props.frame;
    window.deltaTime = props.deltaTime * 1000;
    window.displayWidth = window.innerWidth;
    window.displayHeight = window.innerHeight;
    window.canvas.style.width = `${props.styleWidth}px`;
    window.canvas.style.height = `${props.styleHeight}px`;
  }

  function patchFunctions() {
    window.millis = () => {
      return props.time * 1000;
    };
    window.frameRate = () => {
      throw new Error(`Try setting fps in settings instead of calling frameRate(), example:
      
      module.exports.settings = {
        fps: 30
      }`);
    };
    window.noLoop = () => {
      throw new Error(`Try setting animate in settings instead of calling noLoop(), example:
      
      module.exports.settings = {
        animate: false
      }`);
    };
    window.loop = () => {
      throw new Error(`Try setting animate in settings instead of calling loop(), example:
      
      module.exports.settings = {
        animate: true
      }`);
    };
    // window.pixelDensity = () => {
    //   throw new Error(`Try setting pixelRatio in settings instead of calling pixelDensity(), example:

    //   module.exports.settings = {
    //     pixelRatio: 1
    //   }`);
    // };
  }
}, settings);
