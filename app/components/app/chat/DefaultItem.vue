<script setup lang="ts">
import { useAppConfigItem } from "~/composables/utils/use-app-config-item";
import { ms } from "~/utils/firebase";

const props = defineProps<{ item: any }>();
const emit = defineEmits<{
  onDelete: [id: string];
}>();

const { $$, $dt } = useNuxtApp();
const uname = computed(() => $$.get(props.item, "data.user"));
const content = computed(() => $$.get(props.item, "data.content"));
const fromNow = computed(() => {
  const t = props.item["@"];
  return t ? $dt.dayjs(ms(t)).fromNow() : "";
});

const uid = computed(() => $$.get(props.item, "data.uid"));
const userTokenLocal = useLocalStorage(
  useAppConfigItem("keys.USER_TOKEN_LOCAL").value ?? "",
  "",
);
const owns = computed(() => userTokenLocal.value === uid.value);

// @@eos
</script>

<template>
  <VCard
    class="component--AppChatDefaultItem"
    :color="owns ? 'surface-bright' : 'surface-variant'"
  >
    <VBtn
      v-if="owns"
      variant="plain"
      icon
      color="error"
      rounded="full"
      class="position-absolute top-1 end-1 opacity-50"
      @click="emit('onDelete', props.item.id)"
    >
      <IconX icon="mdi:delete" size="1.22rem" />
    </VBtn>
    <VCardText>{{ content }}</VCardText>
    <VCardSubtitle class="!flex pa-3">
      <span class="text-sm">
        {{ uname }}
      </span>
      <VSpacer />
      <small class="opacity-50 italic"> ⌚ {{ fromNow }} </small>
    </VCardSubtitle>
  </VCard>
</template>

<!-- scoped component styles -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles -->
<style lang="scss"></style>
