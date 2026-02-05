// ✅ Force SPA + static export (ignore env SSR for this build target)
const SSR = false;

export default defineNuxtConfig({
  // 01) Core runtime behavior
  compatibilityDate: "2025-07-15",
  ssr: false,

  // (optional but nice) ensures all routes are client-rendered
  routeRules: {
    "/**": { ssr: false },
  },

  // 08) Server runtime (Nitro) + caching + storage
  nitro: {
    // ✅ static hosting output instead of node server
    preset: "static",

    // ✅ for SPA: only prerender "/" and create SPA fallback (200.html)
    prerender: {
      routes: ["/"],
      // crawlLinks: false, // keep off for SPA-only
    },

    // (optional) keep if you want cache headers on static host that respects them
    routeRules: {
      "/_nuxt/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },
    },

    // ❌ remove server-only runtime storage (Redis) for static export
    // storage: { ... }
  },

  // robots: FIX (your current line is a syntax error)
  robots: {
    cacheControl: PRODUCTION ? "max-age=14400, must-revalidate" : false,
    groups: PRODUCTION
      ? [{ userAgent: ["*"], allow: ["/"] }]
      : [{ userAgent: ["*"], disallow: ["/"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  },

  // Keep the rest as-is...
});
