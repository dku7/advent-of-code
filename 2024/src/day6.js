const MARKER_UP = "^";
const MARKER_DOWN = "v";
const MARKER_RIGHT = ">";
const MARKER_LEFT = "<";

const FACING_UP = "UP";
const FACING_DOWN = "DOWN";
const FACING_RIGHT = "RIGHT";
const FACING_LEFT = "LEFT";
const directions = [FACING_UP, FACING_RIGHT, FACING_DOWN, FACING_LEFT];

const getMarkerPos = (line) => line.search(/(\^|v|<|>)/);
const obstacleFound = (marker) => marker === "#";
const move = (map, x, y) =>
  obstacleFound(map[y][x])
    ? { successful: false, coords: [] }
    : { successful: true, coords: [x, y] };

function getStartCoords(map) {
  for (let y = 0; y < map.length; y++) {
    const markerPos = getMarkerPos(map[y]);

    if (markerPos !== -1) return { x: markerPos, y };
  }
}

function getFacingDirection(line) {
  if (line.indexOf(MARKER_UP) !== -1) return FACING_UP;
  if (line.indexOf(MARKER_DOWN) !== -1) return FACING_DOWN;
  if (line.indexOf(MARKER_RIGHT) !== -1) return FACING_RIGHT;
  if (line.indexOf(MARKER_LEFT) !== -1) return FACING_LEFT;
}

const go = (map, startCoords, direction) => {
  switch (direction) {
    case FACING_UP:
      return goUp(map, startCoords);
    case FACING_DOWN:
      return goDown(map, startCoords);
    case FACING_RIGHT:
      return goRight(map, startCoords);
    case FACING_LEFT:
      return goLeft(map, startCoords);
  }
};

const goDown = (map, startCoords) => {
  let moves = [];
  const x = startCoords.x;
  const newCoords = { ...startCoords };
  let obstacle = false;

  for (let y = startCoords.y + 1; y < map.length; y++) {
    const moved = move(map, x, y);
    if (moved.successful) {
      moves.push([...moved.coords]);
      newCoords.y++;
    } else {
      obstacle = true;
      break;
    }
  }

  return { moves, newCoords, obstacle };
};

const goUp = (map, startCoords) => {
  let moves = [];
  const x = startCoords.x;
  const newCoords = { ...startCoords };
  let obstacle = false;

  for (let y = startCoords.y - 1; y >= 0; y--) {
    const moved = move(map, x, y);
    if (moved.successful) {
      moves.push([...moved.coords]);
      newCoords.y--;
    } else {
      obstacle = true;
      break;
    }
  }

  return { moves, newCoords, obstacle };
};

const goRight = (map, startCoords) => {
  let moves = [];
  const y = startCoords.y;
  const newCoords = { ...startCoords };
  let obstacle = false;

  for (let x = startCoords.x + 1; x <= map[y].length; x++) {
    const moved = move(map, x, y);
    if (moved.successful) {
      moves.push([...moved.coords]);
      newCoords.x++;
    } else {
      obstacle = true;
      break;
    }
  }

  return { moves, newCoords, obstacle };
};

const goLeft = (map, startCoords) => {
  let moves = [];
  const y = startCoords.y;
  const newCoords = { ...startCoords };
  let obstacle = false;

  for (let x = startCoords.x - 1; x >= 0; x--) {
    const moved = move(map, x, y);
    if (moved.successful) {
      moves.push([...moved.coords]);
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

function travel(map, startCoords, direction) {
  let totalMoves = [];
  let travelled = {};
  let towards = direction;
  let coords = startCoords;

  while (true) {
    travelled = go(map, coords, towards);
    totalMoves = [...totalMoves, ...travelled.moves];

    if (travelled.moves.length > 0) {
      if (travelled.obstacle) {
        towards = turn(towards);
        coords = travelled.newCoords;
      } else break;
    } else break;
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
