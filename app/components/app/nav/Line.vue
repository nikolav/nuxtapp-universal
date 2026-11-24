<template>
  <AppBoxFlex center class="component--AppNavLine gap-2 ps-1">
    <NuxtLinkLocale :to="{ name: 'index' }">home</NuxtLinkLocale>
    <NuxtLinkLocale :to="{ name: 'auth' }">auth</NuxtLinkLocale>
    <NuxtLinkLocale :to="{ name: 'demo' }">demo</NuxtLinkLocale>
  </AppBoxFlex>
</template>
