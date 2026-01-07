import type { Config } from "tailwindcss";

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
    "./app.vue",
    "./error.vue",
    "./app.config.{js,ts}",
    "./nuxt.config.{js,ts}",

    "./pages/**/*.{vue,js,ts,jsx,tsx}",
    "./layouts/**/*.{vue,js,ts,jsx,tsx}",
    "./components/**/*.{vue,js,ts,jsx,tsx}",
    "./composables/**/*.{js,ts}",
    "./plugins/**/*.{js,ts}",
    "./middleware/**/*.{js,ts}",

    // Common Vue/Vite structure (harmless if folder doesn't exist)
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./index.html",

    // Optional content sources (keep if you actually use them)
    "./content/**/*.{md,mdx,html,vue}",
    "./docs/**/*.{md,mdx,html}",
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

      // Your custom breakpoints kept as-is
      screens: {
        // tablet: "640px",
        // laptop: "1024px",
        // desktop: "1280px",
        // tall: { raw: "(min-height: 792px)" },
        // // vuetify-like breakpoints (kept)
        // v_sm: "340px",
        // v_md: "540px",
        // v_lg: "800px",
        // v_xl: "1280px",
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
    },
  },

  corePlugins: {
    // keep your intent: avoid conflicts with the plugin + native utilities
    // aspectRatio: false,
  },

  // plugins: [twTypography, twAspectRatio, twContainer],
} satisfies Config;
