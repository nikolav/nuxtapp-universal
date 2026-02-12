<script setup lang="ts">
definePageMeta({
  title: "pages.index.title",
  description: "pages.index.description",
  layout: "default",
  i18n: {
    paths: {
      sr: "/dobrodosli",
      en: "/welcome",
    },
  },
});

const { $lightbox } = useNuxtApp();
const pswOpen1 = () => {
  $lightbox({
    slides: [
      { src: "/01.jpg", width: 400, height: 400 },
      { src: "/02.jpg", width: 769, height: 464 },
    ],
  })((instance) => {
    console.log({ instance });
  });
};

const pswOpen2 = () => {
  $lightbox({
    slides: [
      { src: "/03.jpg", width: 4128, height: 3096 },
      { src: "/04.jpg", width: 1884, height: 4080 },
    ],
  })((instance) => {
    console.log({ instance });
  });
};

// @@eos
</script>

<template>
  <section class="app-container-reset page--index">
    <button @click="pswOpen1">lightbox:open</button>
    <button @click="pswOpen2">lightbox:open</button>
  </section>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
