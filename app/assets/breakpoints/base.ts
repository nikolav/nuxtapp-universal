import type { VuetifyOptions } from "vuetify";

export const displayDefaults = <VuetifyOptions["display"]>{
  mobileBreakpoint: "sm",
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560,
  },
};
