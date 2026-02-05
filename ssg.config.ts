// ...your imports stay the same

const PRODUCTION = [
  process.env.ENV,
  process.env.NODE_ENV,
  process.env.NUXT_SITE_ENV,
].some((e) => "production" === e);

// ✅ For true static export, SSR must be true at build-time
// (you can ignore NUXT_SSR env here, or hard-force it)
const SSR = true;

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  // ✅ SSG renders HTML at build time => keep SSR enabled
  ssr: SSR,

  devtools: { enabled: !PRODUCTION },

  // ---------------------------------------------------------------------------
  // Route rules: for SSG, "prerender" is the important one
  // ---------------------------------------------------------------------------
  routeRules: {
    // Example: prerender all content pages
    "/": { prerender: true },
    "/about": { prerender: true },

    // If you have a blog that should be exported as HTML too:
    "/blog/**": { prerender: true },

    // Keep SPA-only areas (no HTML pre-render output)
    "/admin/**": { ssr: false },

    // Never prerender API paths (and they shouldn't exist in a static build anyway)
    "/api/**": { ssr: false },
  },

  // ---------------------------------------------------------------------------
  // Nitro: switch from server to static
  // ---------------------------------------------------------------------------
  nitro: {
    // ✅ produces static site in .output/public
    preset: "static",

    compressPublicAssets: true,

    prerender: {
      // ✅ crawl internal <a href> links found in generated pages
      crawlLinks: true,

      // ✅ fail early in CI if a route can't be prerendered
      failOnError: true,

      // ✅ seed routes (rest are discovered via crawlLinks + hook additions)
      routes: ["/"],
    },

    // ⚠️ headers routeRules are not guaranteed on plain static hosts
    // Keep them only if your deployment preset/host converts them to _headers rules.
    routeRules: {
      "/_nuxt/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },
    },

    // ❌ Remove server storage adapters (no server at runtime)
    storage: {},
  },

  // ---------------------------------------------------------------------------
  // Hooks: add more prerender routes (dynamic pages)
  // ---------------------------------------------------------------------------
  hooks: {
    "prerender:routes": async ({ routes }) => {
      // Always include the root
      routes.add("/");

      // If you have dynamic content, add it here:
      // const posts = await $fetch<{ slugs: string[] }>(`${apiBase}/prerender/posts`);
      // for (const slug of posts.slugs) routes.add(`/blog/${slug}`);
    },
  },

  // ---------------------------------------------------------------------------
  // Everything else can stay as-is, but note the static-host limitations:
  // - nuxt-security headers won’t be applied unless host supports it
  // - any server-only runtime features should be avoided
  // ---------------------------------------------------------------------------

  // Keep your modules, app, css, runtimeConfig, seo, i18n, vite, etc...
});
