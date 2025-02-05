import { add } from "./calculator";

describe("add function", () => {
  test("should add two positive numbers", () => {
    expect(add(1, 2)).toBe(3);
  });

  test("should add two negative numbers", () => {
    expect(add(-1, -2)).toBe(-3);
  });

  test("should add a positive and a negative number", () => {
    expect(add(1, -2)).toBe(-1);
  });

  test("should add zero and a number", () => {
    expect(add(0, 5)).toBe(5);
  });

  test("should add two zeros", () => {
    expect(add(0, 0)).toBe(0);
  });
});
