var bg,bg1,bg2,bg3,bg4;
var gameStates = "select_level";
var level1button,level2button,level3button,resetbutton;
var jack,jackImg,spikes,spikes2,spikes3,spikes4,spikes5,spikesImg,spikesGroup;
var invisibleGround;
var torch,torchImg,gameover,gameoverImg;
var tiltbutton,tiltbuttonImage;
var finishline, finishline1, finishline2, finishlineImg;
var door, doorImg, wall, wallImg;
var enterdoor, exitdoor, enterdoorImg, exitdoorImg;
var hammer,hammerImg;
var score = 0

function preload() {
 
  bg = loadImage("castle.jpg");
  bg1 = loadImage("level1bg.jpg");
  bg2 = loadImage("level2bg.jpg");
  bg3 = loadImage("level3bg.jpg");
  bg4 = loadImage("treasurebg.jpg");
  jackImg = loadImage("Jack.png");
  torchImg = loadImage("torch.jpg");
  tiltbuttonImage = loadImage("hand.png");
  spikesImg = loadImage("spikes2.png");
  gameoverImg = loadImage("gameOver.png")
  finishlineImg = loadImage("finish line.png");
  doorImg = loadImage("door.png");
  wallImg = loadImage("wall.png");
  enterdoorImg = loadImage("usedoor.png");
  exitdoorImg = loadImage("usedoor2.png");
  hammerImg = loadImage("hammer.png");

}

function setup() {
  var canvas = createCanvas(800,400)
  
  level1button = createButton("Level1");
  level2button = createButton("Level2");
  level3button = createButton("Treasure");
  //resetbutton = createButton("Game Reset");

  level1button.position(200,150);
  level2button.position(400,150);
  level3button.position(600,150);
  //resetbutton.position(700,20);

  level2button.hide();
  level3button.hide();

  torch = createSprite(95,225);
  torch.addImage(torchImg);
  torch.scale = 0.75;
  torch.visible = false;

  door = createSprite(250,250);
  door.addImage(doorImg);
  door.visible = false;
  
  jack = createSprite(30,300);
  jack.addImage(jackImg);
  jack.scale = 0.4;
  jack.visible = false;

  invisibleGround = createSprite(400,390,1000,10);
  invisibleGround.visible = false;
  
  tiltbutton = createSprite(700,350,10,10);
  tiltbutton.addImage(tiltbuttonImage);
  tiltbutton.scale = 0.15;
  tiltbutton.visible = false;

  spikesGroup = createGroup();
  
  for(var x=200; x<= 440; x = x + 60){

    spikes = createSprite(x,360);
    spikes.addImage(spikesImg);
    spikes.scale = 0.4;
    spikesGroup.add(spikes);

  }
  for(var i = 0; i < spikesGroup.length; i++){
    spikesGroup.get(i).visible = false;
  }
  /*spikes2 = createSprite(260,360);
  spikes2.addImage(spikesImg);
  spikes2.scale = 0.4;

  spikes3 = createSprite(320,360);
  spikes3.addImage(spikesImg);
  spikes3.scale = 0.4;

  spikes4 = createSprite(380,360);
  spikes4.addImage(spikesImg);
  spikes4.scale = 0.4;

  spikes5 = createSprite(440,360);
  spikes5.addImage(spikesImg);
  spikes5.scale = 0.4;*/

  gameover = createSprite(400,200);
  gameover.addImage(gameoverImg);
  gameover.visible = false;

  finishline = createSprite(765,200);
  finishline.addImage(finishlineImg);
  finishline.scale = 0.3;
  
  finishline1 = createSprite(790,200);
  finishline1.addImage(finishlineImg);
  finishline1.scale = 0.3;

  finishline2 = createSprite(815,200);
  finishline2.addImage(finishlineImg);
  finishline2.scale = 0.3;

  finishline.visible = false;
  finishline1.visible = false;
  finishline2.visible = false;

  wall = createSprite(650,330);
  wall.addImage(wallImg);
  wall.scale = 0.5;
  wall.visible = false;

  enterdoor = createSprite(700,350);
  enterdoor.addImage(enterdoorImg);
  enterdoor.scale = 0.35;
  enterdoor.visible = false;

  exitdoor = createSprite(700,350);
  exitdoor.addImage(exitdoorImg);
  exitdoor.scale = 0.2;
  exitdoor.visible = false;

  hammer = createSprite(650,300);
  hammer.addImage(hammerImg);
  hammer.scale = 0.1;
  hammer.visible = false;

}

