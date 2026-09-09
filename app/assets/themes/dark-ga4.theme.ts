import type { ThemeDefinition } from "vuetify";
import { COLORS_DARK, TEXT_DARK } from "./colors-ga4";

export const dark: ThemeDefinition = {
  dark: true,
  colors: {
    // ===== SURFACE - Enhanced Dark Canvas =====
    background: COLORS_DARK.background, // #1A1C1E
    surface: COLORS_DARK.surface, // #26282A
    "surface-bright": COLORS_DARK["surface-bright"], // #303235
    "surface-light": COLORS_DARK["surface-light"], // #202224
    "surface-variant": COLORS_DARK["surface-variant"], // #1A2744

    // ===== ACCENT - Brighter for Dark Mode =====
    primary: COLORS_DARK.primary, // #8AB4F8
    "primary-variant": COLORS_DARK["primary-variant"], // #AECBFA
    accent: COLORS_DARK.accent, // #FFB300
    secondary: COLORS_DARK.secondary, // #C0C6CC
    ui: COLORS_DARK.ui,

    // ===== STATUS - Bright and Clear =====
    success: COLORS_DARK.success, // #81C995
    warning: COLORS_DARK.warning, // #FFB300
    error: COLORS_DARK.error, // #F28B82
    info: COLORS_DARK.info, // #8AB4F8

    // ===== ON COLORS =====
    "on-background": TEXT_DARK["on-background"], // #F1F3F4
    "on-surface": TEXT_DARK["on-surface"],
    "on-surface-bright": TEXT_DARK.primary,
    "on-surface-light": TEXT_DARK.primary,
    "on-surface-variant": TEXT_DARK.secondary,

    "on-primary": "#1A1D23", // Dark text on bright blue
    "on-primary-variant": "#1A1D23",
    "on-accent": "#1A1D23", // Dark text on bright orange
    "on-secondary": "#1A1D23",
    "on-ui": "#1A1D23",

    "on-success": "#1A1D23",
    "on-warning": "#1A1D23",
    "on-error": "#1A1D23",
    "on-info": "#1A1D23",
  },
  variables: {
    // Enhanced visible borders in dark mode
    "border-color": "#4A4F55", // More visible border
    "border-opacity": 1,
    "high-emphasis-opacity": 1.0,
    "medium-emphasis-opacity": 0.87,
    "disabled-opacity": 0.45,
    "idle-opacity": 0,
    "hover-opacity": 0.1, // More visible hover
    "focus-opacity": 0.18,
    "selected-opacity": 0.14,
    "activated-opacity": 0.22, // Stronger active state
    "pressed-opacity": 0.26,
    "dragged-opacity": 0.1,
    "theme-kbd": "#3C4043",
    "theme-on-kbd": "#F1F3F4",
    "theme-code": "#303235",
    "theme-on-code": "#F1F3F4",
  },
};
