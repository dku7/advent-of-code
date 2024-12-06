const MARKER_UP = "^";
const MARKER_DOWN = "v";
const MARKER_RIGHT = ">";
const MARKER_LEFT = "<";

const FACING_UP = "UP";
const FACING_DOWN = "DOWN";
const FACING_RIGHT = "RIGHT";
const FACING_LEFT = "LEFT";
const directions = [FACING_UP, FACING_RIGHT, FACING_DOWN, FACING_LEFT];

const facingDirections = {
  [MARKER_UP]: FACING_UP,
  [MARKER_DOWN]: FACING_DOWN,
  [MARKER_RIGHT]: FACING_RIGHT,
  [MARKER_LEFT]: FACING_LEFT,
};

const getMarkerPos = (line) => line.search(/(\^|v|<|>)/);

const getFacingDirection = (marker) => facingDirections[marker];

const obstacleFound = (marker) => marker === "#";

const moveTo = (map, x, y) =>
  obstacleFound(map[y][x])
    ? { successful: false, coords: [] }
    : { successful: true, coords: [x, y] };

const getStartCoords = (map) => {
  for (let y = 0; y < map.length; y++) {
    const markerPos = getMarkerPos(map[y]);

    if (markerPos !== -1) return { x: markerPos, y };
  }
};

const turn = (direction) => {
  const currentIndex = directions.indexOf(direction);
  const newIndex = (currentIndex + 1) % directions.length;

  return directions[newIndex];
};

const go = (direction, map, startCoords) => {
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

function goUp(map, startCoords) {
  let moves = [];
  const x = startCoords.x;
  const newCoords = { ...startCoords };
  let obstacleFound = false;

  for (let y = startCoords.y - 1; y >= 0; y--) {
    const move = moveTo(map, x, y);
    if (move.successful) {
      moves.push([...move.coords]);
      newCoords.y--;
    } else {
      obstacleFound = true;
      break;
    }
  }

  return { moves, newCoords, obstacleFound };
}

function goDown(map, startCoords) {
  let moves = [];
  const x = startCoords.x;
  const newCoords = { ...startCoords };
  let obstacleFound = false;

  for (let y = startCoords.y + 1; y < map.length; y++) {
    const move = moveTo(map, x, y);
    if (move.successful) {
      moves.push([...move.coords]);
      newCoords.y++;
    } else {
      obstacleFound = true;
      break;
    }
  }

  return { moves, newCoords, obstacleFound };
}

function goRight(map, startCoords) {
  let moves = [];
  const y = startCoords.y;
  const newCoords = { ...startCoords };
  let obstacleFound = false;

  for (let x = startCoords.x + 1; x <= map[y].length; x++) {
    const move = moveTo(map, x, y);
    if (move.successful) {
      moves.push([...move.coords]);
      newCoords.x++;
    } else {
      obstacleFound = true;
      break;
    }
  }

  return { moves, newCoords, obstacleFound };
}

function goLeft(map, startCoords) {
  let moves = [];
  const y = startCoords.y;
  const newCoords = { ...startCoords };
  let obstacleFound = false;

  for (let x = startCoords.x - 1; x >= 0; x--) {
    const move = moveTo(map, x, y);
    if (move.successful) {
      moves.push([...move.coords]);
      newCoords.x--;
    } else {
      obstacleFound = true;
      break;
    }
  }

  return { moves, newCoords, obstacleFound };
}

function travel(direction, map, startCoords) {
  let totalMoves = [];
  let stage = {};
  let towards = direction;
  let coords = startCoords;

  stage = go(towards, map, coords);
  totalMoves = [...totalMoves, ...stage.moves];

  if (stage.moves.length > 0 && stage.obstacleFound)
    totalMoves = [
      ...totalMoves,
      ...travel(turn(towards), map, stage.newCoords),
    ];

  return totalMoves;
}

function plotRoute(map) {
  const coords = getStartCoords(map);
  const direction = getFacingDirection(map[coords.y][coords.x]);
  const areaCovered = travel(direction, map, coords);

  const locationsSet = new Set(areaCovered.map(JSON.stringify));
  return Array.from(locationsSet).length;
}

module.exports = plotRoute;
