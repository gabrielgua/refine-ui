<script setup lang="ts">
import Button from "@/components/Button.vue";
import DropdownSelect from "@/components/Form/DropdownSelect.vue";
import Input from "@/components/Form/Input.vue";
import { defineProps, reactive } from 'vue';
import Card from '../card/Card.vue';
import CardBody from '../card/CardBody.vue';
import CardFooter from '../card/CardFooter.vue';
import CardTitle from '../card/CardTitle.vue';
import Icon from '../Icon.vue';

import SelfServiceProducts from '@/components/selfservice/SelfServiceProducts.vue';

export type FormProps = {
  title?: string,
  type?: string,
  titleIcon?: string,
  fields: FormField[],
  loading?: boolean,
  onSubmit?: () => void
}

export type FormFieldOption = {
  value: string | number;
  label: string;
}

export type FormFieldType = 'text' | 'date' | 'dropdown';

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

props.fields.forEach(field => {
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
  <Card>
    <CardTitle :icon="titleIcon" v-if="title">
      {{ title }}
    </CardTitle>
    <form @submit.prevent="submitForm">
      <CardBody>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="field in fields" :key="field.key" class="mb-4">
            <component :key="field.key" :is="getInputComponent(field)" v-model="formValues[field.key]"
              v-bind="getFieldProps(field)" :id="field.key" :label="field.label" :placeholder="field.placeholder"/>
          </div>

        </div>
      </CardBody>

      <CardFooter>
        <slot name="form-actions">
        </slot>
      </CardFooter>
    </form>
  </Card>
  <div class="pt-6" v-if="props.type ==='ManualService'">
      <SelfServiceProducts  />
  </div>

</template>
