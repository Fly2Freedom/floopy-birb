var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var x = myCanvas.width / 2; //These 2 variables determine the starting circles location, in this case, the middle of the screen.
var y = myCanvas.height / 2;

var dx = 0; //These variables will be used later to change the position of the circle.
var dy = 1; //Changing both of these numbers will also change the speed of the circle (in other words, how many units the circle moves per frame).

var gameState = false;// this will tell theu game weather or not to be on or off
var presses = 0;
const keys = document.querySelector('.buttons')
var needed = [];
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
    }else{
    randNumber = Math.floor(Math.random()*(max-min)) + min;
    }
  }else if (intOrOut == "out") {
    if (min <= randNumber <= max) {
        inBool = false;
    }else{
          randNumber = Math.floor(Math.random()*max)-min;

    }
  }
  }
  return randNumber;
}

function getAllCoords(p) {
    var area = [];
    var xVal = p.x;
    var yVal = p.y;
    if (p.type == "Bot") {//bottom pipe
        for (var yc = 0; yc <= p.height; yc++) {
        for (var xc = 0; xc <= p.width; xc++) {
          if (yc+yVal <= yVal || xc+xVal <= xVal || yc+yVal == yVal + p.height || xc+xVal == p.width +xVal) {
            area.push({x:xVal+xc,y:yVal+yc,type:"bottom"});
          }
        }
        }
    }else if(p.type == "Top"){//top Pipe
        for (var yc = 0; yc <= p.height; yc++) {
          for (var xc = 0; xc <= p.width; xc++) {
               if (yc+yVal == yVal || xc+xVal == xVal || yc+yVal == yVal + p.height || xc+xVal == p.width +xVal) {
                         area.push({x:xVal+xc,y:yVal+yc,type:"top"});
            }
          }
        }
    }
    var retArray = area;
    return retArray;
}

var pipx = exeptionsRand("in", myCanvas.width-30, 75);
var pipy = exeptionsRand("in", myCanvas.height-35,120);
var heightCalc = Math.abs(pipy - myCanvas.height);
var pipBotObj = {width:45,height:heightCalc, x:myCanvas.width-100 ,y:pipy,gap: 55, type:"Bot"};
var pipTopObj = {width: 45,height:pipy-(pipBotObj.gap*2), x:pipBotObj.x,y: 0, type:"Top"};
var topArea = getAllCoords(pipTopObj);
var botArea = getAllCoords(pipBotObj);
var pipeWalls = botArea.concat(topArea);
var pipSpeed = 1;
//arcPCDCC = arcinim Please Check For Coorloating Coordinates
function acrPCFCC() {
  var xVals =[];
    for (var i = 0; i < pipeWalls.length;i++) {
        if ((x+ballSize+1) == pipeWalls[i].x ) {
          xVals.push(pipeWalls[i]);
        }
    }
    for (var j = 0; j < xVals.length;j++) {
        if (xVals[j].y == Math.floor(y)) {
            return xVals[j];
        }
    }
}

function fixTheWalls() {
    for (var i = 0; i < pipeWalls.length; i++) {
        for (var j = 0; j < 5014;j++) {
          if (pipeWalls[i] == gapsed[j]) {
            pipeWalls.slice(i,i+1);
          }
        }
    }
}

