<script setup lang="ts">
import { COLOR_PRIMARY } from "~/assets/themes/colors";
import { useActiveChat } from "~/composables/state/use-active-chat";
import { useDrawerMain } from "~/composables/state/use-drawer-main";

const { analyticsEnabled, gtmId: GTMID } = useRuntimeConfig().public;

const { finalizePendingLocaleChange } = useI18n();

const chatActive = useActiveChat();
const drawerMain = useDrawerMain();

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

    <!-- render active chat -->
    <AppDrawerDefault
      :model-value="chatActive.isActive.value"
      @update:model-value="(m) => !m && chatActive.clear()"
      id="drawer-chat"
    >
      <AppChatDefault
        v-if="chatActive.current.value"
        :chat="chatActive.current.value"
      />
    </AppDrawerDefault>

    <!-- render sidebar main -->
    <AppDrawerDefault
      v-model="drawerMain.isActive.value"
      location="start"
      id="drawer-main"
    >
      <template #close="{ close, closeClasses }">
        <VBtn
          variant="plain"
          icon
          rounded="full"
          color="on-surface"
          :class="[closeClasses, 'end-1']"
          @click="close"
        >
          <IconX icon="$prev" size="1.92rem" />
        </VBtn>
      </template>
      <VSpacer class="mt-12" />
      <VCardText>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab repellat
          id repudiandae voluptate reprehenderit ullam praesentium quasi,
          dignissimos, accusantium ad assumenda? Quae et, inventore impedit
          reiciendis quis architecto nesciunt dolorem.
        </p>
      </VCardText>
    </AppDrawerDefault>

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
