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

  for (let y = 0; y < map.length; y++) {
    const markerPos = getMarkerPos(map[y]);

    if (markerPos !== -1) {
      coords.x = markerPos;
      coords.y = y;
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
  let obstacle = false;

  for (let y = startCoords.y + 1; y < map.length; y++) {
    const step = move(map, x, y);
    if (step.length > 0) {
      moves.push([...step]);
      newCoords.y++;
    } else {
      obstacle = true;
      break;
    }
  }

  return { moves, newCoords, obstacle };
};

const travelUp = (map, startCoords) => {
  let moves = [];
  const x = startCoords.x;
  const newCoords = { ...startCoords };
  let obstacle = false;

  for (let y = startCoords.y - 1; y >= 0; y--) {
    const step = move(map, x, y);
    if (step.length > 0) {
      moves.push([...step]);
      newCoords.y--;
    } else {
      obstacle = true;
      break;
    }
  }

  return { moves, newCoords, obstacle };
};

const travelRight = (map, startCoords) => {
  let moves = [];
  const y = startCoords.y;
  const newCoords = { ...startCoords };
  let obstacle = false;

  for (let x = startCoords.x + 1; x <= map[y].length; x++) {
    const step = move(map, x, y);
    if (step.length > 0) {
      moves.push([...step]);
      newCoords.x++;
    } else {
      obstacle = true;
      break;
    }
  }

  return { moves, newCoords, obstacle };
};

const travelLeft = (map, startCoords) => {
  let moves = [];
  const y = startCoords.y;
  const newCoords = { ...startCoords };
  let obstacle = false;

  for (let x = startCoords.x - 1; x >= 0; x--) {
    const step = move(map, x, y);
    if (step.length > 0) {
      moves.push([...step]);
      newCoords.x--;
    } else {
      obstacle = true;
      break;
    }
  }

  return { moves, newCoords, obstacle };
};
const turn = (direction) => {
  const currentIndex = directions.indexOf(direction);
  const newIndex = (currentIndex + 1) % directions.length;
  const newDirection = directions[newIndex];

  return newDirection;
};

const getNextCoord = (direction, coords) => {
  const newCoords = { ...coords };
  switch (direction) {
    case FACING_UP:
      newCoords.y--;
      break;
    case FACING_DOWN:
      newCoords.y++;
      break;
    case FACING_RIGHT:
      newCoords.x++;
      break;
    case FACING_LEFT:
      newCoords.x--;
      break;
  }

  return newCoords;
};

const alreadyTravelled = (plots, coords) =>
  plots.find((plot) => plot[0] === coords.x && plot[1] === coords.y);

function travel(map, startCoords, direction) {
  let totalMoves = [];
  let travelled = {};
  let newDirection = direction;
  let coords = startCoords;

  while (true) {
    switch (newDirection) {
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

    if (travelled.moves.length > 0) {
      if (travelled.obstacle) {
        newDirection = turn(newDirection);
        coords = travelled.newCoords;
      } else break;
    } else break; // we didn't go anywhere
  }

  return totalMoves;
}

function plotRoute(map) {
  const startCoords = getStartCoords(map);
  const direction = getFacingDirection(map[startCoords.y]);
  const coordsCovered = travel(map, startCoords, direction);

  const locationsSet = new Set(coordsCovered.map(JSON.stringify));
  return Array.from(locationsSet).length;
}

module.exports = {
  plotRoute,
  getFacingDirection,
};
