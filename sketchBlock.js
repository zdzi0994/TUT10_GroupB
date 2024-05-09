let charaBlock;
let charaBlocks=[];
let numofBlocksOnCanvas = 8;

function setup() {
  createCanvas(500, 500);
  rectMode(CENTER);
  for(let i=0; i<numofBlocksOnCanvas; i++){
    charaBlock = new randomCharaBlock();
    charaBlocks.push(charaBlock);
  }
}

function draw() {
  background(220);
  for(const chara of charaBlocks){
    chara.draw();
  }
}


class randomCharaBlock{
  constructor(){
    this.x = random(width);
    this.y = random(height);
    this.rectWidth = random(20,50);
    this.rectHeight = random(20,50);
    this.color1 = color(random(255), random(255), random(255));
    this.color2 = color(random(255), random(255), random(255));
    this.divider = random(1,4);
  }

  draw(){
    fill(this.color1);
    noStroke();
    rect(this.x, this.y, this.rectWidth, this.rectHeight);
    fill(this.color2);
    rect(this.x, this.y, this.rectWidth/this.divider, this.rectHeight/this.divider);
  }
}