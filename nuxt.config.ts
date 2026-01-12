import trimEnd from "lodash/trimEnd";
import parseBoolean from "@eturino/ts-parse-boolean";
import { FROM_PACKAGES_IMPORT } from "./app/config/from-packages-import";

// type TMeta = Record<string, string>[];

const PRODUCTION = "production" === process.env.NODE_ENV;
const SSR = parseBoolean(process.env.NUXT_PUBLIC_SSR);

const siteUrl = trimEnd(
  PRODUCTION ? process.env.NUXT_SITE_URL : process.env.NUXT_SITE_URL_DEV,
  "/"
);

export default defineNuxtConfig({
  // ---------------------------------------------------------------------------
  // Core
  // ---------------------------------------------------------------------------
  compatibilityDate: "2025-07-15",
  ssr: SSR,
  devtools: { enabled: !PRODUCTION },

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
    "nuxt-security",
    "@nuxtjs/fontaine",
    "nuxt-gtag",
  ],

  // ---------------------------------------------------------------------------
  // Runtime config
  // ---------------------------------------------------------------------------
  runtimeConfig: {
    databaseInit: parseBoolean(process.env.NUXT_DATABASE_INIT),
    databaseUrl: process.env.NUXT_DATABASE_URL,
    databaseCa: process.env.NUXT_DATABASE_CA,
    public: {
      siteUrl,
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      gtagId: process.env.NUXT_PUBLIC_GTAG_ID,
      ssr: SSR,
    },
  },

  // ---------------------------------------------------------------------------
  // App / head
  // ---------------------------------------------------------------------------
  app: {
    head: {
      htmlAttrs: { lang: "en" },
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
  // Styling
  // ---------------------------------------------------------------------------
  css: ["~/assets/styles/styles.scss", "animate.css"],

  // ---------------------------------------------------------------------------
  // SEO Kit (single source of truth)
  // ---------------------------------------------------------------------------
  site: {
    url: siteUrl,
    name: process.env.NUXT_SITE_NAME,
    description: process.env.NUXT_SITE_DESCRIPTION,
    defaultLocale: process.env.NUXT_DEFAULT_LOCALE ?? "en",
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
    groups: PRODUCTION
      ? [{ userAgent: ["*"], allow: ["/"] }]
      : [{ userAgent: ["*"], disallow: ["/"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  },

  sitemap: {
    autoLastmod: true,
    exclude: ["/api/**", "/_nuxt/**"],
    defaults: { changefreq: "weekly", priority: 0.7 },
  },

  schemaOrg: {
    identity: {
      url: siteUrl,
      type: "Organization",
      name: process.env.NUXT_SITE_NAME ?? "",
    },
  },

  ogImage: { enabled: PRODUCTION },

  linkChecker: {
    enabled: true,
    runOnBuild: true,
    failOnError: false,
  },

  // ---------------------------------------------------------------------------
  // Nitro (SSR server) + caching + storage
  // ---------------------------------------------------------------------------
  nitro: {
    preset: "node-server",
    compressPublicAssets: true,

    prerender: {
      routes: ["/"],
      failOnError: true,
    },

    routeRules: {
      "/_nuxt/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },
    },

    storage: {
      redis: {
        driver: "redis",
        url: parseBoolean(process.env.NUXT_REDIS_INIT)
          ? process.env.NUXT_REDIS_URL
          : undefined,
      },
    },
  },

  experimental: {
    payloadExtraction: true,
  },

  // ---------------------------------------------------------------------------
  // Tooling
  // ---------------------------------------------------------------------------
  vite: {
    esbuild: {
      drop: PRODUCTION ? ["console", "debugger"] : [],
    },
  },

  sourcemap: { client: "hidden" },

  // ---------------------------------------------------------------------------
  // Modules config
  // ---------------------------------------------------------------------------
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

  tailwindcss: {
    cssPath: "~/assets/styles/tailwind.scss",
    viewer: false,
  },

  imports: {
    presets: FROM_PACKAGES_IMPORT,
    scan: false,
  },

  router: {
    options: { scrollBehaviorType: "smooth" },
  },

  security: {
    headers: {
      xContentTypeOptions: "nosniff",
      xFrameOptions: "SAMEORIGIN",
      referrerPolicy: "strict-origin-when-cross-origin",
      xDNSPrefetchControl: "off",
      xPermittedCrossDomainPolicies: "none",
      strictTransportSecurity: PRODUCTION
        ? { maxAge: 15552000, includeSubdomains: true, preload: false }
        : false,
      contentSecurityPolicy: PRODUCTION ? {} : false,
    },
  },

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

  gtag: {
    enabled: false,
  },
});
