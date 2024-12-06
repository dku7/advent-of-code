const MARKER_UP = "^";
const MARKER_DOWN = "v";
const MARKER_RIGHT = ">";
const MARKER_LEFT = "<";

const FACING_UP = "UP";
const FACING_DOWN = "DOWN";
const FACING_RIGHT = "RIGHT";
const FACING_LEFT = "LEFT";
const directions = [FACING_UP, FACING_RIGHT, FACING_DOWN, FACING_LEFT];

const markerDirections = {
  "^": FACING_UP,
  v: FACING_DOWN,
  ">": FACING_RIGHT,
  "<": FACING_LEFT,
};

const getMarkerPos = (line) => line.search(/(\^|v|<|>)/);

const getStartCoords = (map) => {
  const coords = { x: -1, y: -1 };

  for (let i = 0; i < map.length; i++) {
    const markerPos = getMarkerPos(map[i]);

    if (markerPos !== -1) {
      coords.x = markerPos;
      coords.y = i;
      break;
    }
  }

  return coords;
};

function getFacingDirection(line) {
  if (line.indexOf(MARKER_UP) !== -1) return FACING_UP;
  if (line.indexOf(MARKER_DOWN) !== -1) return FACING_DOWN;
  if (line.indexOf(MARKER_RIGHT) !== -1) return FACING_RIGHT;
  if (line.indexOf(MARKER_LEFT) !== -1) return FACING_LEFT;
}

const obstacleFound = (marker) => marker === "#";

const move = (map, x, y) => (obstacleFound(map[y][x]) ? [] : [x, y]);

const travelDown = (map, startCoords) => {
  let moves = [];
  const x = startCoords.x;
  const newCoords = { ...startCoords };

  for (let y = startCoords.y + 1; y < map.length; y++) {
    const step = move(map, x, y);
    if (step.length > 0) {
      moves.push([...step]);
      newCoords.y++;
    } else break;
  }

  // console.log(`travelled down: ${moves.length}`);
  return { moves, newCoords };
};

const travelUp = (map, startCoords) => {
  let moves = [];
  const x = startCoords.x;
  const newCoords = { ...startCoords };

  for (let y = startCoords.y - 1; y >= 0; y--) {
    const step = move(map, x, y);
    if (step.length > 0) {
      moves.push([...step]);
      newCoords.y--;
    } else break;
  }

  // console.log(`travelled up: ${moves.length}`);

  return { moves, newCoords };
};

const travelRight = (map, startCoords) => {
  let moves = [];
  const y = startCoords.y;
  const newCoords = { ...startCoords };

  for (let x = startCoords.x + 1; x <= map[y].length; x++) {
    const step = move(map, x, y);
    if (step.length > 0) {
      moves.push([...step]);
      newCoords.x++;
    } else break;
  }

  // console.log(`travelled right: ${moves.length}`);
  return { moves, newCoords };
};

const travelLeft = (map, startCoords) => {
  let moves = [];
  const y = startCoords.y;
  const newCoords = { ...startCoords };

  for (let x = startCoords.x - 1; x >= 0; x--) {
    const step = move(map, x, y);
    if (step.length > 0) {
      moves.push([...step]);
      newCoords.x--;
    } else break;
  }

  // console.log(`travelled left: ${moves.length}`);
  return { moves, newCoords };
};
const turn = (direction) => {
  const currentIndex = directions.indexOf(direction);
  const newIndex = (currentIndex + 1) % directions.length;
  const newDirection = directions[newIndex];

  // console.log(`Turning: previous direction: ${direction} (index: ${currentIndex}),
  //   new direction: ${newDirection} (index: ${newIndex})`);
  return newDirection;
};

function travel(map, startCoords, direction, iteration = 1) {
  let totalMoves = [];
  let travelled = {};
  let travelDirection = direction;
  let coords = startCoords;

  while (true) {
    switch (travelDirection) {
      case FACING_UP:
        travelled = travelUp(map, coords);
        break;
      case FACING_DOWN:
        travelled = travelDown(map, coords);
        break;
      case FACING_RIGHT:
        travelled = travelRight(map, coords);
        break;
      case FACING_LEFT:
        travelled = travelLeft(map, coords);
        break;
      default:
        return totalMoves;
    }

    totalMoves = [...totalMoves, ...travelled.moves];

    travelDirection = turn(travelDirection);
    coords = travelled.newCoords;
    //console.log(`going ${travelDirection}, coords: ${JSON.stringify(coords)}`);

    if (travelled.moves.length === 0) break;
  }

  return totalMoves;
}

function plotRoute(map) {
  const startCoords = getStartCoords(map);
  const direction = getFacingDirection(map[startCoords.y]);
  const coordsCovered = travel(map, startCoords, direction);

  let set = new Set(coordsCovered.map(JSON.stringify));
  let arr2 = Array.from(set).map(JSON.parse);
  return arr2.length;
}

module.exports = {
  plotRoute,
  getFacingDirection,
};
