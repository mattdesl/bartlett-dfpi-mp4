# bartlett-dfpi-mp4

A template for creating MP4s from p5.js sketches.

# Structure

- Assets (images, models) are kept in `public/assets/`
- Libraries like p5 are kept in `public/vendor/`
- Your sketch goes in `src/sketches/sketch.js`
- Your HTML can be edited in `src/index.html`

# Steps to Run

## Step 1

Clone or download this repo.

## Step 2

Install dependencies:

```sh
cd bartlett-dfpi-mp4
npm install
```

## Step 3

Run `npm run dev` to start editing in [http://localhost:5000](http://localhost:5000/).

## Step 4

Replace `src/sketches/sketch.js` with your `sketch.js`. Update `index.html` if you need any other references (e.g. clmtrackr).

## Step 5

Make sure to "export" each of your functions like `draw`, `mousePressed`, `setup`, etc.

```js
module.exports.draw = draw;
function draw () {
  // your drawing code...
}
```

## Step 6

While running, hit <kbd>Cmd/Ctrl</kbd> + <kbd>S</kbd> to save a PNG into your Downloads folder.

Or, hit <kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd> to save a MP4 into your Downloads folder.

## Step 7

(Real-time showing on screen)

Remove the `dimensions` field in settings inside your `sketch.js` code, this will make it fullscreen.

Then you can kill the dev server and run `npm run start` and it will serve a more production-ready environment.