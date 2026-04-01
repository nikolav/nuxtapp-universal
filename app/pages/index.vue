<script setup lang="ts">
import { useToggleFlag } from "~/composables/utils/use-toggle-flag";

definePageMeta({
  title: "pages.index.title",
  description: "pages.index.description",
  layout: "default",
  i18n: {
    paths: {
      sr: "/dobrodosli",
      "sr-cyrl": "/dobrodosli",
      en: "/welcome",
    },
  },
});

const toggleActive = useToggleFlag();

// @@eos
</script>

<template>
  <section class="app-container-reset page--index">
    <h2>page:home</h2>
    <AppVBtn @click="toggleActive"> ok </AppVBtn>
    <AppOverlayScreen v-model="toggleActive.isActive.value">
      <VListItem>
        <template #append>
          <VBtn
            icon
            color="on-surface"
            rounded="full"
            variant="plain"
            @click="toggleActive.off"
          >
            <IconX icon="$close" />
          </VBtn>
        </template>
      </VListItem>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas, sapiente
        cum. Numquam quam nostrum, molestias quasi dicta ut saepe libero, autem
        laborum corrupti facilis maiores doloremque! Accusantium veritatis aut
        esse.
      </p>
    </AppOverlayScreen>
  </section>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
