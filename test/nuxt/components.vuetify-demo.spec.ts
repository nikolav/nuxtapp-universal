import { describe, it, expect } from "vitest";

import { mountSuspendedWithVuetify } from "./utils/mount-suspended-with-vuetify";
import { AppTestingVDemo } from "#components";

describe("Vuetify v-btn", () => {
  it("renders v-btn", async () => {
    const wrapper = await mountSuspendedWithVuetify(AppTestingVDemo);
    expect(wrapper.text()).toContain("vuetify");
  });
});
