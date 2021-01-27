var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var ball = {xPos: c.width/20, yPos: c.height/20, xMove: 5, yMove: 5, rad: 20}; //The ball being controlled by the player, with it's params setting it's position and radius.
var gravity = 0.2; //Sets the rate at which the ball falls down.
var damping = 0.75; //This will make the ball slow down when it hits a wall.
var rectWidth = Math.floor(Math.random() * (125 - 100) + 100);
var rectHeight = Math.floor(Math.random() * (190 - 170) + 170);
var rectLower = {xPos: c.width-rectWidth, yPos: c.height-rectHeight, width: rectWidth, height: rectHeight};
var rectUpper = {xPos: c.width-rectWidth, yPos: 0, width: rectWidth, height: rectHeight};
var rectArray = []; //Is just a placeholder to be used later.
var timer = 0; //Will mainly be used to time the spawns of the pipes.
var score = 0; //Score counter that will go up every time the player goes through a pipe.

function drawCircle() { //This function will draw the circle that the player controls.
  ctx.beginPath();
  ctx.arc(ball.xPos, ball.yPos, ball.rad, 0, Math.PI*2); //Draws the ball using it's pre-determined loation and radius.
  ctx.fillStyle = "red"; //Makes the ball red.
  ctx.fill();
  ctx.stroke();
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
function makePipe(lowRectX, lowRectY, lowRectWid, lowRectHeight, upRectX, upRectY, upRectWid, upRectHeight){ //This function will create the pipes based on it's parameters.
  ctx.clearRect(0, 0, c.width, c.height); //Clears the canvas every frame.
  for (var i = 0; i < rectArray.length; i++) {
    ctx.beginPath();
    ctx.rect(rectArray[i].xPosL, rectArray[i].yPosL, rectArray[i].widthL, rectArray[i].heightL); //Will draw the base of the bottom pipe.
    ctx.fillStyle = "green"; //These set the color of the pipes to green.
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(rectArray[i].xPosL-15, rectArray[i].yPosL, rectArray[i].widthL+30, 40); //Will draw the top of the bottom pipe.
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(rectArray[i].xPosU, rectArray[i].yPosU, rectArray[i].widthU, rectArray[i].heightU); //Will draw the base of the top pipe.
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(rectArray[i].xPosU-15, rectArray[i].heightU-40, rectArray[i].widthU+30, 40); //Will draw the top of the top pipe.
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.stroke();
  }
}

/* collisionCheck(lowRectX, lowRectY, lowRectWid, lowRectHeight, upRectX, upRectY, upRectWid, upRectHeight)
@param lowRectX {obj}- x position of the long, bottom tube
@param lowRectY {obj}- y position of the long, bottom tube
@param lowRectWid {obj}- the width of the long, bottom tube
@param lowRectHeight {obj}- the height of the long, bottom tube
@param upRectX {obj}- x position of the long, top tube
@param upRectY {obj}- y position of the long, top tube
@param upRectWid {obj}- the width of the long, top tube
@param upRectHeight {obj}- the height of the long, top tube
*/
function collisionCheck(lowRectX, lowRectY, lowRectWid, lowRectHeight, upRectX, upRectY, upRectWid, upRectHeight){
  if ((ball.xPos + ball.xMove + ball.rad > lowRectX) && (ball.xPos + ball.xMove + ball.rad < lowRectX + 2)) { //Every time the ball goes through a pipe gap.
    score ++; //The score will go up 1
    console.log(score);
    document.getElementById('score').innerHTML = "Score = " + score;
  }

  if ((ball.xPos + ball.xMove + ball.rad > upRectX) && (ball.yPos + ball.rad < upRectHeight) && (ball.rad + ball.xPos < upRectX + upRectWid)) { //If the ball's position overlaps with the corrdinates of the top pipes.
    alert("GAME OVER! Your score is " + score + ". Refresh the screen to play again."); //The game will end, and the score counter will be displayed.
  }
  if ((ball.yPos + ball.yMove - ball.rad < upRectHeight) && (ball.xPos + ball.rad < upRectWid + upRectX + 50) && (ball.rad + ball.xPos > upRectX)) {
    alert("GAME OVER! Your score is " + score + ". Refresh the screen to play again.");
  }
  if ((ball.xPos + ball.xMove + ball.rad > lowRectX) && (ball.yPos + ball.rad > lowRectY) && (ball.rad + ball.xPos < lowRectX + lowRectWid)) { //If the ball's position overlaps with the corrdinates of the bottom pipes.
    alert("GAME OVER! Your score is " + score + ". Refresh the screen to play again.");
  }
  if ((ball.yPos + ball.yMove + ball.rad > lowRectY) && (ball.xPos + ball.rad < lowRectWid + lowRectX + 50) && (ball.rad + ball.xPos > lowRectX)) {
    alert("GAME OVER! Your score is " + score + ". Refresh the screen to play again.");
  }
}

function draw() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  makePipe(rectLower.xPos, rectLower.yPos, rectLower.width, rectLower.height, rectUpper.xPos, rectUpper.yPos, rectUpper.width, rectUpper.height); //This will actually draw the pipe, and will be used in a SetInterval.
  if (timer == 300) { //When you start the game, a timer will count to 300. Once the timer hits 300...
    var chance = Math.floor(Math.random() * (1 - 4) + 4); //The pipe gap's location will be randomly generated.
    if (chance == 1) {
      var rectHUp = Math.floor(Math.random() * (190 - 150) + 150);
      var rectHLow = Math.floor(Math.random() * (190 - 150) + 150);
    }
    if (chance == 2) {
      var rectHUp = Math.floor(Math.random() * (310 - 290) + 290);
      var rectHLow = Math.floor(Math.random() * (90 - 70) + 70);
    }
    if (chance == 3) {
      var rectHUp = Math.floor(Math.random() * (90 - 70) + 70);
      var rectHLow = Math.floor(Math.random() * (310 - 290) + 290);
    }
    var rectW = Math.floor(Math.random() * (125 - 100) + 100);
    var newRect = {xPosL: c.width-rectW, yPosL: c.height-rectHLow, widthL: rectW, heightL: rectHLow, xPosU: c.width-rectW, yPosU: 0, widthU: rectW, heightU: rectHUp};
    rectArray.push(newRect);
    timer = 0;
  }
  for (var i = 0; i < rectArray.length; i++) {
    makePipe(rectArray[i].xPosL, rectArray[i].yPosL, rectArray[i].widthL, rectArray[i].heightL, rectArray[i].xPosU, rectArray[i].yPosU, rectArray[i].widthU, rectArray[i].heightU);
    rectArray[i].xPosL --;
    rectArray[i].xPosU --;
  }
  drawCircle();
  if (ball.xPos + ball.xMove > c.width - ball.rad || ball.xPos + ball.xMove < ball.rad) {
    ball.xMove = -ball.xMove;
  }
  if (ball.yPos + ball.yMove > c.height - ball.rad || ball.yPos + ball.yMove < ball.rad) {
    ball.yMove = -ball.yMove * damping;
  }
  ball.yMove += gravity;
  ball.xPos = 250;
  if (((ball.yPos + ball.yMove) + ball.rad) <= c.height) {
    ball.yPos += ball.yMove;
  }
  for (var i = 0; i < rectArray.length; i++) {
    collisionCheck(rectArray[i].xPosL, rectArray[i].yPosL, rectArray[i].widthL, rectArray[i].heightL, rectArray[i].xPosU, rectArray[i].yPosU, rectArray[i].widthU, rectArray[i].heightU);
  }
  timer ++; //This makes the timer go up by one every frame.
}

setInterval(draw, 10);

document.addEventListener("keydown", makeBounce); //This is looking for a keypress.
function makeBounce(e) {
  if (e.key == " ") { //When a key is pressed... (the empty string being the spacebar)
    ball.yMove -= 5; //The ball will jump a small distance.
  }
  if (e.key == "r") {
    ball.xMove = -ball.xMove;
  }
}
