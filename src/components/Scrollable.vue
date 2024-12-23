<script lang="ts" setup>
defineProps<{
  height?: string;
}>();
</script>
<template>
  <div class="scrollbar-thin scrollbar-thumb-rounded-xl overflow-y-auto" :style="{ 'max-height': height }">
    <slot />
  </div>
</template>
<style></style>
