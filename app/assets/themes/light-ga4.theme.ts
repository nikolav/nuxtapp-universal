import type { ThemeDefinition } from "vuetify";
import { COLORS_LIGHT, TEXT_LIGHT } from "./colors-ga4";

export const light: ThemeDefinition = {
  dark: false,
  colors: {
    // ===== SURFACE - Enhanced Canvas =====
    background: COLORS_LIGHT.background, // #F5F6F8
    surface: COLORS_LIGHT.surface, // #FFFFFF
    "surface-bright": COLORS_LIGHT["surface-bright"],
    "surface-light": COLORS_LIGHT["surface-light"], // #EEF0F2
    "surface-variant": COLORS_LIGHT["surface-variant"], // #E3E8F0

    // ===== ACCENT - More Prominent =====
    primary: COLORS_LIGHT.primary, // #1A73E8
    "primary-variant": COLORS_LIGHT["primary-variant"], // #0D47A1
    accent: COLORS_LIGHT.accent, // #E37400
    secondary: COLORS_LIGHT.secondary, // #4A4F55
    ui: COLORS_LIGHT.ui,

    // ===== STATUS - Enhanced Vivid =====
    success: COLORS_LIGHT.success, // #2E7D32
    warning: COLORS_LIGHT.warning, // #E37400
    error: COLORS_LIGHT.error, // #C62828
    info: COLORS_LIGHT.info, // #1565C0

    // ===== ON COLORS =====
    "on-background": TEXT_LIGHT["on-background"], // #1A1D23
    "on-surface": TEXT_LIGHT["on-surface"],
    "on-surface-bright": TEXT_LIGHT.primary,
    "on-surface-light": TEXT_LIGHT.primary,
    "on-surface-variant": TEXT_LIGHT.secondary,

    "on-primary": "#FFFFFF",
    "on-primary-variant": "#FFFFFF",
    "on-accent": "#FFFFFF", // White for better contrast on orange
    "on-secondary": "#FFFFFF",
    "on-ui": "#FFFFFF",

    "on-success": "#FFFFFF",
    "on-warning": "#FFFFFF", // White on darker orange
    "on-error": "#FFFFFF",
    "on-info": "#FFFFFF",
  },
  variables: {
    // Enhanced borders for better visibility
    "border-color": "#C5C8CC", // Darker border for better visibility
    "border-opacity": 1,
    "high-emphasis-opacity": 1.0,
    "medium-emphasis-opacity": 0.87,
    "disabled-opacity": 0.4, // More visible disabled
    "idle-opacity": 0,
    "hover-opacity": 0.06, // More visible hover
    "focus-opacity": 0.15,
    "selected-opacity": 0.1,
    "activated-opacity": 0.18, // Stronger active state
    "pressed-opacity": 0.2,
    "dragged-opacity": 0.08,
    "theme-kbd": "#E8ECEF",
    "theme-on-kbd": "#1A1D23",
    "theme-code": "#F5F6F8",
    "theme-on-code": "#1A1D23",
  },
};
