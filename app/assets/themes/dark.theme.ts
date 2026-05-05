import type { ThemeDefinition } from "vuetify";
import { COLOR_PRIMARY_DARK, COLOR_SECONDARY_DARK } from "./colors";

/**
 * Dark companion for GA4-ish light theme:
 * deep neutral surfaces, subtle dividers, Google blue accent.
 * Aim: low-glare, high-contrast, “pro dashboard” feel.
 */
export const dark: ThemeDefinition = {
  dark: true,
  colors: {
    // Base surfaces (Google dark palette)
    background: "#202124", // main app bg
    surface: "#303134", // cards / panels
    "surface-bright": "#3C4043", // elevated elements
    "surface-light": "#2A2B2E", // subtle sections
    "surface-variant": "#5F6368", // borders / dividers
    "on-surface-variant": "#BDC1C6", // secondary text

    // Primary (Google blue, slightly softened for dark mode)
    primary: COLOR_PRIMARY_DARK,

    // Secondary (green accent, toned down)
    secondary: COLOR_SECONDARY_DARK,

    // Status colors (Google dark variants)
    error: "#F28B82",
    info: "#8AB4F8",
    success: "#81C995",
    warning: "#FDD663",

    // Text colors
    "on-background": "#E8EAED", // primary text
    "on-surface": "#E8EAED",
  },

  variables: {
    // Borders (subtle, not harsh)
    "border-color": "#5F6368",
    "border-opacity": 0.6,

    // Text emphasis
    "high-emphasis-opacity": 0.87,
    "medium-emphasis-opacity": 0.6,
    "disabled-opacity": 0.38,

    // Interaction states (slightly stronger than light mode)
    "idle-opacity": 0.05,
    "hover-opacity": 0.08,
    "focus-opacity": 0.12,
    "selected-opacity": 0.1,
    "activated-opacity": 0.12,
    "pressed-opacity": 0.14,
    "dragged-opacity": 0.1,

    // Code / kbd styling
    "theme-kbd": "#E8EAED",
    "theme-on-kbd": "#202124",
    "theme-code": "#2A2B2E",
    "theme-on-code": "#E8EAED",
  },
};
