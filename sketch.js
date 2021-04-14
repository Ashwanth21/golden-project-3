var martin, martinAnimation, martinJump,martin1;
var edges
var bg1
var bgImage1
var bgImage2
var stone1
var stone2
var ship
var shipImg
var enemy, enemyimg
var mainShip,mainShipImage
var fire, fireGroup
var stone1Group,stone2Group;
var obstaclesGroup,obstaclesImage;

var score = 0;
var level = "first";
function preload() {
  bgImage1 = loadImage("assets/chasejetimage.jpg")
  shipImg = loadImage("assets/jet.png")
  bgImage2 = loadImage("assets/secondlevelimg.jpg")
  bgImage3 = loadImage("assets/thirdlevelimg.jpg")
  enemyimg = loadImage("assets/enemy.png")
  martinAnimation = loadAnimation("p01.png", "p02.png", "p03.png", "p04.png", "p05.png")
  martinJump = loadAnimation("p11.png", "p12.png", "p13.png", "p14.png", "p15.png", "p16.png", "p17.png", "p18.png")
  fireImage = loadImage("assets/lazer.png")
  obstaclesImage=loadImage("astrotids.png")
  mainShipImage=loadImage("assets/mainShip.png")
}


function setup() {
  createCanvas(1200, 800);
  //create level1 image
  //  bg1=createSprite(600,400,1200,800)
  //  bg1.addImage("bg1",bgImage1);
  //  bg1.scale= 2.9;
  //create martin 
  martin = createSprite(100, displayHeight - 300, 20, 20);
  martin.addAnimation("martin", martinAnimation)
  martin.addAnimation("jump", martinJump)
  martin.scale = 0.5
  //Create egdes
  edges = createEdgeSprites()
  //create stone
  stone1 = createSprite(180, 580, 330, 30)
  stone1.visible = false
  stone2 = createSprite(1059, 652, 800, 30)
  stone2.visible = false
  //create jet
  ship = createSprite(1100, 540, 50, 40);
  ship.addImage("jet", shipImg)
  ship.scale = 0.1
  enemy = createSprite(748, 592, 10, 10)
  enemy.addImage("enemy", enemyimg)
  enemy.scale = 0.2
  fireGroup = new Group()
  stone1Group = new Group()
  stone2Group=new Group()
  obstaclesGroup=new Group()


}

function draw() {
  background("#1A0B74");
  textSize(25)
  fill("white")
  text("x:" + mouseX + ", y:" + mouseY, 10, 20)
  martin.changeAnimation("martin", martinAnimation)

  if (level === "first") {
    
    

    image(bgImage1, -320, 0, 2000, 800)
    textSize(25)
    stroke("blue")
    text("Press Right Arrow To Move Right, Press Left Arrow To Move Left , Press Up Arrow To Jump,Press D To Sprint Left,Press A To Sprite Right",93,53)
    text("x:" + mouseX + ", y:" + mouseY, 10, 20)

    if (keyDown("LEFT_ARROW")) {
      martin.x -= 7

    }
    if (keyDown("RIGHT_ARROW")) {
      martin.x += 7

    }
    if (keyDown("UP_ARROW")) {
      martin.velocityY = -14;
      martin.changeAnimation("jump", martinJump);
    }
    martin.velocityY = martin.velocityY + 0.5;
    if (keyDown("d")) {
      martin.x += 10
    }
    if (keyDown("a")) {
      martin.x -= 10
    }
    martin.collide(edges)
    martin.collide(stone1)
    martin.collide(stone2)
    if (martin.isTouching(ship)) {
      level = "second"
    }
  } else if (level === "second") {
    image(bgImage2, -140, 0, 1480, 800)
    martin.destroy()
    stone1.destroy()
    stone2.destroy()
    enemy.destroy()
    ship.x = mouseX
    text("x:" + mouseX + ", y:" + mouseY, 10, 20)
    spawnObstacles()
    mainShip = createSprite(600, 40);
    mainShip.addImage(mainShipImage)
    mainShip.visible =false
    ship.y = mouseY
    if (keyWentDown("space")) {
      createFire()
    }
    console.log("score"+score)
    if(fireGroup.isTouching(obstaclesGroup)){
      obstaclesGroup.destroyEach()
      score =score +1 ;
    }
    if(score===1){
      mainShip.visible =true
      obstaclesGroup.lifetime = -1;
      

    }

    if(ship.isTouching(mainShip)){
      textSize(30)
      text("you win",600,400)
      
      
    }

  } 
  drawSprites();

}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(Math.round(random(10, 1100)), 165, 10, 40);
    //obstacle.debug = true;
    obstacle.velocityY = 6

    obstacle.addImage(obstaclesImage)

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


function createFire() {
  fire = createSprite(ship.x, ship.y, 5, 10)
  fire.addImage(fireImage);
  fire.velocityY = -6;
  fire.scale=0.02;
  fire.x = ship.x;
  fire.lifetime = 100;
  fire.shapeColor = "red"
  fireGroup.add(fire);
}