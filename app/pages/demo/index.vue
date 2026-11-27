<script setup lang="ts">
import { useToggleFlag } from "~/composables/utils/use-toggle-flag";

const toggle = useToggleFlag();
// @@eos
</script>

<template>
  <AppBoxPageWrap class="page--demo">
    <h2>page:demo</h2>
    <VBtn @click="toggle">ok</VBtn>
    <AppBoxFlip
      :flip="toggle.isActive.value"
      class="h-[122px] w-[122px] mx-auto"
    >
      <template #front>
        <VCard color="primary" class="fill-height"> lorem </VCard>
      </template>
      <template #back>
        <VCard color="secondary" class="fill-height"> ipsum </VCard>
      </template>
    </AppBoxFlip>
    <AppBoxBase class="text-body-1 !font-app-comic">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, qui
        magni. Ratione!
      </p>
    </AppBoxBase>
  </AppBoxPageWrap>
</template>
