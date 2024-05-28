var W = 750;
var H = 250;
var breathingRect; // Declare the breathing rectangle

function setup() {
  createCanvas(W, H);
  
  breathingRect = new BreathingRectangle(W / 2, H / 2, 100, 100);
}

function draw() {
  background(0);
  breathingRect.update();
  breathingRect.display();
}

class BreathingRectangle {
  constructor(x, y, baseWidth, baseHeight) {
    this.x = x;
    this.y = y;
    this.baseWidth = baseWidth;
    this.baseHeight = baseHeight;
    this.innerWidth = baseWidth * 0.5; 
    this.innerHeight = baseHeight * 0.5; 
    this.smallestWidth = baseWidth * 0.25; 
    this.smallestHeight = baseHeight * 0.25; 
    this.breathingSpeed = 0.10; // Speed of breathing effect
  }

  update() {
    
    let breathSizeOuter = sin(frameCount * this.breathingSpeed) * 20;
    this.currentWidth = this.baseWidth + breathSizeOuter;
    this.currentHeight = this.baseHeight + breathSizeOuter;

    
    let breathSizeInner = sin(frameCount * this.breathingSpeed + PI / 2) * 10; // Offset phase for inner rectangle
    this.innerWidth = this.baseWidth * 0.5 + breathSizeInner;
    this.innerHeight = this.baseHeight * 0.5 + breathSizeInner;

    
    let breathSizeSmallest = sin(frameCount * this.breathingSpeed + PI) * 5; // Further offset phase for third rectangle
    this.smallestWidth = this.baseWidth * 0.25 + breathSizeSmallest;
    this.smallestHeight = this.baseHeight * 0.25 + breathSizeSmallest;
  }

  display() {
    
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
  }
}
