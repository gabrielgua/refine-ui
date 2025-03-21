<script setup lang="ts">
import type { BaseInputProps } from '@/types/input';
import Input from './Input.vue';
import { ref } from 'vue';

const model = defineModel<string | number>();
const inputRef = ref<HTMLInputElement>();

withDefaults(defineProps<BaseInputProps>(), {
  size: 'normal'
})

defineExpose({ inputRef })

</script>

<template>

  <Input :id="id" :label="label" v-model="model" ref="inputRef" :icon-end="iconEnd" :icon-start="iconStart"
    :disabled="disabled" v-bind="$attrs" class="w-full">
  <slot name="btn-group-actions" />
  </Input>
</template>
