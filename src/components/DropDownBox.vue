<template>
  <div class="grid gap-2">
    <label v-if="label" class="text-sm text-gray-900 dark:text-gray-200">{{ label }}</label>
    <div
      class="flex items-center rounded-lg bg-slate-200 dark:bg-zinc-900/60 hover:ring-1 focus-within:!ring-2 hover:ring-sky-600 focus-within:ring-sky-600 focus-within:ring-offset-2 dark:focus-within:ring-offset-zinc-800 transition-all"
    >
      <select
        v-model="selectedValue"
        class="bg-transparent p-4 w-full outline-none text-gray-700 dark:text-gray-200"
        @change="emitSelection"
      >
        <option value="" disabled class="text-gray-700">{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          class="text-gray-700"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";

interface Option {
  value: string | number;
  label: string;
}

const props = defineProps<{
  options: Option[];
  label?: string;
  placeholder?: string;
}>();

const emit = defineEmits(['selected']);

const selectedValue = ref<string | number | null>(null);

const emitSelection = () => {
  if (selectedValue.value !== null && selectedValue.value !== "") {
    emit("selected", selectedValue.value);
  }
};
</script>

<style scoped>
select option {
  color: #374151;
}
</style>
