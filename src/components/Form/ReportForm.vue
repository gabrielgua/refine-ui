

<script setup lang="ts">
import { reactive, defineProps } from 'vue';
import { useReportStore } from '@/stores/report.store.ts'; // import the store
import Input from "@/components/Form/Input.vue";
import DropdownSelect from "@/components/DropDownBox.vue";
import Button from "@/components/Button.vue";

type FieldOption = {
  value: any;
  label: string;
}

type FieldConfig = {
  key: string;
  type: 'text' | 'date' | 'dropdown';
  label: string;
  placeholder?: string;
  options?: FieldOption[];
}

const props = defineProps<{
  title: string;
  fields: FieldConfig[];
}>();

// Initialize reactive form values
const formValues = reactive<Record<string, any>>({});
props.fields.forEach(field => {
  formValues[field.key] = '';
});

// Determine which input component to use based on field type
const getInputComponent = (field: FieldConfig) => {
  return field.type === 'dropdown' ? DropdownSelect : Input;
};

// Get field-specific props
const getFieldProps = (field: FieldConfig) => {
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
const generateReport =  () => {
  reportStore.generateReport(formValues);
};
</script>

<!-- ReportForm.vue -->
<template>
  <div class="report-form">
    <form @submit.prevent="generateReport">
      <!-- Grid layout: 4 columns per row -->
      <div class="grid grid-cols-4 gap-4">
        <div v-for="field in fields" :key="field.key" class="mb-4">
          <!-- Dynamic component based on field type -->
          <component
            :is="getInputComponent(field)"
            v-model="formValues[field.key]"
            v-bind="getFieldProps(field)"
            @selected="value => updateValue(field.key, value)"
          />
        </div>
      </div>
      <div class="mt-4">
        <Button type="submit" variant="primary">Gerar</Button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Your component styles */
</style>
