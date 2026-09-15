<script setup lang="ts">
import { useAuth } from "~/stores/use-auth.store";

// defineOptions({
//   name: "COMPONENT_NAME",
//   inheritAttrs: false,
// });

const { $$ } = useNuxtApp();
const localePath = useLocalePath();
const auth = useAuth();

watch(
  () => auth.isAuth,
  (isAuth, old_isAuth) => {
    switch (true) {
      case isAuth:
        // @login
        return navigateTo(
          localePath({
            name: $$.config("services.auth.DEFAULT_AUTHENTICATED_ROUTE_NAME"),
          }),
        );

      case !isAuth && true === old_isAuth:
        // @logout
        return navigateTo(
          localePath({
            name: $$.config("services.auth.DEFAULT_UNAUTHENTICATED_ROUTE_NAME"),
          }),
        );

      default:
        break;
    }
  },
);

// @@eos
</script>

<template>
  <slot />
</template>
