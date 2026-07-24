<script setup lang="ts">
// @@eos
</script>
<template>
  <VMain>
    <AppGridRowsFullAutoFull class="fill-height">
      <template #top>
        <slot />
      </template>

      <template #bottom>
        <h2>chat:main</h2>
      </template>

      <!-- app:controlls :middle -->
      <VToolbar density="compact" elevation="2" tile class="pe-2">
        <VToolbarItems>
          <VBtn>1</VBtn>
          <VBtn>2</VBtn>
          <VBtn>3</VBtn>
        </VToolbarItems>
        <VSpacer />
        <AppNavLine />
      </VToolbar>
    </AppGridRowsFullAutoFull>
  </VMain>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
