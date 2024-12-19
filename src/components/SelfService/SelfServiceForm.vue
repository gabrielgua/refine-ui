<script setup lang="ts">
import { computed, ref } from 'vue';
import Card from '../Card/Card.vue';
import CardBody from '../Card/CardBody.vue';
import CardTitle from '../Card/CardTitle.vue';
import Form from '../Form/Form.vue';
import Input from '../Form/Input.vue';
import { useScheduleStore } from '@/stores/schedule.store';
import { useUserOrderStore } from '@/stores/user.order.store';
import { useCartStore } from '@/stores/cart.store';

const reader = ref<string>();

const scheduleStore = useScheduleStore();
const userOrderStore = useUserOrderStore();
const currentAtendimento = computed(() => scheduleStore.schedule?.current);
const user = computed(() => userOrderStore.user);
const cartStore = useCartStore();


const handleSubmit = () => {
  if (!reader.value || !reader.value.trim().length) {
    reader.value = undefined;
    return;
  }

  // if (!currentAtendimento.value) {
  //   console.log("Sem atendimentos no momento. Aguarde o próximo atendimento");
  //   reader.value = undefined;
  //   return;
  // }

  if (!user.value) {
    userOrderStore.findByCredential(reader.value);
    reader.value = undefined;
    return;
  }

  cartStore.add(reader.value);
  reader.value = undefined;
}

</script>

<template>
  <Card class="mt-auto">
    <CardTitle icon="fa-barcode">Leitor do código de barras</CardTitle>
    <CardBody>
      <Form :on-submit="handleSubmit">
        <Input id="barcode" autofocus v-model="reader" required />
      </Form>
    </CardBody>
  </Card>

</template>
