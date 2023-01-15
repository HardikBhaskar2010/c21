var space, spaceimg;
var rocket, rocketimg;
var asteroid, asteroidimg, asteroidsGroup;
var star, starimg, starsGroup;
var invisible, invisibleGroup
var Play =1;
var End =0;
var gameState = Play;

function preload(){
spaceimg = loadImage("bg.jpg");
rocketimg = loadImage("rocket.png");
asteroidimg = loadImage("asteroid.png");
starimg = loadImage("star.png")
space_sound = loadSound("sound.mp3")


}

function setup() {
 createCanvas(windowWidth,windowHeight);
 //console.log(windowHeight)
 space = createSprite(300,300);
 space_sound.loop()
 space.addImage("space",spaceimg);
 space.velocityY = 2;


 

 rocket = createSprite(width/2,height/1.5,50,50)
 rocket.scale = 0.5;
 rocket.setCollider("rectangle",0,0,130,255);
 rocket.debug = true
 
 
 rocket.addImage("rocket",rocketimg)

 asteroidsGroup = new Group();
 starsGroup = new Group()
 invisibleGroup = new Group();
}

function draw() {
 background(255);
if(gameState === Play){
    if(keyDown("right_arrow")){
    rocket.x = rocket.x + 3;
 }
 if(keyDown("left_arrow")){
    rocket.x = rocket.x - 3;
 }
spawn_Asteroid()
 if(space.y > 500){
    space.y = 250
  }
  if(invisibleGroup.isTouching(rocket)){
   space.velocityY = 0
   gameState = "End"
}
 drawSprites()
}
if(gameState === End){
   stroke("yellow");
   fill("yellow");
   textSize(30);
   text("Game Over",width/2,height/2)
}
}

function spawn_Asteroid(){
    
    if (frameCount % 340 === 0){
    var asteroid = createSprite(200, -50)
    asteroid.scale = 0.2;
    var invisible = createSprite(200,15);
    invisible.width = asteroid.width;
    invisible.height = asteroid.height;
    asteroidsGroup.add(asteroid)
    invisibleGroup.add(invisible)
    invisible.visible = true
    
    asteroid.velocityY = 2
    asteroid.x = Math.round(random(height,width));
    asteroid.x = invisible.x
    invisible.velocityY = 2;
    asteroid.addImage("aster",asteroidimg)
    rocket.depth = asteroid.depth;
    rocket.depth +=1;
    asteroid.setCollider("circle",0,0,230);
    //asteroid.debug = true
    invisible.visible = false;
    if(invisible.isTouching(rocket)){
        space.velocityY = 0
    }
    }
}