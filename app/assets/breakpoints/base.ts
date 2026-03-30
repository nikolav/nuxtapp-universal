import type { VuetifyOptions } from "vuetify";

export const displayDefaults = <VuetifyOptions["display"]>{
  mobileBreakpoint: "sm",
  thresholds: {
    xs: 0,
    sm: 599.98,
    md: 959.98,
    lg: 1279.98,
    xl: 1919.98,
    // "2xl": 2559.98,
    xxl: 2559.98,
    huge: 3199.98,
  },
};
