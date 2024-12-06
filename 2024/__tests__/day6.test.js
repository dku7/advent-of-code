const { plotRoute, getFacingDirection } = require("../src/day6");

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

describe("plotRoute", () => {
  it("should return 0 when unable to travel", () => {
    const input = ["......#v.."];

    expect(plotRoute(input)).toBe(0);
  });

  it("should return 1 when able to travel down, but unable to turn right", () => {
    const input = [".......v..", "......#X.."];

    expect(plotRoute(input)).toBe(1);
  });

  it("should return 3 when able to travel 3 times up until an obstacle is hit and unable to turn right", () => {
    const input = ["#...", "X#..", "X...", "X...", "^..."];

    expect(plotRoute(input)).toBe(3);
  });

  it("should return 4 when able to travel 3 times up right once", () => {
    const input = ["#...", "XX#.", "X#..", "X...", "^..."];

    expect(plotRoute(input)).toBe(4);
  });

  it("should return 6 when able to travel 3 times up, 2 times right, and once down", () => {
    const input = ["#...", "XXX#", "X#X#", "X.#.", "^..."];

    expect(plotRoute(input)).toBe(6);
  });

  it("should return 10 when able to travel 4 times up, 3 times, 2 times down, and once left", () => {
    const input = ["#....", "XXXX#", "X##X.", "X#XX#", "X.##.", "^...."];

    expect(plotRoute(input)).toBe(10);
  });

  it("should return 41 when able to travel in all directions multiple times", () => {
    const input = [
      "....#.....",
      "....XXXXX#",
      "....X...X.",
      "..#.X...X.",
      "..XXXXX#X.",
      "..X.X.X.X.",
      ".#XX^XXXX.",
      ".XXXXXXX#.",
      "#XXXXXXX..",
      "......#X..",
    ];

    expect(plotRoute(input)).toBe(41);
  });

  // it.only("should return 41 when able to travel in all directions multiple times", () => {
  //   const input = [
  //     "....#.....",
  //     "....XXXXX#",
  //     "....X...X.",
  //     "..#.X...X.",
  //     "..XXXXX#X.",
  //     "..X.X.X.X.",
  //     ".#XX^XXXX.",
  //     ".XXXXXXX#.",
  //     "#XXXXXXX..",
  //     "#.....#X..",
  //     "XXXXXX#X..",
  //     "XXXXXXXX..",
  //   ]

  //   expect(plotRoute(input)).toBe(41);
  // });
});
