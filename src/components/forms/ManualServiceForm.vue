<script setup lang="ts">
import { ref } from 'vue';
import Button from '../Button.vue';
import Icon from '../Icon.vue';
import type { FormField } from './Form.vue';
import Form from './Form.vue';
import type { Client } from '@/types/client.type';
import { UserRole } from '@/types/user.type';
import Input from './Input.vue';

export type ManualServiceForm = {
  date: string,
  credential: string,
  store: string | number,
  product: string,
  balance?: number,
  tare: number,
  weight?: number,
}

const productModel = ref<string>();
const client = ref<Client>({
  credential: '64444',
  name: 'Rafael Guaitanele',
  role: 'Analista',
  salary: 1499,
  balance: 99.9
})

const manualServiceFields: FormField[] = [
  { key: 'date', type: 'datetime-local', label: 'Data' },
  { key: 'credential', type: 'text', label: 'Cliente', placeholder: 'Busque por cliente...' },
  { key: 'balance', type: 'text', label: 'Saldo', placeholder: 'Saldo do cliente', value: client.value.balance, disabled: true },
  {
    key: 'store', type: 'dropdown', label: 'Loja', placeholder: 'Selecione Loja...', selectOptions: [
      { value: 1, label: 'Erasto Gaertner' },
      { value: 'hospice', label: 'Hospice' },
      { value: 'irati', label: 'Irati' },
    ]
  },
  { key: 'tare', type: 'text', label: 'Tara', placeholder: 'Digite a tara em gramas...' },
  { key: 'weight', type: 'text', label: 'Peso Total', placeholder: 'Digite o peso total em gramas...' },
]



const calculatePrice = () => {
  console.log('//Calculate total cart price.');
}

const resetCart = () => { }

</script>

<template>
  <Form :fields="manualServiceFields">
    <template #formTitle>Informações</template>
    <template #formActions>
      <div class="flex items-center gap-4 w-full">
        <div class="flex gap-2">
          <Button type="reset" variant="danger" :click="() => resetCart()">
            <Icon icon="rotate-left" />
            Reiniciar
          </Button>
          <Button type="submit" variant="success">
            Salvar
            <Icon icon="check" />
          </Button>
        </div>
      </div>
    </template>

  </Form>
</template>
