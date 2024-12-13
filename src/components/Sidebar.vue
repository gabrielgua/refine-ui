<script lang="ts" setup>
withDefaults(defineProps<{
  state?: 'expanded' | 'shrunken'
}>(), {
  state: 'expanded'
});

const width = 'min-w-[280px]';


</script>
<template>
  <aside class="h-dvh border-r shadow" :class="width">
    Sidebar
  </aside>
</template>
