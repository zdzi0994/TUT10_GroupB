let numRectangles = 25;
let rectangleWidth;
let rectangleHeight;
let lineRectangles = [];
let drawRectangles = true;
let lineSpacing = 10;

let yellow;
let blue;
let beige;
let red;

let randomColors;

function setup() {
  createCanvas(500, 500);
  rectangleWidth = width / numRectangles;
  rectangleHeight = height / numRectangles;

  // Create a colors scheme for the rectangles
  yellow = color(236, 214, 38);
  blue = color(68, 105, 186);
  beige = color(217, 216, 211);
  red = color(176, 58, 46);

  // Create array of the color scheme
  randomColors = [yellow, blue, beige, red];

  // Define starting points for vertical lines
  let verticalStartX = [140, 220, 260, 380];

  // Define starting points for horizontal lines
  let horizontalStartY = [60, 260, 400];

  // Create horizontal lines
  for (let i = 0; i < horizontalStartY.length; i++) {
    let startY = horizontalStartY[i];
    for (let j = 0; j < numRectangles; j++) {
      let x = j * rectangleWidth;
      let y = startY;
      let horizontalLines = new Rectangle(x, y, rectangleWidth, rectangleHeight, random(randomColors));
      lineRectangles.push(horizontalLines);
    }
  }

  // Create vertical lines
  for (let i = 0; i < verticalStartX.length; i++) {
    let startX = verticalStartX[i];
    for (let j = 0; j < numRectangles; j++) {
      let x = startX;
      let y = j * rectangleHeight;
      let verticalLines = new Rectangle(x, y, rectangleWidth, rectangleHeight, random(randomColors));
      lineRectangles.push(verticalLines);
    }
  }
}

function draw() {
  background(230, 213, 190);
  if (drawRectangles) {
    for (const rect of lineRectangles) {
      rect.draw();
    }
  }
  stroke(0);
}

class Rectangle {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }
}
