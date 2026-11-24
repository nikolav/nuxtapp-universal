<script setup lang="ts">
import { useGraphql } from "~/composables/request/use-graphql";
import { Q_status } from "~/graphql";

definePageMeta({
  layout: "debug",
});

const { $$ } = useNuxtApp();

const x = shallowRef<string>("FOO");

const dd = useGraphql({
  key: "dd:Q_status",
  document: Q_status,
  variables: { x },
  transform: (d) => $$.get(d, "status.result"),
});

const updates = () => {
  x.value = `FOO:${Math.random()}`;
};

// @@eos
</script>

<template>
  <AppBoxPageWrap class="page--demo">
    <VAlert tile variant="tonal">
      <template #prepend>
        <IconX icon="mdi:file-outline" size="1.5rem" />
      </template>
      <template #title> foo </template>
      <template #text>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ipsum
          iure aliquid.
        </p>
      </template>
    </VAlert>
    <VBtn @click="updates">updates</VBtn>
    <AppBoxBase>
      <small>
        <pre>{{ dd.data.value }}</pre>
      </small>
    </AppBoxBase>
  </AppBoxPageWrap>
</template>
