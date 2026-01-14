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
  <VMain>
    <NuxtLink :to="{ name: 'index' }">home</NuxtLink>
    <span> | </span>
    <NuxtLink :to="{ name: 'about' }">about</NuxtLink>
    <slot />
  </VMain>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
