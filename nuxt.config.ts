import trimEnd from "lodash/trimEnd";
import parseBoolean from "@eturino/ts-parse-boolean";
import { FROM_PACKAGES_IMPORT } from "./app/config/from-packages-import";

/**
 * ============================================================================
 * ENV / FLAGS (derived once, reused everywhere)
 * ============================================================================
 */
const PRODUCTION =
  "production" === (process.env.NUXT_SITE_ENV || process.env.NODE_ENV);

const SSR = parseBoolean(process.env.NUXT_SSR);

export const defaultLocale = process.env.NUXT_DEFAULT_LOCALE ?? "sr";

/** Site + API origins (normalized) */
const siteUrl = trimEnd(
  PRODUCTION ? process.env.NUXT_SITE_URL : process.env.NUXT_SITE_URL_DEV,
  "/",
);
const siteName = process.env.NUXT_SITE_NAME ?? "";

const apiBase = trimEnd(
  PRODUCTION ? process.env.NUXT_API_BASE : process.env.NUXT_API_BASE_DEV,
  "/",
);

/** Feature flags / infra toggles */
const isHttps = siteUrl.startsWith("https://");
const databaseInit = parseBoolean(process.env.NUXT_DATABASE_INIT);
const databaseConnectionName = process.env.NUXT_DATABASE_CONNECTION_NAME;
const redisEnabled = parseBoolean(process.env.NUXT_REDIS_INIT);

/**
 * ============================================================================
 * NUXT CONFIG
 * ============================================================================
 */
