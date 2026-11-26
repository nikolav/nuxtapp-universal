<script setup lang="ts">
definePageMeta({
  layout: "debug",
});

// @@eos
</script>

<template>
  <AppBoxPageWrap class="page--demo">
    <VAlert tile variant="tonal">
      <template #prepend>
        <IconX icon="mdi:file-outline" size="1.5rem" />
      </template>
      <template #title> page:demo </template>
      <template #text>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ipsum
          iure aliquid.
        </p>
      </template>
    </VAlert>
  </AppBoxPageWrap>
</template>
