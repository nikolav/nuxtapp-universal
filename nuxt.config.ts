import { FROM_PACKAGES_IMPORT } from "./config/from-packages-import";

type TMeta = Record<string, string>[];

// -----------------------------------------------------------------------------
// Environment + derived constants
// -----------------------------------------------------------------------------
const isProd = process.env.NODE_ENV === "production";

/**
 * Used as the canonical site URL for SEO (sitemap, canonical tags, schema, etc.)
 * - prod: NUXT_SITE_URL (fallback: https://inspera.rs)
 * - dev:  NUXT_SITE_URL_DEV (fallback: http://localhost:3000)
 */
const siteUrl =
  (isProd ? process.env.NUXT_SITE_URL : process.env.NUXT_SITE_URL_DEV) ||
  (isProd ? "https://inspera.rs" : "http://localhost:3000");

const meta: TMeta = [
  { name: "description", content: "NuxtApp --nuxt.config" },
  { name: "theme-color", content: "#fafafa" },
  { name: "format-detection", content: "telephone=no" },
];

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ---------------------------------------------------------------------------
  // Core / project defaults
  // ---------------------------------------------------------------------------
  compatibilityDate: "2025-07-15", // Pin Nitro/compat behavior for reproducible builds
  devtools: { enabled: true }, // Nuxt DevTools UI in dev

  // ---------------------------------------------------------------------------
  // Rendering mode
  // ---------------------------------------------------------------------------
  ssr: true, // SSG still uses SSR at build-time; keep true for best SEO

  // ---------------------------------------------------------------------------
  // Modules (features)
  // ---------------------------------------------------------------------------
  modules: [
    "@nuxtjs/seo", // SEO Kit: meta defaults, robots, sitemap, schema, ogImage, linkChecker
    "@vueuse/nuxt", // VueUse auto-imports
    "@pinia/nuxt", // Pinia store integration
    "@nuxt/icon", // Icon component + icon sets
    "@nuxt/image", // Image optimization
    "@nuxtjs/tailwindcss", // Tailwind integration
  ],

  // ---------------------------------------------------------------------------
  // Runtime config
  // - runtimeConfig.* is server-only (not exposed to client)
  // - runtimeConfig.public.* is exposed to browser
  // ---------------------------------------------------------------------------
  runtimeConfig: {
    // 🔒 server/build secrets (never exposed to client)
    apiSecret: process.env.API_SECRET,
    dbPassword: process.env.DB_PASSWORD,
    webhookToken: process.env.WEBHOOK_TOKEN,

    // 🌍 client-safe values
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
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
      // titleTemplate: "%s | app:name",
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
  },

  // ---------------------------------------------------------------------------
  // Global CSS entrypoints
  // ---------------------------------------------------------------------------
  css: [
    // main global styles
    "~/assets/styles/styles.scss",

    // "@mdi/font/css/materialdesignicons.css",
    // "vuetify/lib/styles/main.sass",

    // # vendor
    // "quill/dist/quill.core.css",
    // "quill/dist/quill.snow.css",
  ],

  // ---------------------------------------------------------------------------
  // SEO Kit: site identity (single source of truth)
  // ---------------------------------------------------------------------------
  site: {
    url: siteUrl,
    name: process.env.NUXT_SITE_NAME || "Centar Inspera",
    description:
      process.env.NUXT_SITE_DESCRIPTION ||
      "Psihološko savetovalište i psihoterapija u Beogradu.",
    defaultLocale: "sr",
  },

  // Canonicals + default meta behavior
  seo: {
    automaticDefaults: true,
    canonicalQueryWhitelist: ["page", "sort", "filter", "search", "q", "query"],
  },

  // robots.txt (block indexing in dev, allow in prod)
  robots: {
    groups: isProd
      ? [{ userAgent: ["*"], allow: ["/"] }]
      : [{ userAgent: ["*"], disallow: ["/"] }],
  },

  // sitemap.xml (auto lastmod if possible)
  sitemap: { autoLastmod: true },

  // JSON-LD identity used by Schema.org module
  schemaOrg: {
    identity: {
      type: "Organization",
      name: process.env.NUXT_SITE_NAME || "Centar Inspera",
      url: process.env.NUXT_SITE_URL || "https://inspera.rs",
    },
  },

  // Extra SEO tooling from SEO Kit
  ogImage: { enabled: true }, // Auto-generate OG images (if supported/used)
  linkChecker: { enabled: true }, // Check internal/external links during dev/build

  // ---------------------------------------------------------------------------
  // Static generation / Nitro
  // ---------------------------------------------------------------------------
  nitro: {
    preset: "static", // Output a fully static site (great for marketing sites)

    prerender: {
      routes: ["/", "/about"], // Explicit pre-render list (add more as needed)
      failOnError: true, // Fail build if a prerender route errors (SEO safety)
    },

    routeRules: {
      // Cache Nuxt build assets aggressively (CDN-friendly)
      "/_nuxt/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Static payload / hydration safety (helps static sites)
  // ---------------------------------------------------------------------------
  experimental: {
    payloadExtraction: true,
  },

  // ---------------------------------------------------------------------------
  // Build tooling
  // ---------------------------------------------------------------------------
  vite: {
    build: {
      sourcemap: !isProd, // Sourcemaps in dev; reduce output in prod
    },
  },

  // ---------------------------------------------------------------------------
  // Nuxt Image configuration
  // ---------------------------------------------------------------------------
  image: {
    quality: 99, // Default image quality (override per-component when needed)
    domains: [
      // "domain.nikolav.rs",
    ],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
    // presets: { ... }
  },

  // ---------------------------------------------------------------------------
  // Tailwind module settings
  // ---------------------------------------------------------------------------
  tailwindcss: {
    cssPath: "~/assets/styles/tailwind.scss", // Your Tailwind entry file
    // configPath: "~/config/tailwind.config.ts",
    // exposeConfig: true, // expose resolved config at runtime
    viewer: false, // Tailwind viewer UI
  },

  // ---------------------------------------------------------------------------
  // Auto-imports configuration
  // ---------------------------------------------------------------------------
  imports: {
    // autoImport: false, // disable Nuxt auto-imports (force explicit imports)
    // dirs: ["./keys"], // custom auto-import directories
    presets: FROM_PACKAGES_IMPORT, // extra auto-import presets
  },

  // ---------------------------------------------------------------------------
  // Router defaults
  // ---------------------------------------------------------------------------
  router: {
    options: {
      scrollBehaviorType: "smooth", // Smooth scroll on navigation
    },
  },
});
