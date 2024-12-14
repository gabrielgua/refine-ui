<script lang="ts" setup>
type ButtonVariant =
  'primary' | 'secondary' | 'danger' | 'success'
  | 'primary-text' | 'secondary-text' | 'danger-text' | 'success-text';

withDefaults(defineProps<{
  variant?: ButtonVariant,
  click?: () => void
}>(), {
  variant: 'primary',
})

const styles = new Map<ButtonVariant, string>([
  ['primary', 'bg-sky-600 hover:bg-sky-600/90 active:bg-sky-700 text-white shadow-sm'],
  ['secondary', 'bg-white text-slate-800 active:bg-slate-200 shadow-sm'],
  ['danger', 'bg-rose-400 hover:bg-rose-400/90 active:bg-rose-800 text-white shadow-sm'],
  ['success', 'bg-teal-500 hover:bg-teal-500/80 active:bg-teal-600 text-white shadow-sm'],

  ['primary-text', 'text-sky-600 hover:bg-sky-600/10 transition-colors'],
  ['secondary-text', 'text-zinc-800 dark:text-zinc-400 hover:bg-zinc-800/5 dark:hover:bg-zinc-100/10 transition-colors'],
  ['danger-text', 'text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-400/10 transition-colors'],
  ['success-text', 'text-teal-500 hover:bg-teal-500/20 transition-colors'],
]);


</script>
<template>
  <button @click="click" class="flex items-center text-sm p-3 gap-2 rounded-xl active:scale-95"
    :class="styles.get(variant)">
    <slot />
  </button>

</template>
