import type { ThemeDefinition } from "vuetify";
// import colorsVuetify from "vuetify/util/colors";
import chroma from "chroma-js";
import {
  COLOR_PRIMARY,
  COLOR_PRIMARY2,
  COLOR_PRIMARY3,
  COLOR_SECONDARY,
  THEME_ACCENT_SHIFT,
  THEME_LIGHT_BG,
  THEME_LIGHT_SURFACE,
} from "./colors";

export const primary = COLOR_PRIMARY;
// primary => accent1, accent2, complement

const pHsla = chroma(primary).hsl();
const hueShift = (amount: number) => (n: number, i: number) =>
  0 !== i ? n : n + amount;

const nAccent1 = pHsla.map(hueShift(THEME_ACCENT_SHIFT));
const accent1 = chroma
  .hsl(nAccent1[0]!, nAccent1[1]!, nAccent1[2]!, nAccent1[3])
  .hex();

const nAccent2 = pHsla.map(hueShift(-THEME_ACCENT_SHIFT));
const accent2 = chroma
  .hsl(nAccent2[0]!, nAccent2[1]!, nAccent2[2]!, nAccent2[3])
  .hex();

const nComplement = pHsla.map(hueShift(-180));
const complement = chroma
  .hsl(nComplement[0]!, nComplement[1]!, nComplement[2]!, nComplement[3])
  .hex();

export const light: ThemeDefinition = {
  dark: false,
  colors: {
    background: THEME_LIGHT_BG,
    surface: THEME_LIGHT_SURFACE,
    primary,
    secondary: COLOR_SECONDARY,
    success: "#2E7D32",
    error: "#C62828",
    info: "#1565C0",
    warning: "#ED6C02",
    primary2: COLOR_PRIMARY2,
    primary3: COLOR_PRIMARY3,
    accent1,
    accent2,
    complement,
  },
  variables: {
    //   "border-color": "#000000",
    //   "border-opacity": 0.12,
    //   "high-emphasis-opacity": 0.87,
    //   "medium-emphasis-opacity": 0.6,
    //   "disabled-opacity": 0.38,
    //   "idle-opacity": 0.04,
    //   "hover-opacity": 0.04,
    //   "focus-opacity": 0.12,
    //   "selected-opacity": 0.08,
    //   "activated-opacity": 0.12,
    //   "pressed-opacity": 0.12,
    //   "dragged-opacity": 0.08,
    //   "theme-kbd": "#212529",
    //   "theme-on-kbd": "#FFFFFF",
    //   "theme-code": "#F5F5F5",
    //   "theme-on-code": "#000000",
  },
};
