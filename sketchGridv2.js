let cols = 5; // Number of columns
let rows = 5; // Number of rows
let cellWidth, cellHeight; // Width and height of each cell
let verticalPositions = []; // Array to store vertical segment positions
let horizontalPositions = []; // Array to store horizontal segment positions
let spacingFactor = 4; // Minimum spacing factor (width or height divided by 5)
let charaBlocks = [];

function setup() {
  createCanvas(500, 500); // Create a canvas
  cellWidth = width / cols; // Calculate width of each cell
  cellHeight = height / rows; // Calculate height of each cell
  generateRandomSegments(); // Generate random segments
  for(let i=0; i<6; i++){
    if(i%2==0){
      charaBlock = new randomCharaBlock(verticalPositions[i]+10, random(height));
      charaBlocks.push(charaBlock);
    }else{
      charaBlock = new randomCharaBlock(random(width), horizontalPositions[i]+10);
      charaBlocks.push(charaBlock);
    }
  }
  console.log(verticalPositions);
  console.log(horizontalPositions);
}

function draw() {
  background(220); // Clear the background
  
  // Draw the random grid
  drawGrid();
  
  // Get the x position and y position of the first vertical rectangle
  let firstVerticalX = verticalPositions[0];
  let firstVerticalY = 0;
  
  // Display the x position and y position of the first vertical rectangle
  fill(0);
  textSize(16);
  text("X position of the first vertical rectangle: " + firstVerticalX, 20, 20);
  text("Y position of the first vertical rectangle: " + firstVerticalY, 20, 40);

  fill("yellow")
  rect(verticalPositions[0], 0,10,height);
  rect(verticalPositions[1], 0,10,height);
  rect(verticalPositions[2], 0,10,height);
  rect(verticalPositions[3], 0,10,height);

  rect(0, horizontalPositions[0],width,10);
  rect(0, horizontalPositions[1],width,10);
  rect(0, horizontalPositions[2],width,10);
  rect(0, horizontalPositions[3],width,10);

  for(const chara of charaBlocks){
    chara.draw();
  }

}

function generateRandomSegments() {
  // Generate random vertical segments
  for (let i = 1; i < cols; i++) {
    let x = i * (width / cols) + random(-width / (spacingFactor * cols), width / (spacingFactor * cols)); // Calculate x position with random offset
    x = constrain(x, 0, width); // Ensure x position is within canvas bounds
    verticalPositions.push(x); // Store vertical segment position
  }
  
  // Generate random horizontal segments
  for (let j = 1; j < rows; j++) {
    let y = j * cellHeight + random(-cellHeight / spacingFactor, cellHeight / spacingFactor); // Calculate y position
    y += random(-cellHeight / spacingFactor, cellHeight / spacingFactor); // Add random offset within spacing constraint
    horizontalPositions.push(y); // Store horizontal segment position
  }
}

function drawGrid() {
  // Draw vertical segments
  for (let x of verticalPositions) {
    noStroke();  // Black stroke color
    fill("black")  // No fill for the rectangle
    rect(x - 5, 0, 10, height); // Draw vertical rectangle
  }
  
  // Draw horizontal segments
  for (let y of horizontalPositions) {
    noStroke(); // Black stroke color
    fill("black")  // No fill for the rectangle
    rect(0, y - 5, width, 10); // Draw horizontal rectangle
  }
}

class randomCharaBlock{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.rectWidth = random(20,50);
    this.rectHeight = random(20,50);
    this.color = color(random(255), random(255), random(255));
  }

  draw(){
    fill(this.color);
    noStroke();
    rect(this.x, this.y, this.rectWidth, this.rectHeight);
    fill(this.color);
    rect(this.x, this.y, this.rectWidth/2, this.rectHeight/4);
  }
}