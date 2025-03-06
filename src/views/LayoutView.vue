<script setup lang="ts">
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';

</script>

<template>
  <section class="flex">
    <Sidebar />

    <section class="w-full h-dvh flex flex-col overflow-y-auto">
      <Header />
      <RouterView />
    </section>
  </section>
</template>
