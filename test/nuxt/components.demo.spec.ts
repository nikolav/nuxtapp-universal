import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";

import { AppTestingDemo } from "#components";

describe("Demo component", () => {
  it("displays message in demo component", async () => {
    const wrapper = await mountSuspended(AppTestingDemo);
    expect(wrapper.get("h1").text()).toContain("demo");
  });
});
