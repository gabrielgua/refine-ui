<script setup lang="ts">
import DropdownSelect from "@/components/forms/DropdownSelect.vue";
import Input from "@/components/forms/Input.vue";
import { defineProps, reactive } from 'vue';
import Button from "../Button.vue";
import Card from '../card/Card.vue';
import Icon from "../Icon.vue";

export type FormProps = {
  titleIcon?: string,
  fields?: FormField[],
  loading?: boolean,
  onSubmit?: () => void
}

export type FormFieldOption = {
  value: string | number;
  label: string;
}

export type FormFieldType = 'text' | 'date' | 'dropdown' | 'datetime-local';

export type FormField = {
  key: string;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  options?: FormFieldOption[];
}

const props = defineProps<FormProps>();
const emit = defineEmits(['submit']);

const formValues = reactive<Record<string, any>>({});

props.fields?.forEach(field => {
  formValues[field.key] = '';
});

const getInputComponent = (field: FormField) => {
  return field.type === 'dropdown' ? DropdownSelect : Input;
};

const getFieldProps = (field: FormField) => {
  const baseProps: any = {
    label: field.label,
    placeholder: field.placeholder || '',
    type: field.type !== 'dropdown' ? field.type : undefined,
  };
  if (field.type === 'dropdown' && field.options) {
    baseProps.options = field.options;
  }
  return baseProps;
};

const submitForm = () => {
  emit('submit', formValues)
}

</script>

<template>
  <form @submit.prevent="submitForm">
    <Card>
      <template #cardTitleIcon v-if="$slots['formTitleIcon']">
        <slot name="formTitleIcon" />
      </template>
      <template #cardTitle v-if="$slots['formTitle']">
        <slot name="formTitle" />
      </template>
      <template #cardBody>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4" v-if="fields && fields.length">
          <div v-for="field in fields" :key="field.key" class="mb-4">
            <component :key="field.key" :is="getInputComponent(field)" v-model="formValues[field.key]"
              v-bind="getFieldProps(field)" :id="field.key" :label="field.label" :placeholder="field.placeholder" />
          </div>
        </div>

        <slot />
      </template>
      <template #cardFooter>
        <slot name="formActions">
          <Button variant="secondary" type="reset">
            Cancel
          </Button>
          <Button type="submit" :loading="loading">
            Submit
            <Icon icon="arrow-right" size="small" />
          </Button>
        </slot>
      </template>
    </Card>
  </form>
</template>
