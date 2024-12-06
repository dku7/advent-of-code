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

const go = (direction, map, startingFrom) => {
  switch (direction) {
    case FACING_UP:
      return goUp(map, startingFrom);
    case FACING_DOWN:
      return goDown(map, startingFrom);
    case FACING_RIGHT:
      return goRight(map, startingFrom);
    case FACING_LEFT:
      return goLeft(map, startingFrom);
  }
};

function goUp(map, startingFrom) {
  const moves = [];
  const newCoords = { ...startingFrom };
  let obstacleFound = false;

  for (let y = startingFrom.y - 1; y >= 0; y--) {
    const move = moveTo(map, startingFrom.x, y);

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

function goDown(map, startingFrom) {
  const moves = [];
  const newCoords = { ...startingFrom };
  let obstacleFound = false;

  for (let y = startingFrom.y + 1; y < map.length; y++) {
    const move = moveTo(map, startingFrom.x, y);

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

function goRight(map, startingFrom) {
  const moves = [];
  const y = startingFrom.y;
  const newCoords = { ...startingFrom };
  let obstacleFound = false;

  for (let x = startingFrom.x + 1; x <= map[y].length; x++) {
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

function goLeft(map, startingFrom) {
  const moves = [];
  const newCoords = { ...startingFrom };
  let obstacleFound = false;

  for (let x = startingFrom.x - 1; x >= 0; x--) {
    const move = moveTo(map, x, startingFrom.y);

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

function travel(towards, map, startingFrom) {
  let totalMoves = [];
  const stage = go(towards, map, startingFrom);

  totalMoves = [...totalMoves, ...stage.moves];

  if (stage.moves.length > 0 && stage.obstacleFound)
    totalMoves = [
      ...totalMoves,
      ...travel(turn(towards), map, stage.newCoords),
    ];

  return totalMoves;
}

function plotRoute(map) {
  const startingFrom = getStartCoords(map);
  const direction = getFacingDirection(map[startingFrom.y][startingFrom.x]);
  const areaCovered = travel(direction, map, startingFrom);
  const locationsSet = new Set(areaCovered.map(JSON.stringify));

  return Array.from(locationsSet).length;
}

module.exports = plotRoute;
