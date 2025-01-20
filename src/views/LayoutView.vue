<script setup lang="ts">
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';

</script>

<template>
  <section class="flex">
    <Sidebar />

    <section class="w-full">
      <Header />
      <RouterView />
    </section>
  </section>
</template>
