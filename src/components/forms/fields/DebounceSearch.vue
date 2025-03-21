<script setup lang="ts">
import Icon from '@/components/Icon.vue';
import SlideFromTop from '@/components/transitions/SlideFromTop.vue';
import { useDebounceFn } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import type { FormFieldOption } from '../Form.vue';
import Input from './Input.vue';
import type { BaseInputProps } from '@/types/input';
import BaseInput from './BaseInput.vue';
import Spinner from '@/components/Spinner.vue';
import FadeTransition from '@/components/transitions/FadeTransition.vue';

type DebouceInputProps = BaseInputProps & {
  delay?: number,
  options: FormFieldOption[],
  maxWait?: number,
  loading?: boolean
}

const props = withDefaults(defineProps<DebouceInputProps>(), {
  delay: 500,
  maxWait: 5000
})

const minSearchLength = 3;


const emit = defineEmits(['search', 'selected', 'reset']);
const search = ref<string>();
const selectedOption = ref<FormFieldOption>();

const typing = ref<boolean>(false);
const isLoading = computed(() => typing.value || props.loading);


const emitChange = useDebounceFn(() => {
  if (search.value) {
    emit('search', search.value.trim());
  }
  typing.value = false;
}, props.delay, { maxWait: props.maxWait })

watch(search, () => {
  if (search.value && search.value.length >= minSearchLength && search.value !== selectedOption.value?.label) {
    typing.value = true;
    emitChange();
    return;
  }

  emit('reset')
}, { flush: 'post' })

const select = (option: FormFieldOption) => {
  selectedOption.value = option;
  search.value = option.label;
  emit('selected', selectedOption.value.value);
  search.value = '';
}

const showDropdown = computed(() => {
  return (!selectedOption.value || search.value !== selectedOption.value.label)
    && search.value?.length && search.value.length >= minSearchLength
});

</script>

<template>
  <div class="relative">
    <Input :id="id" :label="label" v-model="search" :disabled="disabled" :size="size" :icon-end="iconEnd"
      :icon-start="iconStart" type="text" v-bind="$attrs" class="relative">
    <FadeTransition>
      <div class="pe-3" v-if="isLoading">
        <Icon icon="spinner" class="text-sky-600 animate-spin" />
      </div>
    </FadeTransition>
    </Input>

    <SlideFromTop>
      <div v-if="options && options.length && showDropdown"
        class="absolute w-full border z-50 border-zinc-100 dark:border-zinc-100/10 mt-0.5 bg-zinc-50 dark:bg-zinc-900 rounded-lg shadow-lg text-sm select-none divide-y divide-zinc-100 dark:divide-zinc-800">
        <TransitionGroup tag="ul" name="dropdown-options">
          <li v-for="option in options" :key="option.value" @click="select(option)"
            class="flex items-center justify-between p-3 font-light hover:bg-sky-600 hover:text-white active:scale-[98%] transition-all first:rounded-t-lg last:rounded-b-lg">
            <p>{{ option.label }}</p>
            <Icon icon="arrow-right" size="small" />
          </li>
        </TransitionGroup>

      </div>
    </SlideFromTop>
  </div>

</template>

<style scoped>
.dropdown-options-move,
.dropdown-options-enter-active,
.dropdown-options-leave-active {
  transition: all 150ms ease;
}

.dropdown-options-enter-from,
.dropdown-options-leave-to {
  position: absolute;
  opacity: 0;
}

.dropdown-options-leave-to {
  transform: translateX(10px);
}

.dropdown-options-enter-from {
  transform: translateX(-10px);
}
</style>
