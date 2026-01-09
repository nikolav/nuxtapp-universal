import trimEnd from "lodash/trimEnd";
import { FROM_PACKAGES_IMPORT } from "./app/config/from-packages-import";

type TMeta = Record<string, string>[];

// -----------------------------------------------------------------------------
// Env + derived constants
// -----------------------------------------------------------------------------
const isProd = process.env.NODE_ENV === "production";

/**
 * Canonical base URL (SEO: sitemap, canonical tags, schema, etc.)
 * - Prod: NUXT_SITE_URL (fallback: https://demo.nikolav.rs)
 * - Dev:  NUXT_SITE_URL_DEV (fallback: http://localhost:3000)
 *
 * Note: trimmed to avoid double slashes in generated URLs.
 */
const siteUrl = trimEnd(
  (isProd ? process.env.NUXT_SITE_URL : process.env.NUXT_SITE_URL_DEV) ||
    (isProd ? "https://demo.nikolav.rs" : "http://localhost:3000"),
  "/"
);

/**
 * Default meta tags applied globally (app.head.meta).
 * Page-level useHead() can override/extend these.
 */
const meta: TMeta = [
  { name: "description", content: "NuxtApp --starter" },
  { name: "theme-color", content: "#fafafa" },
  { name: "format-detection", content: "telephone=no" },
  { name: "robots", content: "index, follow" },
];

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ---------------------------------------------------------------------------
  // 1) Core Nuxt / project defaults
  // ---------------------------------------------------------------------------
  compatibilityDate: "2025-07-15", // Pin Nitro/compat behavior for reproducible builds
  devtools: { enabled: true }, // Nuxt DevTools (dev-only UI)
  ssr: true, // Keep SSR on for best SEO; still fine for SSG build-time rendering

  // Example env-specific config blocks (Nuxt CLI envName support)
  // $ nuxt build --envName staging
  // $production: {
  //   routeRules: { "/**": { isr: true } },
  // },
  // $development: {},
  // $env: { staging: {} },

  // ---------------------------------------------------------------------------
  // 2) Modules (feature plugins)
  // ---------------------------------------------------------------------------
  modules: [
    "@nuxtjs/seo", // SEO Kit: meta defaults, robots, sitemap, schema, ogImage, linkChecker
    "@vueuse/nuxt", // VueUse composables auto-imports
    "@pinia/nuxt", // Pinia store
    "@nuxt/icon", // <Icon> component + icon sets
    "@nuxt/image", // Image optimization
    "@nuxtjs/tailwindcss", // Tailwind CSS integration
    "nuxt-security", // Security headers, CSP, etc.
    "@nuxtjs/fontaine", // Font fallback / layout-shift reduction
  ],

  // ---------------------------------------------------------------------------
  // 3) Runtime config
  // - runtimeConfig.*          => server-only
  // - runtimeConfig.public.*   => exposed to the browser
  // ---------------------------------------------------------------------------
  runtimeConfig: {
    // 🔒 server-only secrets (never exposed to client)
    apiSecret: process.env.API_SECRET,
    dbPassword: process.env.DB_PASSWORD,
    webhookToken: process.env.WEBHOOK_TOKEN,

    // 🌍 client-safe values
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },

  // ---------------------------------------------------------------------------
  // 4) App HTML defaults (global <head>, transitions)
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
        // Preconnect is a small perf win if you actually load Google Fonts
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
      ],

      htmlAttrs: { lang: "en" },
      bodyAttrs: {
        // class: "dark:selection:bg-white/20 scrollbar-thin-light",
      },
    },

    // Global transitions (optional, but centralized here)
    pageTransition: { name: "ROUTE_TRANSITION_BLUR", mode: "in-out" },
    layoutTransition: { name: "ROUTE_TRANSITION_BLUR" },
  },

  // ---------------------------------------------------------------------------
  // 5) Styles
  // ---------------------------------------------------------------------------
  css: [
    "~/assets/styles/styles.scss", // main global styles
    "animate.css", // vendor
    // "@mdi/font/css/materialdesignicons.css",
    // "vuetify/lib/styles/main.sass",
    // "quill/dist/quill.core.css",
    // "quill/dist/quill.snow.css",
  ],

  // ---------------------------------------------------------------------------
  // 6) SEO single-source-of-truth (Nuxt SEO Kit)
  // ----------------------------------------------------------------------------
  // site: used by sitemap/schema/robots and other SEO-kit submodules
  // seo:  canonical + defaults + social tags behavior
  // ----------------------------------------------------------------------------
  site: {
    url: siteUrl,
    name: process.env.NUXT_SITE_NAME || "nikolav.rs",
    description: process.env.NUXT_SITE_DESCRIPTION || "DESCRIPTION HERE",
    defaultLocale: "sr",
  },

  seo: {
    automaticDefaults: true,
    // Allow only these query params to appear in canonicals (avoid duplicate URLs)
    canonicalQueryWhitelist: ["page", "sort", "filter", "search", "q", "query"],
    meta: {
      robots:
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    redirectToCanonicalSiteUrl: true, // enforce canonical host
    automaticOgAndTwitterTags: true,
  },

  // robots.txt (block indexing in dev, allow in prod)
  robots: {
    groups: isProd
      ? [{ userAgent: ["*"], allow: ["/"] }]
      : [{ userAgent: ["*"], disallow: ["/"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  },

  sitemap: {
    autoLastmod: true,
    exclude: ["/api/**", "/_nuxt/**"],
    defaults: {
      changefreq: "weekly",
      priority: 0.8,
    },
  },

  // Schema.org identity (used by @nuxtjs/seo schemaOrg integration)
  schemaOrg: {
    identity: {
      type: "Organization",
      name: process.env.NUXT_SITE_NAME || "nikolav.rs",
      url: process.env.NUXT_SITE_URL || "https://demo.nikolav.rs",
    },
  },

  // OG image generation (if you use it)
  ogImage: {
    enabled: true,
    // defaults: { component: "OgImage" }, // components/OgImage.vue
  },

  // Link checker (useful during build/prerender; don’t fail prod builds on flaky externals)
  linkChecker: {
    enabled: true,
    runOnBuild: true,
    failOnError: false,
    // runOnDev: false,
    // checkExternalLinks: true,
    // checkInternalLinks: true,
    // exclude: ["/admin/**", "/account/**", "/login", "/api/**"],
  },

  // ---------------------------------------------------------------------------
  // 7) Nitro / SSG output (static preset + prerender)
  // ---------------------------------------------------------------------------
  nitro: {
    preset: "static", // fully static output (marketing sites, docs, etc.)
    prerender: {
      routes: ["/", "/about"], // explicit pre-render list
      failOnError: true, // fail build on prerender errors (SEO safety)
    },
    routeRules: {
      // Cache built assets aggressively (CDN-friendly)
      "/_nuxt/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },
    },

    storage: {
      redis: {
        driver: "redis",
        url: process.env.NUXT_DATABASE_INIT
          ? process.env.NUXT_REDIS_URL
          : undefined,
        //
        // port: 6379,
        // host: "",
        // username: "", // Redis >= 6
        // password: "",
        // db: 0,
        // tls: {},
        //
        // lazyConnect: true,
        // connectTimeout: 5000,
        // maxRetriesPerRequest: 2,
        // enableOfflineQueue: true,
      },
    },
  },

  // Helps static sites by extracting payloads (smaller HTML, safer hydration)
  experimental: {
    payloadExtraction: true,
  },

  // ---------------------------------------------------------------------------
  // 8) Build tooling (Vite)
  // ---------------------------------------------------------------------------
  vite: {
    build: {
      sourcemap: !isProd, // sourcemaps in dev, smaller output in prod
    },
  },

  // Nuxt core sourcemap option (separate from Vite)
  // "hidden" = upload to Sentry, but don't expose in devtools by default
  sourcemap: { client: "hidden" },

  // ---------------------------------------------------------------------------
  // 9) Nuxt Image
  // ---------------------------------------------------------------------------
  image: {
    quality: 81,
    domains: [
      // "domain.nikolav.rs",
    ],
    screens: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    },
    providers: {
      // custom providers here
    },
    presets: {
      // avatar: { modifiers: { format: "jpg", width: 50, height: 50 } },
      // cover:  { modifiers: { fit: "cover", format: "jpg", width: 300, height: 300 } },
    },
  },

  // ---------------------------------------------------------------------------
  // 10) Tailwind module
  // ---------------------------------------------------------------------------
  tailwindcss: {
    cssPath: "~/assets/styles/tailwind.scss",
    viewer: false,
  },

  // ---------------------------------------------------------------------------
  // 11) Auto-imports
  // ---------------------------------------------------------------------------
  imports: {
    presets: FROM_PACKAGES_IMPORT, // your external preset list
    scan: false, // do not scan the filesystem for auto-imports (explicit-by-default)
    // autoImport: false,
    // dirs: ["./keys", "./config"],
  },

  // Components auto-import (left default; customize only if you want to restrict it)
  // components: [],

  // ---------------------------------------------------------------------------
  // 12) Router defaults
  // ---------------------------------------------------------------------------
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },

  // ---------------------------------------------------------------------------
  // 13) Security headers (nuxt-security)
  // ---------------------------------------------------------------------------
  security: {
    headers: {
      // Safe baseline headers (SEO-friendly)
      xContentTypeOptions: "nosniff",
      xFrameOptions: "SAMEORIGIN",
      referrerPolicy: "strict-origin-when-cross-origin",
      xDNSPrefetchControl: "off",
      xPermittedCrossDomainPolicies: "none",

      // HSTS only in production (never on localhost)
      strictTransportSecurity: isProd
        ? {
            maxAge: 15552000, // ~180 days
            includeSubdomains: true,
            preload: false, // enable only if you're sure
          }
        : false,

      /**
       * CSP:
       * - Nuxt Security provides a strong default baseline.
       * - Extend only when you add 3rd-party scripts (GA, Stripe, embeds, etc.)
       */
      contentSecurityPolicy: {
        // Example additions:
        // "connect-src": ["'self'", "https://www.google-analytics.com"],
        // "img-src": ["'self'", "data:", "https:"],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // 14) Optional: hooks examples (kept at bottom to reduce noise)
  // ---------------------------------------------------------------------------
  // hooks: {
  //   async "prerender:routes"(ctx) {
  //     const { pages } = await fetch("https://api.some-cms.com/pages").then((res) =>
  //       res.json()
  //     );
  //     for (const page of pages) ctx.routes.add(`/${page.name}`);
  //   },
  // },
  icon: {
    provider: "none",
    size: "1em",
    class: "inline-block align-middle",
    // mode: "svg",
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
    // scan all components in the project and include icons

    // include all custom collections in the client bundle

    // guard for uncompressed bundle size, will fail the build if exceeds
  },
});
