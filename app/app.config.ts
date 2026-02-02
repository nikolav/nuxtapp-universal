// app.config.ts
export default defineAppConfig({
  // ---------------------------------------------------------------------------
  // App identity (safe to expose)
  // ---------------------------------------------------------------------------
  appName: "Nuxt App",
  appShortName: "Nuxt",
  locale: "sr",

  keys: {
    TOKEN_API_AUTH: "4a4f038d-dc42-5419-8579-64681eb922b6",
  },

  events: {
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
