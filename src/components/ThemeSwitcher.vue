<script setup lang="ts">
import { useThemeStore } from '@/stores/theme.store';
import Button from './Button.vue';
import Icon from './Icon.vue';


const themeStore = useThemeStore();

</script>
<template>
  <Button variant="secondary" :click="() => themeStore.toggle()">
    <Icon :icon="themeStore.isDark ? 'fa-sun' : 'fa-moon'" />
  </Button>
</template>


<style scoped></style>
