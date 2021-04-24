var jiggly, jigglyIMG;
var ground, invisibleGround, groundImage;

var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var starsGroup, starsImage;
var crystalGroup, crystalIMG, gameOver,restart,gameOverImage,restartImage, backg, backgIMG;

var score=0;
var win,wins;

function preload(){
  jigglyIMG = loadImage("jigglypuffClipart.png");
 
  
  groundImage = loadImage("ground2.png");
  
  starsImage = loadImage("starClipart.png");
  
  crystalIMG = loadImage("crystalClipart.png");
 
  backgIMG=loadImage("pastel.jpg")
 
  gameOverImage=loadImage('gameOverClipart.png');
  restartImage=loadImage('refreshClipart.png');
  win=loadImage("you win clipart.png");
}

function setup() {
  createCanvas(windowWidth-20,windowHeight-20);
  
  jiggly = createSprite(50,windowHeight/2,20,50);
  jiggly.addImage("running", jigglyIMG);
  //jiggly.debug=true;
  //jiggly.addAnimation('collide',trex_collided);
  jiggly.scale = 0.2;
  gameOver = createSprite(windowWidth/2-50,windowHeight/2-30);
  restart = createSprite(windowWidth/2-50,windowHeight/2+30);
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.scale = 0.3;
  restart.addImage("refresh", restartImage);
  restart.scale = 0.065;

gameOver.visible = false;
restart.visible = false;

gameOver.visible = false;
restart.visible = false;
  
backg=createSprite(0,0,windowWidth-20, windowHeight-20)
backg.addImage("bg",backgIMG)
backg.scale=5;

wins=createSprite(windowWidth/2,windowHeight/2+15);
    wins.addImage("win",win);
    wins.scale=0.3;

wins.visible=false;

/*ground = createSprite(windowWidth/2,windowHeight-50, windowWidth,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;
ground.velocityX = -(6 + 3*score/100);
  
  invisibleGround = createSprite(windowWidth/2,windowHeight-40,windowWidth,10);
  invisibleGround.visible = false;*/
  
  starsGroup = new Group();
  crystalGroup = new Group();
  
  score = 0;
}

function draw() {
  background(180);
  edge=createEdgeSprites();

  jiggly.bounceOff(edge[2]);

  //text("Score: "+ score, windowWidth/2,50);

  backg.depth=gameOver.depth-1;
  jiggly.depth=backg.depth+1;
  
 
  if(gameState===PLAY){
  //score = score + Math.round(getFrameRate()/60);
  
  
  
  if(touches.length>0 || keyDown("space")) {
    jiggly.velocityY = -15;
    touches=[];
  }


  
  jiggly.velocityY = jiggly.velocityY + 0.6
  
 // if (ground.x < 0){
//    ground.x = ground.width/2;
 // }
 
 if (backg.x < 0){
    backg.x = backg.width/2;
  }
  

var randm=Math.round(random(1,2));
  if(randm===1){
spawnStars();
  }
  else{
    spawnCrystals();
  }

  if (jiggly.isTouching(starsGroup)){
    score=score+1;
    starsGroup.destroyEach();
    }
  
    if(crystalGroup.isTouching(jiggly)|| jiggly.y>windowHeight){
       gameState=END
  }   

  if(score>=10){
    gameState=WIN;
  }
}

  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    jiggly.x=50;
    jiggly.y=windowHeight/2;
    //set velcity of each game object to 0
    //ground.velocityX = 0;
    jiggly.velocityY = 0;
    crystalGroup.setVelocityXEach(0);
    starsGroup.setVelocityXEach(0);
    
    //change the trex animation
    //jiggly.changeAnimation("collide",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    crystalGroup.setLifetimeEach(-1);
    starsGroup.setLifetimeEach(-1);
   
   }
  
  
  if(touches.length>0 || mousePressedOver(restart)) {
    reset();
    touches=[];
  }
  

  else if(gameState===WIN){
    starsGroup.destroyEach();
    crystalGroup.destroyEach();

    wins.visible=true

    jiggly.x=windowWidth/2;
    jiggly.y=windowHeight/2-80;

    restart.visible=true;
    restart.y=windowHeight/2+72;
    restart.x=windowWidth/2;
  }

// jiggly.collide(invisibleGround);
  drawSprites();

textSize(17)  
  text('Points:'+score,windowWidth/2-40, windowHeight-660)
  text('Press Space, or tap the screen to keep levitating!', windowWidth/2-180, windowHeight-640)
}

function spawnStars() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var stars = createSprite(windowWidth,windowHeight-10,40,10);
    stars.y = Math.round(random(40,windowHeight-80));
    stars.addImage("star", starsImage);
    stars.scale = 0.065;
   // stars.debug=true;
    //stars.scale = 0.5;
    stars.velocityX = -(6 + 3*score/100);


    
     //assign lifetime to the variable
     stars.lifetime = 500;

    

    //adjust the depth
    //stars.depth = jiggly.depth;
    //jiggly.depth = jiggly.depth + 1;
    
    //add each cloud to the group
    starsGroup.add(stars);
   
  }
  
}

function spawnCrystals() {
  if(frameCount % 60 === 0) {
    var crystal = createSprite(windowWidth,windowHeight-240,10,40);
    crystal.velocityX =  -(6 + 3*score/100);;
    crystal.y = Math.round(random(40,windowHeight-80));
    //generate random obstacles
  crystal.addImage("obstacle",crystalIMG)
   // crystal.debug=true;
    //console.log(crystal.width+ "," +crystal.height)
    crystal.setCollider("rectangle",0,0,350,300)
    //assign scale and lifetime to the obstacle           
    crystal.scale = 0.35;
    crystal.lifetime = 300;

    
    //add each obstacle to the group
    crystalGroup.add(crystal);
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
wins.visible=false;
  crystalGroup.destroyEach();
  starsGroup.destroyEach();
  
jiggly.x=50;
jiggly.y=windowHeight/2;

 // jiggly.changeAnimation("running",jigglyIMG);
 //ground.velocityX = -(6 + 3*score/100);
  score = 0;
  
}