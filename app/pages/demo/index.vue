<script setup lang="ts">
import { useGraphql } from "~/composables/request/use-graphql";
import { Q_status } from "~/graphql";

definePageMeta({
  layout: "debug",
});

const { $$ } = useNuxtApp();

const dd = useGraphql({
  key: "dd:Q_status",
  document: Q_status,
  variables: { x: "FOO:2" },
  transform: (d) => $$.get(d, "status.result"),
});

// @@eos
</script>

<template>
  <AppBoxPageWrap class="page--demo">
    <VAlert tile variant="flat" color="primary-variant" prominent>
      <template #prepend>
        <IconX icon="mdi:file-outline" size="1.5rem" />
      </template>
      page:demo
    </VAlert>
    <AppBoxBase>
      <small>
        <pre>{{ dd.data.value }}</pre>
      </small>
    </AppBoxBase>
  </AppBoxPageWrap>
</template>
