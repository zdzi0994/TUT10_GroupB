let numRectangles = 30;
let rectangleWidth;
let rectangleHeight;
let lineRectangles = [];
let drawRectangles = true;
let lineSpacing; 10

let yellow;
let blue; 
let beige; 
let red; 

let randomColors; 

function setup() {
  createCanvas(500, 500);
  rectangleWidth = width / numRectangles;
  rectangleHeight = height / numRectangles;

  //Create a colors scheme for the rectangles
  yellow = color(236, 214, 38);
  blue = color(68, 105, 186); 
  beige = color(217, 216, 211);
  red = color(176, 58, 46); 

  //Create array of the color scheme
  randomColors = [yellow, blue, beige, red];

  // Array to store possible starting points
  let possibleStartX = [];
  let possibleStartY = [];
  for (let i = 0; i < numRectangles; i++) {
    possibleStartX.push(i * rectangleWidth);
    possibleStartY.push(i * rectangleHeight);
  }

  console.log("Possible starting X coordinates:", possibleStartX);
  console.log("Possible starting Y coordinates:", possibleStartY);

  // Create horizontal lines
  for (let i = 0; i < 3; i++) {
    let startY = random(possibleStartY);
    for (let j = 0; j < numRectangles; j++) {
      let x = j * rectangleWidth;
      let y = startY;
      let horizontalLines = new Rectangle(x, y, rectangleWidth, rectangleHeight, random(randomColors));
      lineRectangles.push(horizontalLines);
    }
    // Remove the chosen startY to prevent overlap
    possibleStartY.splice(possibleStartY.indexOf(startY), 1);
  }

  // Create vertical lines
  for (let i = 0; i < 4; i++) {
    let startX = random(possibleStartX);
    for (let j = 0; j < numRectangles; j++) {
      let x = startX;
      let y = j * rectangleHeight;
      let verticalLines = new Rectangle(x, y, rectangleWidth, rectangleHeight, random(randomColors));
      lineRectangles.push(verticalLines);
    }
    // Remove the chosen startX to prevent overlap
    possibleStartX.splice(possibleStartX.indexOf(startX), 1);
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
