<script setup lang="ts">
import { useFilePicker } from "~/composables/fs/use-file-picker";
import { useMediaUrl } from "~/composables/media/use-data-url";

const nodeUrls = useMediaUrl({ link: true });
const filePicker = useFilePicker();

const preview = () => {
  filePicker.open({ accept: "*" }).subscribe((files) => {
    const [file] = files ?? [];
    nodeUrls.media.value = file;
  });
};

// @@eos
</script>

<template>
  <section class="app-container-reset page--demo">
    <h1>page:demo</h1>
    <div class="flex justify-center gap-2">
      <button @click="preview">ok</button>
    </div>
    <div class="flex justify-center gap-2 break-all">
      <small>
        {{ nodeUrls.link }}
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
