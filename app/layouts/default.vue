<script setup lang="ts">
// @@eos
</script>
<template>
  <VMain>
    <AppGridRowsFullAutoFull
      class="fill-height"
      :props-body="{ class: '!bg-v-secondary' }"
    >
      <template #top>
        <AppNavMain />
        <slot />
      </template>
      <template #bottom>
        <h2>chat:main</h2>
      </template>

      <!-- app:controlls :middle -->
      <div>:controlls</div>
    </AppGridRowsFullAutoFull>
  </VMain>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
