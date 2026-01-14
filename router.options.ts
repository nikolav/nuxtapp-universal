import type { RouterConfig } from "@nuxt/schema";
// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  linkActiveClass: "router-link-active",
  linkExactActiveClass: "router-link-exact-active",
  scrollBehavior: async (_to, _from, savedPosition) => {
    // const nuxtApp = useNuxtApp();
    // // @route, apply locale settings after route transition animation
    // //   .i18n.skipSettingLocaleOnNavigate:true @config
    // if (nuxtApp.$i18n && to.name !== from.name) {
    //   // `$i18n` is injected in the `setup` of the nuxtjs/i18n module.
    //   // `scrollBehavior` is guarded against being called even when it is not completed
    //   await nuxtApp.$i18n.waitForPendingLocaleChange();
    // }

    // return savedPosition || { top: 0 };
    return savedPosition || undefined;
  },
};
