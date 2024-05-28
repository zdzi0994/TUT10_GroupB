// Variable to control the how the inside rectangle grows
let growthCharZ;
let mainRectWidth = 150;
let mainRectHeight = 200;

let yellow;
let blue;
let beige;
let red;

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
  rectMode(CENTER);
  
  // Create a colors scheme for the rectangles
  yellow = color(236, 214, 38);
  blue = color(68, 105, 186);
  beige = color(217, 216, 211);
  red = color(176, 58, 46);

  // Instantiate a single characterZ object 
  characterZ = new CharacterZ();
}

function draw() {
  background(230, 213, 190);
  
  // Update the growthFactor in a loop
  growthCharZ = sin(frameCount * 2) * 0.5 + 0.5;

  // Draw the character centered on the canvas without rotation and scaling
  characterZ.display(width / 2, height / 2, color(`#D9D8D4`), 1); // Scale factor 1
}

//Creating character class
class CharacterZ {
  display(x, y, color, scaling, speed, direction, Horizontal) {    
   
    push();
    fill(color);
    stroke(`#ecd626`);
    strokeWeight(3);
    // Translate to the position without rotating or scaling
    translate(x, y);

    // Scale the character based on scaling
    scale(scaling);

    // Draw the character
    // BG Rectangle
    strokeWeight(0);
    rect(0, 0, mainRectWidth, mainRectHeight); // Adjust the size as needed


//moving rectangles
//styles
noStroke();

//rectangle with minor movement 
    fill(`#4469BA`);
    stroke(`#4469BA`); 
    strokeWeight(3);
        let mediumInsideRectWidth = map(growthCharZ, 0, 1, mainRectWidth/4 * 3, mainRectWidth); // Map the growth factor to the width
    let mediumInsideRectHeight = map(growthCharZ, 0, 1, mainRectHeight/4 * 3, mainRectHeight); // Map the growth factor to the height
    rect(0, 0, mediumInsideRectWidth, mediumInsideRectHeight);
   
//static rectangle 
  fill(`#ecd626`);
  stroke(`#4469BA`);
  strokeWeight(2);
  rect(0, 0, mainRectWidth/8 * 6, mainRectHeight/8 *6)

  
    // Eyes
    let flip = sin(frameCount) * 2; // [-1, 1]
    this.eyeOne(-mainRectWidth/6, -mainRectHeight/8, flip); // Position and scale of the eye
    this.eyeTwo(mainRectWidth/6, -mainRectHeight/8, flip); // Position and scale of the eye

    // Mouth
    noStroke();
    push()
    stroke(`#b03a2e`);
    strokeWeight(3)
    fill(`#D9D8D4`);
    ellipse(0, mainRectHeight/6, (mainRectWidth/3), mainRectHeight/10);
    pop()
    
    
    pop();
  }

  eyeOne(x, y, flip) {
    push();
    noStroke();
    translate(x, y); // Position the eye based on provided coordinates
    scale(flip, 2);
    if (flip > 0) {
      fill(`#4469BA`);
    } else {
      fill(`#b03a2e`); // Change the color when flipped
    }
    ellipse(0, 0, mainRectWidth/8);
    pop();
  }

  eyeTwo(x, y, flip) {
    push();
    noStroke();
    translate(x, y); // Position the eye based on provided coordinates
    scale(flip, 2);
    if (flip > 0) {
      fill(`#b03a2e`);
    } else {
      fill(`#4469BA`); // Change the color when flipped
    }
    ellipse(0, 0, mainRectWidth/8);
    pop();
  }
}
