export default defineI18nConfig(() => ({
  // required for Composition API
  legacy: false,

  // fallback if key is missing
  fallbackLocale: "en",

  // default locale
  locale: <any>process.env.NUXT_PUBLIC_DEFAULT_LOCALE,

  missingWarn: false,
  fallbackWarn: false,
}));
