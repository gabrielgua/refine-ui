<script setup lang="ts">
import Button from '@/components/Button.vue';
import Form, { type FormField } from '../Form.vue';
import Icon from '@/components/Icon.vue';
import { useCartStore } from '@/stores/cart.store';
import { useOrderStore } from '@/stores/order.store'
import { ref } from 'vue';
import type { CartRequest } from '@/types/cart.type'

const props = defineProps<{ title: string, fields: FormField[] }>();

const cartStore = useCartStore();


const CartRequest = {
  credential: '64444',
  atendimentoId: 3,
  items: [{productCode: "7891234567888", quantity: 1}],
}


const calculatePrice = () =>{
  console.log(CartRequest)
  cartStore.calculateManualCartPrice(CartRequest)

}

</script>
<template>

  <Form :title="title" :fields="fields" type="ManualService">
    <template #form-actions>
      <Button type="button" >
        <Icon icon="fa-regular fa-clipboard" />
        Adicionar
      </Button>
      <Button type="reset" variant="danger">
        <Icon icon="xmark" />
        Cancelar
      </Button>
      <Button type="submit" variant="success" @click ="calculatePrice">
        <Icon icon="check" />
        Salvar
      </Button>
    </template>
  </Form>
</template>
