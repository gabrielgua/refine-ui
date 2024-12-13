<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';

</script>

<template>
  <section class="flex dark-theme">
    <Sidebar />

    <section class="w-full">
      <Header />
      <RouterView />
    </section>
  </section>
</template>

<style>
html.dark {
  color-scheme: dark;
}

body {
  background-color: #f5f5f5;
  @apply dark:bg-zinc-800
}
</style>
