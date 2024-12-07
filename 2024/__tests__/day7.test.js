const calibrate = require("../src/day7");

describe("calibrate", () => {
  it("should return 0 when the given equation does not calibrate", () => {
    expect(calibrate(["83: 17 5"])).toBe(0);
  });

  it("should return the test value when the given equation with two numbers calibrates by multiplying", () => {
    expect(calibrate(["190: 10 19"])).toBe(190);
  });

  it("should return the test value when the given equation with two numbers calibrates by adding", () => {
    expect(calibrate(["150: 100 50"])).toBe(150);
  });

  it("should return the test value when the given equation with three numbers calibrate by adding", () => {
    expect(calibrate(["100: 10 20 70"])).toBe(100);
  });

  it("should return the test value when the given equation with three numbers calibrate by multiplying", () => {
    expect(calibrate(["1400: 10 20 7"])).toBe(1400);
  });

  it("should return the test value when the given equation with three numbers calibrates multiple ways with multiple operators", () => {
    expect(calibrate(["3267: 81 40 27"])).toBe(3267);
  });

  it("should return the test value when the given equation with four numbers calibrates only one way with multiple operators", () => {
    expect(calibrate(["292: 11 6 16 20"])).toBe(292);
  });

  it("should return the test value when the given equation with four numbers calibrates only one way with multiple operators", () => {
    expect(calibrate(["4704: 9 15 12 32"])).toBe(4704);
  });
});
