// nuxt.config.ts
export default defineNuxtConfig({
  // ✅ Classic SPA
  ssr: false,

  // ✅ Static output (dist-like)
  nitro: {
    preset: "static",
    compressPublicAssets: true,
  },

  // ✅ App head (global defaults)
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#ffffff" },
        // In SPA, keep dev safe:
        {
          name: "robots",
          content:
            process.env.NODE_ENV === "production"
              ? "index,follow"
              : "noindex,nofollow",
        },
        {
          name: "description",
          content: "My Nuxt SPA",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  // ✅ Runtime env (client-safe)
  runtimeConfig: {
    public: {
      siteUrl:
        process.env.NUXT_PUBLIC_SITE_URL ||
        process.env.NUXT_SITE_URL ||
        "http://localhost:3000",
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "",
    },
  },

  // ✅ Modules (optional, keep minimal)
  modules: [
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss", // remove if not using
    // "@nuxt/icon",
    // "@nuxt/image",
    // "nuxt-security",
  ],

  // ✅ Vite production tuning
  vite: {
    build: {
      sourcemap: false,
      cssCodeSplit: true,
    },
    esbuild: {
      drop:
        process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
    },
  },

  // ✅ Nuxt sourcemaps (useful if you upload to Sentry)
  sourcemap: { client: "hidden" },

  // ✅ Reduce “magic”
  devtools: { enabled: process.env.NODE_ENV !== "production" },

  // ✅ Optional: caching headers hints (actual caching set on hosting/CDN)
  routeRules: {
    "/_nuxt/**": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
    "/**": {
      headers: { "cache-control": "public, max-age=300" },
    },
  },

  // ✅ Avoid SPA edge-cases
  experimental: {
    payloadExtraction: false,
  },

  // Pin for reproducible builds (optional)
  compatibilityDate: "2025-01-01",
});
