import type { ThemeDefinition } from "vuetify";

/**
 * Roughly matches GA4 UI (clean whites, cool grays, Google blue accent)
 * Screenshot vibe:
 * - page bg: very light gray-blue
 * - cards: white with subtle borders
 * - primary: Google blue
 * - text: dark slate
 */
export const lightGoogleAnalytics: ThemeDefinition = {
  dark: false,

  colors: {
    // Surfaces
    background: "#F8FAFD", // GA-like app background
    surface: "#FFFFFF", // cards
    "surface-bright": "#FFFFFF",
    "surface-light": "#F1F3F4", // light panels / hover areas
    "surface-variant": "#EEF2F7", // sidebar / separators
    "on-surface-variant": "#1F2937",

    // Brand / accents (Google-ish)
    primary: "#1A73E8", // Google blue
    secondary: "#5F6368", // GA neutral accent

    // Feedback (keep Google-y but not neon)
    success: "#1E8E3E",
    warning: "#F9AB00",
    error: "#D93025",
    info: "#1A73E8",

    // Text
    "on-background": "#202124", // GA primary text
    "on-surface": "#202124",
    "on-primary": "#FFFFFF",
    "on-secondary": "#FFFFFF",
  },

  variables: {
    // Borders/dividers (GA is subtle but visible)
    "border-color": "#E0E3E7",
    "border-opacity": 1,

    // Typography emphasis (GA text is crisp, not too faded)
    "high-emphasis-opacity": 0.9,
    "medium-emphasis-opacity": 0.7,
    "disabled-opacity": 0.38,

    // Interaction states (GA: very light fills)
    "idle-opacity": 0.02,
    "hover-opacity": 0.06,
    "focus-opacity": 0.12,
    "selected-opacity": 0.1, // selected nav item / chips
    "activated-opacity": 0.12,
    "pressed-opacity": 0.12,
    "dragged-opacity": 0.08,

    // Code / kbd (keep neutral)
    "theme-kbd": "#202124",
    "theme-on-kbd": "#FFFFFF",
    "theme-code": "#F1F3F4",
    "theme-on-code": "#202124",
  },
};
