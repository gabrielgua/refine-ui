<script lang="ts" setup>
import { INPUT_SIZES_STYLES, type BaseInputProps } from '@/types/input';
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';

const model = defineModel<string | number>();
const inputRef = ref<HTMLInputElement>();

type InputProps = BaseInputProps & {
  blur?: () => void,
}

withDefaults(defineProps<InputProps>(),
  { size: 'normal' }
)
defineExpose({ inputRef })


</script>
<template>
  <BaseInput :id="id" :label="label" :iconStart="iconStart" :iconEnd="iconEnd" :disabled="disabled" :variant="variant"
    :label-inline="labelInline">
    <input v-model="model" ref="inputRef" :id="id" @blur="blur" v-bind="$attrs"
      class="bg-transparent w-full outline-none placeholder:text-zinc-400 placeholder:font-light"
      :class="[INPUT_SIZES_STYLES.get(size), { 'text-zinc-500 dark:text-zinc-300': disabled }]" :disabled="disabled" />
    <slot />
  </BaseInput>
</template>
