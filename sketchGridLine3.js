let numRectangles = 25;
let rectangleWidth;
let rectangleHeight;
let lineRectangles = [];
let drawRectangles = true;
let lineSpacing = 10;
let charaBlocks = [];
let boundary = [];
let growthCharZ;


let yellow;
let blue;
let beige;
let red;

let randomColors;

function setup() {
  createCanvas(500, 500);
  rectMode(CENTER);
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
    let randomBoundary1 = boundary[floor(random()*boundary.length)];
    //find index of the randomBoundary in the boundary array
    boundary.splice(boundary.indexOf(randomBoundary1),1);

    let charaBlock1 = new chara1(
      random(randomBoundary1.startX,randomBoundary1.endX), 
      random(randomBoundary1.startY,randomBoundary1.endY),
      charaWidth,
      charaHeight,
      random()>=0.5);
    charaBlock1.boundary = randomBoundary1;
    
    let randomBoundary2 = boundary[floor(random()*boundary.length)];
    boundary.splice(boundary.indexOf(randomBoundary2),1);
    let charaBlock2 = new chara2(
        random(randomBoundary2.startX,randomBoundary2.endX), 
        random(randomBoundary2.startY,randomBoundary2.endY),
        charaWidth,
        charaHeight,
        random()>=0.5);
    charaBlock2.boundary = randomBoundary2;
  
    charaBlocks.push(charaBlock1);
    charaBlocks.push(charaBlock2);
  }
}

function draw() {
  background(230, 213, 190);
  if (drawRectangles) {
    for (const rect of lineRectangles) {
      rect.draw();
    }
  }

  growthCharZ = sin(frameCount * 2) * 0.5 + 0.5;
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

class chara1{
  constructor(x, y, w, h, state){
    this.x = x;
    this.y = y;
    this.baseWidth = w;
    this.baseHeight = h;
    this.innerWidth = w * 0.5; 
    this.innerHeight = h * 0.5; 
    this.smallestWidth = w * 0.25; 
    this.smallestHeight = h * 0.25; 
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

class chara2{
  constructor(x, y, w, h, state){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    this.speed = random(2,5);
    this.direction = 1;
    this.Horizontal = state;
  }
  
  draw() {    
    push();
    angleMode(DEGREES);
    //rectMode(CENTER);
    fill(`#D9D8D4`);
    stroke(`#ecd626`);
    strokeWeight(3);
  
    // Translate to the position without rotating or scaling
    translate(this.x, this.y);

    // Draw the character
    // BG Rectangle
    strokeWeight(0);
    rect(0, 0, this.width, this.height); // Adjust the size as needed


    //moving rectangles
    //styles
    noStroke();

    //rectangle with minor movement 
    fill(`#4469BA`);
    stroke(`#4469BA`); 
    strokeWeight(3);

    let mediumInsideRectWidth = map(growthCharZ, 0, 1, this.width/4 * 3, this.width); // Map the growth factor to the width
    let mediumInsideRectHeight = map(growthCharZ, 0, 1, this.height/4 * 3, this.height); // Map the growth factor to the height
    rect(0, 0, mediumInsideRectWidth, mediumInsideRectHeight);
   
    //static rectangle 
    fill(`#ecd626`);
    stroke(`#4469BA`);
    strokeWeight(2);
    rect(0, 0, this.width/8 * 6, this.height/8 * 6)

  
    // Eyes
    let flip = sin(frameCount) * 2; // [-1, 1]
    this.eyeOne(-this.width/6, -this.height/8, flip); // Position and scale of the eye
    this.eyeTwo(this.width/6, -this.height/8, flip); // Position and scale of the eye

    // Mouth
    noStroke();
    stroke(`#b03a2e`);
    strokeWeight(3)
    fill(`#D9D8D4`);
    ellipse(0, this.height/6, (this.width/3), this.height/10);    

    pop();
  }

  eyeOne(x, y, flip) {
    push();
    noStroke();
    translate(x,y); // Position the eye based on provided coordinates
    scale(flip, 2);
    if (flip > 0) {
      fill(`#4469BA`);
    } else {
      fill(`#b03a2e`); // Change the color when flipped
    }
    ellipse(0, 0, this.width/8);
    pop();
  }

  eyeTwo(x, y, flip) {
    push();
    noStroke();
    translate(x,y); // Position the eye based on provided coordinates
    scale(flip, 2);
    if (flip > 0) {
      fill(`#b03a2e`);
    } else {
      fill(`#4469BA`); // Change the color when flipped
    }
    ellipse(0, 0, this.width/8);
    pop();
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