<script lang="ts" setup>
type StatBoxProps = {
  title?: string,
  value?: string | number,
}


withDefaults(defineProps<StatBoxProps>(), {
  title: 'Default Title',
})

</script>

<template>
  <div class="p-4 rounded-lg shadow-md bg-white dark:bg-zinc-900 w-full max-w-sm">
    <i :class="'text-sky-500 mb-2 text-xl'" />
    <div>
      <div class="text-xs uppercase tracking-wide text-zinc-400">
        {{ title }}
      </div>
      <div class="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
        <slot />
      </div>
    </div>
  </div>
</template>
