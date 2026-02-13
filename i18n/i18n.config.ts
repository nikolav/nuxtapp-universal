import { pluralizationRuleSlavic } from "./plural-rules";

export default defineI18nConfig(() => ({
  // required for Composition API
  legacy: false,
  // fallback if key is missing
  fallbackLocale: <any>process.env.NUXT_DEFAULT_LOCALE ?? "sr",
  // fallbackLocale: ["sr", "en"],
  // fallbackLocale: {
  //   'de-CH': ['fr', 'it'],
  //   'zh-Hant': ['zh-Hans'],
  //   'es-CL': ['es-AR'],
  //   es: ['en-GB'],
  //   pt: ['es-AR'],
  //   default: ['en', 'da']
  // }
  // default locale
  locale: <any>process.env.NUXT_DEFAULT_LOCALE ?? "sr",
  // escapeParameter: true,
  missingWarn: false,
  fallbackWarn: false,
  // modifiers: {},
  pluralRules: {
    sr: pluralizationRuleSlavic,
    "sr-cyrl": pluralizationRuleSlavic,
  },
  formatFallbackMessages: true,
  datetimeFormats: {
    sr: {
      short: {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
      long: {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      },
      numeric: { year: "numeric", month: "2-digit", day: "2-digit" },
    },
    "sr-cyrl": {
      short: {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
      long: {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      },
      numeric: { year: "numeric", month: "2-digit", day: "2-digit" },
    },
    en: {
      short: {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
      long: {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      },
      numeric: { year: "numeric", month: "2-digit", day: "2-digit" },
    },
  },
  numberFormats: {
    sr: {
      currency: {
        style: "currency",
        currency: "RSD",
        currencyDisplay: "symbol",
        notation: "standard",
      },
      decimal: {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
      },
      percent: {
        style: "percent",
        useGrouping: false,
        maximumFractionDigits: 0,
      },
    },
    "sr-cyrl": {
      currency: {
        style: "currency",
        currency: "RSD",
        currencyDisplay: "symbol",
        notation: "standard",
      },
      decimal: {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
      },
      percent: {
        style: "percent",
        useGrouping: false,
        maximumFractionDigits: 0,
      },
    },
    en: {
      currency: {
        style: "currency",
        currency: "USD",
        currencyDisplay: "symbol",
        notation: "standard",
      },
      decimal: {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
      },
      percent: {
        style: "percent",
        useGrouping: false,
        maximumFractionDigits: 0,
      },
    },
  },
}));
