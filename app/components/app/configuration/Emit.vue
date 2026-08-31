<script setup lang="ts">
import type { IEventApp } from "~/types";
import { TOKEN_appEmitter$ } from "~/keys";

const emitter$ = inject(TOKEN_appEmitter$);

const e = useAppConfig().events;
const { locale } = useI18n();
const cmode = useColorMode();

watchEffect(() => {
  emitter$?.next(<IEventApp<string>>{
    type: e.EVENT_LOCALE_CHANGE,
    payload: locale.value,
  });
});

watchEffect(() => {
  emitter$?.next(<IEventApp<string>>{
    type: e.EVENT_COLOR_MODE,
    payload: cmode.value,
  });
});

// @@eos
</script>

<template>
  <slot />
</template>
