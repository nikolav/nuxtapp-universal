import type { ThemeDefinition } from "vuetify";

export const darkNuxtDocs: ThemeDefinition = {
  dark: true,

  colors: {
    // -----------------------------------------------------------------------
    // Core surfaces (Nuxt docs dark: deep navy + subtle teal tint)
    // -----------------------------------------------------------------------
    background: "#070A14", // page background (very dark navy)
    surface: "#0B1220", // main content surface
    "surface-bright": "#0F1A2B", // slightly lifted (cards / headers)
    "surface-light": "#0A1526", // subtle panels
    "surface-variant": "#0E2230", // sidebar / separators (teal-ish)
    "on-surface-variant": "#C7D2FE",

    // -----------------------------------------------------------------------
    // Brand colors
    // -----------------------------------------------------------------------
    primary: "#00DC82", // Nuxt green
    secondary: "#22C55E", // green accent (keeps Nuxt vibe)

    // -----------------------------------------------------------------------
    // Feedback
    // -----------------------------------------------------------------------
    error: "#F87171",
    info: "#60A5FA",
    success: "#34D399",
    warning: "#FBBF24",

    // -----------------------------------------------------------------------
    // Text
    // -----------------------------------------------------------------------
    "on-background": "#E5E7EB", // slate-200
    "on-surface": "#E5E7EB",
    "on-primary": "#052E1E", // deep green ink on bright primary
    "on-secondary": "#052E1E",
  },

  variables: {
    // -----------------------------------------------------------------------
    // Borders & dividers (thin, low-contrast like screenshot)
    // -----------------------------------------------------------------------
    "border-color": "#15263A",
    "border-opacity": 1,

    // -----------------------------------------------------------------------
    // Emphasis (Nuxt docs dark is softer than Material defaults)
    // -----------------------------------------------------------------------
    "high-emphasis-opacity": 0.92,
    "medium-emphasis-opacity": 0.72,
    "disabled-opacity": 0.42,

    // -----------------------------------------------------------------------
    // Interaction states (keep subtle; dark UIs get noisy fast)
    // -----------------------------------------------------------------------
    "idle-opacity": 0.02,
    "hover-opacity": 0.05,
    "focus-opacity": 0.12,
    "selected-opacity": 0.1,
    "activated-opacity": 0.12,
    "pressed-opacity": 0.12,
    "dragged-opacity": 0.08,

    // -----------------------------------------------------------------------
    // Code / kbd blocks (dark docs look)
    // -----------------------------------------------------------------------
    "theme-kbd": "#0B1220",
    "theme-on-kbd": "#E5E7EB",

    "theme-code": "#0A1526",
    "theme-on-code": "#E5E7EB",
  },
};
