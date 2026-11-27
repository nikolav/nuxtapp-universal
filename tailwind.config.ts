import type { Config } from "tailwindcss";
import tailwindcssPlugin from "tailwindcss/plugin";
import { default as pluginContainerQueries } from "@tailwindcss/container-queries";
import { default as pluginTypography } from "@tailwindcss/typography";
import { default as reduce } from "lodash/reduce";

import { displayDefaults } from "./app/assets/breakpoints";
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
    { pattern: /^(bg|text|border|ring|outline|divide)-v-(.+)$/ },
    { pattern: /^(bg|text|border|ring|outline|divide)-v-(.+)\/\d+$/ },
  ],

  // Keep empty unless you intentionally want to prevent some utilities
  blocklist: [],

  theme: {
    extend: {
      screens: reduce(
        displayDefaults?.thresholds ?? {},
        (res, val, breakpoint) => {
          res["xxl" !== breakpoint ? breakpoint : "2xl"] = `${val}px`;
          return res;
        },
        <any>{},
      ),

      colors: {
        current: "currentColor",
        transparent: "transparent",

        // handy when mixing with Vuetify CSS vars in utilities:
        // text-v-primary
        // e.g. text-[rgb(var(--v-theme-on-surface))]
        v: reduce(
          [
            "primary",
            "primary-variant",
            "secondary",
            "accent",
            "ui",

            "background",
            "surface",
            "surface-variant",
            "surface-bright",
            "surface-light",

            "success",
            "error",
            "warning",
            "info",

            "on-primary",
            "on-primary-variant",
            "on-secondary",
            "on-accent",
            "on-ui",

            "on-success",
            "on-error",
            "on-warning",
            "on-info",

            "on-background",
            "on-surface",

            "outline",
          ],
          (res, color) => {
            res[color] = `rgb(var(--v-theme-${color}), <alpha-value>)`;
            return res;
          },
          <any>{},
        ),
      },

      spacing: {
        rem: "1rem",
      },

      fontFamily: {
        "app-base": "var(--app-ff-base)",
        "app-sans": "var(--app-ff-sans)",
        "app-serif": "var(--app-ff-serif)",
        "app-mono": "var(--app-ff-mono)",
        "app-comic": "var(--app-ff-comic)",
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
        "chars-default": "81ch",
        "chars-comfortable": "71ch",
        "chars-compact": "51ch",
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
    pluginContainerQueries,
    pluginTypography,

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

    // dynamic arbitrary value support (e.g., perspective-[750px])
    tailwindcssPlugin((_) => {
      _.matchUtilities({
        perspective: (value) => ({ perspective: value }),
      });
    }),
  ],
} satisfies Config;
