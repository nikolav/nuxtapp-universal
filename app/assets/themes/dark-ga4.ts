import type { ThemeDefinition } from "vuetify";

/**
 * Dark companion for GA4-ish light theme:
 * deep neutral surfaces, subtle dividers, Google blue accent.
 * Aim: low-glare, high-contrast, “pro dashboard” feel.
 */
export const darkGoogleAnalytics: ThemeDefinition = {
  dark: true,

  colors: {
    // App surfaces (deep, slightly blue/graphite)
    background: "#0B1220", // app background (deep navy/graphite)
    surface: "#111A2E", // cards / panels
    "surface-bright": "#15203A", // raised cards / dialogs
    "surface-light": "#0F172A", // hover strips / subtle fills
    "surface-variant": "#1B2741", // sidebar sections / separators
    "on-surface-variant": "#B6BFCC", // secondary text

    // Accents (Google blue still reads well on dark)
    primary: "#4C8DFF", // brighter blue for dark surfaces
    secondary: "#8A93A1", // cool neutral gray (icons/labels)

    // Feedback (slightly lifted for dark)
    success: "#34A853", // Google green-ish
    warning: "#F9AB00",
    error: "#EA4335",
    info: "#4C8DFF",

    // Text on surfaces
    "on-background": "#E8EAED", // GA dark mode-ish text
    "on-surface": "#E8EAED",
    "on-primary": "#0B1220", // readable on bright primary
    "on-secondary": "#0B1220",
  },

  variables: {
    // Dividers/borders (subtle, not chalky)
    "border-color": "#24314B",
    "border-opacity": 1,

    // Typography emphasis
    "high-emphasis-opacity": 0.92,
    "medium-emphasis-opacity": 0.74,
    "disabled-opacity": 0.42,

    // Interaction states (slightly stronger than light so they show up)
    "idle-opacity": 0,
    "hover-opacity": 0.08,
    "focus-opacity": 0.14,
    "selected-opacity": 0.12,
    "activated-opacity": 0.14,
    "pressed-opacity": 0.16,
    "dragged-opacity": 0.1,

    // Code / kbd (dark neutrals)
    "theme-kbd": "#E8EAED",
    "theme-on-kbd": "#0B1220",
    "theme-code": "#0F172A",
    "theme-on-code": "#E8EAED",
  },
};
