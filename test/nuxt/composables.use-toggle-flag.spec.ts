import { describe, it, expect } from "vitest";

import { useToggleFlag } from "../../app/composables/utils/use-toggle-flag";

describe("useToggleFlag", () => {
  it("starts with initial value", () => {
    const flag = useToggleFlag(true);

    expect(flag.isActive.value).toBe(true);
  });

  it("toggles state", () => {
    const flag = useToggleFlag(false);

    flag();

    expect(flag.isActive.value).toBe(true);

    flag();
    expect(flag.isActive.value).toBe(false);
  });

  it("turns on/off explicitly", () => {
    const flag = useToggleFlag(false);

    flag.on();
    expect(flag.isActive.value).toBe(true);

    flag.off();
    expect(flag.isActive.value).toBe(false);
  });
});
