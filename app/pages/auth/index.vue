<script setup lang="ts">
import { z } from "zod";
import { useDisplay } from "vuetify";

import { useAuth } from "~/stores/use-auth.store";
import { useForm } from "~/composables/forms/use-form";
import { useToggleFlag } from "~/composables/utils/use-toggle-flag";

definePageMeta({
  context: {
    title: "pages.auth.title",
    description: "pages.auth.description",
    appBar: false,
  },
  layout: "default",
  middleware: ["guest"],
  i18n: {
    paths: {
      sr: "/prijava",
      "sr-cyrl": "/prijava",
      en: "/auth",
    },
  },
});

const { t } = useI18n();
const auth = useAuth();
const { smAndUp } = useDisplay();
const form = useForm(
  "117d9e62-bcda-57ba-95a8-c0e86cbdfa2c",
  {
    email: z.email(),
    password: z.string().trim().min(3),
  },
  {
    onSubmit: (creds: any) => {
      auth.authenticate(creds);
    },
  },
);

const toggleEmailDirty = useToggleFlag();
const togglePasswordDirty = useToggleFlag();
const togglePasswordType = useToggleFlag(true);
const passwordType = computed(() =>
  togglePasswordType.isActive.value ? "password" : "text",
);

// @@eos
</script>

<template>
  <section class="app-container-reset page--login">
    <VContainer :max-width="550" class="mx-auto mt-12">
      <VForm @submit.prevent="form.handle" id="form-login">
        <VCard :class="{ 'mx-1': !smAndUp }">
          <VCardItem class="pa-3 bg-surface-variant">
            <template #prepend>
              <IconX
                icon="material-symbols:person"
                size="1.44em"
                class="opacity-30"
              />
            </template>
            <VCardTitle class="text-center -ms-5">{{
              t("form.login.title")
            }}</VCardTitle>
          </VCardItem>
          <VCardText class="mt-10 space-y-3 pa-3">
            <VTextField
              v-model="form.field.email!.value"
              type="email"
              :label="t('form.login.label.email')"
              autocomplete="off"
              center-affix
              clearable
              @update:focused="toggleEmailDirty.on"
            >
              <template #prepend>
                <IconX
                  icon="material-symbols:mail-outline"
                  class="opacity-30 me-2 transition-transform"
                  :class="{
                    'text-error':
                      toggleEmailDirty.isActive.value &&
                      form.error.email?.value,
                    'scale-125':
                      toggleEmailDirty.isActive.value &&
                      form.error.email?.value,
                  }"
                  size="1.33rem"
                />
              </template>
            </VTextField>
            <VTextField
              v-model="form.field.password!.value"
              :type="passwordType"
              :label="t('form.login.label.password')"
              autocomplete="off"
              clearable
              center-affix
              @update:focused="togglePasswordDirty.on"
            >
              <template #prepend>
                <IconX
                  icon="mdi:key"
                  class="opacity-30 me-2 transition-transform"
                  :class="{
                    'text-error':
                      togglePasswordDirty.isActive.value &&
                      form.error.password?.value,
                    'scale-125':
                      togglePasswordDirty.isActive.value &&
                      form.error.password?.value,
                  }"
                  size="1.33rem"
                />
              </template>
              <template #append-inner>
                <VBtn
                  color="on-surface-lighten-1"
                  @click="togglePasswordType"
                  icon
                  variant="plain"
                  rounded="full"
                >
                  <IconX
                    size="1.33rem"
                    :icon="
                      togglePasswordType.isActive.value
                        ? 'mdi:eye'
                        : 'mdi:eye-off'
                    "
                  />
                </VBtn>
              </template>
            </VTextField>
          </VCardText>
          <VCardActions class="mt-5 pa-4">
            <VSpacer />
            <VBtn
              :disabled="!form.valid.value"
              :color="!form.valid.value ? 'on-surface' : 'primary'"
              size="large"
              class="px-3"
              type="submit"
            >
              <template #prepend>
                <IconX icon="mdi:login" class="me-1 opacity-85" size="1.22em" />
              </template>
              {{ t("form.login.label.submit") }}
            </VBtn>
          </VCardActions>
        </VCard>
      </VForm>
    </VContainer>
  </section>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
