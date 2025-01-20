<script setup lang="ts">
import { RouterView } from 'vue-router';

</script>

<template>
  <RouterView />
</template>

<style>
html.dark {
  color-scheme: dark;
}

html,
body {
  @apply transition-all
}

body {
  background-color: #f5f5f5;
  @apply dark:bg-zinc-800
}
</style>
