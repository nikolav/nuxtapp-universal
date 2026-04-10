<script setup lang="ts">
// @@eos
</script>

<template>
  <section class="app-container-reset page--demo">
    <h2>page:demo</h2>
    <v-list>
      <v-list-group value="admin">
        <template #activator="{ props }">
          <v-list-item v-bind="props" title="Admin" />
        </template>

        <v-list-item title="Users" />
        <v-list-item title="Settings" />
      </v-list-group>
    </v-list>
  </section>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