export default defineNuxtConfig({
  // ---------------------------------------------------------------------------
  // 01) Core runtime behavior (SSR, compat, devtools, TS)
  // ---------------------------------------------------------------------------
  compatibilityDate: "2025-07-15",
  ssr: SSR,

  devtools: { enabled: !PRODUCTION },

  typescript: {
    strict: true,
  },

  future: {
    // Nuxt 4 compatibility mode / forward-leaning defaults
    compatibilityVersion: 4,
    // Keep TS “bundler” resolution mode (better with modern exports)
    typescriptBundlerResolution: true,
  },

  // ---------------------------------------------------------------------------
  // 02) Routing strategy (route-level rendering/caching/redirects)
  // - Keep project-level defaults here. Nitro can add extra routeRules too.
  // ---------------------------------------------------------------------------
  routeRules: {
    // // Static pages at build time
    // "/": { prerender: true },
    // "/about": { prerender: true },
    // // Blog: static pages, CDN cached
    // "/blog/**": { isr: true },
    // // Products: revalidate in background every hour
    // "/products/**": { swr: 3600 },
    // // Admin: client-side only
    // "/admin/**": { ssr: false },
    // // API: add CORS headers
    // "/api/**": { cors: true },
  },

  // ---------------------------------------------------------------------------
  // 03) Modules (capabilities list)
  // ---------------------------------------------------------------------------
  modules: [
    "@nuxtjs/seo",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "nuxt-security",
    "@nuxtjs/fontaine",
    "@nuxtjs/i18n",

    // Custom module: build-time SQLite handling
    [
      "./modules/on-build-copy-sqlite-db",
      {
        PRODUCTION,
        databaseInit,
        databaseConnectionName,
      },
    ],
  ],

  // ---------------------------------------------------------------------------
  // 04) App defaults (document head, transitions)
  // ---------------------------------------------------------------------------
  app: {
    head: {
      htmlAttrs: { lang: defaultLocale },
      charset: "utf-8",
      viewport:
        "width=device-width, initial-scale=1.0, shrink-to-fit=no, minimum-scale=1",
      title: "nikolav.rs",
      titleTemplate: "%s | nikolav.rs",
      meta: [
        { name: "description", content: "NuxtApp --starter" },
        { name: "theme-color", content: "#fafafa" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
    pageTransition: { name: "ROUTE_TRANSITION_BLUR", mode: "in-out" },
    layoutTransition: { name: "ROUTE_TRANSITION_BLUR" },
  },

  // ---------------------------------------------------------------------------
  // 05) Styling (global CSS entrypoints)
  // ---------------------------------------------------------------------------
  css: ["~/assets/styles/styles.scss", "animate.css"],

  // ---------------------------------------------------------------------------
  // 06) Runtime config (server secrets + public client config)
  // - Everything here can be overridden by env at runtime.
  // - Only `public` is exposed to the browser.
  // ---------------------------------------------------------------------------
  runtimeConfig: {
    // Server-only secrets
    apiSecret: process.env.NUXT_API_SECRET ?? "",

    // Server-side infra flags (also useful on server)
    databaseInit,
    databaseConnectionName,

    apiKeys: {
      gooogleTranslateAPI: process.env.NUXT_KEY_GOOGLE_TRANSPATE_API,
    },

    // Client-exposed settings
    public: {
      ssr: SSR,
      appEnv: process.env.NODE_ENV ?? "development",

      // Site / API
      siteUrl,
      siteName,
      baseUrl: siteUrl,
      apiBase,

      // Locale
      defaultLocale,

      // Analytics
      gtmId: process.env.NUXT_PUBLIC_GTM_ID,
      analyticsEnabled: parseBoolean(process.env.NUXT_PUBLIC_ANALYTICS_ENABLED),

      // Reserved for env-driven i18n extensions
      i18n: {
        // .env extend i18n
      },

      // auth
      authDriver: process.env.NUXT_PUBLIC_AUTH_DRIVER ?? "memory",
    },
  },

  // ---------------------------------------------------------------------------
  // 07) SEO Kit "single source of truth"
  // - `site` is used by SEO modules (sitemap/robots/schema/og-image).
  // ---------------------------------------------------------------------------
  site: {
    url: siteUrl,
    name: siteName,
    env: process.env.NUXT_SITE_ENV,
    description: process.env.NUXT_SITE_DESCRIPTION,
    defaultLocale,
    trailingSlash: false,
    indexable: PRODUCTION,
  },

  seo: {
    automaticDefaults: true,
    canonicalQueryWhitelist: ["page", "sort", "filter", "search", "q", "query"],
    meta: {
      robots:
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    redirectToCanonicalSiteUrl: PRODUCTION,
    automaticOgAndTwitterTags: true,
  },

  robots: {
    cacheControl: PRODUCTION ? "max-age=14400, must-revalidate" : false,
    groups: PRODUCTION
      ? [{ userAgent: ["*"], allow: ["/"] }]
      : [{ userAgent: ["*"], disallow: ["/"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  },

  sitemap: {
    cacheMaxAgeSeconds: PRODUCTION ? 60 * 60 : 60 * 10,
    autoLastmod: true,
    exclude: ["/api/**", "/_nuxt/**"],
    defaults: { changefreq: "weekly", priority: 0.7 },
  },

  schemaOrg: {
    identity: {
      type: "Organization",
      name: siteName,
      url: siteUrl,
      // logo: "/logo.png",
    },
  },

  ogImage: {
    enabled: PRODUCTION,
    // defaults: {
    //   component: "NuxtSeo",
    // },
  },

  linkChecker: {
    enabled: true,
    // runOnBuild: true,
    // failOnError: false,
  },

  // ---------------------------------------------------------------------------
  // 08) Server runtime (Nitro) + caching + storage
  // ---------------------------------------------------------------------------
  nitro: {
    preset: "node-server",
    compressPublicAssets: true,

    // Pre-render only what you truly want baked at build-time
    prerender: PRODUCTION
      ? {
          // crawlLinks: true,
          // failOnError: true,
          routes: ["/"],
        }
      : { routes: [] },

    // Extra server-side route rules (mostly caching headers)
    routeRules: {
      "/_nuxt/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },
    },

    // Optional Nitro storage adapter (Redis)
    storage: {
      ...(redisEnabled
        ? {
            redis: {
              driver: "redis",
              url: process.env.NUXT_REDIS_URL,
            },
          }
        : {}),
    },
  },

  // ---------------------------------------------------------------------------
  // 09) Experiments / flags (Nuxt internal experimental switches)
  // ---------------------------------------------------------------------------
  experimental: {
    payloadExtraction: true,

    // # enable typed routes (⚠ disables custom route names for locales)
    // typedPages: true,

    // keep generated route values / metadata
    scanPageMeta: true,
  },

  // ---------------------------------------------------------------------------
  // 10) Hooks (build/runtime lifecycle taps)
  // ---------------------------------------------------------------------------
  hooks: {
    "prerender:routes": async ({ routes }) => {
      // Example:
      // const res = await fetch(API_URL);
      // const d = await res.json();
      // for (const pid of d.prerender.pids) routes.add(`/products/${pid}`);

      routes.add("/");
    },

    // Other useful hooks:
    // "pages:extend": () => {},
    // "render:html": () => {},
    // "components:dirs": (dirs) => { dirs.push({ path: "/path", prefix: "App" }) },
  },

  // ---------------------------------------------------------------------------
  // 11) Build tooling (Vite, sourcemaps, builder/alias)
  // ---------------------------------------------------------------------------
  // Choose bundler: 'vite' (default), 'webpack', or 'rspack'
  // builder: {},

  // Create custom path shortcuts (e.g., '@components': '/components')
  // alias: {},

  vite: {
    esbuild: {
      // Production log stripping
      drop: PRODUCTION ? ["console", "debugger"] : [],
    },
    clearScreen: false,
  },

  // Source maps strategy (server always useful; client hidden for prod)
  sourcemap: { server: true, client: "hidden" },

  // ---------------------------------------------------------------------------
  // 12) Module configuration blocks
  // ---------------------------------------------------------------------------

  // @nuxt/image
  image: {
    quality: 81,
    domains: [],
    screens: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    },
    providers: {},
    presets: {},
  },

  // @nuxtjs/tailwindcss
  tailwindcss: {
    cssPath: "~/assets/styles/tailwind.scss",
    viewer: false,
  },

  // Auto-imports config
  imports: {
    presets: FROM_PACKAGES_IMPORT,
    scan: false,
  },

  // Router config (Vue Router options)
  router: {
    options: { scrollBehaviorType: "smooth" },
  },

  // nuxt-security (headers + security policies)
  security: {
    headers: {
      xContentTypeOptions: "nosniff",
      xFrameOptions: "SAMEORIGIN",
      referrerPolicy: "strict-origin-when-cross-origin",
      xDNSPrefetchControl: "off",
      xPermittedCrossDomainPolicies: "none",

      // Stop COOP warning on HTTP (only enable when HTTPS)
      crossOriginOpenerPolicy: isHttps ? "same-origin" : false,
      crossOriginEmbedderPolicy: isHttps ? "require-corp" : false,
      crossOriginResourcePolicy: isHttps ? "same-origin" : false,

      // HSTS only when actually on HTTPS
      strictTransportSecurity:
        PRODUCTION && isHttps
          ? { maxAge: 15552000, includeSubdomains: true, preload: false }
          : false,

      // Disabled unless explicitly configured (set CSP later when ready)
      contentSecurityPolicy: false,
    },
  },

  // @nuxt/icon
  icon: {
    provider: "none",
    componentName: "NuxtIcon",
    size: "1em",
    class: "inline-block align-middle",

    customCollections: [
      {
        prefix: "local",
        dir: "./app/assets/icons-local",
        normalizeIconName: false,
      },
    ],

    clientBundle: {
      scan: true,
      includeCustomCollections: true,
      sizeLimitKb: 256,
      icons: ["local:logo-nikolav"],
    },
  },

  // @nuxtjs/i18n
  // https://i18n.nuxtjs.org/docs/api/options
  i18n: {
    strategy: "prefix",
    baseUrl: siteUrl,
    customRoutes: "meta",

    detectBrowserLanguage: {
      redirectOn: "root",
      cookieCrossOrigin: true,
      fallbackLocale: "sr",
    },

    // https://i18n.nuxtjs.org/docs/api/options#skipsettinglocaleonnavigate
    skipSettingLocaleOnNavigate: true,

    // langDir: "locales",
    // vueI18n: "i18n.config.ts",
    defaultLocale,

    locales: [
      // example RTL:
      // { code: 'ar', language: 'ar-EG', file: 'ar.json', dir: 'rtl', name: 'العربية' },
      {
        code: "sr",
        iso: "sr-RS",
        name: "Srpski",
        language: "sr-RS",
        file: "sr.json",
      },
      {
        isCatchallLocale: true,
        code: "en",
        iso: "en-US",
        name: "English",
        language: "en-US",
        file: "en.json",
      },
    ],
  },
});
