import type { Config } from "tailwindcss";
import { default as pluginContainerQueries } from "@tailwindcss/container-queries";

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

  safelist: [],
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

      // .grid-rows-fill-auto
      gridTemplateRows: {
        "auto-fill-auto": "auto 1fr auto",
      },

      // #https://github.com/tailwindlabs/tailwindcss-container-queries
      containers: {
        // custom contaniner sizes
      },
    },
  },

  /**
   * Key Vuetify compatibility:
   * Tailwind v4+ injects “preflight” via `@import "tailwindcss";`
   * To avoid subtle CSS baseline conflicts with Vuetify components,
   * disable Tailwind’s preflight.
   *
   * If you rely on preflight (prose pages, markdown), enable it and add a scoped reset
   * only in those areas instead.
   */
  corePlugins: {},

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
  ],
} satisfies Config;
