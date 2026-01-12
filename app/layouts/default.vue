import { NuxtLink } from "../../.nuxt/components";
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

// @@eos
</script>
<template>
  <section class="app-container-reset latout--default">
    <NuxtLink :to="{ name: 'index' }">home</NuxtLink>
    <span> | </span>
    <NuxtLink :to="{ name: 'about' }">about</NuxtLink>
  </section>
  <slot />
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
