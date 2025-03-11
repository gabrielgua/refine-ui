<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps<{
  text: string;
}>();
</script>

<template>
  <div class="bg-sky-600 text-white shadow-sm transition-colors flex items-center justify-center gap-2 text-2xl p-3 rounded-x2">
    {{ text }}
  </div>
</template>
