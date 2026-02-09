import { describe, it, expect } from "vitest";

import { coreHasOwn } from "../../app/utils/core-has-own";

describe("coreHasOwn", () => {
  it("returns true for direct own properties", () => {
    const obj = { a: 123 };

    expect(coreHasOwn(obj, "a")).toBe(true);
  });

  it("returns false for missing properties", () => {
    const obj = { a: 123 };

    expect(coreHasOwn(obj, "b")).toBe(false);
  });

  it("returns false for inherited properties (prototype)", () => {
    const parent = { inherited: "yes" };
    const child = Object.create(parent);

    child.own = "mine";

    expect(coreHasOwn(child, "own")).toBe(true);
    expect(coreHasOwn(child, "inherited")).toBe(false);
  });

  it("works even if object overrides hasOwnProperty", () => {
    const evil = {
      a: 1,
      hasOwnProperty: () => false, // malicious override
    };

    expect(coreHasOwn(evil, "a")).toBe(true);
  });

  it("works with primitives (string/number)", () => {
    expect(coreHasOwn("hello", "length")).toBe(true); // string wrapper has length
    expect(coreHasOwn(42, "toString")).toBe(false); // inherited, not own
  });

  it("works with null/undefined safely", () => {
    expect(coreHasOwn(null as any, "x")).toBe(false);
    expect(coreHasOwn(undefined as any, "x")).toBe(false);
  });
});
