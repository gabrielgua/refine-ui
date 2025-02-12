<script setup lang="ts">
import Divider from './Divider.vue';
import Icon from './Icon.vue';

defineProps<{
  title: string,
  icon: string,
}>();
</script>

<template>
  <section class="p-4 flex flex-col gap-6">
    <div class="flex items-center gap-2">
      <p class="text-sm">Home</p>
      <Icon icon="chevron-right" size="small" color="text-sky-600" />

      <p class="text-sm text-sky-600">Products</p>

    </div>

    <header class="flex items-center gap-4 ">
      <Icon :icon="icon" color="text-sky-600" />
      <h2 class="text-3xl">{{ title }}</h2>
    </header>
    <!-- <Divider /> -->

    <slot />
  </section>
</template>
