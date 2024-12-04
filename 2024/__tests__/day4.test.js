const findNumberOfWords = require("../src/day4");
const multipleLineTestCase = [
  "MMMSXXMASM",
  "MSAMXMSMSA",
  "AMXSXMAAMM",
  "MSAMASMSMX",
  "XMASAMXAMM",
  "XXAMMXXAMA",
  "SMSMSASXSS",
  "SAXAMASAAA",
  "MAMMMXMMMM",
  "MXMXAXMASX",
];
describe("findNumberOfWords", () => {
  it("should return 0 when the given array does't contain the specified word", () => {
    expect(findNumberOfWords(["ABCD"], "XMAS")).toBe(0);
  });

  it("should return 1 when the given array contains the specified word horizontally forward", () => {
    expect(findNumberOfWords(["XMAS"], "XMAS")).toBe(1);
  });

  it("should return 1 when the given array contains the specified word horizontally backwards", () => {
    expect(findNumberOfWords(["SAMX"], "XMAS")).toBe(1);
  });

  it("should return 1 when the given array contains the specified word diagonally left to right ", () => {
    expect(findNumberOfWords(["X...", ".M..", "..A.", "...S"], "XMAS")).toBe(1);
  });

  it("should return 1 when the given array contains the specified word diagonally right to left ", () => {
    expect(findNumberOfWords(["...X", "..M.", ".A..", "S..."], "XMAS")).toBe(1);
  });

  it("should return 1 when the given array contains the specified word vertically top to bottom", () => {
    expect(findNumberOfWords(["X...", "M...", "A...", "S..."], "XMAS")).toBe(1);
  });

  it("should return 1 when the given array contains the specified word vertically bottom to top", () => {
    expect(findNumberOfWords(["S...", "A...", "M...", "X..."], "XMAS")).toBe(1);
  });

  it("should return the correct number of occurrences when given array contains the specified word multiple times", () => {
    expect(findNumberOfWords(multipleLineTestCase, "XMAS")).toBe(18);
  });

  it("should not mutate the passed in array", () => {
    findNumberOfWords(multipleLineTestCase, "XMAS");
    expect(multipleLineTestCase).toEqual([
      "MMMSXXMASM",
      "MSAMXMSMSA",
      "AMXSXMAAMM",
      "MSAMASMSMX",
      "XMASAMXAMM",
      "XXAMMXXAMA",
      "SMSMSASXSS",
      "SAXAMASAAA",
      "MAMMMXMMMM",
      "MXMXAXMASX",
    ]);
  });
});
