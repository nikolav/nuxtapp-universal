import type { ThemeDefinition } from "vuetify";
import { COLORS_DARK, TEXT_DARK } from "./colors";

export const dark: ThemeDefinition = {
  dark: true,
  colors: {
    // ===== SURFACE =====
    background: COLORS_DARK.background,
    surface: COLORS_DARK.surface,
    "surface-bright": COLORS_DARK["surface-bright"],
    "surface-light": COLORS_DARK["surface-light"],
    "surface-variant": COLORS_DARK["surface-variant"],

    // ===== ACCENT =====
    primary: COLORS_DARK.primary,
    "primary-variant": COLORS_DARK["primary-variant"],
    accent: COLORS_DARK.accent,
    ui: COLORS_DARK.ui,
    secondary: COLORS_DARK.secondary,

    // ===== STATUS =====
    success: COLORS_DARK.success,
    warning: COLORS_DARK.warning,
    error: COLORS_DARK.error,
    info: COLORS_DARK.info,

    // ===== ON COLORS =====
    "on-background": TEXT_DARK["on-background"],
    "on-surface": TEXT_DARK["on-surface"],
    "on-surface-bright": TEXT_DARK.primary,
    "on-surface-light": TEXT_DARK.primary,
    "on-surface-variant": TEXT_DARK.secondary,

    "on-primary": "#000000",
    "on-primary-variant": "#000000",
    "on-accent": "#FFFFFF",
    "on-ui": "#000000",
    "on-secondary": "#000000",

    "on-success": "#000000",
    "on-warning": "#000000",
    "on-error": "#000000",
    "on-info": "#000000",
  },
  variables: {
    "border-color": "#FFFFFF",
    "border-opacity": 1,
    "high-emphasis-opacity": 1.0,
    "medium-emphasis-opacity": 0.87,
    "disabled-opacity": 0.4,
    "idle-opacity": 0,
    "hover-opacity": 0.08,
    "focus-opacity": 0.15,
    "selected-opacity": 0.12,
    "activated-opacity": 0.18,
    "pressed-opacity": 0.22,
    "dragged-opacity": 0.08,
    "theme-kbd": "#333333",
    "theme-on-kbd": "#FFFFFF",
    "theme-code": "#1A1A1A",
    "theme-on-code": "#FFFFFF",
  },
};
