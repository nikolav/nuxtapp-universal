<script setup lang="ts">
import type { IEventApp } from "~/types";
import { TOKEN_appEmitter$ } from "~/keys";

const emitter$ = inject(TOKEN_appEmitter$);

const { locale } = useI18n();
watchEffect(() => {
  emitter$?.next(<IEventApp<string>>{
    type: useAppConfig().events.EVENT_LOCALE_CHANGE,
    payload: locale.value,
  });
});

const cmode = useColorMode();
watchEffect(() => {
  emitter$?.next(<IEventApp<string>>{
    type: useAppConfig().events.EVENT_COLOR_MODE,
    payload: cmode.value,
  });
});

onNuxtReady(() => {
  callOnce(() => {
    // @boot;
  });
});

// @@eos
</script>

<template>
  <slot />
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
