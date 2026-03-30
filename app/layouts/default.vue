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
  <VMain>
    <NuxtLinkLocale :to="{ name: 'demo' }">demo</NuxtLinkLocale>
    <span> | </span>
    <NuxtLinkLocale :to="{ name: 'index' }">home</NuxtLinkLocale>
    <span> | </span>
    <NuxtLinkLocale :to="{ name: 'about' }">about</NuxtLinkLocale>
    <slot />
  </VMain>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
