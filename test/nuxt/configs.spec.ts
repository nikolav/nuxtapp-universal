import { describe, it, expect } from "vitest";
import { useRuntimeConfig } from "#imports";

describe("nuxt configs inits", () => {
  it("has runtime config", () => {
    const cfg = useRuntimeConfig();
    expect(cfg).toBeTruthy();
  });

  it("has app config", () => {
    const appcfg = useAppConfig();
    expect(appcfg).toBeTruthy();
  });
});