function theGapIsBroken() {
  var botTop = {left:{x:pipTopObj.x,y:pipTopObj.y + pipTopObj.height},right:{x:pipTopObj.x+pipTopObj.width,y:pipTopObj.y + pipTopObj.height}};
  var topBot = {left:{x:pipBotObj.x,y:pipBotObj.y},right:{x:pipBotObj.x+pipBotObj.width,y:pipBotObj.y}};
    var diffToX = Math.abs(botTop.left.x-topBot.right.x);
    var diffToY = Math.abs(botTop.right.y - topBot.left.y);
    var gapBox = [];
    for (var i = 1; i < diffToY;i++){
      for (var j = 0; j <= diffToX;j++) {
        gapBox.push({x:botTop.left.x+j,y:botTop.left.y+i});
      }
    }
    return gapBox;
}
var gapsed = theGapIsBroken();
fixTheWalls();
function pip() {
  var k = 0;
  var ballCoords = {x:x,y:Math.floor(y)};
  var all = false;
  var allCount = 0;
    while (k < gapsed.length) {
      var coordsx = gapsed[k].x-pipSpeed;
      var coordsy = gapsed[k].y;

      if (ballCoords.x+ballSize == coordsx && ballCoords.y !== coordsy) {
        //code
        console.log(coordsx);
        allCount++;
      }
      if (ballCoords.x-ballSize == coordsx && ballCoords.y !== coordsy) {
        //code               console.log("+1")

        console.log(coordsx)

        allCount++;
      }
      if (ballCoords.x == coordsx &&Math.floor(ballCoords.y+ballSize+dy) !== coordsy) {
        //code
                console.log(coordsx)
allCount++;
      }
      if (ballCoords.x == coordsx &&Math.floor(ballCoords.y-ballSize+dy) !== coordsy) {
        //code
               console.log(coordsx);
 allCount++;
      }
      if (ballCoords.x == coordsx &&Math.floor(ballCoords.y+ballSize+dy) == coordsy+3) {
         allCount = 0;
        return false;
      }
              if (ballCoords.x == coordsx && Math.floor(ballCoords.y-ballSize+dy) == coordsy-3) {
         allCount = 0;
        return false;

      }
              if (ballCoords.x-ballSize == coordsx && Math.floor(ballCoords.y) == coordsy) {
         allCount = 0;
        return false;

      }
            if (ballCoords.x+ballSize == coordsx && Math.floor(ballCoords.y) == coordsy) {
         allCount = 0;
        return false;

      }
       k+=1;
}
if (allCount > 0) {
    return true;
}
return false;
}
var dontMove = pip();


var gravity = 0.2; //Sets the gravity pulling the ball to the ground.
var damping = 0.01; //The rate at which the ball slows down.
var traction = 0.95; //Will make the ball stop.
var ballSize = 20; //Sets the circle's radius.
function drawPipes(){
    ctx.beginPath();

    if ((pipTopObj.x +pipTopObj.width) == 0) {
        pipBotObj.x = myCanvas.width;
        pipTopObj.x = myCanvas.width;
        pipx = exeptionsRand("in", myCanvas.width-30, 75);
        pipy = exeptionsRand("in", myCanvas.height-75,46);
        heightCalc = Math.abs(pipy - myCanvas.height);
      pipBotObj.y = pipy;
      pipBotObj.height = heightCalc;
      pipTopObj.height = pipy-(pipBotObj.gap*2);
    }
    pipBotObj.x = pipBotObj.x - pipSpeed;
    pipTopObj.x = pipTopObj.x - pipSpeed;

    ctx.rect(pipBotObj.x, pipBotObj.y, pipBotObj.width, pipBotObj.height);
    ctx.rect(pipTopObj.x, pipTopObj.y, pipTopObj.width, pipTopObj.height);
    ctx.rect(pipBotObj.x-5, pipBotObj.y, pipBotObj.width+10, 35);
    ctx.rect(pipTopObj.x-5, pipTopObj.y+(pipTopObj.height-35), pipTopObj.width+10, 35);
    ctx.rect(gapsed[0].x, gapsed[0].y,pipBotObj.width , Math.abs(gapsed[0].y-gapsed[gapsed.length-1].y));
    var grd = ctx.createLinearGradient(pipBotObj.x, 0, pipBotObj.x + pipBotObj.width, 0);
    var grad = ctx.createLinearGradient(pipTopObj.x, 0, pipTopObj.x + pipTopObj.width, 0);
    var grdt = ctx.createLinearGradient(pipBotObj.x-5, 0, pipBotObj.x-5 + pipTopObj.width+10, 0);
    var gradt = ctx.createLinearGradient(pipBotObj.x-5, 0, pipBotObj.x-5 + pipTopObj.width+10, 0);

    grd.addColorStop(0, "green");
    grd.addColorStop(0.5, "white");
    grd.addColorStop(1, "green");
    grdt.addColorStop(0, "green");
    grdt.addColorStop(0.5, "white");
    grdt.addColorStop(1, "green");
    grad.addColorStop(0, "green");
    grad.addColorStop(0.5, "white");
    grad.addColorStop(1, "green");
    gradt.addColorStop(0, "green");
    gradt.addColorStop(0.5, "white");
    gradt.addColorStop(1, "green");

    ctx.fillStyle = grd;
ctx.fillRect(pipBotObj.x, pipBotObj.y, pipBotObj.width, pipBotObj.height);
    ctx.fillStyle = grad;
ctx.fillRect(pipTopObj.x, pipTopObj.y, pipTopObj.width, pipTopObj.height);
    ctx.fillStyle = grdt;
ctx.fillRect(pipBotObj.x-5, pipBotObj.y, pipBotObj.width+10, 35);
    ctx.fillStyle = gradt;
ctx.fillRect(pipTopObj.x-5, pipTopObj.y+(pipTopObj.height-35), pipTopObj.width+10, 35);


  ctx.stroke();
topArea = getAllCoords(pipTopObj);
botArea = getAllCoords(pipBotObj);
pipeWalls = botArea.concat(topArea);
gapsed = theGapIsBroken();
fixTheWalls();
}


