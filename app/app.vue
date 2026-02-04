<script setup lang="ts">
import { useTheme } from "vuetify";

import { COLOR_PRIMARY } from "~/assets/themes/colors";

const { analyticsEnabled, gtmId: GTMID } = useRuntimeConfig().public;
const {
  theme: { darkRootClass },
} = useAppConfig();

const theme = useTheme();
const themeIsDark = computed(() => theme.global.current.value.dark);

const route = useRoute();
const seoLocaleHead = useLocaleHead();
const { finalizePendingLocaleChange, t } = useI18n();

const title = computed(() => t(String(route.meta.title ?? "#TBD")));
const description = computed(() => t(String(route.meta.description ?? "#TBD")));

useSeoMeta({
  title,
  description,
});

// @@eos
</script>

<template>
  <VApp class="*app-container-reset app--root">
    <Html
      :class="{ [darkRootClass]: themeIsDark }"
      :lang="seoLocaleHead.htmlAttrs.lang"
      :dir="seoLocaleHead.htmlAttrs.dir"
    />
    <Title>{{ title }}</Title>
    <Link
      v-for="link in seoLocaleHead.link"
      :key="link.key"
      :id="link.key"
      :rel="link.rel"
      :href="link.href"
      :hreflang="link.hreflang"
    />
    <Meta
      v-for="meta in seoLocaleHead.meta"
      :key="meta.key"
      :id="meta.key"
      :property="meta.property"
      :content="meta.content"
    />

    <!-- Google Tag Manager --noscript -->
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

    <!-- #https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator -->
    <NuxtLoadingIndicator :color="COLOR_PRIMARY" />

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
