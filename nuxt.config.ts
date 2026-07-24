import vitePluginVuetify from "vite-plugin-vuetify";
import { transformAssetUrls } from "vite-plugin-vuetify";

import trimEnd from "lodash/trimEnd";

import parseBoolean from "@eturino/ts-parse-boolean";

import {
  schemaCacheKeyDriver,
  schemaCollectionsKeyDriver,
  schemaFileStorageDriver,
} from "./app/schemas";

// schemas:config
// const schemaCacheConnection = z.enum(["memory", "redis"] as const);
import ROUTES from "./app/assets/routes.json";
import ICONS from "./app/assets/icons-client.json";

const { prerender: prerenderRoutes, ignore: ignoreRoutes } = ROUTES;
const { clientBundle: iconsClientBundle } = ICONS;

/**
 * ============================================================================
 * ENV / FLAGS (derived once, reused everywhere)
 * ============================================================================
 */
const PRODUCTION = [
  process.env.ENV,
  process.env.NODE_ENV,
  process.env.NUXT_SITE_ENV,
].some((e) => "production" === e);

const ENV = [
  process.env.ENV,
  process.env.NODE_ENV,
  process.env.NUXT_SITE_ENV,
].every((e) => "development" === e)
  ? "development"
  : "production";

const SSR = true;

export const defaultLocale = process.env.NUXT_DEFAULT_LOCALE ?? "sr";

/** Site + API origins (normalized) */
const siteUrl = trimEnd(
  PRODUCTION ? process.env.NUXT_SITE_URL : process.env.NUXT_SITE_URL_DEV,
  "/",
);
const siteName = process.env.NUXT_SITE_NAME ?? "";
const appId = process.env.NUXT_PUBLIC_APP_ID;

const apiBase = trimEnd(
  PRODUCTION ? process.env.NUXT_API_BASE : process.env.NUXT_API_BASE_DEV,
  "/",
);

