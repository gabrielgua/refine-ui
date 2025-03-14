<script lang="ts" setup>
import { computed } from 'vue';
import Icon from './Icon.vue';

export type ButtonVariant =
  'primary' | 'secondary' | 'danger' | 'success'
  | 'primary-text' | 'secondary-text' | 'danger-text' | 'success-text';

const props = withDefaults(defineProps<{
  variant?: ButtonVariant,
  click?: () => void,
  disabled?: boolean,
  loading?: boolean
}>(), {
  variant: 'primary',
})

const isDisabled = computed(() => props.disabled || props.loading);

const styles = new Map<ButtonVariant, string>([
  ['primary', 'bg-sky-600 hover:bg-sky-600/80 text-white shadow-sm '],
  ['secondary', 'bg-zinc-800/5 dark:bg-zinc-100/10 hover:bg-zinc-800/10 dark:hover:bg-zinc-100/20 dark:border-zinc-100/10 text-zinc-800 dark:text-zinc-300 shadow-sm'],
  ['danger', 'bg-rose-400 hover:bg-rose-400/90 text-white shadow-sm'],
  ['success', 'bg-teal-500 hover:bg-teal-500/80 text-white shadow-sm'],

  ['primary-text', 'text-sky-600 hover:bg-sky-600/10'],
  ['secondary-text', 'text-zinc-800 dark:text-zinc-300 hover:bg-zinc-800/5 dark:hover:bg-zinc-100/10'],
  ['danger-text', 'text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-400/10'],
  ['success-text', 'text-teal-500 hover:bg-teal-500/20'],
]);


</script>
<template>
  <button @click="click" :disabled="isDisabled"
    class="flex items-center justify-center relative gap-2 text-sm p-2.5 transition-all rounded-xl active:scale-95"
    :class="[styles.get(variant), { 'opacity-30 active:!scale-100 cursor-default': isDisabled }]">
    <slot />

    <div v-if="loading" class="absolute top-0 w-full h-full grid place-items-center rounded-xl bg-inherit">
      <Icon icon="spinner" class="animate-spin" />
    </div>
  </button>

</template>