function draw() {

  edges = createEdgeSprites();
  jack.collide(edges);

  if(wall.visible === true){
    jack.collide(wall);
  }
  jack.collide(invisibleGround);
  /*resetbutton.mousePressed(()=>{
    gameStates = "select_level";
    score = 0
    show();
    torch.visible = false;
    jack.visible = false;
    tiltbutton.visible = false;
    gameover.visible = false;
    for(var i = 0; i < spikesGroup.length; i++){
      spikesGroup.get(i).visible = false;
    }
    finishline.visible = false;
    
  })*/

  if(gameStates === "select_level"){
    background(bg);

    textSize(20);
    fill("black");
    text("Use the arrow keys to move",400,370);
    text("Don't touch the spikes",400,390);
    text("Find the treasure to win the game",250,70);
    text("Treasure Castle",330,50);

    level1button.mousePressed(()=>{
      hide();
      gameStates = "level1_Play"
      for(var i = 0; i < spikesGroup.length; i++){
        spikesGroup.get(i).visible = true;
      }
      finishline.visible = true;
        
    });

    
    level2button.mousePressed(()=>{

      hide();
      gameStates = "level2_Play"
      jack.position.x = 30;
      jack.position.y = 300;
      
      door.visible = true;

     });
    

    level3button.mousePressed(()=>{
      hide();
      gameStates = "level3_Play"
        
    });
  }
  if(gameStates === "level1_Play"){
    background(bg1);
    textSize(15);
    fill("black")
    text("Reach the finish line to complete the level",270,50)
    jack.visible = true;
    torch.visible = true;
    if(torch.isTouching(jack)){
      tiltbutton.visible = true;
      
    }else{
      tiltbutton.visible = false;
    }
    
    for(var i = 0; i < spikesGroup.length; i++){
      //console.log(spikesGroup.length);
      if(spikesGroup.get(i).isTouching(jack)){
        spikesGroup.get(i).remove();
        jack.velocityX = 0;
        jack.velocityY = 0;
        gameStates = "end";
      }
    }

    if(mousePressedOver(tiltbutton) && tiltbutton.visible === true){
      for(var i = 0; i < spikesGroup.length; i++){
      spikesGroup.get(i).remove();
    }
    
    }
    if(jack.isTouching(finishline)){
      level2button.show();
      score = 1;
      jack.velocityX = 0;
      jack.velocityY = 0;
      finishline.remove();
      torch.remove();
    }

    if(score === 0){
    moveJack();
    }

  }

  if(gameStates === "level2_Play"){
    background(bg2);
    textSize(15);
    fill("black");
    text("Break the wall",350,50);
    jack.visible = true;
    wall.visible = true;
    finishline1.visible = true;
    
    if(jack.isTouching(door) && door.visible === true){
      enterdoor.visible = true;
    }else{
      enterdoor.visible = false;
    }

    if(mousePressedOver(enterdoor) && enterdoor.visible === true){
      gameStates = "level2_BehindDoor";
      jack.x = 130;
      enterdoor.visible = false;
    }
    if(jack.isTouching(hammer) && hammer.visible === true){
      hammer.x = jack.x + 50;
      hammer.y = jack.y;
    }
    if(hammer.isTouching(wall) && hammer.visible === true){
      wall.remove();
      hammer.remove();
    }
    if(jack.isTouching(finishline1) && finishline1.visible === true){
      finishline1.remove();
      level3button.show();
      score = 2;
      jack.velocityX = 0;
      jack.velocityY = 0;
    }
    if(score === 1){
    moveJack();
    }
  }

  if(gameStates === "level2_BehindDoor"){
    background(bg3);
    wall.visible = false;
    finishline1.visible = false;
    hammer.visible = true;
    if(jack.isTouching(door) && door.visible === true){
      exitdoor.visible = true;
    }else{
      exitdoor.visible = false;
    }
    if(jack.isTouching(hammer) && hammer.visible === true){
      hammer.x = jack.x + 50;
      hammer.y = jack.y;
    }
    if(mousePressedOver(exitdoor) && exitdoor.visible === true){
      gameStates = "level2_Play";
      exitdoor.visible = false;
      if(jack.isTouching(hammer)){
        hammer.visible = true;
      }else{
        hammer.visible = false;
      }
      jack.x = 130;
    }
    moveJack();
  }

  if(gameStates === "level3_Play"){
    background(bg4);
    textSize(25);
    fill("white");
    text("Congratulations, You have won the game",200,50);
    jack.visible = true;
    door.visible = false;
    moveJack();
  }

  if(gameStates === "end"){
    gameover.visible = true;
  }

  //fill("black")
  //text(mouseX + "  " + mouseY,400,20);
  //text("Score : " + score,10,10);
  drawSprites();
}

function hide(){
  level1button.hide();
  level2button.hide();
  level3button.hide();
}

function show(){
  level1button.show();
  level2button.show();
  level3button.show();
}

function moveJack(){
  if(keyDown(RIGHT_ARROW)){
    jack.x = jack.x + 5;
  }

  if(keyDown(LEFT_ARROW)){
    jack.x = jack.x - 5;
  }

  if(keyDown(UP_ARROW) && jack.isTouching(invisibleGround)){
    jack.velocityY = -10;
  }
  jack.velocityY = jack.velocityY + 0.5;
}


  


