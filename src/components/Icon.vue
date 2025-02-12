<script setup lang="ts">
type IconSize = 'small' | 'normal' | 'large';

withDefaults(defineProps<{
  icon: string,
  color?: string,
  size?: IconSize
}>(), {
  size: 'normal',
  color: 'text-inherit'
});

const sizes = new Map<IconSize, string>([
  ['small', 'size-3'],
  ['normal', 'size-4'],
  ['large', 'size-6'],
])

</script>
<template>
  <faicon :icon="icon" :class="[sizes.get(size), color]" />
</template>
