<script lang="ts" setup>
defineProps<{
  height: string;
}>();
</script>
<template>
  <ul class="scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-absolute overflow-y-auto"
    :style="{ 'max-height': height }">
    <slot />
  </ul>
</template>
<style>
.scrollbar-absolute {
  scrollbar-gutter: stable both-edges;
}
</style>
