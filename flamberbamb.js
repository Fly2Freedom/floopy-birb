var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var ball = {xPos: c.width/20, yPos: c.height/20, xMove: 5, yMove: 5, rad: 20};
var gravity = 0.2;
var damping = 0.75;
var rectWidth = Math.floor(Math.random() * (125 - 100) + 100);
var rectHeight = Math.floor(Math.random() * (190 - 170) + 170);
var rectLower = {xPos: c.width-rectWidth, yPos: c.height-rectHeight, width: rectWidth, height: rectHeight};
var rectUpper = {xPos: c.width-rectWidth, yPos: 0, width: rectWidth, height: rectHeight};
var rectArray = [];
var timer = 0;
var score = 0;

function drawCircle() {
  ctx.beginPath();
  ctx.arc(ball.xPos, ball.yPos, ball.rad, 0, Math.PI*2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.stroke();
}

function component(width, height, color, x, y, type) {
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = myGameArea.context;
    if (type == "image") {
      ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}

function startGame() {
  myGamePiece = new component(20, 20, "smileyface.png", 5, 5, "image");
  myGameArea.start();
}

/* makePipe(lowRectX, lowRectY, lowRectWid, lowRectHeight, upRectX, upRectY, upRectWid, upRectHeight)
@param lowRectX {obj}- x position of the long, bottom tube
@param lowRectY {obj}- y position of the long, bottom tube
@param lowRectWid {obj}- the width of the long, bottom tube
@param lowRectHeight {obj}- the height of the long, bottom tube
@param upRectX {obj}- x position of the long, top tube
@param upRectY {obj}- y position of the long, top tube
@param upRectWid {obj}- the width of the long, top tube
@param upRectHeight {obj}- the height of the long, top tube
*/
function makePipe(lowRectX, lowRectY, lowRectWid, lowRectHeight, upRectX, upRectY, upRectWid, upRectHeight){
  ctx.clearRect(0, 0, c.width, c.height);
  for (var i = 0; i < rectArray.length; i++) {
    ctx.beginPath();
    ctx.rect(rectArray[i].xPosL, rectArray[i].yPosL, rectArray[i].widthL, rectArray[i].heightL);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(rectArray[i].xPosL-15, rectArray[i].yPosL, rectArray[i].widthL+30, 40);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(rectArray[i].xPosU, rectArray[i].yPosU, rectArray[i].widthU, rectArray[i].heightU);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(rectArray[i].xPosU-15, rectArray[i].heightU-40, rectArray[i].widthU+30, 40);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.stroke();
  }
}

function drawCircle() {
  ctx.beginPath();
  ctx.arc(x, y, ballSize, 0, Math.PI*2); //The circle, on frame one, will always start in the middle, and its size will always be set to ballSize.
  ctx.fillStyle = "#0095DD"; //Sets the color of the circle to light blue.
  ctx.fill(); //Fills in the circle with the color provided in fillStyle.
  ctx.stroke();
}

function draw() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); //Clears the canvas every frame, so a new circle can be drawn.
  drawCircle();
drawPipes();

  if (x + dx > myCanvas.width - ballSize || x + dx < ballSize) { //If the circle's x position exceeds the width of the canvas...
    dx = -dx * damping; //The ball's x direction will be flipped, and it will bounce a specific distance (damping).
  }

  if (y + dy > myCanvas.height - ballSize || y + dy < ballSize) { //If the circle's y position exceeds the height of the canvas...
     dy = -dy * damping; //Its y direction will be flipped, and it's speed will decrease.
    //dx *= traction;
   }

  dy += gravity; //Adds the gravity value to the ball's dy value, giving it a artificial force of gravity.

  //x += dx; is not needed because the ball will never hit the side walls.

  if (((y + dy) + ballSize) <= 300) {
    y += dy;
  }
}

setInterval(draw, 10);

document.addEventListener("keypress", keyPress); //This will look for a key that is pressed.
function keyPress(e) { //Function that will play out when a key is pressed (e is just a placeholder)
    if (e.key == " ") { //When this key is pressed (the empty string represents the spacebar)
      //if (dx > 0) {
      //  dx+=5;
      //}
      //if (dx < 0) {
      //  dx-=5;
      //}
      dy-=5; //Will make the ball jump a small distance.
    }
}
function collisionDetect() {
  if (x >= pipBotObj.x && y >= pipBotObj.y) { //What this is doing right now is finding if the ball has overlapped with the coordinates of the pipes.
    location.reload();                        //It retarts the game.
  }                                           //It only stops printing once the ball enters where the gap for the next pipe will be.
  if (x >= pipTopObj.y && y >= pipTopObj.y) { //The pipes dont even have to be on the canvas, and the ball doesn't even have to be near the pipe's gap.
    location.reload();                        //It's really the best i've got right now.
  }
}

setInterval(collisionDetect, 10);
