import { FROM_PACKAGES_IMPORT } from "./app/config/from-packages-import";

type TMeta = Record<string, string>[];

// -----------------------------------------------------------------------------
// Environment + derived constants
// -----------------------------------------------------------------------------
const isProd = process.env.NODE_ENV === "production";

/**
 * Used as the canonical site URL for SEO (sitemap, canonical tags, schema, etc.)
 */
const siteUrl =
  (isProd ? process.env.NUXT_SITE_URL : process.env.NUXT_SITE_URL_DEV) ||
  (isProd ? "https://nikolav.rs" : "http://localhost:3000");

const meta: TMeta = [
  { name: "description", content: "NuxtApp --nuxt.config" },
  { name: "theme-color", content: "#fafafa" },
  { name: "format-detection", content: "telephone=no" },
];

export default defineNuxtConfig({
  // ---------------------------------------------------------------------------
  // Core / project defaults
  // ---------------------------------------------------------------------------
  compatibilityDate: "2025-07-15",
  devtools: { enabled: !isProd },

  // ---------------------------------------------------------------------------
  // Rendering mode (SPA)
  // ---------------------------------------------------------------------------
  ssr: false, // ✅ SPA / client-side rendering only

  // ---------------------------------------------------------------------------
  // Modules (features)
  // ---------------------------------------------------------------------------
  modules: [
    "@nuxtjs/seo",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
  ],

  // ---------------------------------------------------------------------------
  // Runtime config
  // NOTE: In SPA builds there is NO server runtime.
  // - Anything outside runtimeConfig.public will NOT be available at runtime.
  // - Keep secrets OUT of Nuxt SPA (use backend/API instead).
  // ---------------------------------------------------------------------------
  runtimeConfig: {
    // ⚠️ these will NOT behave as “server secrets” in SPA hosting
    apiSecret: process.env.API_SECRET,
    dbPassword: process.env.DB_PASSWORD,
    webhookToken: process.env.WEBHOOK_TOKEN,

    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      siteUrl,
    },
  },

  // ---------------------------------------------------------------------------
  // App HTML defaults (global <head>)
  // ---------------------------------------------------------------------------
  app: {
    head: {
      charset: "utf-8",
      viewport:
        "width=device-width, initial-scale=1.0, shrink-to-fit=no, minimum-scale=1",
      title: "⌛app:loading",
      meta,
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
      ],
      htmlAttrs: {
        // lang: "sr",
      },
      bodyAttrs: {
        // class: "dark:selection:bg-white/20 scrollbar-thin-light",
      },
    },
    pageTransition: { name: "ROUTE_TRANSITION_BLUR", mode: "in-out" },
    layoutTransition: { name: "ROUTE_TRANSITION_BLUR" },
  },

  // ---------------------------------------------------------------------------
  // Global CSS entrypoints
  // ---------------------------------------------------------------------------
  css: ["~/assets/styles/styles.scss", "animate.css"],

  // ---------------------------------------------------------------------------
  // SEO Kit: site identity
  // NOTE: SPA cannot deliver per-route HTML to crawlers like SSR/SSG can.
  // SEO kit is still useful for defaults + social share tags, but route-level SEO
  // is limited unless you pre-render.
  // ---------------------------------------------------------------------------
  site: {
    url: siteUrl,
    name: process.env.NUXT_SITE_NAME || "nikola.rs",
    description:
      process.env.NUXT_SITE_DESCRIPTION ||
      "Psihološko savetovalište i psihoterapija u Beogradu.",
    defaultLocale: "sr",
  },

  seo: {
    automaticDefaults: true,
    canonicalQueryWhitelist: ["page", "sort", "filter", "search", "q", "query"],
  },

  robots: {
    groups: isProd
      ? [{ userAgent: ["*"], allow: ["/"] }]
      : [{ userAgent: ["*"], disallow: ["/"] }],
  },

  sitemap: {
    autoLastmod: true,
  },

  schemaOrg: {
    identity: {
      type: "Organization",
      name: process.env.NUXT_SITE_NAME || "nikola.rs",
      url: siteUrl,
    },
  },

  ogImage: { enabled: true },
  linkChecker: { enabled: !isProd },

  // ---------------------------------------------------------------------------
  // Nitro / static output for SPA hosting
  // ---------------------------------------------------------------------------
  nitro: {
    preset: "static",

    routeRules: {
      // 1) Cache Nuxt build assets aggressively
      "/_nuxt/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },

      // 2) Important for SPA: don't aggressively cache index.html
      // (so deployments update immediately)
      "/**": {
        headers: { "cache-control": "public, max-age=0, must-revalidate" },
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Experimental
  // ---------------------------------------------------------------------------
  experimental: {
    payloadExtraction: false, // ✅ not needed for SPA-only
  },

  // ---------------------------------------------------------------------------
  // Build tooling
  // ---------------------------------------------------------------------------
  vite: {
    build: {
      sourcemap: !isProd,
    },
  },

  // ---------------------------------------------------------------------------
  // Nuxt Image configuration
  // ---------------------------------------------------------------------------
  image: {
    quality: 99,
    domains: [],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
  },

  // ---------------------------------------------------------------------------
  // Tailwind module settings
  // NOTE: align path with your /app/assets/... structure
  // ---------------------------------------------------------------------------
  tailwindcss: {
    cssPath: "~/assets/styles/tailwind.scss",
    viewer: false,
  },

  // ---------------------------------------------------------------------------
  // Auto-imports configuration
  // ---------------------------------------------------------------------------
  imports: {
    presets: FROM_PACKAGES_IMPORT,
  },

  // ---------------------------------------------------------------------------
  // Router defaults
  // ---------------------------------------------------------------------------
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },
});
