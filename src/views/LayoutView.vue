<script setup lang="ts">
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';

</script>

<template>
  <section class="flex">
    <Sidebar />

    <section class="w-full h-dvh flex flex-col">
      <Header />
      <section class="overflow-y-auto grow">
        <RouterView />
      </section>
    </section>
  </section>
</template>
