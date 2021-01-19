var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var x = myCanvas.width / 2; //These 2 variables determine the starting circles location, in this case, the middle of the screen.
var y = myCanvas.height / 2;

var dx = 10; //These variables will be used later to change the position of the circle.
var dy = 10; //Changing both of these numbers will also change the speed of the circle (in other words, how many units the circle moves per frame).

// @function exeptionsRand();
// @param inOrOut [string] {Expects} ["in","out"]: Tells the function weather or not to use out or in for the ifs
// @param max [integer] {requires} [max > min] : tells the function when to stop;
// @param min [integer] {requires} [min < max] : tells the function when to start;
function exeptionsRand(intOrOut,max,min) {//this function allows you to go between the tubes.
    var inBool = true;//this variable 
  while (inBool == true) {
  var randNumber = Math.floor(Math.random()*(max-min))+min;
  if (intOrOut == "in") {
    if (max >= randNumber && randNumber >= min) {
        inBool = false;
    } else {
    randNumber = Math.floor(Math.random()*(max-min)) + min;
    }
  } else if (intOrOut == "out") {
    if (min >= randNumber <= max) {
        inBool = false;
    } else {
          randNumber = Math.floor(Math.random()*max)-min;
      }
    }
  }
  return randNumber;
}

var pipeWalls = {north:undefined,east:undefined,south:undefined,west:undefined};
var pipx = exeptionsRand("in", myCanvas.width-30, 75); //I haven't seen any change after modifying these numbers.
var pipy = exeptionsRand("in", myCanvas.height-35,90); //Nothing changes here as well.
var pipBotObj = {width:45,height:450, x:pipx ,y:pipy,gap: 40}; //Sets the bottom pipe's width (which is always the same) and height (which will randomly change). Changing the 'gap' value will change how far apart the pipes are.
var pipTopObj = {width:45,height:pipy-(pipBotObj.gap*2), x:pipx,y: 0}; //Does the same as above, but the pipe's height is based on the bottom pipes 'gap' value (in this case, the pipe's height will max out at 40 units above the bottom pipe).

function drawPipes(){ //This function is for making sure the pipes aren't drawn off-screen where they are not needed.
    ctx.beginPath();
    if ((pipTopObj.x +pipTopObj.width) == 0) {
        pipBotObj.x = myCanvas.width; //This will make sure that the top pipe isn't drawn off screen.
        pipTopObj.x = myCanvas.width;
        pipx = exeptionsRand("in", myCanvas.width-30, 75); //Changing these numbers don't do anything as far as I can tell.
        pipy = exeptionsRand("in", myCanvas.height-75,46); //Same goes for these.
      pipBotObj.y = pipy;
      pipTopObj.height = pipy-(pipBotObj.gap*2);
    }
    pipBotObj.x = pipBotObj.x - 1;
    pipTopObj.x = pipTopObj.x - 1;
    ctx.rect(pipBotObj.x, pipBotObj.y, pipBotObj.width, pipBotObj.height); //Draws the bottom pipe based on what is calculated above.
    ctx.rect(pipTopObj.x, pipTopObj.y, pipTopObj.width, pipTopObj.height); //Draws the top pipe based on what is calculated above.
  ctx.stroke();
}

var gravity = 0.2; //Sets the gravity pulling the ball to the ground.
var damping = 0.01; //The rate at which the ball slows down.
var traction = 0.95; //Will make the ball stop.
var ballSize = 20; //Sets the circle's radius.

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
