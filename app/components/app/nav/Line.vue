<template>
  <AppBoxFlex class="component--AppNavLine items-center gap-2">
    <NuxtLinkLocale :to="{ name: 'demo' }">demo</NuxtLinkLocale>
    <NuxtLinkLocale :to="{ name: 'index' }">home</NuxtLinkLocale>
    <NuxtLinkLocale :to="{ name: 'auth' }">auth</NuxtLinkLocale>
  </AppBoxFlex>
</template>
