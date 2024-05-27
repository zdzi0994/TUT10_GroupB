let smileyX;
let smileyY;
let smileySize = 60;
let rectWidth = smileySize + 20;
let rectHeight = smileySize + 40;
let rectX = 100;
let rectY = 250;
let speed = 2;
let direction = 'right';

function setup() {
  createCanvas(400, 400);
  smileyX = rectX - rectWidth / 2;
  smileyY = rectY - rectHeight / 2;
}

function draw() {
  background(220);

  // Draw the vertical red rectangle
  drawRedRectangle(rectX, rectY, rectWidth, rectHeight);

  // Randomly generate mouth type
  let mouthType = int(random(1, 5));

  // Draw the smiley face
  drawSmiley(smileyX, smileyY, smileySize, color(255, 255, 0), color(0), color(255, 255, 0), mouthType);

  // Update the smiley's position
  moveSmiley();
}

function drawRedRectangle(x, y, w, h) {
  fill(255, 0, 0); // Red
  rect(x - w / 2, y - h / 2, w, h);
}

function drawSmiley(x, y, size, faceColor, eyeColor, mouthColor, mouthType) {
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

function moveSmiley() {
  if (direction === 'right') {
    smileyX += speed;
    if (smileyX > rectX + rectWidth / 2 - smileySize / 2) {
      direction = 'down';
    }
  } else if (direction === 'down') {
    smileyY += speed;
    if (smileyY > rectY + rectHeight / 2 - smileySize / 2) {
      direction = 'left';
    }
  } else if (direction === 'left') {
    smileyX -= speed;
    if (smileyX < rectX - rectWidth / 2 + smileySize / 2) {
      direction = 'up';
    }
  } else if (direction === 'up') {
    smileyY -= speed;
    if (smileyY < rectY - rectHeight / 2 + smileySize / 2) {
      direction = 'right';
    }
  }
}

function mousePressed() {
  redraw();
}
