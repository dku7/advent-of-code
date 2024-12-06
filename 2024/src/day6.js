// need to see which way they are facing
// const directionUp = { x: 0, y: 1 };
// const directionDown = { x: 0, y: -1 };
// const directionRight = { x: 1, y: 0 };
// const directionLeft = { x: -1, y: 0 };
const MARKER_UP = "^";
const MARKER_DOWN = "v";
const MARKER_RIGHT = ">";
const MARKER_LEFT = "<";

const FACING_UP = "UP";
const FACING_DOWN = "DOWN";
const FACING_RIGHT = "RIGHT";
const FACING_LEFT = "LEFT";
const directions = [FACING_UP, FACING_RIGHT, FACING_DOWN, , FACING_LEFT];

const getMarkerPos = (line) => line.search(/(\^|v|<|>)/);

// get the starting coordinates
const getStartCoords = (map) => {
  const coords = { x: -1, y: -1 };

  // loop through each line in the map
  for (let i = 0; i < map.length; i++) {
    const markerPos = getMarkerPos(map[i]);
    // console.log("getting starter pos for line: ", map[i]);
    if (markerPos !== -1) {
      coords.x = markerPos;
      coords.y = i;

      // console.log("starter pos found on line: ", i, ", ", coords);
      return coords;
    } //else console.log("could not find marker");
  }

  return coords;
};

function getFacingDirection(line) {
  if (line.indexOf(MARKER_UP) !== -1) return FACING_UP; //{ x: 0, y: 1 };
  if (line.indexOf(MARKER_DOWN) !== -1) return FACING_DOWN; //{ x: 0, y: -1 };
  if (line.indexOf(MARKER_RIGHT) !== -1) return FACING_RIGHT; //{ x: 1, y: 0 };
  if (line.indexOf(MARKER_LEFT) !== -1) return FACING_LEFT; //{ x: -1, y: 0 };
}

const isObstacleFound = (marker) => marker === "#";

const move = (map, y, x) => {
  const summary = {};
  //console.log("travelling, next line: ", map[y]);
  const obstacleFound = isObstacleFound(map[y][x]);
  //if (obstacleFound) console.log("obstacle found at: ", map[y]);

  return obstacleFound ? 0 : 1;
};

const travelDown = (map, startCoords) => {
  let moves = 0;
  const yPos = startCoords.y;
  const xPos = startCoords.x;
  const newCoords = { ...startCoords };

  //console.log("travelling down...");
  for (let i = yPos + 1; i < map.length; i++) {
    //console.log("step ", i);
    const step = move(map, i, xPos);
    if (step) {
      moves++;
      newCoords.y++;
    } else break;
  }

  return { moves, newCoords };
};

const travelUp = (map, startCoords) => {
  let moves = 0;
  const yPos = startCoords.y;
  const xPos = startCoords.x;
  const newCoords = { ...startCoords };

  // console.log("travelling up");
  for (let i = yPos - 1; i >= 0; i--) {
    // console.log("...");
    const step = move(map, i, xPos);
    if (step) {
      moves++;
      newCoords.y--;
    } else break;
  }

  return { moves, newCoords };
};

const travelRight = (map, startCoords) => {
  let moves = 0;
  const yPos = startCoords.y;
  const xPos = startCoords.x;
  const newCoords = { ...startCoords };

  console.log("travelling right");
  for (let i = xPos + 1; i <= map[yPos].length; i++) {
    console.log("on the move y: ", yPos, " x: ", i);
    const step = move(map, yPos, i);
    if (step) {
      moves++;
      newCoords.x++;
    } else break;
  }

  return { moves, newCoords };
};
// const turn
// recursive?
const turn = (direction) => {
  const dirIndex = directions.indexOf(direction);
  const newDirIndex = (dirIndex + 1) % directions.length;
  const newDirection = directions[newDirIndex];

  // console.log(directions);
  // console.log("turning...current direction: ", direction, " index: ", dirIndex);
  // console.log("new direction: ", newDirection, " index: ", newDirIndex);

  return newDirection;
};

function travel(map, startCoords, direction, iteration = 1) {
  let totalMoves = 0;
  let travelled = {};
  let blocked = false;

  // determine direction and travel in that direction, then turn 90-degrees
  // and travel in that direction
  // keep repeating until the number of moves === 0;

  // console.log("starting travel, interation: ", iteration);
  switch (direction) {
    case FACING_UP:
      travelled = travelUp(map, startCoords);
      break;
    case FACING_DOWN:
      travelled = travelDown(map, startCoords);
      break;
    case FACING_RIGHT:
      // console.log("iteration ", iteration, " trying to go ", direction);
      travelled = travelRight(map, startCoords);
      break;
    default:
      return totalMoves;
  }

  console.log(
    "finished travelling ",
    direction,
    " number of moves made: ",
    travelled.moves
  );
  totalMoves += travelled.moves;

  console.log("total moves: ", totalMoves);
  // if moves have been returned turn and try again until no moves have been returned
  if (travelled.moves === 0) return totalMoves;
  else {
    const newDirection = turn(direction);
    console.log(
      "now trying to turn and retest by calling myself, old direction: ",
      direction,
      " new direction: ",
      newDirection
    );

    console.log(
      "old starting coords: ",
      startCoords,
      " finishing coords: ",
      travelled.newCoords
    );
    // need new cooords

    totalMoves += travel(map, travelled.newCoords, newDirection, iteration + 1);
  }

  // moves = travelY(map, startCoords);
  // console.log("back in travelY, moves = ", moves);
  // totalMoves += moves;
  return totalMoves;
}

function findDistinctPositions(map) {
  let moves = 0;
  const startCoords = getStartCoords(map);

  const direction = getFacingDirection(map[startCoords.y]);

  moves = travel(map, startCoords, direction);
  console.log("back in find distinct, moves = ", moves);
  let xDir = 0;
  let yDir = 0;

  return moves;
}

module.exports = {
  findDistinctPositions,
  getFacingDirection,
};
