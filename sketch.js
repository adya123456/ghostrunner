var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var END = 0;


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  doorsGroup = new Group();
  climbersGroup = new Group();
  invinsibleBlockGroup = new Group();
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost",ghostImg);

  
}

function draw() {
  background(0);
  
  if(gameState === "play"){
    spookySound.loop();

  if(tower.y > 400){
      tower.y = 300
    } 
    spawnDoors(); 
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    if(keyDown("space")){
      ghost.velocityY = -5;
    }
  
    ghost.velocityY = ghost.velocityY + 0.8; 

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invinsibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }



    drawSprites(); 
}
  if(gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("gameover",230,250);
    ghost.velocityY = 0;
    tower.velocityY = 0;
    climbersGroup.setVelocityEach(0);
    invinsibleBlockGroup.setVelocityEach(0);
     
    //climbersGroup.setLifetimeEach(-1);
    //invinsibleBlockGroup.setLifetimeEach(-1); 

    if(touches.length>0 || keyDown("SPACE")){
      reset();
      touches = []; 
    }
  }
  drawSprites(); 

}

function spawnDoors(){
  if(frameCount % 240 === 0){
    var door = createSprite(200,-50);
    door.addImage(doorImg);

    var climber = createSprite(200,10);
    climber.addImage(climberImg);
    var invinsibleBlock = createSprite(200,15);
    invinsibleBlock.width = climber.width;
    invinsibleBlock.height = 2; 
    
    door.x = Math.round(random(120,400));
    door.velocityY = 1;
    door.lifetime = 800;
    climber.x = door.x;
    climber.velocityY = 1;

    invinsibleBlock.x = door.x;
    invinsibleBlock.velocityY = 1; 

    ghost.depth = door.depth;
    ghost.depth += 1;

    climber.lifetime = 800; 
    climbersGroup.add(climber); 
    invinsibleBlock.debug = true;
    invinsibleBlockGroup.add(invinsibleBlock);
    
    doorsGroup.add(door);
  }
}

function reset(){
  gameState = "play";
  invinsibleBlockGroup.destroyEach();
  climbersGroup.destroyEach();
  text.visible = false;
}
