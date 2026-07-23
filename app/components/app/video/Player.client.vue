<script setup lang="ts">
import { mergeProps } from "vue";
import { take } from "rxjs/operators";

import PlayerHtml5 from "./PlayerHtml5.vue";
import PlayerYoutube from "./PlayerYoutube.vue";
import PlayerVimeo from "./PlayerVimeo.vue";

import type { TOrNoValue, TPlayerInstance, TPlayerOptions } from "~/types";
import { useOnceMounted } from "~/composables/utils/use-once-mounted-on";
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

const attrs = useAttrs();
const { $$ } = useNuxtApp();

const DEFAULTS_PLYR_OPTIONS: TPlayerOptions = {
  // ux + perf sanity
  autoplay: false,
  autopause: true,
  clickToPlay: true,
  resetOnEnd: false,

  // clean minimal ui
  hideControls: true,
  tooltips: {
    controls: false,
    seek: false,
  },

  // keyboard scoped, no global shortcuts
  keyboard: {
    focused: true,
    global: false,
  },

  // fullscreen behavior
  fullscreen: {
    enabled: true,
    fallback: true,
    iosNative: false,
  },

  // privacy/security defaults
  disableContextMenu: true,
  storage: {
    enabled: false,
    key: "plyr",
  },

  // embed providers
  youtube: {
    noCookie: true,
    rel: 0,
    modestbranding: 1,
    iv_load_policy: 3,
  },
  vimeo: {
    byline: false,
    portrait: false,
    title: false,
    speed: true,
    transparent: false,
  },
};

const ID = computed(() => String(attrs["id"] ?? `PLAYER-${$$.uuid()}`));

const COMP = {
  html5: PlayerHtml5,
  youtube: PlayerYoutube,
  vimeo: PlayerVimeo,
};

const exposed = {
  player: shallowRef<TOrNoValue<TPlayerInstance>>(),
  id: ID,
};

useOnceMounted([], async () => {
  usePlayer()
    .pipe(take(1))
    .subscribe(({ Plyr }) => {
      exposed.player.value = new Plyr(`#${ID.value}`, DEFAULTS_PLYR_OPTIONS);
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
