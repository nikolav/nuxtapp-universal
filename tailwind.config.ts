import type { Config } from "tailwindcss";
import tailwindcssPlugin from "tailwindcss/plugin";
import { default as pluginContainerQueries } from "@tailwindcss/container-queries";
import { default as reduce } from "lodash/reduce";

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
          ui: "rgb(var(--v-theme-ui), <alpha-value>)",
          "on-ui": "rgb(var(--v-theme-on-ui), <alpha-value>)",

          success: "rgb(var(--v-theme-success), <alpha-value>)",
          "on-success": "rgb(var(--v-theme-on-success), <alpha-value>)",
          warning: "rgb(var(--v-theme-warning), <alpha-value>)",
          "on-warning": "rgb(var(--v-theme-on-warning), <alpha-value>)",
          error: "rgb(var(--v-theme-error), <alpha-value>)",
          "on-error": "rgb(var(--v-theme-on-error), <alpha-value>)",
          info: "rgb(var(--v-theme-info), <alpha-value>)",
          "on-info": "rgb(var(--v-theme-on-info), <alpha-value>)",

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

      textShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.5)",
        md: "0 2px 4px rgba(0, 0, 0, 0.5)",
        lg: "0 4px 8px rgba(0, 0, 0, 0.5)",
        xl: "0 8px 16px rgba(0, 0, 0, 0.5)",
        glow: "0 0 20px rgba(255, 255, 255, 0.8)",
        neon: "0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.6)",
        "3d": "0 1px 0 #999, 0 2px 0 #888, 0 3px 0 #777, 0 4px 0 #666, 0 5px 0 #555",
      },

      filterShadow: {
        sm: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))",
        md: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
        lg: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
        xl: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))",
        "2xl": "drop-shadow(0 12px 24px rgba(0, 0, 0, 0.3))",
        glow: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))",
        neon: "drop-shadow(0 0 10px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 20px rgba(0, 255, 255, 0.6))",
        colored: "drop-shadow(4px 4px 8px rgba(255, 0, 0, 0.4))",
        sharp: "drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.3))",
        soft: "drop-shadow(0 8px 20px rgba(0, 0, 0, 0.15))",
      },

      // #https://github.com/tailwindlabs/tailwindcss-container-queries
      containers: {
        // custom contaniner sizes
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
    pluginContainerQueries,

    // text-shadow
    tailwindcssPlugin((_) => {
      const utilities = reduce(
        _.theme("textShadow", {}),
        (accum, value, key) => [
          ...accum,
          { [`.text-shadow-${key}`]: { "text-shadow": value } },
        ],
        <any[]>[],
      );
      // _.addUtilities(utilities, ["responsive", "hover"]);
      _.addUtilities(utilities);
    }),

    // filter: drop-shadow
    tailwindcssPlugin((_) => {
      const filterUtilities = reduce(
        _.theme("filterShadow", {}),
        (accum, value, key) => [
          ...accum,
          {
            [`.filter-shadow-${key}`]: {
              filter: value,
              // WebKit prefix for Safari compatibility
              "-webkit-filter": value,
            },
          },
        ],
        <any[]>[],
      );
      // _.addUtilities(filterUtilities, ["responsive", "hover"]);
      _.addUtilities(filterUtilities);
    }),
  ],
} satisfies Config;
