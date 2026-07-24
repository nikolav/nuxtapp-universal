import type { ThemeDefinition } from "vuetify";
import {
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_ACCENT,
  COLOR_PRIMARY_VARIANT,
} from "./colors";

/**
 * GA4-ish (screenshot): airy light-gray app bg, white cards,
 * subtle dividers, Google blue accents, cool neutral text.
 */
export const light: ThemeDefinition = {
  dark: false,

  colors: {
    // App surfaces
    background: "#F6F8FC", // GA page background (very light blue-gray)
    surface: "#FFFFFF", // cards / panels
    "surface-bright": "#FFFFFF",
    "surface-light": "#F8F9FA", // hover fills / light strips
    "surface-variant": "#F1F3F4", // sidebar sections / separators

    // Accents (Google)
    primary: COLOR_PRIMARY,
    secondary: COLOR_SECONDARY,
    accent: COLOR_ACCENT,
    "primary-variant": COLOR_PRIMARY_VARIANT,

    // Feedback
    success: "#1E8E3E",
    warning: "#F9AB00",
    error: "#D93025",
    info: "#1A73E8",

    // Text on surfaces
    "on-background": "#202124",
    "on-surface": "#202124",
    "on-surface-variant": "#3C4043", // GA secondary text
    "on-primary": "#FFFFFF",
    "on-secondary": "#FFFFFF",
    "on-accent": "#FFFFFF",
    "on-primary-variant": "#FFFFFF", // White text on primary-variant
  },

  variables: {
    // Dividers/borders (GA uses visible but soft lines)
    "border-color": "#DADCE0",
    "border-opacity": 1,

    // Typography emphasis (GA has crisp hierarchy)
    "high-emphasis-opacity": 0.92,
    "medium-emphasis-opacity": 0.72,
    "disabled-opacity": 0.38,

    // Interaction states (subtle fills like GA)
    "idle-opacity": 0,
    "hover-opacity": 0.04,
    "focus-opacity": 0.1,
    "selected-opacity": 0.08, // selected nav / chips
    "activated-opacity": 0.1,
    "pressed-opacity": 0.12,
    "dragged-opacity": 0.06,

    // Code / kbd (neutral)
    "theme-kbd": "#202124",
    "theme-on-kbd": "#FFFFFF",
    "theme-code": "#F1F3F4",
    "theme-on-code": "#202124",
  },
};
