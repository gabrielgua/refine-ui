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
    <Button class="w-full h-full" :variant="variant">
      <div class="grid place-items-center p-6">
        <Icon :icon="icon" />
        <slot />
      </div>
    </Button>
  </RouterLink>
</template>
