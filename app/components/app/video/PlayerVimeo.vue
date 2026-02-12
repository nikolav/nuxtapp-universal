<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  // 76979871
  sources: { src: string }[];
  title?: string;
}>();

// @@eos
</script>

<template>
  <div class="plyr__video-embed">
    <iframe
      :src="`https://player.vimeo.com/video/${props.sources[0]?.src}??byline=0&portrait=0&title=0&loop=0&transparent=0&dnt=1&speed=1&gesture=media&origin=${encodeURIComponent(useRuntimeConfig().public.siteUrl)}`"
      :title="props.title"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
      frameborder="0"
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
