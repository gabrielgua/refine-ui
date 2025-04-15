<script setup lang="ts">
import { DROPDOWN_SIZES_STYLES, type BaseInputProps, type DropdownSelectOption } from "@/types/input";
import BaseInput from "./BaseInput.vue";
import { ref } from "vue";

const model = defineModel<string | number | ''>({ default: '' })
const selectRef = ref<HTMLElement>();

defineExpose({
  blur: () => selectRef.value?.blur()
})

type DropdownSelectProps = BaseInputProps & { options: DropdownSelectOption[], placeholder?: string };

withDefaults(defineProps<DropdownSelectProps>(), {
  size: 'normal',
});

</script>

<template>
  <BaseInput :id="id" :disabled="disabled" :label="label" :icon-end="iconEnd" :icon-start="iconStart" :size="size"
    :variant="variant" :label-inline="labelInline">
    <select ref="selectRef" :id="id" v-model="model" v-bind="$attrs" :disabled="disabled"
      class="bg-transparent w-full outline-none" :class="DROPDOWN_SIZES_STYLES.get(size)">
      <option v-if="placeholder" value="" disabled class="dark:bg-zinc-900">{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value" class="dark:bg-zinc-900">
        {{ option.label }}
      </option>
    </select>
  </BaseInput>
</template>
