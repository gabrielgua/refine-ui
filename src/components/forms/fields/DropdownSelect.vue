<script setup lang="ts">
import { DROPDOWN_SIZES_STYLES, type BaseInputProps, type DropdownSelectOption } from "@/types/input";
import BaseInput from "./BaseInput.vue";

const model = defineModel<string | number>()



type DropdownSelectProps = BaseInputProps & { options: DropdownSelectOption[] };

withDefaults(defineProps<DropdownSelectProps>(), {
  size: 'normal',
});

</script>

<template>
  <BaseInput :id="id" :disabled="disabled" :label="label" :icon-end="iconEnd" :icon-start="iconStart" :size="size">
    <select :id="id" v-model="model" v-bind="$attrs" :disabled="disabled" class="bg-transparent w-full outline-none"
      :class="DROPDOWN_SIZES_STYLES.get(size)">
      <option v-for="option in options" :key="option.value" :value="option.value" class="text-gray-700">
        {{ option.label }}
      </option>
    </select>
  </BaseInput>
</template>
