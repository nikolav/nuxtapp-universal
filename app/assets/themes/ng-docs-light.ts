import type { ThemeDefinition } from "vuetify";

export const lightNgDocs: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#F6F4FA",
    surface: "#FFFFFF",
    "surface-bright": "#FFFFFF",
    "surface-light": "#F1EFF7",
    "surface-variant": "#E7E3F2",
    "on-surface-variant": "#1F1B2E",

    primary: "#A855F7",
    secondary: "#EC4899",

    error: "#DC2626",
    info: "#2563EB",
    success: "#16A34A",
    warning: "#F59E0B",

    "on-background": "#1F1B2E",
    "on-surface": "#1F1B2E",
    "on-primary": "#FFFFFF",
    "on-secondary": "#FFFFFF",
  },

  variables: {
    "border-color": "#D8D3E6",
    "border-opacity": 1,
    "high-emphasis-opacity": 0.92,
    "medium-emphasis-opacity": 0.72,
    "disabled-opacity": 0.42,
    "idle-opacity": 0.03,
    "hover-opacity": 0.05,
    "focus-opacity": 0.12,
    "selected-opacity": 0.09,
    "activated-opacity": 0.12,
    "pressed-opacity": 0.12,
    "dragged-opacity": 0.08,
    "theme-kbd": "#111827",
    "theme-on-kbd": "#FFFFFF",
    "theme-code": "#F1EFF7",
    "theme-on-code": "#1F1B2E",
  },
};
