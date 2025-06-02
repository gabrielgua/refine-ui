<script setup lang="ts">
import type { DropdownSelectOption } from '@/types/input';
import DropdownSelect from '../forms/fields/DropdownSelect.vue';
import { ref } from 'vue';

const model = defineModel<string | number>();
const dropdownSizeRef = ref<HTMLElement>()

defineExpose({
  blur: () => dropdownSizeRef.value?.blur()
})

const dropdownSizeOptions: DropdownSelectOption[] = [
  { label: '5 por página', value: 5 },
  { label: '10 por página', value: 10 },
  { label: '15 por página', value: 15 },
  { label: '20 por página', value: 20 },
]

</script>

<template>
  <DropdownSelect ref="dropdownSizeRef" id="data-table-size" v-model="model" :options="dropdownSizeOptions" size="small"
    variant="secondary" placeholder="Qtd. por página" />
</template>
