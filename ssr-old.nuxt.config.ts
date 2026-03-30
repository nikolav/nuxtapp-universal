import vitePluginVuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { API_URL, BASE_DIR, ENDPOINT_GRAPHQL } from "./config";
import { trimEndBase } from "./utils/trim-end-base";
import { IMPORTS } from "./config/imports-package";

type TMeta = Record<string, string>[];

const meta: TMeta = [
  { name: "description", content: "NuxtApp --nuxt.config" },
  { name: "theme-color", content: "#fafafa" },
];

// Upgrade http -> https (korisno kad SSR radi iza reverse-proxy-ja)
if (API_URL.startsWith("https")) {
  meta.push({
    "http-equiv": "Content-Security-Policy",
    content: "upgrade-insecure-requests",
  });
}

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",

  // ---------------------------------------------------------------------------
  // SSR (server-rendered)
  // ---------------------------------------------------------------------------
  ssr: true,
  devtools: { enabled: false },

  // ---------------------------------------------------------------------------
  // Runtime config (ubaci javne vrednosti ovde, SSR-safe)
  // ---------------------------------------------------------------------------
  runtimeConfig: {
    // privatno (server-only):
    // apiSecret: process.env.API_SECRET,

    public: {
      apiUrl: API_URL,
      graphqlEndpoint: ENDPOINT_GRAPHQL,
      baseDir: BASE_DIR || "",
    },
  },

  // ---------------------------------------------------------------------------
  // App + Head
  // ---------------------------------------------------------------------------
  app: {
    ...(BASE_DIR
      ? {
          baseURL: BASE_DIR,
          // Važno: ako je app pod subpath-om
          buildAssetsDir: `${trimEndBase(BASE_DIR, "/")}/_nuxt/`,
        }
      : {}),

    head: {
      charset: "utf-8",
      viewport:
        "width=device-width, initial-scale=1.0, shrink-to-fit=no, minimum-scale=1",
      title: "app",
      meta,
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
      ],
      noscript: [{ children: "JavaScript is required" }],
    },

    pageTransition: { name: "BLUR", mode: "in-out" },
    layoutTransition: { name: "BLUR" },
  },

  // ---------------------------------------------------------------------------
  // CSS
  // ---------------------------------------------------------------------------
  css: [
    "~/assets/styles/main.scss",
    "animate.css",
    "@mdi/font/css/materialdesignicons.css",
    "vuetify/lib/styles/main.sass",
    "@fancyapps/ui/dist/fancybox/fancybox.css",
    "quill/dist/quill.core.css",
    "quill/dist/quill.snow.css",
  ],

  // ---------------------------------------------------------------------------
  // Modules
  // ---------------------------------------------------------------------------
  modules: [
    "@nuxtjs/google-fonts",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/apollo",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@nuxt/image",

    // Vuetify (Vite plugin)
    async (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(
          vitePluginVuetify({
            autoImport: true,
            styles: { configFile: "assets/styles/vuetify/settings.scss" },
          })
        );
      });
    },
  ],

  // ---------------------------------------------------------------------------
  // Build / Vite
  // ---------------------------------------------------------------------------
  build: {
    transpile: ["vuetify"],
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/globals.scss" as *;',
        },
      },
    },
    define: {
      "process.env.DEBUG": false,
    },
    vue: {
      template: { transformAssetUrls },
    },
  },

  // ---------------------------------------------------------------------------
  // Nitro (SSR server)
  // ---------------------------------------------------------------------------
  nitro: {
    compressPublicAssets: true,

    // Ako hostuješ SSR iza Node servera / PM2:
    // preset: "node-server",
    //
    // Ako si na Netlify/Vercel/Cloudflare, preset se menja po platformi.
  },

  // ---------------------------------------------------------------------------
  // Route rules (SSR caching gde ima smisla)
  // ---------------------------------------------------------------------------
  routeRules: {
    // Static assets: cache dugo
    "/_nuxt/**": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
    "/favicon.ico": { headers: { "cache-control": "public, max-age=86400" } },

    // Primer: deo sajta koji može da bude SWR (SSR + cache)
    // "/aktiva/proizvodi/**": { swr: 60 },

    // API rute obično ne cache-uješ ovde (osim baš svesno)
    // "/api/**": { cors: true },
  },

  // ---------------------------------------------------------------------------
  // Imports
  // ---------------------------------------------------------------------------
  imports: {
    dirs: ["./keys"],
    presets: IMPORTS,
  },

  // ---------------------------------------------------------------------------
  // Google Fonts
  // ---------------------------------------------------------------------------
  googleFonts: {
    families: {
      "Open+Sans": {
        wght: [100, 300, 400, 500, 700, 900],
        ital: [100, 300, 400, 500, 700, 900],
      },
      Roboto: {
        wght: [100, 300, 400, 500, 700, 900],
        ital: [100, 300, 400, 500, 700, 900],
      },
    },
    useStylesheet: true,
    download: false,
  },

  // ---------------------------------------------------------------------------
  // Tailwind
  // ---------------------------------------------------------------------------
  tailwindcss: {
    cssPath: "~/assets/tailwind.css",
    configPath: "~/config/tailwind.config.ts",
    exposeConfig: true,
    viewer: false,
  },

  // ---------------------------------------------------------------------------
  // Apollo (SSR-safe: cookie storage + include credentials)
  // ---------------------------------------------------------------------------
  apollo: {
    autoImports: true,
    authType: "Bearer",
    authHeader: "Authorization",

    // SSR: cookie token storage je najpraktičnije (što već koristiš)
    tokenStorage: "cookie",
    proxyCookies: true,

    clients: {
      default: {
        httpEndpoint: ENDPOINT_GRAPHQL,
        httpLinkOptions: {
          credentials: "include",
        },
        tokenName: "@apollo/token:HoARGKAyE7VRBupLHJ",
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Nuxt Icon (SSR: bolje da serverBundle bude local/auto da ne zavisi od runtime fetch)
  // ---------------------------------------------------------------------------
  icon: {
    serverBundle: "auto",
    customCollections: [{ prefix: "icons-local", dir: "./assets/icons-local" }],
    clientBundle: {
      icons: [
        // (tvoja lista ostaje ista)
        "material-symbols:list-alt-outline",
        "mdi:google-drive",
        "mdi:folder-wrench",
        // ...
        "material-symbols:settings",
      ],
      scan: true,
      includeCustomCollections: true,
    },
  },

  // ---------------------------------------------------------------------------
  // Color mode / Router / Experimental / Image
  // ---------------------------------------------------------------------------
  colorMode: { classSuffix: "" },

  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },

  experimental: {
    scanPageMeta: true,
  },

  image: {
    quality: 92,
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
});
