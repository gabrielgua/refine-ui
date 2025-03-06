<script setup lang="ts">
import Breadcrumb from './Breadcrumb.vue';
import Divider from './Divider.vue';
import Icon from './Icon.vue';

defineProps<{
  title: string,
  icon: string,
}>();
</script>

<template>
  <section class="p-4 flex flex-col gap-6 overflow-y-auto">
    <Breadcrumb />
    <Divider />
    <slot />
  </section>
</template>
