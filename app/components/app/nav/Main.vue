<script setup lang="ts">
import { useAuth } from "~/stores/use-auth.store";
import { useTheme } from "vuetify";

const auth = useAuth();
const localePath = useLocalePath();
const theme = useTheme();

// @@eos
</script>

<template>
  <VAppBar elevation="1" color="surface-bright">
    <template #prepend>
      <VSpacer class="ms-1" />
      <VAppBarNavIcon disabled class="opacity-50" rounded="full" />
    </template>
    <template #append>
      <VBtn
        v-if="!auth.isAuth"
        icon
        rounded="full"
        :to="localePath({ name: 'auth' })"
      >
        <IconX class="opacity-50" icon="mdi:account-circle" size="1.5em" />
        <VTooltip
          text="Prijava"
          :theme="theme.global.name.value != 'dark' ? 'dark' : undefined"
          :content-props="{ elevation: 1 }"
        />
      </VBtn>
      <VBtn v-else icon rounded="full" @click="auth.logout()">
        <IconX class="opacity-50" icon="mdi:logout" size="1.44em" />
        <VTooltip
          text="Izlaz"
          :theme="theme.global.name.value != 'dark' ? 'dark' : undefined"
          :content-props="{ elevation: 1 }"
        />
      </VBtn>
      <VSpacer class="me-1" />
    </template>
  </VAppBar>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
