var tower,towerImage;
var door,doorImage;
var climber,climberImage;
var ghost,ghostImage;
var doorGroup,climberGroup;
var invisibleBlock,blockGroup;
var gameState="play";
function preload()
{
 towerImage=loadImage("tower.png"); 
 doorImage=loadImage("door.png");
 climberImage=loadImage("climber.png"); 
 ghostImage=loadImage("ghost-jumping.png"); 
}


function setup()
{
 createCanvas(600,600); 
  
 tower = createSprite(300,300);
 tower.addImage("tower",towerImage); 
 tower.velocityY=1;
  
 ghost=createSprite(200,200,50,50);
 ghost.addImage("ghost",ghostImage); 
 ghost.scale=0.3;

 doorGroup=new Group();  
 climberGroup=new Group();
 blockGroup=new Group(); 
}


function draw()
{
  background(0);
  
  if(gameState==="play")
  {
  
  if(tower.y>400)
  {
   tower.y=300; 
  }
  
  if(keyDown("space") )
  {
    ghost.velocityY=-5;
  }
  ghost.velocityY=ghost.velocityY+1;
  
  if(keyDown("right_arrow") )
  {
    ghost.x=ghost.x+3;
  }
  
  if(keyDown("left_arrow") )
  {
    ghost.x=ghost.x-3;
  }
 
  if(climberGroup.isTouching(ghost))
  {
    ghost.velocityY=0;
  }
  
  
  if(blockGroup.isTouching(ghost) ||ghost.y>600)
  {
    ghost.destroy();
    gameState="end";
    
  }
  
  
  spawnDoors();
  
  drawSprites();
}
  if(gameState==="end")
  {
    stroke("yellow");
    fill("white");
    textSize(30);
    text("GAME OVER",200,230);
    
  }
}
function spawnDoors()
{ 
  if(frameCount%240===0){
  door=createSprite(200,200);
  climber=createSprite(200,250);
  invisibleBlock=createSprite(200,260);
  invisibleBlock.width=climber.width;
  invisibleBlock.height=2;  
   
  invisibleBlock.debug=true;
    
  door.addImage("door",doorImage);
  climber.addImage("climber",climberImage);
    
  door.velocityY=4;
  climber.velocityY=4;
  invisibleBlock.velocityY=4;  
    
  door.x=Math.round (random(100,300));
    
  door.lifetime=100; 
  climber.lifetime=100;
    
  climber.x=door.x; 
  invisibleBlock.x=door.x;  
  
  ghost.depth=door.depth;
  ghost.depth+=1; 
  //ghost.depth++; 
    
    
  doorGroup.add(door);
  climberGroup.add(climber);  
  blockGroup.add(invisibleBlock);  
}
}