function drawCircle() {
  ctx.beginPath();
  ctx.arc(x, y, ballSize, 0, Math.PI*2); //The circle, on frame one, will always start in the middle, and its size will always be set to ballSize.
  ctx.fillStyle = "#0095DD"; //Sets the color of the circle to light blue.
  ctx.fill(); //Fills in the circle with the color provided in fillStyle.
  ctx.stroke();
}

function draw() {
  if (gameState !== false) {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); //Clears the canvas every frame, so a new circle can be drawn.
drawPipes();
  drawCircle();
  dontMove = pip();
  if (x + dx > myCanvas.width - ballSize || x + dx < ballSize) { //If the circle's x position exceeds the width of the canvas...
    dx = -dx * damping; //The ball's x direction will be flipped, and it will bounce a specific distance (damping).
  }

  if(y + dy > myCanvas.height - ballSize || y + dy < ballSize) { //If the circle's y position exceeds the height of the canvas...
     dy = -dy * damping; //Its y direction will be flipped, and it's speed will decrease.
    //dx *= traction;
   }

  dy += gravity; //Adds the gravity value to the ball's dy value, giving it a artificial force of gravity.
var gap = theGapIsBroken();
for (var i = 0; i < gap.length;i++) {
    if (gap[i] == {x:x+ballSize,y:Math.floor(y)}) {
        dontMove = false;
    }
}
fixTheWalls();
if (dontMove == false) {
  var ac = acrPCFCC();
  console.log(ac);
  x += dx;
}else{
  console.log(acrPCFCC());
  needed.push({x:x,y:y});
  x += -5;
  dy = 0;
   drawPipes();
  drawCircle();
  pipSpeed=0;
 ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); //Clears the canvas every frame, so a new circle can be drawn.
  gameState = false;
}

  if (((y + dy) + ballSize) <= 300) {
    y += dy;
  }
  }
  else if(presses >= 1) {
    x = needed[0].x;
    y = needed[0].y;
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); //Clears the canvas every frame, so a new circle can be drawn.
drawPipes();
  drawCircle();
  }
}
 function check(thing) {
    if (thing !== undefined) {
        return true;
    }
 }
setInterval(draw, 10);

document.addEventListener("keypress", keyPress); //This will look for a key that is pressed.
function keyPress(e) { //Function that will play out when a key is pressed (e is just a placeholder)
    if (e.key == " ") { //When this key is pressed (the empty string represents the spacebar)
      dy-=4; //Will make the ball jump a small distance.
      var yesQ = check(pipeWalls);
      if (yesQ == true) {
        dontMove = pip();
      }
    }
    if (e.key == "d") { //When this key is pressed (the empty string represents the spacebar)
      x+=1; //Will make the ball jump a small distance.
    }
}
keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;
    if (action == "Start Game") {
    gameState = true;
    presses++
    if (presses > 1) {
        //code
        var pipx = exeptionsRand("in", myCanvas.width-30, 75);
 pipy = exeptionsRand("in", myCanvas.height-35,120);
 heightCalc = Math.abs(pipy - myCanvas.height);
 pipBotObj = {width:45,height:heightCalc, x:myCanvas.width-100 ,y:pipy,gap: 55, type:"Bot"};
 pipTopObj = {width: 45,height:pipy-(pipBotObj.gap*2), x:pipBotObj.x,y: 0, type:"Top"};
 topArea = getAllCoords(pipTopObj);
 botArea = getAllCoords(pipBotObj);
 pipeWalls = botArea.concat(topArea);
 dontMove = pip();
 pipSpeed = 1;
needed = [];
    }
    }
  }
})
