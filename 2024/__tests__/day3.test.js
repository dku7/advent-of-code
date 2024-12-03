const sumInstructions = require("../puzzles/day3");

describe("sumInstructions", () => {
  it("should return 0 when given a string containing invalid instructions", () => {
    expect(sumInstructions("&mul[3,7]")).toBe(0);
  });

  it("should return the correct sum when given a string containing one valid instruction", () => {
    expect(sumInstructions("xmul(2,4)%&mul[3,7]")).toBe(8);
  });

  it("should return the correct sum when given a string containing multiple valid instructions", () => {
    expect(
      sumInstructions(
        "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))"
      )
    ).toBe(161);
  });
});
