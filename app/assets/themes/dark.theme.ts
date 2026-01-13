import type { ThemeDefinition } from "vuetify";
import chroma from "chroma-js";
import {
  COLOR_PRIMARY,
  THEME_DARK_BG,
  THEME_DARK_LIGHTNESS_SHIFT,
  THEME_DARK_SURFACE,
} from "./colors";

const primary_ = chroma(COLOR_PRIMARY);
export const primary = primary_
  .luminance(primary_.luminance() * THEME_DARK_LIGHTNESS_SHIFT)
  .hex();
export const secondary = chroma(primary).desaturate(1.4).brighten(0.8).hex();

export const dark: ThemeDefinition = {
  dark: true,
  colors: {
    background: THEME_DARK_BG,
    surface: THEME_DARK_SURFACE,
    primary,
    secondary,
    success: "#66BB6A",
    error: "#EF5350",
    info: "#42A5F5",
    warning: "#FFB74D",
    //
    primary2: primary,
    primary3: primary,
    accent1: primary,
    accent2: primary,
    complement: primary,
  },
};
