<script lang="ts" setup>
import type { InputTypeHTMLAttribute } from 'vue';
import Icon from '../Icon.vue';

export type InputSize = 'normal' | 'large';
export type BaseInputProps = {
  id: string,
  iconStart?: string,
  iconEnd?: string,
  placeholder?: string,
  label?: string,
  disabled?: boolean,
  autofocus?: boolean,
  required?: boolean,
  size?: InputSize
}

type InputProps = BaseInputProps & { type?: InputTypeHTMLAttribute };

const inputSizes = new Map<InputSize, string>([
  ['large', 'p-4'],
  ['normal', 'p-3 text-sm']
])

const iconStartSizes = new Map<InputSize, string>([
  ['large', 'ms-4'], ['normal', 'ms-3']
])

const iconEndSizes = new Map<InputSize, string>([
  ['large', 'me-4'], ['normal', 'me-3']
])


const vModel = defineModel<string>();

withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false,
  autofocus: false,
  required: false,
  size: 'normal'
})
</script>
<template>

  <div class="grid gap-2">
    <label :for="id" v-if="label" class="text-sm">{{ label }}</label>
    <div
      class="flex items-center rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:ring-1 focus-within:!ring-2  hover:ring-sky-600 focus-within:ring-sky-600 focus-within:ring-offset-2 dark:focus-within:ring-offset-zinc-800 transition-all "
      :class="{ 'hover:!ring-transparent focus-within:!ring-0': disabled }">
      <Icon v-if="iconStart" :icon="iconStart" :class="iconStartSizes.get(size)" size="small" color="text-sky-600" />
      <input v-model="vModel" :id="id" :type="type" class="bg-transparent w-full outline-none"
        :class="inputSizes.get(size)" :placeholder="placeholder" :disabled="disabled" :autofocus="autofocus"
        :required="required" />
      <Icon v-if="iconEnd" :icon="iconEnd" :class="iconEndSizes.get(size)" size="small" color="text-sky-600" />
    </div>
  </div>
</template>
