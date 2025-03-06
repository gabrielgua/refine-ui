<script setup lang="ts">
import ReportForm, { type FormField, type FormProps } from './ReportForm.vue';

const title = 'Clientes';
const clientFields: FormField[] = [
  { key: 'dateType', type: 'dropdown', label: 'Tipo da Data', placeholder: 'Selecione...', options: [{ value: 'Todos', label: 'Todos' }] },
  { key: 'dateFrom', type: 'date', label: 'De', placeholder: 'Data de início' },
  { key: 'dateTo', type: 'date', label: 'Até', placeholder: 'Data de fim' },
  { key: 'selectClient', type: 'text', label: 'Selecionar Cliente', placeholder: 'Nome do Cliente' },
  {
    key: 'store', type: 'dropdown', label: 'Loja', placeholder: 'Selecione Loja...', options: [
      { value: 'Erasto Gaertner', label: 'Erasto Gaertner' },
      { value: 'Hospice', label: 'Hospice' },
      { value: 'Irati', label: 'Irati' },
    ]
  },
  { key: 'product', type: 'text', label: 'Buscar por produto', placeholder: 'Digite o produto...' },
  {
    key: 'balanceStatus', type: 'dropdown', label: 'Status do Saldo', placeholder: 'Selecione Status...', options: [
      { value: 'Positivo', label: 'Positivo' },
      { value: 'Todos', label: 'Todos' },
      { value: 'Negativo', label: 'Negativo' },
    ]
  },
  { key: 'clientGroup', type: 'text', label: 'Grupo de Clientes', placeholder: 'Digite o grupo...' },
]

</script>

<template>
  <ReportForm :title="title" :fields="clientFields" />
</template>