/** Feature flags / infra toggles */
const isHttps = siteUrl.startsWith("https://");
const broadcastingEnabled = parseBoolean(
  process.env.NUXT_PUBLIC_BROADCASTING_ENABLED,
);

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

  // --------------------
  // Route rules: for SSG
  // --------------------
  // routeRules: {
  //   // Generated at build time for SEO purpose
  //   "/": { prerender: true },
  //   // Cached for 1 hour
  //   "/api/*": { cache: { maxAge: 60 * 60 } },
  //   // Redirection to avoid 404
  //   "/old-page": {
  //     redirect: { to: "/new-page", statusCode: 302 },
  //   },
  //   // ...
  // },
  routeRules: {
    "/": { redirect: `/${defaultLocale}` },

    "/sr": { redirect: "/sr/dobrodosli" },
    "/sr-cyrl": { redirect: "/sr-cyrl/dobrodosli" },
    "/en": { redirect: "/en/welcome" },

    // // If you have a blog that should be exported as HTML too:
    // "/blog/**": { prerender: true },

    // // spa:auth
    // "/sr/prijava": { ssr: false },
    // "/sr-cyrl/prijava": { ssr: false },
    // "/en/login": { ssr: false },

    // // Never prerender API paths (and they shouldn't exist in a static build anyway)
    // "/api/**": { ssr: false },
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
    "@nuxt/fonts",

    //testing
    "@nuxt/test-utils/module",
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
      title: "nuxtapp | petrol.nikolav.rs",
      titleTemplate: "%s | petrol.nikolav.rs",
      meta: [
        { name: "description", content: "NuxtApp --starter" },
        { name: "theme-color", content: "#fafafa" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      bodyAttrs: {},
      script: [],
    },
    pageTransition: { name: "ROUTE_TRANSITION_BLUR", mode: "in-out" },
    layoutTransition: { name: "ROUTE_TRANSITION_BLUR" },
  },

  // ---------------------------------------------------------------------------
  // 05) Styling (global CSS entrypoints)
  // ---------------------------------------------------------------------------
  css: ["~/assets/styles/styles.scss"],

  // ---------------------------------------------------------------------------
  // 06) Runtime config (server secrets + public client config)
  // - Everything here can be overridden by env at runtime.
  // - Only `public` is exposed to the browser.
  // ---------------------------------------------------------------------------
  runtimeConfig: {
    // Server-only secrets
    apiSecret: process.env.NUXT_API_SECRET ?? "",
    apiKeys: {
      gooogleTranslateAPI: process.env.NUXT_KEY_GOOGLE_TRANSPATE_API,
    },

    // Client-exposed settings
    public: {
      PRODUCTION,
      appEnv: ENV,
      ssr: SSR,
      appId,

      // Site / API
      siteUrl,
      siteName,
      baseUrl: siteUrl,
      apiBase,
      siteSeoImage: process.env.NUXT_SITE_SEO_IMAGE,

      // Locale
      defaultLocale,

      // Analytics
      gtmId: process.env.NUXT_PUBLIC_GTM_ID,
      analyticsEnabled: parseBoolean(process.env.NUXT_PUBLIC_ANALYTICS_ENABLED),

      // Reserved for env-driven i18n extensions
      i18n: {
        // .env extend i18n
      },

      broadcasting: {
        reverb: {
          enabled:
            broadcastingEnabled &&
            parseBoolean(process.env.NUXT_PUBLIC_REVERB_ENABLED),
          key: process.env.NUXT_PUBLIC_REVERB_KEY,
          scheme: process.env.NUXT_PUBLIC_REVERB_SCHEME ?? "https",
          host: process.env.NUXT_PUBLIC_REVERB_HOST,
          port: Number(process.env.NUXT_PUBLIC_REVERB_PORT ?? 443),
          authEndpoint: process.env.NUXT_PUBLIC_REVERB_AUTH_ENDPOINT,
        },
      },

      graphqlEndpoint: process.env.NUXT_GRAPHQL_ENDPOINT ?? "",

      auth: {
        driver: process.env.NUXT_PUBLIC_AUTH_DRIVER ?? "memory",
        endpoint: process.env.NUXT_PUBLIC_AUTH_ENDPOINT,
      },

      cacheKeyDriver: schemaCacheKeyDriver.parse(
        process.env.NUXT_PUBLIC_CACHE_KEY_DRIVER ?? "local",
      ),

      collectionsKeyDriver: schemaCollectionsKeyDriver.parse(
        process.env.NUXT_PUBLIC_COLLECTIONS_KEY_DRIVER ?? "local",
      ),

      fileStorageDriver: schemaFileStorageDriver.parse(
        process.env.NUXT_PUBLIC_FILE_STORAGE_DRIVER ?? "local",
      ),
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
    zeroRuntime: true,
    cacheMaxAgeSeconds: PRODUCTION ? 60 * 60 : 60 * 10,
    autoLastmod: true,
    exclude: ["/api/**", "/_nuxt/**"],
    defaults: { changefreq: "weekly", priority: 0.7 },
  },

  schemaOrg: false,
  // schemaOrg: {
  //   enabled: PRODUCTION,
  //   identity: {
  //     type: "Organization",
  //     name: siteName,
  //     url: siteUrl,
  //     // logo: "/logo.png",
  //   },
  //   // node: {
  //   //   "@id": siteUrl,
  //   // },
  // },

  ogImage: {
    enabled: false,
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
    preset: "static",
    compressPublicAssets: true,
    minify: true,

    // Pre-render only what you truly want baked at build-time
    prerender: PRODUCTION
      ? {
          routes: [...prerenderRoutes],

          // skip dynamic api endpoints or irrelevant pages
          ignore: ignoreRoutes,

          // prevents crawling /en, /about, etc.
          crawlLinks: true,

          // false : don't fail build if something 404s
          // true  : fail if any of '.routes' routes break
          // during CI; set false if for 'best effort'
          failOnError: true,
        }
      : { routes: [] },

    // Extra server-side route rules (mostly caching headers)
    routeRules: {
      "/_nuxt/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },
    },

    // Optional Nitro storage adapter (Redis)
    storage: {},
    devStorage: {},

    logLevel: PRODUCTION ? "warn" : "info",
  },

  // ---------------------------------------------------------------------------
  // 09) Experiments / flags (Nuxt internal experimental switches)
  // ---------------------------------------------------------------------------
  experimental: {
    // 'client' - Payload inlined in HTML (default v4)
    // true     - Extracted to _payload.json (CDN-cacheable)
    // false    - Always inlined (no external payload)
    payloadExtraction: "client",

    // # enable typed routes (⚠ disables custom route names for locales)
    // typedPages: true,

    // keep generated route values / metadata
    scanPageMeta: true,

    // // Define route rules for hybrid rendering at the page level.
    // inlineRouteRules: true,

    // // save the current app state on reload
    // restoreState: false,
  },

  // ---------------------------------------------------------------------------
  // Hooks: add more prerender routes (dynamic pages)
  // ---------------------------------------------------------------------------
  hooks: {
    // include dynamic routes
    "prerender:routes": async ({ routes }) => {
      // // Fetch all blog post slugs from CMS
      // const posts = await $fetch("https://cms.com/api/posts");
      // posts.forEach((post) => routes.add(`/blog/${post.slug}`));
    },

    // override vuetify globals
    "vite:extendConfig"(config: any) {
      config.plugins ||= [];
      config.plugins.push(
        ...vitePluginVuetify({
          autoImport: true,
          styles: {
            configFile: "assets/styles/vuetify/settings.scss",
          },
        }),
      );
    },
  },

  // ---------------------------------------------------------------------------
  // 11) Build tooling (Vite, sourcemaps, builder/alias)
  // ---------------------------------------------------------------------------
  // Choose bundler: 'vite' (default), 'webpack', or 'rspack'
  // builder: {},

  // Create custom path shortcuts (e.g., '@components': '/components')
  // alias: {},

  vite: {
    server: {
      watch: {
        ignored: [
          "**/.git/**",
          "**/node_modules/**",
          "**/.nuxt/**",
          "**/.output/**",
          "**/dist/**",
        ],
        usePolling: true,
        interval: 100,
      },
      ws: {
        // helps when localhost/ipv6 gets weird
        protocol: "ws",
        host: "localhost",
      },
    },

    build: {
      chunkSizeWarningLimit: 1024,
      cssMinify: false,
      rollupOptions: {
        output: {
          manualChunks: (id: any) => {
            if (!id.includes("node_modules")) return;

            // big deps standalone
            if (id.includes("/firebase/")) return "firebase";
            if (id.includes("/vuetify/") || id.includes("/@mdi/")) return "ui";

            return;
          },
        },
      },
    },

    vue: {
      template: {
        transformAssetUrls,
      },
    },

    plugins: [],

    // global scss injection for all preprocessed .scss files
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "~/assets/styles/preprocessor-defaults-overrides.scss" as *;',
        },
      },
    },

    ssr: { noExternal: ["vuetify"] },

    clearScreen: false,
  },

  // Source maps strategy (server always useful; client hidden for prod)
  sourcemap: { server: true, client: "hidden" },

  build: {
    transpile: ["vuetify"],
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ["suspense"].includes(tag),
    },
  },

  // ---------------------------------------------------------------------------
  // 12) Module configuration blocks
  // ---------------------------------------------------------------------------

  // @nuxt/image
  image: {
    quality: 85,
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
    scan: false,
  },

  // Router config (Vue Router options)
  router: {
    options: { scrollBehaviorType: "smooth" },
  },

  // nuxt-security (headers + security policies)
  security: {
    sri: false,
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
    // # 'auto':default | 'local' | 'remote'
    // serverBundle: 'auto',
    // provider: "none",
    componentName: "NuxtIcon",
    size: "1.22rem",
    class: "icon inline-block align-middle",
    cssLayer: "base",

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
      icons: iconsClientBundle,
    },
  },

  // @nuxtjs/i18n
  // https://i18n.nuxtjs.org/docs/api/options
  i18n: {
    defaultLocale,
    strategy: "prefix",
    baseUrl: siteUrl,

    customRoutes: "meta",
    // pages: {
    //   about: {
    //     en: "/about-us",
    //     fr: "/a-propos",
    //     es: "/sobre",
    //   },
    // },

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      // cookieCrossOrigin: true,
      // fallbackLocale: defaultLocale,
    },

    // https://i18n.nuxtjs.org/docs/api/options#skipsettinglocaleonnavigate
    skipSettingLocaleOnNavigate: true,

    // langDir: "locales",
    // vueI18n: "i18n.config.ts",

    locales: [
      // example RTL:
      // { code: 'ar', language: 'ar-EG', file: 'ar.json', dir: 'rtl', name: 'العربية' },
      {
        code: "sr",
        iso: "sr-RS",
        name: "Srpski",
        language: "sr-Latn-RS",
        file: "sr.json",
      },
      {
        code: "sr-cyrl",
        iso: "sr-Cyrl-RS",
        name: "Српски",
        language: "sr-Cyrl-RS",
        file: "sr-cyrl.json",
      },
      {
        code: "en",
        iso: "en-US",
        name: "English",
        language: "en-US",
        file: "en.json",
      },
    ],
  },

  // #https://fonts.nuxt.com/get-started/configuration
  fonts: {
    provider: "google",
    // .name
    // .global   # inject @font-face regardless of usage
    // .provider # none, google, bunny, fontshare, fontsource, adobe, local
    // .src      # if defined, no other providers will be used given family
    families: [
      // { name: "Inter" },
      { name: "Open Sans" },
      // { name: "Roboto" },
      // # do not resolve this font with any provider from `@nuxt/fonts`
      // { name: 'Custom Font', provider: 'none' },
      // # only resolve this font with the `google` provider
      // { name: 'My Font Family', provider: 'google' },
      // # specify specific font data - this will bypass any providers
      // { name: 'Other Font', src: 'https://example.com/font.woff2', weight: 'bold' },
    ],
    defaults: {
      weights: [400, 500, 600, 700],
      subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
      styles: ["normal", "italic"],
      preload: true,
    },
    processCSSVariables: "font-prefixed-only",
    priority: ["local", "google"],
    assets: { prefix: "/_fonts/" },
    // google provider settings
    google: {},
  },
});
