<script lang="ts" setup>
import type { InputTypeHTMLAttribute } from 'vue';
import Icon from '../Icon.vue';

const vModel = defineModel<string>();

withDefaults(defineProps<{
  id: string,
  type?: InputTypeHTMLAttribute,
  iconStart?: string,
  iconEnd?: string,
  placeholder?: string,
  disabled?: boolean
  label?: string,
  autofocus?: boolean,
}>(), {
  type: 'text',
  disabled: false,
  autofocus: false
})
</script>
<template>

  <div class="grid gap-2">
    <label :for="id" v-if="label" class="text-sm">{{ label }}</label>
    <div
      class="flex items-center rounded-lg dark:bg-zinc-900/60 hover:ring-1 focus-within:!ring-2  hover:ring-sky-600 focus-within:!ring-sky-600 focus-within:ring-offset-2 dark:focus-within:ring-offset-zinc-800 transition-all ">
      <Icon v-if="iconStart" :icon="iconStart" class="ml-4" size="small" color="text-sky-600" />
      <input v-model="vModel" :id="id" :type="type" class="bg-transparent p-4 w-full outline-none"
        :placeholder="placeholder" :disabled="disabled" />
      <Icon v-if="iconEnd" :icon="iconEnd" class="mr-4" size="small" color="text-sky-600" />
    </div>
  </div>

</template>
