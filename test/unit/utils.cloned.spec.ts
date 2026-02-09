import { describe, it, expect } from "vitest";

import { cloned } from "../../app/utils/cloned";

describe("cloned", () => {
  it("creates a deep copy of an object", () => {
    const original = {
      a: 1,
      nested: { b: 2 },
    };

    const copy = cloned(original);

    // same content
    expect(copy).toEqual(original);

    // not same reference
    expect(copy).not.toBe(original);

    // nested object also cloned
    expect(copy.nested).not.toBe(original.nested);
  });

  it("works with arrays", () => {
    const arr = [1, 2, { x: 3 }];

    const copy = cloned(arr);

    expect(copy).toEqual(arr);
    expect(copy).not.toBe(arr);
    expect(copy[2]).not.toBe(arr[2]);
  });

  it("throws on functions (not cloneable)", () => {
    expect(() =>
      cloned({
        fn: () => "should throw",
      }),
    ).toThrow();
  });
});
