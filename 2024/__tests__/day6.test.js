const { findDistinctPositions, getFacingDirection } = require("../src/day6");

describe("getFacingDirection", () => {
  it("should return UP when facing up", () => {
    const input = "......#^..";

    expect(getFacingDirection(input)).toBe("UP");
  });

  it("should return DOWN when facing down", () => {
    const input = "......#v..";

    expect(getFacingDirection(input)).toBe("DOWN");
  });

  it("should return RIGHT when facing right", () => {
    const input = "......#>..";

    expect(getFacingDirection(input)).toBe("RIGHT");
  });

  it("should return LEFT when facing left", () => {
    const input = "......#<..";

    expect(getFacingDirection(input)).toBe("LEFT");
  });
});

describe("findDistinctPositions", () => {
  it("should return 0 when unable to travel", () => {
    const input = ["......#v.."];

    expect(findDistinctPositions(input)).toBe(0);
  });

  it("should return 1 when able to travel forward, but unable to turn right", () => {
    const input = [".......v..", "......#..."];

    expect(findDistinctPositions(input)).toBe(1);
  });

  it("should return 3 when able to travel 3 times forward until an obstacle is hit and unable to turn right", () => {
    const input = ["#...", ".#..", "....", "....", "^..."];

    expect(findDistinctPositions(input)).toBe(3);
  });

  it.only("should return 4 when able to travel 3 times forward and 90-degrees once", () => {
    const input = ["#...", "..#.", ".#..", "....", "^..."];

    expect(findDistinctPositions(input)).toBe(4);
  });
});
