import type { IAuthenticateOptions } from "~/types";

// app.config.ts
export default defineAppConfig({
  // ---------------------------------------------------------------------------
  // App identity (safe to expose)
  // ---------------------------------------------------------------------------
  appName: "Nuxt App",
  appShortName: "Nuxt",
  locale: "sr",

  stores: {
    gravatars: {
      BASE_URL: "https://www.gravatar.com/avatar",
      MODE: {
        monsterid: true,
        wavatar: true,
        robohash: true,
      },
      SIZE: 92,
    },
  },

  ui: {
    DEFAULT_TRANSITION: "app-transition-slide-y-r",
  },

  services: {
    auth: {
      DEFAULT_AUTHENTICATED_ROUTE_NAME: "index",
      DEFAULT_UNAUTHENTICATED_ROUTE_NAME: "auth",
      defaultsAuthenticate: <IAuthenticateOptions>{
        timeoutMs: 8122,
      },
    },
    firebase: {
      COLLECTIONS_PATH: "docs",
    },
  },

  keys: {
    COLLECTIONS_NAME_PREFIX:
      "COLLECTIONS:96f387d7-f82a-5307-be98-831874358ac5:",
    CACHE_BY_KEY: "cache",
    KEY_FORMS: "52c061eb-9612-5d95-99ca-e8965679cb56",
    TOKEN_API_AUTH: "4a4f038d-dc42-5419-8579-64681eb922b6",
  },

  events: {
    EVENT_COLOR_MODE: "001904e0-b43c-50f4-8edc-bb2a4b47e751",
    EVENT_LOCALE_CHANGE:
      "EVENT_LOCALE_CHANGE:4886a0a7-6261-580c-b17d-99ba5908389b",
    EVENT_notifications_granted:
      "EVENT_notifications_granted:6a69b910-b0a5-5616-b628-77a800ff1386",
  },

  // ---------------------------------------------------------------------------
  // UI / Layout defaults
  // ---------------------------------------------------------------------------
  layout: {
    default: "default",
    showHeader: true,
    showFooter: true,
  },

  // ---------------------------------------------------------------------------
  // Theme (pure UI, no secrets)
  // ---------------------------------------------------------------------------
  theme: {
    THEME_ACTIVE: "ad321d7c-401d-546d-99b0-01b39a134e18",
    darkRootClass: "theme-dark",
  },

  // ---------------------------------------------------------------------------
  // Feature flags (compile-time behavior)
  // ---------------------------------------------------------------------------
  features: {
    blog: false,
    analytics: false,
    cookieBanner: true,
  },

  // ---------------------------------------------------------------------------
  // SEO/UI helpers (NOT SEO meta)
  // ---------------------------------------------------------------------------
  seo: {
    titleSuffix: " | Nuxt App",
    defaultImage: "/og-default.png",
  },

  icon: {
    size: "1em", // default <Icon> size applied
    // class: "icon", // default <Icon> class applied
    // mode: "css", // default <Icon> mode applied
    // cssLayer: "base", // set the css layer to inject to
    aliases: {},
    // # apply customizations globally
    // customize: (
    //   content: string,
    //   name: string,
    //   prefix: string,
    //   provider: string
    // ) => {},
  },
});
