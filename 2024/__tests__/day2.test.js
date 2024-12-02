const { getNumberOfSafeReports } = require("../puzzles/day2");

describe("getSafeReports", () => {
  it("should return 0 when there is an increase in level of > 3", () => {
    expect(getNumberOfSafeReports(["1 2 7 8 9"])).toBe(0);
  });

  it("should return 0 when there is a decrease in level of < -3", () => {
    expect(getNumberOfSafeReports(["9 7 6 2 1"])).toBe(0);
  });

  it("should return 1 when all levels are decreasing by between 1–3", () => {
    expect(getNumberOfSafeReports(["7 6 4 2 1"])).toBe(1);
  });

  it("should return 1 when all levels are increasing by between 1-3", () => {
    expect(getNumberOfSafeReports(["1 2 4 6 7"])).toBe(1);
  });

  it("should return 0 when there is an increase and decrease in the same report", () => {
    expect(getNumberOfSafeReports(["1 3 2 4 5"])).toBe(0);
  });

  it("should return 0 when there is neither an increase or decrease between two levels", () => {
    expect(getNumberOfSafeReports(["8 6 4 4 1"])).toBe(0);
  });

  it("should not mutate the passed in array", () => {
    const input = ["1 2 3 4 5 6"];

    getNumberOfSafeReports(input);
    expect(input).toEqual(["1 2 3 4 5 6"]);
  });
});

describe("getSafeReports with Problem Dampener applied", () => {
  it("should return 1 without needing to remove a level", () => {
    expect(getNumberOfSafeReports(["7 6 4 2 1"], true)).toBe(1);
  });

  it("should return 0 regardless of which level is removed", () => {
    expect(getNumberOfSafeReports(["1 2 7 8 9"], true)).toBe(0);
  });

  it("should return 1 after removing a negative level", () => {
    expect(getNumberOfSafeReports(["1 3 2 4 5"], true)).toBe(1);
  });

  it("should return 1 after removing a positive level", () => {
    expect(getNumberOfSafeReports(["7 6 10 4 1"], true)).toBe(1);
  });

  it("should return 1 after removing a level of 0", () => {
    expect(getNumberOfSafeReports(["8 6 4 4 1"], true)).toBe(1);
  });

  it("should return 0 regardless of which level is removed", () => {
    expect(getNumberOfSafeReports(["9 7 6 2 1"], true)).toBe(0);
  });
});
