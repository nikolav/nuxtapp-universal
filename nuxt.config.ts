const isProd = process.env.NODE_ENV === "production";

// Prefer a real domain in prod; allow localhost only in dev
const siteUrl =
  (isProd ? process.env.NUXT_SITE_URL : process.env.NUXT_SITE_URL_DEV) ||
  (isProd ? "https://inspera.rs" : "http://localhost:3000");

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  runtimeConfig: {
    // 🔒 server/build
    apiSecret: process.env.API_SECRET,
    dbPassword: process.env.DB_PASSWORD,
    webhookToken: process.env.WEBHOOK_TOKEN,

    // 🌍 browser
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },

  // ---------------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------------
  // SSG uses SSR at build time
  ssr: true,

  // ---------------------------------------------------------------------------
  // Modules
  // ---------------------------------------------------------------------------
  modules: [
    "@nuxtjs/seo",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxt/icon",
    "@nuxt/image",
  ],

  // ---------------------------------------------------------------------------
  // Site identity (SEO Kit source of truth)
  // ---------------------------------------------------------------------------
  site: {
    url: siteUrl,
    name: process.env.NUXT_SITE_NAME || "Centar Inspera",
    description:
      process.env.NUXT_SITE_DESCRIPTION ||
      "Psihološko savetovalište i psihoterapija u Beogradu.",
    defaultLocale: "sr",
  },

  // ---------------------------------------------------------------------------
  // SEO utils (canonicals, defaults)
  // ---------------------------------------------------------------------------
  seo: {
    automaticDefaults: true,
    canonicalQueryWhitelist: ["page", "sort", "filter", "search", "q", "query"],
  },

  // ---------------------------------------------------------------------------
  // Robots.txt
  // ---------------------------------------------------------------------------
  robots: {
    groups:
      process.env.NODE_ENV === "production"
        ? [
            {
              userAgent: ["*"],
              allow: ["/"],
            },
          ]
        : [
            {
              userAgent: ["*"],
              disallow: ["/"],
            },
          ],
  },

  // ---------------------------------------------------------------------------
  // Sitemap
  // ---------------------------------------------------------------------------
  sitemap: {
    autoLastmod: true,
  },

  // ---------------------------------------------------------------------------
  // Schema.org
  // ---------------------------------------------------------------------------
  schemaOrg: {
    identity: {
      type: "Organization",
      name: process.env.NUXT_SITE_NAME || "Centar Inspera",
      url: process.env.NUXT_SITE_URL || "https://inspera.rs",
    },
  },

  // ---------------------------------------------------------------------------
  // Open Graph images & link checking
  // ---------------------------------------------------------------------------
  ogImage: { enabled: true },
  linkChecker: { enabled: true },

  // ---------------------------------------------------------------------------
  // Static generation / Nitro
  // ---------------------------------------------------------------------------
  nitro: {
    preset: "static",

    // Explicit prerendering (recommended for marketing sites)
    prerender: {
      routes: ["/", "/about"],

      // Fail build if a prerendered route errors (SEO safety)
      failOnError: true,
    },

    // Public asset cache headers (CDN-friendly)
    routeRules: {
      "/_nuxt/**": {
        headers: {
          "cache-control": "public, max-age=31536000, immutable",
        },
      },
    },
  },

  // ---------------------------------------------------------------------------
  // App-level HTML defaults
  // ---------------------------------------------------------------------------
  app: {
    head: {
      htmlAttrs: { lang: "sr" },
      meta: [{ name: "format-detection", content: "telephone=no" }],
    },
  },

  // ---------------------------------------------------------------------------
  // Payload / hydration safety for static sites
  // ---------------------------------------------------------------------------
  experimental: {
    payloadExtraction: true,
  },

  // ---------------------------------------------------------------------------
  // Build output hygiene
  // ---------------------------------------------------------------------------
  build: {},

  // vite config
  vite: {
    build: {
      sourcemap: process.env.NODE_ENV !== "production",
    },
  },

  // icon: {},

  // image: {
  //   // sensible defaults
  //   quality: 80,
  //   format: ["webp", "avif", "jpeg"],
  // },
});
