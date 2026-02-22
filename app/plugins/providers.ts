import { TOKEN_foo } from "~/keys";

export default defineNuxtPlugin({
  name: "providers",
  enforce: "pre",
  setup: (nuxtapp) => {
    nuxtapp.vueApp.provide(TOKEN_foo, "foo");
  },
});
