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
    if (isAuth) {
      // @login
      navigateTo(
        localePath({
          name: useAppConfigItem<string>(
            "services.auth.DEFAULT_AUTHENTICATED_ROUTE_NAME",
          ).value,
        }),
      );
      return;
    }
    if (!isAuth && true === old_isAuth) {
      // @logout
      navigateTo(
        localePath({
          name: useAppConfigItem<string>(
            "services.auth.DEFAULT_UNAUTHENTICATED_ROUTE_NAME",
          ).value,
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
