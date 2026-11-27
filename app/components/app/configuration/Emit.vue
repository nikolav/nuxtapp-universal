<script setup lang="ts">
import type { IEventApp } from "~/types";
import { TOKEN_appEmitter$ } from "~/keys";

const { $$ } = useNuxtApp();

const emitter$ = inject(TOKEN_appEmitter$);

const { events: e } = useAppConfig();
const { locale } = useI18n();
const cmode = useColorMode();

watchEffect(() => {
  emitter$?.next(<IEventApp<string>>{
    type: <string>(<any>e).EVENT_LOCALE_CHANGE,
    payload: locale.value,
  });
});

watchEffect(() => {
  emitter$?.next(<IEventApp<string>>{
    type: <string>(<any>e).EVENT_COLOR_MODE,
    payload: cmode.value,
  });

  $$.onDebug({ "@cm:change": cmode.value });
});

// @@eos
</script>

<template>
  <slot />
</template>
