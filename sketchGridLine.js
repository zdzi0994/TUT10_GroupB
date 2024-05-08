let numRectangles = 10;
let rectangleWidth;
let rectangleHeight;
let lineRectangles = [];
let drawRectangles = true;

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
  let randomColors = [yellow, blue, beige, red]

  // Create 4 loops for rectangle1
  for (let i = 4; i < 7; i++) {
    let startY = random(height - rectangleHeight); // Generate a random y-position for each line

    for (let i = 0; i < numRectangles; i++) {
      let x = i * rectangleWidth;
      let y = startY;
      let horizontalLines = new Rectangle(x, y, rectangleWidth, rectangleHeight, random(randomColors));
      lineRectangles.push(horizontalLines);
    }
  }

  for (let i = 4; i < 10; i++) {
    let startX = random(width - rectangleWidth); // Generate a random x-position for the line

    

  for (let i = 0; i < numRectangles; i++) {
    let x = startX;
    let y = i * rectangleWidth;
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
