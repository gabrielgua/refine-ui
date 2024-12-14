<script setup lang="ts">
import { useClockStore } from '@/stores/clock.store';
import Logo from '../Logo.vue';
import Button from '../Button.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import Container from '../Container.vue';
import Icon from '../Icon.vue';
import ThemeSwitcher from '../ThemeSwitcher.vue';
import { useAuthStore } from '@/stores/auth.store';

onMounted(() => clockStore.init())
onBeforeUnmount(() => clockStore.clear())

const clockStore = useClockStore();
const active = ref<boolean>(false);
const { logout } = useAuthStore();

defineEmits(['fullscreen']);

</script>
<template>
  <div class="border-b border-b-zinc-100 shadow-sm bg-white dark:bg-zinc-900 dark:border-b-zinc-100/10 py-4 ">
    <Container class="flex justify-between ">
      <Logo />
      <section class="flex items-center gap-4">
        <div class="flex items-center gap-4">
          <span class="size-3 rounded-full" :class="[active ? 'bg-teal-500' : 'bg-rose-500']" />
          <p class="text-xl">{{ clockStore.time }}</p>
        </div>
        <ThemeSwitcher />
        <Button variant="success" :click="() => $emit('fullscreen')">
          <Icon icon="fa-expand" size="large" color="text-inherit" />
        </Button>
        <Button variant="danger" :click="logout">
          <Icon icon="fa-xmark" size="large" color="text-inherit" />
        </Button>
      </section>
    </Container>
  </div>

</template>
