<script setup lang="ts">
import Button, { type ButtonVariant } from './Button.vue';
import Icon from './Icon.vue';

defineProps<{
  to: string
  icon: string,
  variant?: ButtonVariant
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
