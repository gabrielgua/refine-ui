<script setup lang="ts">
defineProps<{
  onSubmit: () => void
}>();
</script>

<template>
  <form @submit.prevent="onSubmit">
    <slot />
  </form>
</template>
