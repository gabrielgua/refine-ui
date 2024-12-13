<script lang="ts" setup>
import { CheckIcon, PowerIcon } from '@heroicons/vue/16/solid';
import Avatar from './Avatar.vue';
import Button from './Button.vue';
import { useThemeStore } from '@/stores/theme.store';
import { PlusCircleIcon } from '@heroicons/vue/16/solid';
import { CheckCircleIcon } from '@heroicons/vue/24/solid';


const themeStore = useThemeStore();

</script>
<template>
  <header class="transition-all flex items-center justify-between p-4 shadow-md w-full ">
    <section class="flex items-center gap-4">
      <Avatar />
      <div class="text-sm">
        <p><span class="font-semibold">Olá, </span><br>Gabriel Guaitanele Niszczak</p>
      </div>
    </section>

    <Button variant="primary" :click="() => themeStore.toggle()">
      <!-- <PowerIcon class="size-5 font-bold" /> -->
      {{ themeStore.isDark ? 'Dark' : 'Light' }}
    </Button>
    <section class="flex gap-3 flex-wrap">

      <Button variant="primary">
        <CheckIcon class="size-5 font-bold" />
        <p>Adicionar</p>
      </Button>
      <Button variant="secondary">
        <PowerIcon class="size-5 font-bold" />
        Logout
      </Button>
      <Button variant="danger">
        <PowerIcon class="size-5 font-bold" />
        Logout
      </Button>
      <Button variant="success">
        <PowerIcon class="size-5 font-bold" />
        Logout
      </Button>


    </section>
  </header>

</template>
