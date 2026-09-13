<script setup lang="ts">
const icons = {
  alt: "$alt",
  arrowdown: "$arrowdown",
  arrowleft: "$arrowleft",
  arrowright: "$arrowright",
  arrowup: "$arrowup",
  backspace: "$backspace",
  calendar: "$calendar",
  cancel: "$cancel",
  checkboxIndeterminate: "$checkboxIndeterminate",
  checkboxOff: "$checkboxOff",
  checkboxOn: "$checkboxOn",
  clear: "$clear",
  close: "$close",
  collapse: "$collapse",
  color: "$color",
  command: "$command",
  complete: "$complete",
  ctrl: "$ctrl",
  delete: "$delete",
  delimiter: "$delimiter",
  dropdown: "$dropdown",
  edit: "$edit",
  enter: "$enter",
  error: "$error",
  expand: "$expand",
  eyeDropper: "$eyeDropper",
  file: "$file",
  first: "$first",
  fullscreen: "$fullscreen",
  fullscreenExit: "$fullscreenExit",
  info: "$info",
  last: "$last",
  loading: "$loading",
  menu: "$menu",
  minus: "$minus",
  next: "$next",
  pause: "$pause",
  play: "$play",
  plus: "$plus",
  prev: "$prev",
  radioOff: "$radioOff",
  radioOn: "$radioOn",
  ratingEmpty: "$ratingEmpty",
  ratingFull: "$ratingFull",
  ratingHalf: "$ratingHalf",
  search: "$search",
  shift: "$shift",
  sortAsc: "$sortAsc",
  sortDesc: "$sortDesc",
  space: "$space",
  subgroup: "$subgroup",
  success: "$success",
  tableGroupCollapse: "$tableGroupCollapse",
  tableGroupExpand: "$tableGroupExpand",
  treeviewCollapse: "$treeviewCollapse",
  treeviewExpand: "$treeviewExpand",
  unfold: "$unfold",
  upload: "$upload",
  volumeHigh: "$volumeHigh",
  volumeLow: "$volumeLow",
  volumeMedium: "$volumeMedium",
  volumeOff: "$volumeOff",
  warning: "$warning",
};
</script>

<template>
  <v-container>
    <v-row dense>
      <v-col
        v-for="(icon, name) in icons"
        :key="name"
        cols="4"
        sm="3"
        md="2"
        lg="1"
      >
        <v-card class="text-center pa-2" elevation="1">
          <div class="icon-wrapper">
            <v-icon :icon="icon" size="32" />
          </div>
          <div class="mt-2 text-caption text--secondary">
            <code>{{ name }}</code>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 48px;
}

code {
  background: rgba(0, 0, 0, 0.05);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
}

.v-card:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
}
</style>
