<script setup lang="ts">
import { COLOR_PRIMARY } from "~/assets/themes/colors";

const { analyticsEnabled, gtmId: GTMID } = useRuntimeConfig().public;

const { finalizePendingLocaleChange } = useI18n();

// @@eos
</script>

<template>
  <section class="app-container-reset app--root">
    <!-- seo:core -->
    <AppConfigurationSeoBase />

    <!-- theme config -->
    <AppConfigurationTheme />

    <template v-if="analyticsEnabled">
      <noscript
        ><iframe
          :src="`https://www.googletagmanager.com/ns.html?id=${GTMID}`"
          height="0"
          width="0"
          style="display: none; visibility: hidden"
        ></iframe
      ></noscript>
    </template>

    <!-- no render, setup/init component -->
    <AppConfigsClient />

    <!-- #https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator -->
    <NuxtLoadingIndicator :color="COLOR_PRIMARY" />

    <!-- routes -->
    <NuxtLayout>
      <NuxtPage :transition="{ onBeforeEnter: finalizePendingLocaleChange }" />
    </NuxtLayout>
  </section>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
