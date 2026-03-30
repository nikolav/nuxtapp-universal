import { h } from "vue";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { VApp } from "vuetify/components";

export const mountSuspendedWithVuetify = (component: any, options: any = {}) =>
  mountSuspended(component, {
    ...options,
    global: {
      ...options.global,
      // plugins: [vuetify],
      stubs: {
        transition: false,
        "transition-group": false,
        ...(options.global?.stubs ?? {}),
      },
    },
    wrapper: ({ slots }: any) =>
      h(VApp, null, { default: () => slots.default?.() }),
  });
