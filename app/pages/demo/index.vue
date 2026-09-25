<script setup lang="ts">
const { $$ } = useNuxtApp();

// @@eos
</script>

<template>
  <AppBoxPageWrap class="page--demo">
    <h1>page:demo</h1>
    <VBtn @click="$$.onDebug({ event: $event })"> ok </VBtn>
  </AppBoxPageWrap>
</template>
