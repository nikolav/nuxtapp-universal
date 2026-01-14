export default defineI18nConfig(() => ({
  // required for Composition API
  legacy: false,

  // fallback if key is missing
  fallbackLocale: "sr",
  // fallbackLocale: ['en', 'fr'],
  // fallbackLocale: {
  //   'de-CH': ['fr', 'it'],
  //   'zh-Hant': ['zh-Hans'],
  //   'es-CL': ['es-AR'],
  //   es: ['en-GB'],
  //   pt: ['es-AR'],
  //   default: ['en', 'da']
  // }

  // default locale
  locale: <any>process.env.NUXT_PUBLIC_DEFAULT_LOCALE,

  missingWarn: false,
  fallbackWarn: false,
}));
