import { TOKEN_foo } from "~/keys";

export default defineNuxtPlugin((nuxtapp) => {
  nuxtapp.vueApp.provide(TOKEN_foo, "foo");
});
