let numRectangles = 25;
let rectangleWidth;
let rectangleHeight;
let lineRectangles = [];
let drawRectangles = true;
let lineSpacing = 10;
let charaBlocks = [];
let boundary = [];

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

  // Character's width and height
  let charaWidth = random(20,50);
  let charaHeight = random(20,50);


  // Define each boundary with the start (x,y) points and end (x,y) points
  boundary.push({startX:0, startY:horizontalStartY[0]+rectangleWidth, endX:verticalStartX[0]-charaWidth, endY:horizontalStartY[1]-charaHeight});
  boundary.push({startX:0, startY:horizontalStartY[1]+rectangleWidth, endX:verticalStartX[0]-charaWidth, endY:horizontalStartY[2]-charaHeight});
  
  boundary.push({startX:verticalStartX[2]+rectangleWidth, startY:horizontalStartY[0]+rectangleWidth, endX:verticalStartX[3]-charaWidth*1.5, endY:horizontalStartY[1]-charaHeight});
  boundary.push({startX:verticalStartX[2]+rectangleWidth, startY:horizontalStartY[1]+rectangleWidth, endX:verticalStartX[3]-charaWidth*1.5, endY:horizontalStartY[2]-charaHeight});

  boundary.push({startX:verticalStartX[3]+rectangleWidth, startY:horizontalStartY[0]+rectangleWidth, endX:width-charaWidth, endY:horizontalStartY[1]-charaHeight});
  boundary.push({startX:verticalStartX[3]+rectangleWidth, startY:horizontalStartY[1]+rectangleWidth, endX:width-charaWidth, endY:horizontalStartY[2]-charaHeight});


  for(let i = 0; i < 3; i++){
    let randomBoundary = boundary[floor(random()*boundary.length)];
    //find index of the randomBoundary in the boundary array
    boundary.splice(boundary.indexOf(randomBoundary),1);

    let charaBlock = new chara(
      random(randomBoundary.startX,randomBoundary.endX), 
      random(randomBoundary.startY,randomBoundary.endY),
      charaWidth,
      charaHeight, 
      random()>=0.5);
    charaBlock.boundary = randomBoundary;
  
    charaBlocks.push(charaBlock);
  }
}

function draw() {
  background(230, 213, 190);
  if (drawRectangles) {
    for (const rect of lineRectangles) {
      rect.draw();
    }
  }
  for(let chara of charaBlocks){
    chara.move();
    chara.checkCollision(chara.boundary);
    chara.draw();
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

class chara{
  constructor(x, y, baseWidth, baseHeight, state){
    this.x = x;
    this.y = y;
    this.baseWidth = baseWidth;
    this.baseHeight = baseHeight;
    this.innerWidth = baseWidth * 0.5; 
    this.innerHeight = baseHeight * 0.5; 
    this.smallestWidth = baseWidth * 0.25; 
    this.smallestHeight = baseHeight * 0.25; 
    this.breathingSpeed = 0.10; // Speed of breathing effect

    this.speed = random(2,5);
    this.direction = 1;
    this.Horizontal = state;
  }

  update() {
    let breathSizeOuter = sin(frameCount * this.breathingSpeed) * 5;
    this.currentWidth = this.baseWidth + breathSizeOuter;
    this.currentHeight = this.baseHeight + breathSizeOuter;


    let breathSizeInner = sin(frameCount * this.breathingSpeed + PI / 2) * 2; // Offset phase for inner rectangle
    this.innerWidth = this.baseWidth * 0.5 + breathSizeInner;
    this.innerHeight = this.baseHeight * 0.5 + breathSizeInner;


    let breathSizeSmallest = sin(frameCount * this.breathingSpeed + PI) * 0.5; // Further offset phase for third rectangle
    this.smallestWidth = this.baseWidth * 0.25 + breathSizeSmallest;
    this.smallestHeight = this.baseHeight * 0.25 + breathSizeSmallest;
  }

  display(){
    push();
    fill('#4682B4');  // Blue color 
    stroke(255);     
    rectMode(CENTER);
    rect(this.x, this.y, this.currentWidth, this.currentHeight);


    fill('#FFD700');  // Yellow color
    stroke(255);       
    rect(this.x, this.y, this.innerWidth, this.innerHeight);


    fill('#FFFFFF');  // White 
    noStroke();       
    rect(this.x, this.y, this.smallestWidth, this.smallestHeight);
    pop();
  }

  draw(){
    this.update();
    this.display();
  }

  move(){
    if(this.Horizontal){
      this.x += this.speed * this.direction;
    } else {
      this.y += this.speed * this.direction;
    }
  }

  checkCollision(boundary){
    if(this.Horizontal){
      if(this.x <= boundary.startX || this.x > boundary.endX){
        this.direction *= -1;
      }
    } else {
      if(this.y <= boundary.startY || this.y > boundary.endY){
        this.direction *= -1;
      }
    }
  }
}