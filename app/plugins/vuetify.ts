import { createVuetify } from "vuetify";
import { md3 } from "vuetify/blueprints";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import { srLatn, en, srCyrl } from "vuetify/locale";
import { filter, map } from "rxjs/operators";

import DayJsAdapter from "@date-io/dayjs";
import enDayjs from "dayjs/locale/en";
import srDayjs from "dayjs/locale/sr";
import srCyrlDayjs from "dayjs/locale/sr-cyrl";

// use aliases
import { VBtn } from "vuetify/components/VBtn";

import { TOKEN_appEmitter$ } from "~/keys";
import { light, dark } from "~/assets/themes";
import { displayDefaults as display } from "~/assets/breakpoints";
import { DatetimeService } from "~/plugins/datetime";

export default defineNuxtPlugin({
  name: "vuetify",
  dependsOn: ["emitters"],
  setup: (nuxtApp) => {
    const { defaultLocale } = useRuntimeConfig().public;
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
          lighten: 1,
          darken: 1,
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
          color: "surface-light",
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
        locale: nuxtApp.vueApp.$nuxt.$i18n.locale.value || defaultLocale,
        fallback: defaultLocale,
        messages: { sr: srLatn, "sr-cyrl": srCyrl, en },
      },

      date: {
        adapter: DayJsAdapter,
        locale: {
          sr: srDayjs,
          "sr-cyrl": srCyrlDayjs,
          en: enDayjs,
        },
        formats: DatetimeService.FORMAT,
      },
    });

    nuxtApp.vueApp.use(vuetify);

    const emitter$ = inject(TOKEN_appEmitter$)!;
    emitter$
      .pipe(
        filter((e) => e.type === useAppConfig().events.EVENT_LOCALE_CHANGE),
        map((e) => <string>e.payload),
      )
      .subscribe((localeCurrent) => {
        vuetify.locale.current.value = localeCurrent || defaultLocale;
      });
  },
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
