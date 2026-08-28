import type { ThemeDefinition } from "vuetify";
import { COLORS_LIGHT, TEXT_LIGHT } from "./colors";

export const light: ThemeDefinition = {
  dark: false,
  colors: {
    // ===== SURFACE =====
    background: COLORS_LIGHT.background,
    surface: COLORS_LIGHT.surface,
    "surface-bright": COLORS_LIGHT["surface-bright"],
    "surface-light": COLORS_LIGHT["surface-light"],
    "surface-variant": COLORS_LIGHT["surface-variant"],

    // ===== ACCENT =====
    primary: COLORS_LIGHT.primary,
    "primary-variant": COLORS_LIGHT["primary-variant"],
    accent: COLORS_LIGHT.accent,
    ui: COLORS_LIGHT.ui,
    secondary: COLORS_LIGHT.secondary,

    // ===== STATUS =====
    success: COLORS_LIGHT.success,
    warning: COLORS_LIGHT.warning,
    error: COLORS_LIGHT.error,
    info: COLORS_LIGHT.info,

    // ===== ON COLORS =====
    "on-background": TEXT_LIGHT["on-background"],
    "on-surface": TEXT_LIGHT["on-surface"],
    "on-surface-bright": TEXT_LIGHT.primary,
    "on-surface-light": TEXT_LIGHT.primary,
    "on-surface-variant": TEXT_LIGHT.secondary,

    "on-primary": "#FFFFFF",
    "on-primary-variant": "#FFFFFF",
    "on-accent": "#000000",
    "on-ui": "#FFFFFF",
    "on-secondary": "#FFFFFF",

    "on-success": "#FFFFFF",
    "on-warning": "#FFFFFF",
    "on-error": "#FFFFFF",
    "on-info": "#FFFFFF",
  },
  variables: {
    "border-color": "#000000",
    "border-opacity": 1,
    "high-emphasis-opacity": 1.0,
    "medium-emphasis-opacity": 0.87,
    "disabled-opacity": 0.38,
    "idle-opacity": 0,
    "hover-opacity": 0.05,
    "focus-opacity": 0.1,
    "selected-opacity": 0.08,
    "activated-opacity": 0.12,
    "pressed-opacity": 0.15,
    "dragged-opacity": 0.05,
    "theme-kbd": "#E0E0E0",
    "theme-on-kbd": "#000000",
    "theme-code": "#F5F5F5",
    "theme-on-code": "#000000",
  },
};
