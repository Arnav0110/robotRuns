var man , manImg;
var road , roadImg;
var cutter, cutterImg, cuttersGroup;
var invisible_block, invisible_blocksGroup;
var gamestate = "play";

function preload (){
  manImg = loadImage("robot.png");
  roadImg = loadImage("road.png");
  cutterImg = loadImage("blade.png");
}
function setup (){
  createCanvas(600,600);
  road = createSprite(300,300);
  road.addImage("road",roadImg);
  road.velocityY = 1;
  road.scale = 2
  
  man = createSprite(300,300,50,50);
  man.addImage("robot",manImg);
  man.scale = 0.3;
  
  cuttersGroup = new Group();
  invisible_blocksGroup = new Group();
  
}

function draw (){
  background('white');
  if (gamestate === "play" ){
    if(keyDown("space")){
      man.velocityY = -4;
    }
    if(keyDown("left_arrow")){
      man.x = man.x -4;
    }
    if(keyDown("right_arrow")){
      man.x = man.x + 4;
    }

    man.velocityY = man.velocityY+ 0.1;
    if (road.y >300){
     road.y = 100;          
    }

    if (invisible_blocksGroup.isTouching(man)|| man.y > 600){
      man.destroy();
      gamestate = "end";
    }
    spawnCutters();
    drawSprites();
  }
  if (gamestate === "end" ){
    background("black");
    stroke("yellow");
    fill("yellow");
    textSize(60);
    text("Game Over",140,250);
  }
}

function spawnCutters (){
  if (frameCount % 240 === 0){
    cutter = createSprite(200,-50);
    cutter.addImage("cutter",cutterImg);
    cutter.scale = 0.35;
    
    invisible_block = createSprite(200,15);
    invisible_block.height = 2;
    
    cutter.x = Math.round(random(120,400));
    cutter.velocityY = 1;
    man.depth = cutter.depth;
    man.depth += 1;

    invisible_block.x = cutter.x;
    invisible_block.velocityY = 1;
    
    cutter.lifetime = 700;
    invisible_block.lifetime = 700;
    invisible_block.debug= true;
    
    cuttersGroup.add(cutter);
    invisible_blocksGroup.add(invisible_block);
  }
}