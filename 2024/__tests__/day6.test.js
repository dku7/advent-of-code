const plotRoute = require("../src/day6");

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

  it("should return 41 when able to travel in all directions multiple times", () => {
    const input = [
      "....#.....", //0
      "....XXXXX#", //1
      "....X...X.", //2
      "..#.X...X.", //3
      "..XXXXX#X.", //4
      "..X.X.X.X.", //5
      ".#XX^XXXX.", //6
      ".XXXXXXX#.", //7
      "#XXXXXXX..", //8
      "#.....#X..", //9
      "......#X..", //10
      ".......X..", //11
    ];

    expect(plotRoute(input)).toBe(43);
  });

  it("should not mutate the passed in array", () => {
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

    plotRoute(input);
    expect(input).toEqual([
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
    ]);
  });
});
