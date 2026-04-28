<script setup lang="ts">
import { useAuth } from "~/stores/use-auth.store";
import { useAppConfigItem } from "~/composables/utils/use-app-config-item";

// defineOptions({
//   name: "COMPONENT_NAME",
//   inheritAttrs: false,
// });

const auth = useAuth();
const localePath = useLocalePath();

watch(
  () => auth.isAuth,
  (isAuth, old_isAuth) => {
    switch (true) {
      case isAuth:
        // @login
        return navigateTo(
          localePath({
            name: useAppConfigItem(
              "services.auth.DEFAULT_AUTHENTICATED_ROUTE_NAME",
            ).value,
          }),
        );
        break;

      case !isAuth && true === old_isAuth:
        // @logout
        return navigateTo(
          localePath({
            name: useAppConfigItem(
              "services.auth.DEFAULT_UNAUTHENTICATED_ROUTE_NAME",
            ).value,
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
