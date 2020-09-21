var monkey, monkeyImg, invisGround, obstacle, obs_img, backgrounds, bImg, ob_gr, banana, baImag, bgr, gameState, score;

function preload(){
  obs_img = loadImage("stone.png");
  bImg = loadImage("jungle.jpg"); 
  monkeyImg=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
baImg = loadImage("banana.png");
}
function setup() {
  createCanvas(400, 400);
  monkey = createSprite(60,250,50,50);
  monkey.addAnimation("monkey", monkeyImg);
  monkey.scale = 0.1;
  invisGround = createSprite(200,375,1000,2);
  invisGround.visible = false;
  backgrounds = createSprite(200,200,50,50);
  backgrounds.depth = monkey.depth - 1;
  backgrounds.addAnimation("jungle", bImg);
  backgrounds.velocityX = -3
  ob_gr = new Group();
  bgr = new Group();
  gameState = "play";
  score = 0;
}

function draw() {
  background(220);
  monkey.collide(invisGround);
  if(gameState === "play"){
    if(keyDown("space") && monkey.y >= 300) {
        monkey.velocityY = -20;
    }
    if(bgr.isTouching(monkey)){
       bgr.destroyEach();
      score = score + 1;
    }
    spawnObstacles();
    boonana();
    monkey.velocityY = monkey.velocityY + 0.8
    if(backgrounds.x < 0){
    backgrounds.x = backgrounds.width/2;
  }
    if(ob_gr.isTouching(monkey)){
       gameState = "end"; 
    }
  }else if(gameState === "end"){
      bgr.setVelocityXEach(0);
      ob_gr.setVelocityXEach(0);
    backgrounds.velocityX = 0;
    bgr.setLifetimeEach(-1);
    ob_gr.setLifetimeEach(-1);
    monkey.velocityY = 0;
  }
  drawSprites();
  fill("blue");
  text("Score: "+score, 300,100);
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    obstacle = createSprite(600,355,10,40);
    obstacle.setCollider("rectangle",0,0,300,300);
    ob_gr.add(obstacle);
    obstacle.scale = 0.1;
    obstacle.velocityX = -4;
    obstacle.lifetime = 200;
    obstacle.addImage("stone", obs_img);
    obstacle.debug = true;
  }
}

function boonana(){
  if(frameCount % 80 === 0){
    banana = createSprite(600, 235, 10, 40);
    banana.addImage("b", baImg);
    banana.scale = 0.1;
    banana.velocityX = -4
    banana.lifetime = 200;
    bgr.add(banana);
  }
}