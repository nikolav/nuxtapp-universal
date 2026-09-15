<script setup lang="ts">
import { useIO } from "~/composables/io/use-io";
import { useOnceMounted } from "~/composables/utils/use-once-mounted-on";
import { onDebug } from "~/utils/on-debug";

const { $$ } = useNuxtApp();

// @broadcast:health.ping log
useOnceMounted([], () => {
  useIO().client((io, cleanup) => {
    const ch = io.channel("health").listenToAll((...args: unknown[]) => {
      onDebug({ "broadcast:health.*": { args } });
    });
    //
    cleanup(() => {
      ch.stopListeningToAll();
    });
  });
});

const config = useRuntimeConfig();
const appDomain = computed(
  () => new URL(`${$$.get(config, "public.siteUrl", "")}`).hostname,
);
useHead({
  titleTemplate: (title) => `${title ?? "APP"} • ${appDomain.value ?? "NUXT"}`,
});

// @@eos
</script>

<template>
  <Html
    :class="{
      'DEBUG--box-outline': false,
      'DEBUG--box-bg': false,
    }"
  />

  <slot />
</template>
