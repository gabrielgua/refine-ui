<script setup lang="ts">
import { useThemeStore } from '@/stores/theme.store';
import Button from './Button.vue';
import Icon, { type IconSize } from './Icon.vue';

defineProps<{ size?: IconSize }>();


const themeStore = useThemeStore();

</script>
<template>
  <Button variant="secondary" :click="() => themeStore.toggle()">
    <Icon :icon="themeStore.isDark ? 'fa-sun' : 'fa-moon'" :size="size" />
  </Button>
</template>


<style scoped></style>
