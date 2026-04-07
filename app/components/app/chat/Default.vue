<script setup lang="ts">
import { z } from "zod";
import type { VSheet } from "vuetify/components/VSheet";
import { useSubscription } from "@vueuse/rxjs";

import type { TOrNoValue } from "~/types";
import { onDebug } from "~/utils/on-debug";
import { useDocs } from "~/composables/docs/use-docs";
import { useForm } from "~/composables/forms/use-form";
import { useDom } from "~/composables/dom/use-dom";
import { useOnceMounted } from "~/composables/utils/use-once-mounted-on";
import { useAppConfigItem } from "~/composables/utils/use-app-config-item";

const props = defineProps<{ chat: string }>();

const { $$ } = useNuxtApp();

const refFormSheet = useTemplateRef<TOrNoValue<VSheet>>("form-sheet");
const { height: hFormSheet } = useElementSize(
  computed(() => refFormSheet.value?.$el),
);

const docs = useDocs(props.chat, "chats");
const docsSortedDate = computed(() =>
  $$.orderBy(docs.data.value, "@.seconds", "asc"),
);

const userTokenLocal = useLocalStorage(
  useAppConfigItem<string>("keys.USER_TOKEN_LOCAL").value ?? "",
  "",
);
const form = useForm(
  "form:chat-main",
  {
    user: z.string().trim().nonempty(),
    content: z.string().trim().nonempty(),
  },
  {
    onSubmit: async (msg: any) => {
      try {
        await docs.commit({ ...msg, uid: userTokenLocal.value });
        form.clear("content");
      } catch (error) {
        onDebug({ "message:commit": error });
      }
    },
  },
);

const scrollBottomOnMessageAdded = () => {
  useSubscription(
    useDom("#drawer-chat .v-navigation-drawer__content").subscribe(
      (collection) => {
        const el = collection?.[0];
        el?.scrollTo({ top: el?.scrollHeight, behavior: "smooth" });
      },
    ),
  );
};
// @new-chat-data; scroll chat bottom
watch(
  () => docs.data.value.length,
  (len: number, len_: number) => {
    // on message added
    if (len_ < len) scrollBottomOnMessageAdded();
  },
  { flush: "post" },
);

// store local user name
const displayName = useLocalStorage(
  useAppConfigItem<string>("keys.CHAT_DISPLAY_NAME").value ?? "",
  "",
);
watch(
  () => form.field.user?.value,
  (uname: any) => {
    displayName.value = String(uname || "");
  },
);

// @boot; load local user name
onMounted(() => {
  if (displayName.value) {
    form.field.user!.value = displayName.value;
  }
});

// @boot; sync docs
useOnceMounted([], () => {
  docs.start();
});

// @@eos
</script>

<template>
  <section
    class="app-container-reset component--AppChatMain h-full position-relative"
  >
    <!-- add padding to offset form-sheet -->
    <div
      class="__spacer__ mt-12"
      :style="{ 'padding-bottom': `calc(${hFormSheet}px + 1.22rem)` }"
    >
      <!-- render chat -->
      <VDataIterator
        :items="docsSortedDate"
        :items-per-page="-1"
        item-value="id"
      >
        <template #no-data>
          <p class="text-center">📴 no chat data</p>
        </template>
        <template #default="d">
          <div class="space-y-2 px-2">
            <AppChatDefaultItem
              @on-delete="docs.rm"
              v-for="it in d.items"
              :item="it.raw"
            />
          </div>
        </template>
      </VDataIterator>
    </div>

    <!-- form -->
    <VSheet
      tile
      elevation="5"
      class="position-fixed bottom-0 inset-x-0"
      ref="form-sheet"
    >
      <VForm class="pa-2 space-y-2" @submit.prevent="form.handle">
        <div class="flex items-center">
          <VTextarea
            rows="2"
            autofocus
            variant="plain"
            clearable
            density="comfortable"
            class="flex-grow"
            hide-details
            v-model="form.field.content!.value"
          >
            <template #prepend-inner>
              <IconX icon="mdi:feather" class="opacity-20" />
            </template>
          </VTextarea>
          <VBtn
            type="submit"
            icon
            rounded="full"
            :class="{
              'flex-grow-0 ms-3': true,
              'opacity-50': !form.valid.value,
            }"
            color="on-surface"
            :disabled="!form.valid.value"
          >
            <IconX
              icon="mdi:send"
              :class="{
                '-rotate-45 translate-x-[2px] -translate-y-[2px]': true,
                'text-primary-darken-1': form.valid.value,
              }"
              size="1.5em"
            />
          </VBtn>
        </div>
        <VTextField
          label="Ime"
          variant="solo"
          single-line
          density="comfortable"
          hide-details
          v-model="form.field.user!.value"
        >
          <template #prepend-inner>
            <IconX
              icon="mdi:account"
              :class="{
                'opacity-20 me-1': true,
                'text-error': form.error.user!.value,
              }"
            />
          </template>
        </VTextField>
      </VForm>
    </VSheet>
  </section>
</template>

<!-- scoped component styles -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles -->
<style lang="scss"></style>
