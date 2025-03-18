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
  return authStore.user?.email.split('@')[0] || '';
});

</script>
<template>
  <header class="flex items-center justify-between p-4 w-full border-b dark:border-b-zinc-100/10">
    <Breadcrumb />
    <section class="flex items-center divide-x divide-zinc-200 dark:divide-zinc-100/10">
      <div class="text-sm text-end pe-4">
        <p><span class="text-xs ">Loja </span><br>{{ authStore.user?.store }}</p>
      </div>
      <div class="flex items-center gap-4 px-4">
        <Avatar :seed="authStore.user?.email" size="small" />
        <div class="text-sm">
          <p><span class="text-xs">Olá, </span><br>{{ username }}</p>
        </div>
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
