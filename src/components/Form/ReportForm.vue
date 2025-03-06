<script setup lang="ts">
import { reactive, defineProps } from 'vue';
import { useReportStore } from '@/stores/report.store.ts'; // import the store
import Input from "@/components/Form/Input.vue";
import DropdownSelect from "@/components/DropdownSelect.vue";
import Button from "@/components/Button.vue";
import Card from '../Card/Card.vue';
import CardTitle from '../Card/CardTitle.vue';
import CardBody from '../Card/CardBody.vue';
import Icon from '../Icon.vue';

export type FormProps = {
  title: string,
  fields: FormField[]
}

export type FormFieldOption = {
  value: string | number;
  label: string;
}

export type FormField = {
  key: string;
  type: 'text' | 'date' | 'dropdown';
  label: string;
  placeholder?: string;
  options?: FormFieldOption[];
}

const props = defineProps<FormProps>();

// Initialize reactive form values
const formValues = reactive<Record<string, any>>({});
props.fields.forEach(field => {
  formValues[field.key] = '';
});

// Determine which input component to use based on field type
const getInputComponent = (field: FormField) => {
  return field.type === 'dropdown' ? DropdownSelect : Input;
};

// Get field-specific props
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

const updateValue = (key: string, value: any) => {
  formValues[key] = value;
};

// Access the report store
const reportStore = useReportStore();

// Updated report generation function using the store
const generateReport = () => {
  reportStore.generateReport(formValues);
};
</script>

<!-- ReportForm.vue -->
<template>
  <Card>
    <CardTitle>{{ title }}</CardTitle>
    <CardBody>
      <form @submit.prevent="generateReport">
        <!-- Grid layout: 4 columns per row -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="field in fields" :key="field.key" class="mb-4">
            <!-- Dynamic component based on field type -->
            <component :key="field.key" :is="getInputComponent(field)" v-model="formValues[field.key]"
              v-bind="getFieldProps(field)" :id="field.key" :label="field.label" :placeholder="field.placeholder" />
          </div>
        </div>
        <div class="mt-4">
          <Button type="submit" :loading="reportStore.state.loading">
            <Icon icon="fa-regular fa-clipboard" />
            Gerar Relatório
          </Button>
        </div>
      </form>
    </CardBody>
  </Card>
</template>
