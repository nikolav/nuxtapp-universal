<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  sources: { src: string }[];
  title?: string;
}>();
// src="https://www.youtube.com/embed/bTqVqk7FSmY?origin=https://plyr.io&amp;"
// @@eos
</script>

<template>
  <div class="plyr__video-embed">
    <iframe
      :src="`https://www.youtube-nocookie.com/embed/${props.sources[0]?.src}?playsinline=1&modestbranding=1&rel=0&enablejsapi=1&iv_load_policy=3&showinfo=0&origin=${encodeURIComponent(useRuntimeConfig().public.siteUrl)}`"
      :title="props.title"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowfullscreen
      v-bind="$attrs"
    ></iframe>
  </div>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
