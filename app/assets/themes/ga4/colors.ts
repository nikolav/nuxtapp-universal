// ===== ENHANCED GOOGLE ANALYTICS 4 THEME - HIGH CONTRAST =====
// Improved readability with bolder colors and clearer hierarchy

export const COLORS_LIGHT = {
  // Core colors - Enhanced for better visibility
  primary: "#1A73E8", // GA4 Blue - more prominent
  "primary-variant": "#0D47A1", // Darker for better contrast
  accent: "#E37400", // Darker orange for better readability
  secondary: "#4A4F55", // Darker slate for better contrast
  ui: "#1A73E8",

  // Surfaces - Clean with clearer separation
  background: "#F5F6F8", // Slightly darker for contrast
  surface: "#FFFFFF", // Pure white for maximum contrast
  "surface-bright": "#FFFFFF",
  "surface-light": "#EEF0F2", // Darker for better separation
  "surface-variant": "#E3E8F0", // More visible blue tint

  // Status - More vivid and prominent
  success: "#2E7D32", // Darker green for better contrast
  "success-bg": "#E8F5E9",
  warning: "#E37400", // Darker orange
  "warning-bg": "#FFF3E0",
  error: "#C62828", // Darker red for better visibility
  "error-bg": "#FFEBEE",
  info: "#1565C0", // Darker blue
  "info-bg": "#E3F2FD",
};

export const COLORS_DARK = {
  // Core colors - Enhanced visibility on dark
  primary: "#8AB4F8", // Brighter blue for dark mode
  "primary-variant": "#AECBFA",
  accent: "#FFB300", // Brighter orange for dark
  secondary: "#C0C6CC", // Lighter for better contrast
  ui: "#8AB4F8",

  // Surfaces - Clear hierarchy with better contrast
  background: "#1A1C1E", // Darker base
  surface: "#26282A", // Lighter for better card contrast
  "surface-bright": "#303235",
  "surface-light": "#202224",
  "surface-variant": "#1A2744", // More visible blue tint

  // Status - Bright and prominent on dark
  success: "#81C995", // Bright green
  "success-bg": "#1E3A2A",
  warning: "#FFB300", // Bright orange
  "warning-bg": "#332A1A",
  error: "#F28B82", // Bright red
  "error-bg": "#3A1C1C",
  info: "#8AB4F8", // Bright blue
  "info-bg": "#174EA6",
};

// ===== HIGH CONTRAST TEXT COLORS =====
export const TEXT_LIGHT = {
  primary: "#1A1D23", // Darker for maximum readability
  secondary: "#4A4F55", // Darker for better contrast
  disabled: "#8A9098", // More visible disabled state
  hint: "#6A7078", // More visible hints
  "on-surface": "#1A1D23",
  "on-background": "#1A1D23",
};

export const TEXT_DARK = {
  primary: "#F1F3F4", // Brighter for readability
  secondary: "#C0C6CC", // Lighter for better contrast
  disabled: "#6A7078", // More visible disabled
  hint: "#8A9098", // More visible hints
  "on-surface": "#F1F3F4",
  "on-background": "#F1F3F4",
};

export const PRIMARY = {
  light: COLORS_LIGHT.primary,
  dark: COLORS_DARK.primary,
};
