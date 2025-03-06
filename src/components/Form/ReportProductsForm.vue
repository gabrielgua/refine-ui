<script setup lang="ts">
import ReportForm, { type FormField } from './ReportForm.vue';

const title = 'Produtos Vendidos';
const reportFields: FormField[] = [
  { key: 'dateFrom', type: 'date', label: 'De', placeholder: 'Data de início' },
  { key: 'dateTo', type: 'date', label: 'Até', placeholder: 'Data de fim' },
  { key: 'productGroup', type: 'text', label: 'Grupo do Produto', placeholder: 'Digite o Grupo' },
  { key: 'ProductSearch', type: 'text', label: 'Buscar por Produto', placeholder: 'Digite o produto' },
  {
    key: 'store', type: 'dropdown', label: 'Loja', placeholder: 'Selecione Loja...', options: [
      { value: 'Erasto Gaertner', label: 'Erasto Gaertner' },
      { value: 'Hospice', label: 'Hospice' },
      { value: 'Irati', label: 'Irati' },
    ]
  },
  { key: 'operator', type: 'text', label: 'Operador', placeholder: 'Digite o operador' },
]

</script>


<template>
  <ReportForm :title="title" :fields="reportFields" />
</template>
