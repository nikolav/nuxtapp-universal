<script setup lang="ts">
import { mergeProps } from "vue";
import { take } from "rxjs/operators";

import PlayerHtml5 from "./PlayerHtml5.vue";
import PlayerYoutube from "./PlayerYoutube.vue";
import PlayerVimeo from "./PlayerVimeo.vue";

import type { TOrNoValue, TPlayerInstance } from "~/types";
import { useOnceMountedOn } from "~/composables/utils/use-once-mounted-on";
import { usePlayer } from "~/composables/media/use-player";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    sources: { src: string; type?: string; size?: number }[];
    provider?: "html5" | "youtube" | "vimeo";
    title?: string;
    poster?: string;
  }>(),
  {
    provider: "html5",
  },
);

const { $$ } = useNuxtApp();
const ID = `PLAYER-${$$.uuid()}`;

const exposed = {
  player: ref<TOrNoValue<TPlayerInstance>>(),
};

const COMP = {
  html5: PlayerHtml5,
  youtube: PlayerYoutube,
  vimeo: PlayerVimeo,
};

useOnceMountedOn([], async () => {
  usePlayer()
    .pipe(take(1))
    .subscribe((Plyr) => {
      exposed.player.value = new Plyr(`#${ID}`);
    });
});

defineExpose(exposed);

// @@eos
</script>

<template>
  <div class="app-container-reset component--AppVideoPlayer">
    <component
      :is="COMP[props.provider]"
      :id="ID"
      :sources="props.sources"
      v-bind="mergeProps($attrs, $$.omit(props, ['provider', 'sources']))"
    />
  </div>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
