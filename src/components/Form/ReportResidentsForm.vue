<script setup lang="ts">
import ReportForm, { type FormField } from './ReportForm.vue';

const residentsFields: FormField[] = [
  { key: 'dateFrom', type: 'date', label: 'De', placeholder: 'Data de início' },
  { key: 'dateTo', type: 'date', label: 'Até', placeholder: 'Data de fim' },
]

</script>

<template>
  <ReportForm title="Residentes e Acadêmicos" :fields="residentsFields" />
</template>
