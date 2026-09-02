<script setup lang="ts">
import { filter } from "rxjs";
import { useTheme } from "vuetify";

import { TOKEN_appEmitter$ } from "~/keys";

const theme = useTheme();
const { $$ } = useNuxtApp();

const themeStored = useLocalStorage($$.config("theme.THEME_ACTIVE")!, "");
// @theme store
watch(
  () => theme.global.name.value,
  (theme_) => {
    themeStored.value = theme_;
  },
);

const themeIsDark = computed(() => theme.global.current.value.dark);

const emitter$ = inject(TOKEN_appEmitter$)!;

// @color-mode change theme
useSubscription(
  emitter$
    .pipe(filter((evt) => evt.type === $$.config("events.EVENT_COLOR_MODE")))
    .subscribe((evt) => {
      theme.change(`${evt.payload ?? ""}`);
      $$.onDebug({ "@color-mode": evt });
    }),
);

// @boot;
onNuxtReady(() => {
  // use cached theme
  theme.change(themeStored.value);
});

// @@eos
</script>

<template>
  <Html
    :class="{
      [`${$$.config('theme.darkRootClass')}`]: themeIsDark,
    }"
  />
  <slot />
</template>
