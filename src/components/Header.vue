<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth.store';
import { computed } from 'vue';
import Avatar from './Avatar.vue';
import Button from './Button.vue';
import Icon from './Icon.vue';
import ThemeSwitcher from './ThemeSwitcher.vue';
import Breadcrumb from './Breadcrumb.vue';



const authStore = useAuthStore();

const username = computed(() => {
  return authStore.authentication?.email.split('@')[0] || '';
});

</script>
<template>
  <header class="flex items-center justify-between p-4 w-full border-b dark:border-b-zinc-100/10">
    <Breadcrumb />
    <section class="flex items-center divide-x divide-zinc-100 dark:divide-zinc-100/10">
      <div class="flex items-center gap-4 pe-4">
        <div class="text-sm text-end">
          <p><span class="text-xs">Olá, </span><br>{{ username }}</p>
        </div>
        <Avatar :seed="authStore.authentication?.email" size="small" />
      </div>
      <div class="flex gap-2 ps-4">
        <ThemeSwitcher />
        <Button variant="danger" :click="authStore.logout">
          <Icon icon="fa-power-off" />
        </Button>
      </div>
    </section>

  </header>
</template>
