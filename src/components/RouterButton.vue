<script setup lang="ts">
import Button from './Button.vue';
import Icon from './Icon.vue';

defineProps<{
  to: string
  icon: string
}>();
</script>
<template>
  <RouterLink :to="to">
    <Button class="grid place-items-center w-full p-6">
      <Icon :icon="icon" />
      <slot />
    </Button>
  </RouterLink>
</template>
