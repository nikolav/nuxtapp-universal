<script setup lang="ts">
// ##imports
// ##config:const
// ##config ##props ##route ##attrs ##form-fields
definePageMeta({
  layout: "default",
  // middleware: "",
  // "@page": {
  //   appBarTitle: "",
  //   htmlClass: "",
  //   bodyClass: "",
  //   appClass: "",
  // },
});
// ##schemas
// ##utils
// ##icons
// ##refs ##flags ##models
const x1 = ref(1);
const y1 = computed(() => x1.value * 2);
const updatex1 = () => {
  x1.value = Math.random();
};
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
  <section class="page--index">
    <h2>index [{{ x1 }}]</h2>
    <h5>index [{{ y1 }}]</h5>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam illum
      cupiditate provident?
    </p>
    <button @click="updatex1()">ok</button>
  </section>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
