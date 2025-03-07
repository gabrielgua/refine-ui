<script setup lang="ts">
import type { FormField } from './Form.vue';
import ServiceForm from './reports/ServiceForm.vue';

const manualServiceFields: FormField[] = [
  { key: 'date', type: 'date', label: 'Data'},
  { key: 'client', type: 'text', label: 'Cliente', placeholder: 'Nome do Cliente...' },
  {
    key: 'store', type: 'dropdown', label: 'Loja', placeholder: 'Selecione Loja...', options: [
      { value: 'erasto', label: 'Erasto Gaertner' },
      { value: 'hospice', label: 'Hospice' },
      { value: 'irati', label: 'Irati' },
    ]
  },
  { key: 'product', type: 'text', label: 'Produto/Refeição', placeholder: 'Digite o produto...' },
  {
    key: 'balance', type: 'number', label: 'Saldo'},
  { key: 'tare', type: 'number', label: 'Tara', placeholder: 'Digite a tara em gramas...' },
  { key: 'weight', type: 'number', label: 'Peso Total', placeholder: 'Digite o peso total em gramas...' },

]

</script>

<template>
  <ServiceForm title="" :fields="manualServiceFields" />
</template>
