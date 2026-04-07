<script setup lang="ts">
import { useDisplay } from "vuetify";

import mylinks from "~/assets/my-links.json";

const { smAndUp } = useDisplay();

// @@eos
</script>

<template>
  <div class="app-container-reset component--NAME">
    <div class="__spacer__ p-4 space-y-4">
      <VList
        v-for="node in mylinks"
        :key="node.title"
        rounded
        elevation="1"
        max-width="550"
        class="mx-auto !p-3"
      >
        <VListItem>
          <template #prepend>
            <span class="me-3 text-xl">{{ node.emoji }}</span>
          </template>
          <VListItemTitle class="opacity-40 text-uppercase text-subtitle-2">{{
            node.title
          }}</VListItemTitle>
          <div
            class="font-weight-bold text-primary-darken-1"
            :class="[smAndUp ? 'text-h6' : '']"
          >
            <NuxtLink
              v-if="true === node.link"
              :href="node.content"
              external
              class="underline"
              target="_blank"
              >{{ node.content }}</NuxtLink
            >
            <a
              v-else-if="'tel' === node.link"
              :href="`tel:${node.content}`"
              class="underline"
              >{{ node.content }}</a
            >
            <a
              v-else-if="'mailto' === node.link"
              :href="`mailto:${node.content}`"
              class="underline"
              >{{ node.content }}</a
            >
            <span
              v-else
              class="opacity-85"
              :style="{ color: 'rgb(var(--v-theme-on-surface))' }"
              >{{ node.content }}</span
            >
          </div>
        </VListItem>
      </VList>
    </div>
  </div>
</template>

<!-- scoped component styles -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles -->
<style lang="scss"></style>
