<script setup lang="ts">
import { useClockStore } from '@/stores/clock.store';
import Logo from '../Logo.vue';
import Button from '../Button.vue';
import { ArrowsPointingOutIcon, XMarkIcon } from '@heroicons/vue/16/solid';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import Container from '../Container.vue';

onMounted(() => clockStore.init())
onBeforeUnmount(() => clockStore.clear())

const clockStore = useClockStore();
const active = ref<boolean>(false);

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
        <Button variant="success" :click="() => $emit('fullscreen')">
          <ArrowsPointingOutIcon class="size-6" />
        </Button>
        <Button variant="danger">
          <XMarkIcon class="size-6" />
        </Button>
      </section>
    </Container>
  </div>

</template>
