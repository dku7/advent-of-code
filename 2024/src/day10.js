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

function trace(lines, startRef, nextNumber = 8, direction = LEFT) {
  const lastRef = { ...startRef };

  if (nextNumber === -1) return true;

  if (direction === LEFT) {
    if (lastRef.x > 0 && lines[lastRef.y][lastRef.x - 1] === nextNumber) {
      lastRef.x--;
      return trace(lines, lastRef, nextNumber - 1);
    }

    return trace(lines, lastRef, nextNumber, direction + 1);
  } else if (direction === UP) {
    if (lastRef.y > 0 && lines[lastRef.y - 1][lastRef.x] === nextNumber) {
      lastRef.y--;
      return trace(lines, lastRef, nextNumber - 1);
    }

    return trace(lines, lastRef, nextNumber, direction + 1);
  } else if (direction === RIGHT) {
    if (
      lastRef.x < lines[lastRef.y].length - 1 &&
      lines[lastRef.y][lastRef.x + 1] === nextNumber
    ) {
      lastRef.x++;
      return trace(lines, lastRef, nextNumber - 1);
    }

    return trace(lines, lastRef, nextNumber, direction + 1);
  } else if (direction === DOWN) {
    if (
      lastRef.y < lines.length - 1 &&
      lines[lastRef.y + 1][lastRef.x] === nextNumber
    ) {
      lastRef.y++;

      return trace(lines, lastRef, nextNumber - 1);
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
    if (trace(lines, { ...trailhead })) noOfTrailheads++;
  }

  return noOfTrailheads;
}

module.exports = getNumberOfTrailheads;
