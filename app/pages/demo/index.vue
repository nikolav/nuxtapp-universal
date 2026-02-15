<script setup lang="ts">
import { useOnceMountedAuth } from "~/composables/utils/use-once-mounted-auth";
import { useAuth } from "~/stores/use-auth.store";
import { onDebug } from "~/utils/on-debug";

definePageMeta({
  layout: "default",
});

const auth = useAuth();

useOnceMountedAuth([], () => {
  onDebug({ "page-init:has-auth:demo": true });
});

// 76979871
// DyXl4c2XN-o
// @@eos
</script>

<template>
  <section class="app-container-reset page--demo">
    <h2>page:demo</h2>
    <div class="space-x-2 ms-2">
      <button
        @click="
          auth.authenticate({
            email: 'admin@nikolav.rs',
            password: 'admin@nikolav.rs',
          })
        "
      >
        authenticate
      </button>
      <button
        @click="
          auth.register({
            email: 'admin@nikolav.rs',
            password: 'admin@nikolav.rs',
          })
        "
      >
        registr
      </button>
    </div>
    <div>
      <small>
        <pre>
          account: [{{ auth.account }}]
        </pre>
      </small>
    </div>
  </section>
</template>

<!-- scoped component styles, default -->
<style lang="scss" scoped></style>
<!-- css modules, per-class hashing -->
<style module></style>
<!-- global styles, rare, prefer styles.scss -->
<style lang="scss"></style>
