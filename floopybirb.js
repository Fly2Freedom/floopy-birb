var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var x = myCanvas.width / 20; //These 2 variables determine the starting circles location, in this case, the top left of the screen.
var y = myCanvas.height / 20;

var dx = 10; //These variables will be used later to change the position of the circle.
var dy = 10; //Changing both of these numbers will also change the speed of the circle (in other words, how many units the circle moves per frame).



// @function exeptionsRand();
// @param exeption [integer] : telles the function when to start excluding
// @param sign [string] {Expects} ["<",">","<=",">="]: tells the function what signs to use
// @param max [integer] {requires} [max > min] : tells the function when to stop;
// @param min [integer] {requires} [min < max] : tells the function when to start;
function exeptionsRand(exeption, sign, max,min) {
    var randomInitial = Math.floor(Math.random()*max);
    var acceptable = false;
    while (acceptable == false) {
    if (sign == ">") {
        if (randomInitial < exeption) {
            acceptable = true;
        }else{
          randomInitial = Math.floor(Math.random()*max);
        }
    }else if (sign == "<") {
        if (randomInitial > exeption) {
            acceptable = true;
        }else{
          randomInitial = Math.floor(Math.random()*max);
        }
    }
    else if (sign == "<=") {
        if (randomInitial >= exeption) {
            acceptable = true;
        }else{
          randomInitial = Math.floor(Math.random()*max);
        }
    }
    else if (sign == ">=") {
        if (randomInitial <= exeption) {
            acceptable = true;
        }
        else{
            randomInitial = Math.floor(Math.random()*max);
        }
    }
    else{
      throw new Error("in exeptionsRand() sign expects to be >, <, <=, >= and got " + sign + " please chaneg the sign to match expectations");
    }
    }
    return randomInitial;
}
var pipx = exeptionsRand(15, "<",myCanvas.width-15,0);
var pipy = exeptionsRand(15, "<",Math.floor(myCanvas.height/3)-15,0);
var pipeW1 = exeptionsRand(28, ">", 50,0);
var pipeH1 = exeptionsRand(36, ">", 2456,0);
var pipBotObj = {width:pipeW1,height:234, x:pipx ,y:pipy+460,gap: 20};
var pipTopObj = {width: pipeW1,height:pipBotObj.gap, x:pipx,y:0};


var gravity = 0.2; //Sets the gravity pulling the ball to the ground.
var damping = 0.75; //The rate at which the ball slows down.
var traction = 0.95; //Will make the ball stop.
var ballSize = 20; //Sets the circle's radius.
function drawPipes(){
    ctx.beginPath();
    ctx.rect(pipBotObj.width, pipBotObj.height, pipBotObj.x,pipBotObj.y);
    ctx.rect(pipTopObj.width, pipTopObj.height, pipTopObj.x, pipTopObj.y);
  ctx.stroke();
}



function drawCircle() {
  ctx.beginPath();
  ctx.arc(x, y, ballSize, 0, Math.PI*2); //The circle, on frame one, will always start at the top left, and its size will always be set to ballSize.
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

  if(y + dy > myCanvas.height - ballSize || y + dy < ballSize) { //If the circle's y position exceeds the height of the canvas...
     dy = -dy * damping; //Its y direction will be flipped, and it's speed will decrease.
    //dx *= traction;
   }

  dy += gravity; //Adds the gravity value to the ball's dy value, giving it a artificial force of gravity.

  x += dx;

  if (((y + dy) + ballSize) <= 300) {
    y += dy;
  }
}

setInterval(draw, 10);
document.addEventListener("keypress", keyPress);
function keyPress(e) {
    if (e.key == " ") {
      //if (dx > 0) {
      //  dx+=5;
      //}
      //if (dx < 0) {
      //  dx-=5;
      //}
      dy-=10;
    }
}
