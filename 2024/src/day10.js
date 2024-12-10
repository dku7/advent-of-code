function getTrailheadRefs(lines) {
  const trailheads = [];

  for (let y = 0; y < lines.length; y++) {
    let currentLine = [...lines[y]];
    let lastIndex = -1;

    while (true) {
      const trailheadIndex = currentLine.indexOf(9);

      if (trailheadIndex > -1) {
        lastIndex =
          lastIndex === -1 ? trailheadIndex : (lastIndex += trailheadIndex + 1);

        trailheads.push({ x: lastIndex, y });
        currentLine = currentLine.slice(trailheadIndex + 1);
      } else break;
    }
  }

  return trailheads;
}

const LEFT = 0;
const UP = 1;
const RIGHT = 2;
const DOWN = 3;

const turn = (direction) => (direction + 1) % (DOWN + 1);

function trace(lines, config) {
  const newConfig = { ...config };

  if (!newConfig?.direction) newConfig.direction = LEFT;
  if (newConfig.nextNumber === -1) return true;

  if (newConfig.direction === LEFT) {
    if (newConfig.lastRef.x > 0) {
      foundNumber = lines[newConfig.lastRef.y][newConfig.lastRef.x - 1];

      if (foundNumber === newConfig.nextNumber) {
        newConfig.nextNumber--;
        newConfig.lastRef.x--;
        newConfig.direction = LEFT;
        if (trace(lines, newConfig)) return true;
      }
    }

    newConfig.direction++;
    if (trace(lines, newConfig)) return true;
  } else if (newConfig.direction === UP) {
    if (newConfig.lastRef.y > 0) {
      foundNumber = lines[newConfig.lastRef.y - 1][newConfig.lastRef.x];

      if (foundNumber === newConfig.nextNumber) {
        newConfig.nextNumber--;
        newConfig.lastRef.y--;
        newConfig.direction = LEFT;
        if (trace(lines, newConfig)) return true;
      }
    }

    newConfig.direction++;
    if (trace(lines, newConfig)) return true;
  } else if (config.direction === RIGHT) {
    if (newConfig.lastRef.x < lines[newConfig.lastRef.y].length - 1) {
      foundNumber = lines[newConfig.lastRef.y][newConfig.lastRef.x + 1];

      if (foundNumber === newConfig.nextNumber) {
        newConfig.nextNumber--;
        newConfig.lastRef.x++;
        newConfig.direction = LEFT;
        if (trace(lines, newConfig)) return true;
      }
    }
    // newConfig.lastDirection = newConfig.direction;
    newConfig.direction++;

    if (trace(lines, newConfig)) return true;
  } else if (config.direction === DOWN) {
    if (newConfig.lastRef.y < lines.length - 1) {
      foundNumber = lines[newConfig.lastRef.y + 1][newConfig.lastRef.x];

      if (foundNumber === newConfig.nextNumber) {
        newConfig.nextNumber--;
        newConfig.lastRef.y++;
        newConfig.direction = LEFT;
        if (trace(lines, newConfig)) return true;
      }
    } else return false;
  }
}

const parseMap = (map) =>
  map.map((line) => line.split("").map((str) => Number(str)));

function getNumberOfTrailheads(map) {
  let noOfTrailheads = 0;
  const lines = parseMap(map);
  const trailheads = getTrailheadRefs(lines);

  for (const trailhead of trailheads) {
    const config = {
      trailhead: { ...trailhead },
      lastRef: { ...trailhead },
      nextNumber: 8,
      direction: LEFT,
      // lastDirection: -1,
    };

    if (trace(lines, config)) noOfTrailheads++;
  }

  return noOfTrailheads;
}

module.exports = getNumberOfTrailheads;
