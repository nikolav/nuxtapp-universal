import type { ThemeDefinition } from "vuetify";

export const lightNuxtDocs: ThemeDefinition = {
  dark: false,

  colors: {
    // -----------------------------------------------------------------------
    // Core surfaces (Nuxt docs feel: airy, soft green tint)
    // -----------------------------------------------------------------------
    background: "#F6FBF9", // page background (very light mint)
    surface: "#FFFFFF", // cards, content
    "surface-bright": "#FFFFFF",
    "surface-light": "#F1F7F4", // subtle panels
    "surface-variant": "#E6F2EE", // sidebars, separators
    "on-surface-variant": "#1F2937",

    // -----------------------------------------------------------------------
    // Brand colors (Nuxt green)
    // -----------------------------------------------------------------------
    primary: "#00DC82", // Nuxt brand green
    secondary: "#10B981", // emerald-ish accent

    // -----------------------------------------------------------------------
    // Feedback
    // -----------------------------------------------------------------------
    error: "#DC2626",
    info: "#2563EB",
    success: "#16A34A",
    warning: "#F59E0B",

    // -----------------------------------------------------------------------
    // Text
    // -----------------------------------------------------------------------
    "on-background": "#1F2937", // slate-800
    "on-surface": "#1F2937",
    "on-primary": "#053321", // dark green for contrast
    "on-secondary": "#053321",
  },

  variables: {
    // -----------------------------------------------------------------------
    // Borders & dividers (very subtle in Nuxt docs)
    // -----------------------------------------------------------------------
    "border-color": "#E5F0EB",
    "border-opacity": 1,

    // -----------------------------------------------------------------------
    // Emphasis (docs typography is soft, not Material-heavy)
    // -----------------------------------------------------------------------
    "high-emphasis-opacity": 0.88,
    "medium-emphasis-opacity": 0.64,
    "disabled-opacity": 0.38,

    // -----------------------------------------------------------------------
    // Interaction states (very light)
    // -----------------------------------------------------------------------
    "idle-opacity": 0.02,
    "hover-opacity": 0.04,
    "focus-opacity": 0.1,
    "selected-opacity": 0.08,
    "activated-opacity": 0.1,
    "pressed-opacity": 0.1,
    "dragged-opacity": 0.06,

    // -----------------------------------------------------------------------
    // Code / kbd blocks (Nuxt docs style)
    // -----------------------------------------------------------------------
    "theme-kbd": "#111827", // slate-900
    "theme-on-kbd": "#FFFFFF",

    "theme-code": "#F1F7F4", // same as surface-light
    "theme-on-code": "#1F2937",
  },
};
