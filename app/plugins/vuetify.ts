import {
  createVuetify,
  // ThemeDefinition
} from "vuetify";
import { md2 } from "vuetify/blueprints";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import { light, dark } from "~/assets/themes";
import { displayDefaults as display } from "~/assets/breakpoints";

// import {
//   IconAccountKey,
// } from "@/components/icons";

// import { srLatn } from "vuetify/locale";

// # --default-light-theme
// const demoLightTheme: ThemeDefinition = {
//   dark: false,
//   colors: {
//     background: '#FFFFFF',
//     surface: '#FFFFFF',
//     primary: '#6200EE',
//     secondary: '#03DAC6',
//     error: '#B00020',
//     info: '#2196F3',
//     success: '#4CAF50',
//     warning: '#FB8C00',
//   }
// };

export default defineNuxtPlugin((nuxtApp) => {
  // const {
  //   app: { TOOLTIPS_OPEN_DELAY, DEFAULT_TRANSITION },
  // } = useAppConfig();

  nuxtApp.vueApp.use(
    createVuetify({
      ssr: useRuntimeConfig().public.ssr,
      blueprint: md2,

      // @useDisplay composable configuration options
      // https://next.vuetifyjs.com/en/features/display-and-platform/#interface
      // sync with tailwindcss.config.screens
      display,

      // https://next.vuetifyjs.com/en/features/theme/
      // https://next.vuetifyjs.com/en/features/theme/#theme-object-structure
      theme: {
        defaultTheme: "light",
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
            "primary2",
            "primary3",
            "accent1",
            "accent2",
            "complement",
          ],
          lighten: 5,
          darken: 5,
        },
      },

      // aliases: {
      //   MyButton: VBtn,
      //   MyButtonAlt: VBtn,
      // },

      // component/alias props
      defaults: {
        global: {
          // ripple: true,
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
          // # add: <VIcon icon="$other">
          // iconCustom: IconCustom,
          // iconAccountKey: IconAccountKey,
        },
        sets: {
          mdi,
        },
      },
      locale: {
        // locale: "srLatn",
        // messages: { srLatn },
        // fallback: "en",
        // locale: 'zhHans',
        // messages: { zhHans, pl, sv }
      },
      // date: {
      //   locale: {
      //     srLatn: "sr-Latn-RS",
      //   },
      // },
    })
  );
});

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
