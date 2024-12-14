<script setup lang="ts">
import Button from '@/components/Button.vue';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import { ClockIcon } from '@heroicons/vue/24/solid';
import { RouterView } from 'vue-router';

</script>

<template>
  <section class="flex dark-theme">
    <Sidebar />

    <section class="w-full">
      <Header />
      <section class="p-4">
        <RouterLink to="/self-service">
          <Button class="flex-col">
            <ClockIcon class="size-5" />
            Atendimento
          </Button>
        </RouterLink>
      </section>
      <RouterView />
    </section>
  </section>
</template>
