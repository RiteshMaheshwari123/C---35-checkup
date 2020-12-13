//Create variables here

var dog, happyDog, dogImg, happyDogImg;
var database;
var foodS, foodStock;

function preload()
{
  //load images here
dogImg = loadImage("images/dogImg.png");
happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas( 1000, 1000);
  
  database = firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite( 500, 400, 50, 50);
  dog.addImage("normal",dogImg);

  //happyDog = createSprite( 250, 250, 50, 50);
 //happyDog.addImage("fed",happyDogImg);
}


function draw() {  
  background( 46, 139, 87);

  if(keyWentDown(UP_ARROW) && foodS>0){
    foodS = foodS - 1;
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  //add styles here

  textSize(25);
  fill("white")
  text("Note : Press UP_ARROW to Feed the Dog",500,850);

  textSize(30);
  fill("white")
  text("Food Left : " + foodS, 500, 900);

  //if(foodS !== 0){
    //textSize(30);
 //fill("white")
  //text("Food Left : " + foodS, 500, 900);
 // }
  
 
}

function readStock(data){
  foodS=data.val();
}


function writeStock(x){

  database.ref('/').update({
    Food:x
  })
}

