<script setup lang="ts">
const localePath = useLocalePath();
// @@eos
</script>

<template>
  <div class="app-container-reset component--AppNavPageLinks">
    <VList>
      <VListItem :to="localePath({ name: 'index' })">home</VListItem>
      <VListItem :to="localePath({ name: 'settings' })">settings</VListItem>
      <VListItem :to="localePath({ name: 'demo' })">demo</VListItem>
    </VList>
  </div>
</template>
