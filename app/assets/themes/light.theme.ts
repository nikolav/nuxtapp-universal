import type { ThemeDefinition } from "vuetify";
import { COLOR_PRIMARY, COLOR_SECONDARY } from "./colors";

/**
 * GA4-ish (screenshot): airy light-gray app bg, white cards,
 * subtle dividers, Google blue accents, cool neutral text.
 */
export const light: ThemeDefinition = {
  dark: false,
  colors: {
    // Stronger layout contrast
    background: "#F5F7F9", // slightly darker than before
    surface: "#FFFFFF",
    "surface-bright": "#FFFFFF",
    "surface-light": "#ECEFF1", // more visible section separation
    "surface-variant": "#D0D5DA", // clearer borders/dividers
    "on-surface-variant": "#3C4043", // stronger secondary text

    primary: COLOR_PRIMARY,
    secondary: COLOR_SECONDARY,

    // Status colors (slightly deepened for clarity)
    error: "#C5221F",
    info: "#1A73E8",
    success: "#137333",
    warning: "#EA8600",

    // Text (higher contrast)
    "on-background": "#1F1F1F",
    "on-surface": "#1F1F1F",
  },

  variables: {
    // Borders more visible (important for dashboards)
    "border-color": "#C6CACC",
    "border-opacity": 1,

    // Stronger text hierarchy
    "high-emphasis-opacity": 0.92,
    "medium-emphasis-opacity": 0.7,
    "disabled-opacity": 0.42,

    // Slightly stronger interaction feedback
    "idle-opacity": 0.03,
    "hover-opacity": 0.06,
    "focus-opacity": 0.1,
    "selected-opacity": 0.08,
    "activated-opacity": 0.1,
    "pressed-opacity": 0.12,
    "dragged-opacity": 0.08,

    // UI utilities
    "theme-kbd": "#1F1F1F",
    "theme-on-kbd": "#FFFFFF",
    "theme-code": "#ECEFF1",
    "theme-on-code": "#1F1F1F",
  },
};
