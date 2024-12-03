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

describe.only("sumInstructions with enabledOnly", () => {
  it("should return 0 when instruction has been disabled", () => {
    expect(sumInstructions("don't()_mul(5,5)", true)).toBe(0);
  });

  it("should return the correct sum when instructions are disabled part way through", () => {
    expect(sumInstructions("xmul(2,4)&mul[3,7]!^don't()_mul(5,5)", true)).toBe(
      8
    );
  });

  it("should return the correct sum when instructions are disabled and re-enabled", () => {
    expect(
      sumInstructions(
        "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
        true
      )
    ).toBe(48);
  });
});
