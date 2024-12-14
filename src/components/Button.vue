<script lang="ts" setup>
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

withDefaults(defineProps<{
  variant?: ButtonVariant,
  click?: () => void
}>(), {
  variant: 'primary',
})

const styles = new Map<ButtonVariant, string>([
  ['primary', 'bg-sky-600 hover:bg-sky-600/90 active:bg-sky-700'],
  ['secondary', 'bg-white !text-slate-800 active:bg-slate-200'],
  ['danger', 'bg-rose-400 hover:bg-rose-400/90 active:bg-rose-800'],
  ['success', 'bg-teal-500 hover:bg-teal-500/80 active:bg-teal-600'],
]);


</script>
<template>
  <button @click="click" class="flex items-center text-white text-sm shadow-sm p-3 gap-2 rounded-xl active:scale-95"
    :class="styles.get(variant)">
    <slot />
  </button>

</template>
