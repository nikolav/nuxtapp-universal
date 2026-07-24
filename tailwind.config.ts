import type { Config } from "tailwindcss";

import { COLOR_PRIMARY as primary } from "./app/assets/themes/colors";
import { darkRootClass } from "./app/config/vars.env.public";

export default {
  // Safer default for Vue/Nuxt (SSR friendly + predictable)
  darkMode: ["selector", `.${darkRootClass}`],

  // Use project-root relative paths (avoid ../ unless this file is inside /config)
  content: [
    "./app/**/*.{vue,js,ts,jsx,tsx,md,mdx,html}",
    "./components/**/*.{vue,js,ts,jsx,tsx}",
    "./layouts/**/*.{vue,js,ts,jsx,tsx}",
    "./pages/**/*.{vue,js,ts,jsx,tsx}",
    "./plugins/**/*.{js,ts}",
    "./composables/**/*.{js,ts}",
    "./utils/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],

  // Keep empty unless you *need* dynamic class support
  safelist: [
    { pattern: /^(bg|text|border|ring|outline)-v-(.+)$/ },
    { pattern: /^(bg|text|border|ring|outline)-v-(.+)\/\d+$/ },
  ],

  // Keep empty unless you intentionally want to prevent some utilities
  blocklist: [],

  theme: {
    extend: {
      screens: {
        xs: "0px",
        sm: "600px",
        md: "960px",
        lg: "1280px",
        xl: "1920px",
        "2xl": "2560px",
      },

      colors: {
        current: "currentColor",
        transparent: "transparent",
        primary,
        // handy when mixing with Vuetify CSS vars in utilities:
        // text-v-primary
        // e.g. text-[rgb(var(--v-theme-on-surface))]
        v: {
          primary: "rgb(var(--v-theme-primary), <alpha-value>)",
          "on-primary": "rgb(var(--v-theme-on-primary), <alpha-value>)",
          secondary: "rgb(var(--v-theme-secondary), <alpha-value>)",
          "on-secondary": "rgb(var(--v-theme-on-secondary), <alpha-value>)",
          accent: "rgb(var(--v-theme-accent), <alpha-value>)",
          "on-accent": "rgb(var(--v-theme-on-accent), <alpha-value>)",
          "primary-variant":
            "rgb(var(--v-theme-primary-variant), <alpha-value>)",
          "on-primary-variant":
            "rgb(var(--v-theme-on-primary-variant), <alpha-value>)",

          success: "rgb(var(--v-theme-success), <alpha-value>)",
          warning: "rgb(var(--v-theme-warning), <alpha-value>)",
          error: "rgb(var(--v-theme-error), <alpha-value>)",
          info: "rgb(var(--v-theme-info), <alpha-value>)",

          background: "rgb(var(--v-theme-background), <alpha-value>)",
          surface: "rgb(var(--v-theme-surface), <alpha-value>)",
          "surface-variant":
            "rgb(var(--v-theme-surface-variant), <alpha-value>)",
          "surface-light": "rgb(var(--v-theme-surface-light), <alpha-value>)",
          "surface-bright": "rgb(var(--v-theme-surface-bright), <alpha-value>)",

          "on-background": "rgb(var(--v-theme-on-background), <alpha-value>)",
          "on-surface": "rgb(var(--v-theme-on-surface), <alpha-value>)",

          outline: "rgb(var(--v-theme-outline), <alpha-value>)",
        },
      },

      spacing: {
        rem: "1rem",
      },

      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
      },

      borderRadius: {
        // Matches Vuetify default rounding better for utility wrappers/cards you add
        "v-card": "var(--v-border-radius, 16px)",
      },
    },
  },

  // // .grid-rows-auto-fill-auto
  // gridTemplateRows: {
  //   "auto-fill-auto": "auto 1fr auto",
  // },

  /**
   * Key Vuetify compatibility:
   * Tailwind v4+ injects “preflight” via `@import "tailwindcss";`
   * To avoid subtle CSS baseline conflicts with Vuetify components,
   * disable Tailwind’s preflight.
   *
   * If you rely on preflight (prose pages, markdown), enable it and add a scoped reset
   * only in those areas instead.
   */
  corePlugins: {
    preflight: false,
  },

  /**
   * Minimal plugins that play well with Vuetify:
   * - typography is great for markdown/blog content (wrap with `prose` only)
   * - container-queries is safe and useful
   *
   * Add aspect-ratio only if you need it (Vuetify has its own patterns too).
   */
  plugins: [
    // require("@tailwindcss/typography"),
    // require("@tailwindcss/container-queries"),
  ],
} satisfies Config;
