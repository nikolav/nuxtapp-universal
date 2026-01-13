<script setup lang="ts">
// ##imports
// ##config:const
// ##config ##props ##route ##attrs ##form-fields
// definePageMeta({
//   layout: "",
//   middleware: "",
//   "@page": {
//     appBarTitle: "",
//     htmlClass: "",
//     bodyClass: "",
//     appClass: "",
//   },
// });
// ##schemas
// ##utils
// ##icons
// ##refs ##flags ##models
// ##data ##auth ##state
// ##computed
// ##forms ##handlers ##helpers ##small-utils
// ##watch
// ##hooks ##lifecycle
// ##head ##meta
// useHead({ title: "" });
// ##provide
// ##io

const { t, setLocale } = useI18n();

// @@eos
</script>
<template>
  <section class="app-container-reset latout--default">
    <NuxtLinkLocale :to="{ name: 'index' }">home</NuxtLinkLocale>
    <span> | </span>
    <NuxtLinkLocale :to="{ name: 'about' }">about</NuxtLinkLocale>
    <span> | </span>
    <NuxtLinkLocale
      :to="{ name: 'blogs-travel-slug', params: { slug: 'foo:122' } }"
      >blogs:travel</NuxtLinkLocale
    >
    <NuxtLinkLocale
      :to="{ name: 'blogs-tech-slug', params: { slug: 'foo:333' } }"
      >blogs:tech</NuxtLinkLocale
    >
    <h1>{{ t("hello") }}</h1>
    <button @click="setLocale('sr')" class="p-2">sr</button>
    <button @click="setLocale('en')" class="p-2">en</button>
    <slot />
  </section>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
