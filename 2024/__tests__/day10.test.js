const getNumberOfTrailheads = require("../src/day10");

describe("getNumberOfTrailheads", () => {
  it("should return 0 when there is no trailhead", () => {
    expect(getNumberOfTrailheads(["0123", "1234", "8765"])).toBe(0);
  });

  it("should return 1 when there is one trailhead", () => {
    expect(getNumberOfTrailheads(["0123", "1234", "8765", "9876"])).toBe(1);
  });

  it("should return 2 when there are two trailheads forking left and right", () => {
    expect(
      getNumberOfTrailheads([
        "...0...",
        "...1...",
        "...2...",
        "6543456",
        "7.....7",
        "8.....8",
        "9.....9",
      ])
    ).toBe(2);
  });

  it("should return 4 when every 9 is reachable except the one left of the trailhead", () => {
    expect(
      getNumberOfTrailheads([
        "..90..9",
        "...1.98",
        "...2..7",
        "6543456",
        "765.987",
        "876....",
        "987....",
      ])
    ).toBe(4);
  });

  // check for mutation
});
