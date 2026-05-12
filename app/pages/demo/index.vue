<script setup lang="ts">
import { useFilePicker } from "~/composables/fs/use-file-picker";
import { useFileStoarage } from "~/composables/fs/use-file-storage";

const filePicker = useFilePicker();
const fileStorage = useFileStoarage("/misc");

const upload = () => {
  filePicker.open({ accept: "*", multiple: false }).subscribe((files) => {
    fileStorage.push({
      "file-1": useNuxtApp().$$.first(files),
    });
  });
};

const ls = () => {
  fileStorage.pull();
};

const rm = () => {
  fileStorage.rm("file-1");
};

const show = () => {
  console.log(fileStorage.meta("file-1"));
};

// @@eos
</script>

<template>
  <section class="app-container-reset page--demo">
    <h1>page:demo</h1>
    <div class="flex justify-center gap-2">
      <button @click="upload">upload</button>
      <button @click="ls">ls</button>
      <button @click="rm">rm</button>
      <button @click="show">show</button>
    </div>
    <div>
      <small>
        <pre>{{ fileStorage.files.value }}</pre>
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
