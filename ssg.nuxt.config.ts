import trimEnd from "lodash/trimEnd";
import parseBoolean from "@eturino/ts-parse-boolean";
import { FROM_PACKAGES_IMPORT } from "./app/config/from-packages-import";

type TMeta = Record<string, string>[];

const PRODUCTION = process.env.NODE_ENV === "production";

const siteUrl = trimEnd(
  (PRODUCTION ? process.env.NUXT_SITE_URL : process.env.NUXT_SITE_URL_DEV) ||
    (PRODUCTION ? "https://demo.nikolav.rs" : "http://localhost:3000"),
  "/"
);

const meta: TMeta = [
  { name: "description", content: "NuxtApp --starter" },
  { name: "theme-color", content: "#fafafa" },
  { name: "format-detection", content: "telephone=no" },
];

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  // SSR ostaje true, ali se output prerenderuje u statiku
  ssr: true,
  devtools: { enabled: !PRODUCTION },

  modules: [
    "@nuxtjs/seo",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "nuxt-security",
    "@nuxtjs/fontaine",
  ],

  runtimeConfig: {
    // ⚠️ Za full static: server runtimeConfig se NE koristi u runtime-u.
    // Ostavi samo ako ti treba tokom build/prerender-a (npr. da povučeš rute).
    databaseInit: parseBoolean(process.env.NUXT_DATABASE_INIT),
    databaseUrl: process.env.NUXT_DATABASE_URL,
    databaseCa: process.env.NUXT_DATABASE_CA,
    public: {
      siteUrl,
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      charset: "utf-8",
      viewport:
        "width=device-width, initial-scale=1.0, shrink-to-fit=no, minimum-scale=1",
      title: "nikolav.rs",
      titleTemplate: "%s | nikolav.rs",
      meta,
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
    pageTransition: { name: "ROUTE_TRANSITION_BLUR", mode: "in-out" },
    layoutTransition: { name: "ROUTE_TRANSITION_BLUR" },
  },

  css: ["~/assets/styles/styles.scss", "animate.css"],

  site: {
    url: siteUrl,
    name: process.env.NUXT_SITE_NAME || "nikolav.rs",
    description: process.env.NUXT_SITE_DESCRIPTION || "DESCRIPTION HERE",
    defaultLocale: "sr",
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
    defaults: { changefreq: "weekly", priority: 0.8 },
  },

  schemaOrg: {
    identity: {
      url: siteUrl,
      type: "Organization",
      name: process.env.NUXT_SITE_NAME || "nikolav.rs",
    },
  },

  ogImage: { enabled: PRODUCTION },

  linkChecker: {
    enabled: true,
    runOnBuild: true,
    failOnError: false,
  },

  // ✅ STATIC PRERENDER (SSR -> HTML fajlovi)
  nitro: {
    preset: "static",
    compressPublicAssets: true,

    prerender: {
      // 1) Start rute (seed). Odavde kreće crawl.
      routes: ["/"],

      // 2) Crawluje <a href> linkove i generiše sve dostupne strane
      crawlLinks: true,

      // Ako imaš neku rutu koju NE želiš da prerenderuješ:
      // ignore: ["/admin", "/login"],

      // Preporuka: dok ne “ispeglaš” sve, drži true; kasnije može false.
      failOnError: true,
    },

    routeRules: {
      // Static asset caching
      "/_nuxt/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },

      // (opciono) eksplicitno označi sve strane kao prerender (uglavnom nije potrebno uz crawlLinks)
      // "/**": { prerender: true },
    },
  },

  experimental: {
    payloadExtraction: true,
  },

  vite: {
    esbuild: {
      drop: PRODUCTION ? ["console", "debugger"] : [],
    },
  },

  sourcemap: { client: "hidden" },

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
});
