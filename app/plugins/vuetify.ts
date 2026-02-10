import { createVuetify } from "vuetify";
import { md3 } from "vuetify/blueprints";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import DayJsAdapter from "@date-io/dayjs";

import enDayjs from "dayjs/locale/en";
import srDayjs from "dayjs/locale/sr";

// use aliases
import { VBtn } from "vuetify/components/VBtn";

import { light, dark } from "~/assets/themes";
import { displayDefaults as display } from "~/assets/breakpoints";
import { DatetimeService } from "~/plugins/datetime";

type TI18n = (key: string, ...args: any[]) => string;

export default defineNuxtPlugin((nuxtApp) => {
  const { defaultLocale } = useRuntimeConfig().public;
  const i18n = nuxtApp.vueApp.$nuxt.$i18n;
  const vuetify = createVuetify({
    ssr: useRuntimeConfig().public.ssr,
    blueprint: md3,

    // @useDisplay composable configuration options
    // https://next.vuetifyjs.com/en/features/display-and-platform/#interface
    // sync with tailwindcss.config.screens
    display,

    // https://vuetifyjs.com/en/features/theme/#custom-themes
    // https://next.vuetifyjs.com/en/features/theme/#theme-object-structure
    theme: {
      defaultTheme: "system",
      themes: {
        light,
        dark,
      },
      variations: {
        colors: [
          "primary",
          "secondary",
          "success",
          "info",
          "warning",
          "error",
          // "primary2",
          // "primary3",
          // "accent1",
          // "accent2",
          // "complement",
        ],
        lighten: 2,
        darken: 2,
      },
      layers: true,
      // cspNonce: "foo",
      // stylesheetId: "122",
    },

    aliases: {
      AppVBtn: VBtn,
    },

    // component/alias props
    defaults: {
      global: {
        // ripple: true,
      },
      AppVBtn: {
        color: "transparent",
        rounded: true,
      },
      // MyButton: {
      //   color: 'primary',
      //   variant: 'tonal',
      // },
      // VCard: {
      //   MyButton: { color: 'secondary' },
      //   VBtn: { color: 'primary' },
      // },
      VCol: {
        cols: 12,
      },
      VTooltip: {
        // openDelay: TOOLTIPS_OPEN_DELAY,
        // location: "bottom",
        // activator: "parent",
      },
      // VMenu: {
      //   transition: DEFAULT_TRANSITION,
      // },
      VForm: {
        autocomplete: "off",
      },
      // <CustomComponent>: {
      //   "foo:1": "bar",
      // },
    },

    icons: {
      defaultSet: "mdi",
      aliases: {
        ...aliases,
        // # override
        // menu: IconMenu,
        // # add: <VIcon icon="$iconCustom">
        // iconCustom: IconCustom,
      },
      sets: {
        mdi,
      },
    },

    locale: {
      locale: i18n.locale.value ?? defaultLocale,
      fallback: defaultLocale,
    },

    date: {
      adapter: DayJsAdapter,
      locale: {
        sr: srDayjs,
        en: enDayjs,
      },
      formats: DatetimeService.FORMAT,
    },
  });

  nuxtApp.vueApp.use(vuetify);

  // patch translator to use '$vuetify' ui messages
  (<any>vuetify.locale).t = (key: string, ...args: any[]) =>
    (<TI18n>i18n.t)(`$vuetify.${key}`, ...args);

  // sync on both SSR/client (runs on plugin init; reactive on client)
  watch(
    () => i18n.locale.value,
    (loc) => {
      vuetify.locale.current.value = loc ?? defaultLocale;
      // // sync vuetify date adapter: locale
      // vuetify.date?.locale &&
      //   (vuetify.date.locale.value = loc ?? defaultLocale);
    },
    { immediate: true },
  );
});

declare module "vuetify" {
  namespace DateModule {
    interface Adapter extends DayJsAdapter {}
  }
}

// interface IconAliases {
//   [name: string]: IconValue;
//   calendar: IconValue;
//   cancel: IconValue;
//   checkboxIndeterminate: IconValue;
//   checkboxOff: IconValue;
//   checkboxOn: IconValue;
//   clear: IconValue;
//   close: IconValue;
//   complete: IconValue;
//   delete: IconValue;
//   delimiter: IconValue;
//   dropdown: IconValue;
//   edit: IconValue;
//   error: IconValue;
//   expand: IconValue;
//   file: IconValue;
//   first: IconValue;
//   info: IconValue;
//   last: IconValue;
//   loading: IconValue;
//   menu: IconValue;
//   minus: IconValue;
//   next: IconValue;
//   plus: IconValue;
//   prev: IconValue;
//   radioOff: IconValue;
//   radioOn: IconValue;
//   ratingEmpty: IconValue;
//   ratingFull: IconValue;
//   ratingHalf: IconValue;
//   sortAsc: IconValue;
//   sortDesc: IconValue;
//   subgroup: IconValue;
//   success: IconValue;
//   unfold: IconValue;
//   warning: IconValue;
// }
