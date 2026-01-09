import { FROM_PACKAGES_IMPORT } from "./app/config/from-packages-import";

type TMeta = Record<string, string>[];

// -----------------------------------------------------------------------------
// Environment + derived constants
// -----------------------------------------------------------------------------
const isProd = process.env.NODE_ENV === "production";

/**
 * Canonical site URL for SEO (sitemap, canonical tags, schema, etc.)
 */
const siteUrl =
  (isProd ? process.env.NUXT_SITE_URL : process.env.NUXT_SITE_URL_DEV) ||
  (isProd ? "https://demo.nikolav.rs" : "http://localhost:3000");

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
  // Rendering mode
  // ---------------------------------------------------------------------------
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
    "@nuxtjs/tailwindcss",
  ],

  // ---------------------------------------------------------------------------
  // Runtime config
  // ---------------------------------------------------------------------------
  runtimeConfig: {
    // server-only secrets
    apiSecret: process.env.API_SECRET,
    dbPassword: process.env.DB_PASSWORD,
    webhookToken: process.env.WEBHOOK_TOKEN,

    // browser-exposed
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      siteUrl,
    },
  },

  // ---------------------------------------------------------------------------
  // App <head>
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
    },
    pageTransition: { name: "ROUTE_TRANSITION_BLUR", mode: "in-out" },
    layoutTransition: { name: "ROUTE_TRANSITION_BLUR" },
  },

  // ---------------------------------------------------------------------------
  // Global CSS
  // ---------------------------------------------------------------------------
  css: ["~/assets/styles/styles.scss", "animate.css"],

  // ---------------------------------------------------------------------------
  // SEO Kit (site identity)
  // ---------------------------------------------------------------------------
  site: {
    url: siteUrl,
    name: process.env.NUXT_SITE_NAME || "nikolav.rs",
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

  sitemap: { autoLastmod: true },

  schemaOrg: {
    identity: {
      type: "Organization",
      name: process.env.NUXT_SITE_NAME || "nikolav.rs",
      url: siteUrl,
    },
  },

  ogImage: { enabled: true },
  linkChecker: { enabled: !isProd }, // usually keep off in prod builds

  // ---------------------------------------------------------------------------
  // Nitro (SSR server runtime)
  // ---------------------------------------------------------------------------
  nitro: {
    // ✅ SSR server output (VPS/Docker/Node runtime)
    preset: "node-server",

    // optional: compress static assets served by Nitro
    compressPublicAssets: true,

    routeRules: {
      // Cache Nuxt build assets aggressively (CDN-friendly)
      "/_nuxt/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },

      // If you have truly static files under /public
      "/favicon.ico": {
        headers: { "cache-control": "public, max-age=86400" },
      },

      // --- OPTIONAL patterns ---
      // Example: enable ISR (stale-while-revalidate) for marketing pages:
      // "/": { isr: 60 },
      // "/about": { isr: 3600 },

      // Example: avoid caching for auth/user pages:
      // "/account/**": { headers: { "cache-control": "no-store" } },
    },
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
  // Nuxt Image
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
  // Tailwind
  // NOTE: align cssPath with your actual folder structure (/app/assets/...)
  // ---------------------------------------------------------------------------
  tailwindcss: {
    cssPath: "~/assets/styles/tailwind.scss",
    viewer: false,
  },

  // ---------------------------------------------------------------------------
  // Auto-imports
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
