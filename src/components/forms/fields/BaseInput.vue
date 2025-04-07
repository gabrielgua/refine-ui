<script lang="ts" setup>
import Icon from '@/components/Icon.vue';
import { ICON_END_STYLES, ICON_START_STYLES, type BaseInputProps, type InputSize } from '@/types/input';

withDefaults(defineProps<BaseInputProps>(), {
  size: 'normal'
})

</script>

<template>
  <div class="grid gap-2">
    <label :for="id" v-if="label" class="text-sm max-w-max">{{ label }}</label>
    <div
      class="flex items-center rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:ring-1 focus-within:!ring-2  hover:ring-sky-600 focus-within:ring-sky-600 focus-within:ring-offset-2 dark:focus-within:ring-offset-zinc-800 transition-all "
      :class="{ '!ring-0 !ring-transparent !bg-opacity-30 outline-dashed outline-1 outline-zinc-200 dark:outline-zinc-700': disabled }">
      <Icon v-if="iconStart" :icon="iconStart" :class="ICON_START_STYLES.get(size)" size="small" color="text-sky-600" />
      <slot />
      <Icon v-if="iconEnd" :icon="iconEnd" :class="ICON_END_STYLES.get(size)" size="small" color="text-sky-600" />
    </div>
  </div>
</template>
