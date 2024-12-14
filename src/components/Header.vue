<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth.store';
import { useThemeStore } from '@/stores/theme.store';
import { MoonIcon, PowerIcon, SunIcon } from '@heroicons/vue/24/solid';
import Avatar from './Avatar.vue';
import Button from './Button.vue';


const themeStore = useThemeStore();
const authStore = useAuthStore();


</script>
<template>
  <header class="flex items-center justify-between p-4 w-full border-b dark:border-b-zinc-100/10">
    <section class="flex items-center gap-4">
      <Avatar :seed="authStore.authentication?.name" />
      <div class="text-sm">
        <p><span class="font-semibold">Olá, </span><br>{{ authStore.authentication?.name }}</p>
      </div>
    </section>

    <section class="flex gap-2">

      <Button variant="secondary" :click="() => themeStore.toggle()">
        <MoonIcon class="size-4" v-if="themeStore.isDark" />
        <SunIcon class="size-4" v-else />
      </Button>
      <Button variant="danger" :click="authStore.logout">
        <PowerIcon class=" size-4" />
      </Button>
    </section>
  </header>
</template>
