<script lang="ts" setup>
import Icon from '../Icon.vue';

withDefaults(defineProps<{
  icon?: string,
  iconColor?: string,
}>(), {
  iconColor: 'text-sky-600'
})
</script>
<template>
  <div
    class="p-4 dark:bg-zinc-900 border-b border-b-zinc-100 dark:border-b-zinc-100/10 rounded-t-xl flex items-center gap-4">
    <Icon v-if="icon" :icon="icon" :color="iconColor" />
    <slot />
  </div>

</template>
