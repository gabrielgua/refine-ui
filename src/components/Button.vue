<script lang="ts" setup>
import { computed } from 'vue';
import Icon from './Icon.vue';

export type ButtonVariant =
  'primary' | 'accent' | 'secondary' | 'danger' | 'success' | 'warning'
  | 'primary-text' | 'secondary-text' | 'danger-text' | 'success-text' | 'warning-text'
  | 'primary-link' | 'secondary-link' | 'danger-link' | 'success-link' | 'warning-link';

export type ButtonSize = 'small' | 'normal' | 'large'

const props = withDefaults(defineProps<{
  variant?: ButtonVariant,
  click?: () => void,
  disabled?: boolean,
  loading?: boolean,
  size?: ButtonSize
}>(), {
  variant: 'primary',
  size: 'normal'
})

const isDisabled = computed(() => props.disabled || props.loading);

const styles = new Map<ButtonVariant, string>([
  ['primary', 'bg-sky-600 hover:bg-sky-600/80 text-white shadow-sm '],
  ['accent', 'bg-white  hover:bg-white/80 dark:bg-zinc-900 dark:hover:bg-zinc-900/80 shadow-sm '],
  ['secondary', 'bg-zinc-200 dark:bg-zinc-100/10 hover:bg-zinc-300 dark:hover:bg-zinc-100/20 dark:border-zinc-100/10 text-zinc-800 dark:text-zinc-300 shadow-sm'],
  ['danger', 'bg-rose-400 hover:bg-rose-400/90 text-white shadow-sm'],
  ['success', 'bg-teal-500 hover:bg-teal-500/80 text-white shadow-sm'],
  ['warning', 'bg-yellow-500 hover:bg-yellow-500/80 text-white shadow-sm'],

  ['primary-text', 'text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950'],
  ['secondary-text', 'text-zinc-800 dark:text-zinc-300 hover:bg-zinc-800/5 dark:hover:bg-zinc-100/10'],
  ['danger-text', 'text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-50'],
  ['success-text', 'text-teal-500 hover:bg-teal-50'],
  ['warning-text', 'text-yellow-500 hover:bg-yellow-50'],

  ['primary-link', 'text-sky-600 hover:underline'],
  ['secondary-link', 'text-zinc-700 dark:text-zinc-300 hover:underline'],
  ['danger-link', 'text-rose-400 hover:underline'],
  ['success-link', 'text-teal-500 hover:underline'],
  ['warning-link', 'text-yellow-500 hover:underline'],
]);


const sizeStyles = new Map<ButtonSize, string>([
  ['small', 'p-2 px-2.5 gap-2 text-[13px] rounded-lg'],
  ['normal', 'p-2.5  gap-2 text-sm rounded-xl'],
  ['large', 'p-3 gap-3 text-base rounded-xl'],
])

</script>
<template>
  <button @click="click" :disabled="isDisabled"
    class="flex items-center justify-center relative  transition-all  active:scale-95"
    :class="[styles.get(variant), sizeStyles.get(size), { 'opacity-30 pointer-events-none': isDisabled }]">
    <slot />

    <div v-if="loading" class="absolute top-0 w-full h-full grid place-items-center rounded-xl bg-inherit">
      <Icon icon="spinner" class="animate-spin" />
    </div>
  </button>

</template>
