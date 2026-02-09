import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";

import Demo from "../../app/components/app/testing/Demo.vue";

describe("Demo component", () => {
  it("displays message in demo component", async () => {
    const wrapper = await mountSuspended(Demo);
    expect(wrapper.get("h1").text()).toContain("demo");
  });
});
