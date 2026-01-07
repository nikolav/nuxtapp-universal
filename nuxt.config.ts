// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // SSG uses SSR at build time
  ssr: true,

  modules: ["@nuxtjs/seo"],

  // Single source of truth for canonical URLs + sitemap base
  site: {
    url: process.env.NUXT_SITE_URL || "https://inspera.rs",
    name: process.env.NUXT_SITE_NAME || "Centar Inspera",
    description:
      process.env.NUXT_SITE_DESCRIPTION ||
      "Psihološko savetovalište i psihoterapija u Beogradu.",
    defaultLocale: "sr",
  },

  // SEO Utils (canonicals, defaults)
  seo: {
    automaticDefaults: true,
    canonicalQueryWhitelist: ["page", "sort", "filter", "search", "q", "query"],
  },

  // Robots (✅ use `groups`, not `rules`)
  robots: {
    groups:
      process.env.NODE_ENV === "production"
        ? [
            {
              userAgent: ["*"],
              allow: ["/"],
            },
          ]
        : [
            {
              userAgent: ["*"],
              disallow: ["/"],
            },
          ],
  },

  // Sitemap (✅ keep it simple; uses `site.url` automatically)
  sitemap: {
    autoLastmod: true,
  },

  // Schema.org starter identity
  schemaOrg: {
    identity: {
      type: "Organization",
      name: process.env.NUXT_SITE_NAME || "Centar Inspera",
      url: process.env.NUXT_SITE_URL || "https://inspera.rs",
    },
  },

  ogImage: { enabled: true },
  linkChecker: { enabled: true },

  // Static output + prerender only these routes
  nitro: {
    preset: "static",
    prerender: {
      routes: ["/", "/about"],
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: "sr" },
    },
  },
});
