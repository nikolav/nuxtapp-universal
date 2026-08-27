<script setup lang="ts">
import { useIO } from "~/composables/io/use-io";
import { useOnceMounted } from "~/composables/utils/use-once-mounted-on";
import { onDebug } from "~/utils/on-debug";

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

// @@eos
</script>

<template>
  <slot />
</template>
