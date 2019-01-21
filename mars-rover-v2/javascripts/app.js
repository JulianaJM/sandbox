// Rover Object Goes Here
// ======================
var rover = {
  direction: "N",
  x:0,
  y:0,
  travelLog: []
}

var roverMatrix = [
  [rover, null, null, null, null,null,null,null,null,null],
  [null, null, null, null, null,null,null,null,null,null],
  [null, null, null, null, null,null,null,null,null,null],
  [null, null, null, null, null,null,null,null,null,null],
  [null, null, null, null, null,null,null,null,null,null],
  [null, null, null, null, null,null,null,null,null,null],
  [null, null, null, null, null,null,null,null,null,null],
  [null, null, null, null, null,null,null,null,null,null],
  [null, null, null, null, null,null,null,null,null,null],
  [null, null, null, null, null,null,null,null,null,null],
];
// ======================
function turnLeft(rover){
  switch (rover.direction) {
    case 'N':
      rover.direction = "W";
      break;
    case 'S':
    rover.direction = "E";
      break;
    case 'E':
    rover.direction = "N";
    break;
    
    case 'W':
    rover.direction = "S";
    break;
    default:
      break;
  }
  console.log("turnLeft was called! ", rover.direction);
}

function turnRight(rover) {
  switch (rover.direction) {
    case 'N':
      rover.direction = "E";
      break;
    case 'S':
    rover.direction = "W";
      break;
    case 'E':
    rover.direction = "S";
    break;
    case 'W':
    rover.direction = "N";
    break;
    default:
      break;
  }
  console.log("turnRight was called!", rover.direction);
}

function moveForward(rover) {
  var previousPosX= rover.x;
  var previousPosY= rover.y;

  var nextPosX= rover.x;
  var nextPosY= rover.y;
  
  switch (rover.direction) {
    case 'N':
    nextPosY = rover.y - 1;
    move(nextPosX, nextPosY);
    break;

    case 'S':
    nextPosY = rover.y + 1;
    move(nextPosX, nextPosY);
      break;
    case 'E':
    nextPosX= rover.x + 1;
    move(nextPosX, nextPosY);
    break;
    case 'W':
    nextPosX= rover.x - 1;
    move(nextPosX, nextPosY);
    break;
    default:
      break;
  }
  console.log("previous position : ", previousPosX, previousPosY);
  console.log("**current position** : ", rover.x, rover.y);
}


function moveBackward(rover) {
  var previousPosX= rover.x;
  var previousPosY= rover.y;

  var nextPosX= rover.x;
  var nextPosY= rover.y;
  
  switch (rover.direction) {
    case 'N':
    nextPosY = rover.y + 1;
    move(nextPosX, nextPosY);
    break;

    case 'S':
    nextPosY = rover.y - 1;
    move(nextPosX, nextPosY);
      break;
    case 'E':
    nextPosX= rover.x - 1;
    move(nextPosX, nextPosY);
    break;
    case 'W':
    nextPosX= rover.x + 1;
    move(nextPosX, nextPosY);
    break;
    default:
      break;
  }
  console.log("previous position : ", previousPosX, previousPosY);
  console.log("**current position** : ", rover.x, rover.y);
}

function move(nextPosX, nextPosY) {
  if (isValidPosition(nextPosX, nextPosY)) {
    roverMatrix[rover.x][rover.y] = null;
    roverMatrix[nextPosX][nextPosY] = rover;
    rover.x = nextPosX;
    rover.y = nextPosY;

    rover.travelLog.push({x:nextPosX, y:nextPosY});
  }
}

function isValidPosition(posX, posY) {
  var length = roverMatrix.length;
  return posX >= 0 && posX < length && posY >= 0 && posY < length; 
}


function roverControl(commands) {
  for (var i = 0; i < commands.length; i++) {
    switch (commands.charAt(i)) {
      case 'f':
      moveForward(rover);
      break;

      case 'b':
      moveBackward(rover);
      break;
  
      case 'r':
      turnRight(rover);
      break;
      case 'l':
      turnLeft(rover);
      break;

      default:
      break;
    }
  }
  
  console.log("travel log : ", rover.travelLog); 

  console.log("rover position matrix : ", roverMatrix); 
}

roverControl('rffrfflfrff');
