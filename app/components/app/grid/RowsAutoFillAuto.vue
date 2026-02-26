<script setup lang="ts">
const props = defineProps<{
  propsBody?: any;
  propsTop?: any;
  propsBottom?: any;
}>();

// @@eos
</script>

<template>
  <section
    class="app-container-reset component--AppGridTwoRowsBottomAuto grid grid-cols-1 grid-rows-auto-fill-auto"
  >
    <header class="app-container-reset" v-bind="props.propsTop">
      <slot name="top" />
    </header>
    <div class="app-container-reset" v-bind="props.propsBody">
      <slot />
    </div>
    <footer class="app-container-reset" v-bind="props.propsBottom">
      <slot name="bottom" />
    </footer>
  </section>
</template>
