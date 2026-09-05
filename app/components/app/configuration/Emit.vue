<script setup lang="ts">
import type { IEventApp } from "~/types";
import { TOKEN_appEmitter$ } from "~/keys";

const { EVENT_LOCALE_CHANGE } = useAppConfig().events;
const emitter$ = inject(TOKEN_appEmitter$);

const { locale } = useI18n();
watchEffect(() => {
  emitter$?.next(<IEventApp<string>>{
    type: EVENT_LOCALE_CHANGE,
    payload: locale.value,
  });
});

// @@eos
</script>

<template>
  <slot />
</template>
