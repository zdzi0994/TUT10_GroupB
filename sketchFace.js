function setup() {
    createCanvas(400, 400);
  }
  
  function draw() {
    background(220);
    
    // 1
    drawSmiley(100, 100, 50, color(0, 0, 255), color(0), color(255, 255, 0), 1);
  
    // 2
    drawSmiley(200, 100, 70, color(255, 0, 0), color(0), color(255, 255, 0), 2);
  
    // 3
    drawSmiley(100, 250, 60, color(255, 255, 0), color(0), color(255, 255, 0), 3);
  
    // 4
    drawSmiley(300, 250, 80, color(0, 255, 0), color(0), color(255, 255, 0), 4);
  }
  
  function drawSmiley(x, y, size, faceColor, eyeColor, mouthColor, mouthType) {
    // face
    fill(faceColor);
    rect(x - size / 2, y - size / 2, size, size);
  
    // eyes
    fill(eyeColor);
    rect(x - size / 5, y - size / 10, size / 10, size / 10);
    rect(x + size / 10, y - size / 10, size / 10, size / 10);
  
    // mouthes
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
  