<script lang="ts" setup>
import Icon from '@/components/Icon.vue';
import { ICON_END_STYLES, ICON_START_STYLES, INPUT_VARIANT_STYLES, type BaseInputProps, type InputSize } from '@/types/input';

withDefaults(defineProps<BaseInputProps>(), {
  size: 'normal',
  variant: 'primary'
})

</script>

<template>
  <div class="space-y-2" :class="{ 'flex items-center gap-2 space-y-0': labelInline }">
    <label :for="id" v-if="label" class="text-sm max-w-max">{{ label }}</label>
    <div
      class="flex items-center rounded-lg hover:ring-1 focus-within:!ring-2 focus-within:ring-offset-2 transition-all"
      :class="[INPUT_VARIANT_STYLES.get(variant), { '!ring-0 !ring-transparent !bg-opacity-30 outline-dashed outline-1 outline-zinc-200 dark:outline-zinc-700': disabled }]">
      <Icon v-if="iconStart" :icon="iconStart" :class="ICON_START_STYLES.get(size)" size="small" color="text-sky-600" />
      <slot />
      <Icon v-if="iconEnd" :icon="iconEnd" :class="ICON_END_STYLES.get(size)" size="small" color="text-sky-600" />
    </div>
  </div>
</template>
