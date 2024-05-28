let smileySize = 60;
let speed = 2;
let direction = 'right';
let smiley;

function setup() {
  createCanvas(400, 400);
  smiley = new Smiley(rectWidth = smileySize + 20, rectHeight = smileySize + 40, 100, 250, smileySize);
}

function draw() {
  background(220);

  // Draw the smiley face and the red rectangle
  smiley.display();
  smiley.update();
}

class Smiley {
  constructor(rectWidth, rectHeight, rectX, rectY, smileySize) {
    this.rectWidth = rectWidth;
    this.rectHeight = rectHeight;
    this.rectX = rectX;
    this.rectY = rectY;
    this.smileySize = smileySize;
    this.smileyX = rectX - rectWidth / 2;
    this.smileyY = rectY - rectHeight / 2;
  }

  display() {
    // Draw the vertical red rectangle
    this.drawRedRectangle(this.rectX, this.rectY, this.rectWidth, this.rectHeight);

    // Randomly generate mouth type
    let mouthType = int(random(1, 5));

    // Draw the smiley face
    this.drawSmiley(this.smileyX, this.smileyY, this.smileySize, color(255, 255, 0), color(0), color(255, 255, 0), mouthType);
  }

  drawRedRectangle(x, y, w, h) {
    fill(255, 0, 0); // Red
    rect(x - w / 2, y - h / 2, w, h);
  }

  drawSmiley(x, y, size, faceColor, eyeColor, mouthColor, mouthType) {
    // Face
    fill(faceColor);
    rect(x - size / 2, y - size / 2, size, size);

    // Eyes
    fill(eyeColor);
    rect(x - size / 5, y - size / 10, size / 10, size / 10);
    rect(x + size / 10, y - size / 10, size / 10, size / 10);

    // Mouth
    fill(mouthColor);
    if (mouthType === 1) {
      rect(x - size / 10, y + size / 10, size / 5, size / 20);
    } else if (mouthType === 2) {
      ellipse(x, y + size / 10, size / 5, size / 20);
    } else if (mouthType === 3) {
      triangle(x - size / 20, y + size / 10, x + size / 20, y + size / 10, x, y + size / 5);
    } else if (mouthType === 4) {
      arc(x, y + size / 10, size / 5, size / 10, 0, PI);
    }
  }

  update() {
    if (direction === 'right') {
      this.smileyX += speed;
      if (this.smileyX > this.rectX + this.rectWidth / 2 - this.smileySize / 2) {
        direction = 'down';
      }
    } else if (direction === 'down') {
      this.smileyY += speed;
      if (this.smileyY > this.rectY + this.rectHeight / 2 - this.smileySize / 2) {
        direction = 'left';
      }
    } else if (direction === 'left') {
      this.smileyX -= speed;
      if (this.smileyX < this.rectX - this.rectWidth / 2 + this.smileySize / 2) {
        direction = 'up';
      }
    } else if (direction === 'up') {
      this.smileyY -= speed;
      if (this.smileyY < this.rectY - this.rectHeight / 2 + this.smileySize / 2) {
        direction = 'right';
      }
    }
  }
}
