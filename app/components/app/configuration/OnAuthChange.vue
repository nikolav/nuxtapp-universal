<script setup lang="ts">
import { useAuth } from "~/stores/use-auth.store";

// defineOptions({
//   name: "COMPONENT_NAME",
//   inheritAttrs: false,
// });

const auth = useAuth();
const appConfig = useAppConfig();
const localePath = useLocalePath();
const { $$ } = useNuxtApp();

watch(
  () => auth.isAuth,
  (isAuth, old_isAuth) => {
    if (isAuth) {
      // @login
      navigateTo(
        localePath({
          name: $$.get(
            appConfig,
            "services.auth.DEFAULT_AUTHENTICATED_ROUTE_NAME",
          ),
        }),
      );
      return;
    }
    if (!isAuth && true === old_isAuth) {
      // @logout
      navigateTo(
        localePath({
          name: $$.get(
            appConfig,
            "services.auth.DEFAULT_UNAUTHENTICATED_ROUTE_NAME",
          ),
        }),
      );
    }
  },
);

// @@eos
</script>

<template>
  <slot />
</template>
