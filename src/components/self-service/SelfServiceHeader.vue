<script setup lang="ts">
import { useClockStore } from '@/stores/clock.store';
import Logo from '../Logo.vue';
import Button from '../Button.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import Container from '../Container.vue';
import Icon from '../Icon.vue';
import ThemeSwitcher from '../ThemeSwitcher.vue';
import { useAuthStore } from '@/stores/auth.store';
import { useScheduleStore } from '@/stores/schedule.store';
import SelfServiceStatus from './SelfServiceStatus.vue';

onMounted(() => clockStore.init())
onBeforeUnmount(() => clockStore.clear())

const clockStore = useClockStore();
const authStore = useAuthStore();

const scheduleStore = useScheduleStore();

defineEmits(['fullscreen']);

</script>
<template>
  <div class="border-b border-b-transparent shadow-xs bg-white dark:bg-zinc-900 dark:border-b-zinc-100/20 py-4">
    <Container class="flex justify-between ">
      <RouterLink to="/home">
        <Logo />
      </RouterLink>
      <section class="flex items-center divide-x divide-zinc-200 dark:divide-zinc-100/10">
        <p class="text-xs text-end pe-6">
          Horário<br />
          <span class="text-xl">{{ clockStore.time }}</span>
        </p>
        <p class="text-xs text-end px-6">
          Status<br />
          <span class="flex items-center gap-2 text-xl"
            :class="scheduleStore.schedule?.serving ? 'text-teal-500' : 'text-rose-500'">
            <SelfServiceStatus v-if="scheduleStore.schedule" :serving="scheduleStore.schedule.serving" />
            <span class="hidden md:block">{{ scheduleStore.schedule?.serving ? 'Aberto' : 'Fechado' }}</span>
          </span>
        </p>
        <p class="text-xs text-end px-6">
          Loja<br />
          <span class="text-xl">{{ authStore.user?.store.name }}</span>
        </p>
        <div class="flex items-center gap-2 ps-6">
          <ThemeSwitcher size="large" />
          <Button variant="success" :click="() => $emit('fullscreen')">
            <Icon icon="fa-expand" size="large" color="text-inherit" />
          </Button>
          <Button variant="danger" :click="authStore.logout">
            <Icon icon="fa-xmark" size="large" color="text-inherit" />
          </Button>
        </div>
      </section>
    </Container>
  </div>

</template>
