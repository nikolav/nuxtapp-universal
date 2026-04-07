<script setup lang="ts">
import { COLOR_PRIMARY } from "~/assets/themes/colors";

const { analyticsEnabled, gtmId: GTMID } = useRuntimeConfig().public;

const { finalizePendingLocaleChange } = useI18n();

// @@eos
</script>

<template>
  <VApp class="*app-container-reset app--root">
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

    <!-- setup misc. -->
    <AppConfigurationBase />

    <!-- app emitter -->
    <AppConfigurationEmit />

    <!-- seo:core -->
    <AppConfigurationSeoBase />

    <!-- theme config -->
    <AppConfigurationTheme />

    <!-- #https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator -->
    <NuxtLoadingIndicator :color="COLOR_PRIMARY" />

    <!-- redirect on auth-change -->
    <AppConfigurationOnAuthChange />

    <!-- routes -->
    <NuxtLayout>
      <NuxtPage :transition="{ onBeforeEnter: finalizePendingLocaleChange }" />
    </NuxtLayout>
  </VApp>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
