<script lang="ts" setup>
defineProps<{
  serving: boolean
}>();

const styles = new Map<boolean, string>([
  [true, 'bg-teal-500'],
  [false, 'bg-rose-500']
])

</script>
<template>
  <span class="relative grid place-items-center h-4 w-4">
    <span class="animate-[ping_1250ms_infinite] absolute inline-flex h-full w-full rounded-full opacity-75"
      :class="styles.get(serving)"></span>
    <span class="rounded-full h-3 w-3" :class="styles.get(serving)"></span>
  </span>
</template>

<style></style>
