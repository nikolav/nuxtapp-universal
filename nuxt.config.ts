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
  (isProd ? "https://demo.nikolav.rs" : "http://localhost:3000");

const meta: TMeta = [
  { name: "description", content: "NuxtApp --nuxt.config" },
  { name: "theme-color", content: "#fafafa" },
  { name: "format-detection", content: "telephone=no" },
];

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // $ nuxt build --envName staging
  // $production: {
  //   routeRules: {
  //     "/**": { isr: true },
  //   },
  // },
  // $development: {
  //   //
  // },
  // $env: {
  //   staging: {
  //     //
  //   },
  // },

  // ---------------------------------------------------------------------------
  // Core / project defaults
  // ---------------------------------------------------------------------------
  compatibilityDate: "2025-07-15", // Pin Nitro/compat behavior for reproducible builds
  devtools: { enabled: true }, // Nuxt DevTools UI in dev

  // ---------------------------------------------------------------------------
  // Rendering mode
  // ---------------------------------------------------------------------------

  // SSG still uses SSR at build-time; keep true for best SEO
  ssr: true,

  // routeRules: {},

  // ---------------------------------------------------------------------------
  // Modules (features)
  // ---------------------------------------------------------------------------
  modules: [
    // SEO Kit: meta defaults, robots, sitemap, schema, ogImage, linkChecker
    "@nuxtjs/seo", // VueUse auto-imports
    "@vueuse/nuxt", // Pinia store integration
    "@pinia/nuxt", // Icon component + icon sets
    "@nuxt/icon", // Image optimization
    "@nuxt/image", // Tailwind integration
    "@nuxtjs/tailwindcss",
    "nuxt-security",
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

    //
    // app: {},
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
    // transition pages
    pageTransition: { name: "ROUTE_TRANSITION_BLUR", mode: "in-out" },
    // transition layouts
    layoutTransition: { name: "ROUTE_TRANSITION_BLUR" },
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
    "animate.css",
    // "quill/dist/quill.core.css",
    // "quill/dist/quill.snow.css",
  ],

  // ---------------------------------------------------------------------------
  // SEO Kit: site identity (single source of truth)
  // ---------------------------------------------------------------------------
  site: {
    url: siteUrl,
    name: process.env.NUXT_SITE_NAME || "nikolav.rs",
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
      name: process.env.NUXT_SITE_NAME || "nikolav.rs",
      url: process.env.NUXT_SITE_URL || "https://demo.nikolav.rs",
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
      // @@
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
    quality: 81, // Default image quality (override per-component when needed)
    // # allow domain assets to optimize
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
      // random: {
      //   provider: "~/providers/random",
      //   options: {},
      // },
    },

    presets: {
      // avatar: {
      //   modifiers: {
      //     format: "jpg",
      //     width: 50,
      //     height: 50,
      //   },
      // },
      // cover: {
      //   modifiers: {
      //     fit: "cover",
      //     format: "jpg",
      //     width: 300,
      //     height: 300,
      //   },
      // },
    },
    // # default format
    // format: ['webp'],
    // # globally initialize $img helper
    // inject: true,
    // densities: [1, 2]
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
    // disable Nuxt auto-imports (force explicit imports)
    // autoImport: false,
    // dirs: ["./keys", "./config"], // custom auto-import directories
    presets: FROM_PACKAGES_IMPORT, // extra auto-import presets
    // allow imports for local code
    // import only defaults
    // components are handled in .components
    scan: false,
  },

  // allow imports of local components ~/components
  // still allows module components
  components: {
    dirs: [],
  },

  // ---------------------------------------------------------------------------
  // Router defaults
  // ---------------------------------------------------------------------------
  router: {
    options: {
      scrollBehaviorType: "smooth", // Smooth scroll on navigation
    },
  },

  // hooks: {
  //   async "prerender:routes"(ctx) {
  //     const { pages } = await fetch("https://api.some-cms.com/pages").then(
  //       (res) => res.json()
  //     );
  //     for (const page of pages) {
  //       ctx.routes.add(`/${page.name}`);
  //     }
  //   },
  // },
  // nitro: {
  //   hooks: {
  //     "prerender:generate"(route) {
  //       if (route.route?.includes("private")) {
  //         route.skip = true;
  //       }
  //     },
  //   },
  // },
  security: {
    // Keep it strict, but practical
    headers: {
      // ✅ Safe defaults (SEO-friendly)
      xContentTypeOptions: "nosniff",
      xFrameOptions: "SAMEORIGIN",
      referrerPolicy: "strict-origin-when-cross-origin",
      xDNSPrefetchControl: "off",
      xPermittedCrossDomainPolicies: "none",

      // ✅ HSTS only in production (don’t enable on localhost)
      strictTransportSecurity:
        process.env.NODE_ENV === "production"
          ? {
              maxAge: 15552000, // ~180 days
              includeSubdomains: true,
              preload: false, // enable only if you're sure
            }
          : false,

      /**
       * ✅ CSP: keep Nuxt Security defaults (good baseline)
       * - Uses nonces for scripts in SSR
       * - In SSG it can fall back to a <meta http-equiv> approach
       *
       * If you add 3rd-party scripts (GA, Stripe, etc.), you’ll need to extend
       * connect-src / script-src / frame-src accordingly.
       */
      contentSecurityPolicy: {
        // Start with a “safe + compatible” baseline:
        // (Nuxt Security already sets a strong default CSP by default.)
        // If you want to add domains, do it like this:
        // Example additions (uncomment + edit if needed):
        // "connect-src": ["'self'", "https://www.google-analytics.com"],
        // "script-src": ["'self'", "https:", "'unsafe-inline'", "'strict-dynamic'", "'nonce-{{nonce}}'"],
        // "img-src": ["'self'", "data:", "https:"],
      },
    },
  },
  sourcemap: { client: "hidden" },
});
