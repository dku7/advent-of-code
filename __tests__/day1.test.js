const findDifferenceBetween = require("../puzzles/day1");

describe("findDifferenceBetween", () => {
  it("should return 0 if arrays are empty", () => {
    expect(findDifferenceBetween([], [])).toBe(0);
  });

  it("should return the total difference when given two arrays with one element each", () => {
    expect(findDifferenceBetween([1], [2])).toBe(1);
  });

  it("should return the total difference when given two arrays with multiple sorted elements", () => {
    expect(findDifferenceBetween([1, 2, 3], [3, 5, 7])).toBe(9);
  });

  it("should return the total difference when given two arrays with multiple unsorted elements", () => {
    expect(findDifferenceBetween([3, 4, 2, 1, 3, 3], [4, 3, 5, 3, 9, 3])).toBe(
      11
    );

    expect(findDifferenceBetween([5, 9, 10, 2, 6], [1, 5, 90, 6, 45])).toBe(
      117
    );
  });
});
