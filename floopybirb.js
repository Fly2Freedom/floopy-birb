var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var ball = {xPos: c.width/20, yPos: c.height/20, xMove: 5, yMove: 5, rad: 20}; //Creates the ball object, and it's parameters will be used later for collision.
var gravity = 0.2; //Adds a 'weight' to the ball, giving it a form of gravity.
var damping = 0.75; //When the ball hits a wall, it will slow down by this amount.
var rectWidth = Math.floor(Math.random() * (125 - 100) + 100); //Randomly generates a number which will determine the width of the pipes.
var rectHeight = Math.floor(Math.random() * (190 - 170) + 170); //Randomly generates a number which will determine the height of the pipes.
var rectLower = {xPos: c.width-rectWidth, yPos: c.height-rectHeight, width: rectWidth, height: rectHeight};
var rectUpper = {xPos: c.width-rectWidth, yPos: 0, width: rectWidth, height: rectHeight};
var rectArray = []; //Will be used later to draw our pipes.
var timer = 0; //Will be used later to spawn the pipes at a specific time.
var score = 0; //Will increment every time you go through a pipe.
var diffTimer = 0; //Will be used to determine the difficulty of the game. At a specific time, pipes will be drawn more frequently.

window.addEventListener("keydown", ev => { //Looks for a keypress, and also looks for a specific keycode
  if (ev.keyCode === 13) { //If the keycode is 32, which in this case is the enter key...
    var startmenu = document.getElementById("startScreen"); //The startmenu is called...
    startmenu.remove(); //And then the start menu is removed, 'unpausing' the game.

var birb = new Image(); //makes bird image
birb.src = "birb(1).png"; //gets bird image
birb.width = 10;  //bird picture width
birb.height = 10;  //bird picture height
ctx.drawImage(birb, 150, 150, 10, 10); //draw bird onto canvas

function drawCircle() { //This function will draw the cricle based on the ball object params above.
  ctx.beginPath();
  ctx.drawImage(birb, ball.xPos, ball.yPos, 40, 40);
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
function makePipe(lowRectX, lowRectY, lowRectWid, lowRectHeight, upRectX, upRectY, upRectWid, upRectHeight){ //This function will draw pipes every frame.
  ctx.clearRect(0, 0, c.width, c.height); //Will clear the canvas every frame.
  for (var i = 0; i < rectArray.length; i++) {
    ctx.beginPath(); //Starts to draw
    ctx.rect(rectArray[i].xPosL, rectArray[i].yPosL, rectArray[i].widthL, rectArray[i].heightL); //Draws a rectangle based on params above.
    ctx.fillStyle = "green"; //Will color the pipe green.
    ctx.fill(); //Actually colors the pipe.
    ctx.stroke(); //Draws everything else.
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
function collisionCheck(lowRectX, lowRectY, lowRectWid, lowRectHeight, upRectX, upRectY, upRectWid, upRectHeight){ //This function will check to see if the ball hits a pipe.
  if ((ball.xPos + ball.xMove + ball.rad > lowRectX) && (ball.xPos + ball.xMove + ball.rad < lowRectX + 2)) { //When the ball enters the gap between two pipes.
    score ++; //The score will go up by one.
    console.log(score);
    document.getElementById('score').innerHTML = "Score = " + score;
  }
  if ((ball.xPos + ball.xMove + ball.rad > upRectX) && (ball.yPos + ball.rad < upRectHeight) && (ball.rad + ball.xPos < upRectX + upRectWid)) { //If the ball enters a specific range of coordinates (in this case, the upper pipe), the game will end.
    alert("GAME OVER! Score: " + score); //An alert message appears, saying that the game has ended, and listing the score count.
  }
  if ((ball.yPos + ball.yMove - ball.rad < upRectHeight) && (ball.xPos + ball.rad < upRectWid + upRectX + 50) && (ball.rad + ball.xPos > upRectX)) {
    alert("GAME OVER! Score: " + score);
  }
  if ((ball.xPos + ball.xMove + ball.rad > lowRectX) && (ball.yPos + ball.rad > lowRectY) && (ball.rad + ball.xPos < lowRectX + lowRectWid)) { //If the ball enters a specific range of coordinates (in this case, the lower pipe), the game will end.
    alert("GAME OVER! Score: " + score);
  }
  if ((ball.yPos + ball.yMove + ball.rad > lowRectY) && (ball.xPos + ball.rad < lowRectWid + lowRectX + 50) && (ball.rad + ball.xPos > lowRectX)) {
    alert("GAME OVER! Score: " + score);
  }
}

function draw() { //This function will actually draw the ball and the pipe. It will also give the ball it's 'physics'.
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); //Clears the canvas every frame.
  makePipe(rectLower.xPos, rectLower.yPos, rectLower.width, rectLower.height, rectUpper.xPos, rectUpper.yPos, rectUpper.width, rectUpper.height); //Actually draws the pipes.
  if (timer == 300) {
    var chance = Math.floor(Math.random() * (1 - 4) + 4); //Will generate a random number between 1 and 3
    if (chance == 1) { //If the number is 1
      var rectHUp = Math.floor(Math.random() * (190 - 150) + 150); //The pipe's gap will change location.
      var rectHLow = Math.floor(Math.random() * (190 - 150) + 150);
    }
    if (chance == 2) { //If the number is 2
      var rectHUp = Math.floor(Math.random() * (310 - 290) + 290); //The pipe's gap will change location.
      var rectHLow = Math.floor(Math.random() * (90 - 70) + 70);
    }
    if (chance == 3) { //If the number is 3
      var rectHUp = Math.floor(Math.random() * (90 - 70) + 70); //The pipe's gap will change location.
      var rectHLow = Math.floor(Math.random() * (310 - 290) + 290);
    }
    var rectW = Math.floor(Math.random() * (125 - 100) + 100);
    var newRect = {xPosL: c.width-rectW, yPosL: c.height-rectHLow, widthL: rectW, heightL: rectHLow, xPosU: c.width-rectW, yPosU: 0, widthU: rectW, heightU: rectHUp};
    rectArray.push(newRect);
    timer = 0;
  }
  for (var i = 0; i < rectArray.length; i++) {
    makePipe(rectArray[i].xPosL, rectArray[i].yPosL, rectArray[i].widthL, rectArray[i].heightL, rectArray[i].xPosU, rectArray[i].yPosU, rectArray[i].widthU, rectArray[i].heightU);
    rectArray[i].xPosL --; //Gives the illusion of the pipes moving to the left.
    rectArray[i].xPosU --;
  }
  drawCircle();
  if (ball.xPos + ball.xMove > c.width - ball.rad || ball.xPos + ball.xMove < ball.rad) { //If the ball hits the walls of the canvas.
    ball.xMove = -ball.xMove; //The ball will be bounced in the opposite direction.
  }
  if (ball.yPos + ball.yMove > c.height - ball.rad || ball.yPos + ball.yMove < ball.rad) { //If the ball hits the floor or roof of the canvas.
    ball.yMove = -ball.yMove * damping; //The ball will bounce in the opposite direction and lose some speed.
  }
  ball.yMove += gravity; //This will give the ball it's artificial gravity.
  ball.xPos = 250;
  if (((ball.yPos + ball.yMove) + ball.rad) <= c.height) {
    ball.yPos += ball.yMove;
  }
  for (var i = 0; i < rectArray.length; i++) {
    collisionCheck(rectArray[i].xPosL, rectArray[i].yPosL, rectArray[i].widthL, rectArray[i].heightL, rectArray[i].xPosU, rectArray[i].yPosU, rectArray[i].widthU, rectArray[i].heightU);
  }
  timer ++; //The timer will go up by one every time the draw function loops.
  diffTimer++; //diffTimer will increment to activate hardmode.
  if (diffTimer == 10000) { //If the diffTimer is at 10000...
    setInterval(draw, 9); //The game will speed up dramatically.
  }
}

setInterval(draw, 10); //Makes sure that the draw function loops.

document.addEventListener("keydown", makeBounce); //Looks for when a key is pressed.
function makeBounce(e) { //This function will make the ball jump.
  if (e.key == " ") { //When the spacebar is pressed (the empty string being the spacebar).
    ball.yMove -= 5; //The ball will be tossed up a short distance.
  }
  if (e.key == "r") {
    ball.xMove = -ball.xMove;
  }
}


} //Don't mess with these, these are for the start menu function at the top.
});
