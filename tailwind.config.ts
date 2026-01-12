import type { Config } from "tailwindcss";
// import { fontFamily } from "tailwindcss/defaultTheme";

// import twTypography from "@tailwindcss/typography";
// import twAspectRatio from "@tailwindcss/aspect-ratio";
// import twContainer from "@tailwindcss/container-queries";

const primary = "#184c9f";

export default {
  // Safer default for Vue/Nuxt (SSR friendly + predictable)
  darkMode: "class",

  // Use project-root relative paths (avoid ../ unless this file is inside /config)
  content: [
    // Nuxt 3
    "./app/app.vue",
    "./app/error.vue",
    "./app/app.config.{js,ts}",
    "./app/nuxt.config.{js,ts}",

    "./app/pages/**/*.{vue,js,ts,jsx,tsx,mjs}",
    "./app/layouts/**/*.{vue,js,ts,jsx,tsx,mjs}",
    "./app/components/**/*.{vue,js,ts,jsx,tsx,mjs}",
    "./app/composables/**/*.{js,ts}",
    "./app/plugins/**/*.{js,ts}",
    "./app/middleware/**/*.{js,ts}",

    // Common Vue/Vite structure (harmless if folder doesn't exist)
    "./app/src/**/*.{vue,js,ts,jsx,tsx,mjs}",
    "./app/index.html",

    // Optional content sources (keep if you actually use them)
    "./app/content/**/*.{md,mdx,html,vue}",
    "./app/docs/**/*.{md,mdx,html}",
  ],

  // Keep empty unless you *need* dynamic class support
  safelist: [],

  // Keep empty unless you intentionally want to prevent some utilities
  blocklist: [],

  theme: {
    extend: {
      colors: {
        current: "currentColor",
        transparent: "transparent",
        primary,
        banana: {
          DEFAULT: "#ffff00",
          500: "#ffff00",
        },
      },

      screens: {
        /* size tiers */
        xs: "599.98px", // replaces implicit <sm
        sm: "959.98px",
        md: "1279.98px",
        lg: "1919.98px",
        xl: { min: "1920px" },

        /* semantic device ranges */
        handset: {
          raw: "(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)",
        },
        tablet: {
          raw: "(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",
        },
        web: {
          raw: "(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)",
        },

        /* orientation-aware */
        "handset-p": {
          raw: "(max-width: 599.98px) and (orientation: portrait)",
        },
        "handset-l": {
          raw: "(max-width: 959.98px) and (orientation: landscape)",
        },

        "tablet-p": {
          raw: "(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)",
        },
        "tablet-l": {
          raw: "(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",
        },

        "web-p": {
          raw: "(min-width: 840px) and (orientation: portrait)",
        },
        "web-l": {
          raw: "(min-width: 1280px) and (orientation: landscape)",
        },
      },

      // Tailwind's container sizing helper (safe default for apps)
      // container: {
      //   center: true,
      //   padding: "1rem",
      //   screens: {
      //     desktop: "1280px",
      //   },
      // },

      // Your custom container queries sizes
      // containers: {
      //   "2xs": "16rem",
      // },
      fontFamily: {
        // roboto: ["Roboto", "Roboto fallback", ...fontFamily.sans],
      },
    },
  },

  corePlugins: {
    // keep your intent: avoid conflicts with the plugin + native utilities
    // aspectRatio: false,
  },

  // plugins: [twTypography, twAspectRatio, twContainer],
} satisfies Config;
