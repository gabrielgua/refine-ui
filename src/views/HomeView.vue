<script setup lang="ts">
import Button from '@/components/Button.vue';
import Header from '@/components/Header.vue';
import Icon from '@/components/Icon.vue';
import Sidebar from '@/components/Sidebar.vue';
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
            <Icon icon="clock" />
            Atendimento
          </Button>
        </RouterLink>
      </section>
      <RouterView />
    </section>
  </section>
</template>
