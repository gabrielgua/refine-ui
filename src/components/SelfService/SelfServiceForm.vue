<script setup lang="ts">
import { useCartStore } from '@/stores/cart.store';
import { useModalStore } from '@/stores/modal.store';
import { useOrderStore } from '@/stores/order.store';
import { useScheduleStore } from '@/stores/schedule.store';
import { useClientOrderStore } from '@/stores/client.order.store';
import type { Atendimento } from '@/types/atendimento.type';
import { useToggle } from '@vueuse/core';
import { computed, ref } from 'vue';
import Button from '../Button.vue';
import Card from '../Card/Card.vue';
import CardBody from '../Card/CardBody.vue';
import CardTitle from '../Card/CardTitle.vue';
import Form from '../Form/Form.vue';
import Input from '../Form/Input.vue';
import Icon from '../Icon.vue';
import Modal from '../Modal.vue';

const reader = ref<string>('');

const scheduleStore = useScheduleStore();
const clientOrderStore = useClientOrderStore();
const { create } = useOrderStore();
const currentAtendimento = computed(() => scheduleStore.current);

const client = computed(() => clientOrderStore.client);
const cartStore = useCartStore();
const modalStore = useModalStore();

const resetModalOpen = ref<boolean>(false);
const toggleResetModal = useToggle(resetModalOpen);

const confirmOderModalOpen = ref<boolean>(false);
const toggleConfirmOrderModal = useToggle(confirmOderModalOpen);

const reset = () => {
  cartStore.reset();
  clientOrderStore.reset();
  toggleResetModal();
  modalStore.success('Atendimento cancelado', 'Seu atendimento foi cancelado com sucesso.');
}

const clearReader = () => {
  reader.value = '';
};

const canCreate = () => {
  return scheduleStore.schedule && client.value && cartStore.valid;
}

const handleReaderSubmit = () => {
  if (!reader.value || !reader.value.trim().length) {
    clearReader();
    return;
  }

  if (!currentAtendimento.value) {
    modalStore.error('Sem atendimentos.', 'Não estamos servindo no momento, volte mais tarde e tente novamente.')
    clearReader();
    return;
  }

  if (!client.value) {
    clientOrderStore.findByCredential(reader.value);
    clearReader();
    return;
  }

  if (currentAtendimento.value.priceType === 'PRICE_PER_KG') {
    //TODO: ler peso
  }

  if (reader.value === client.value.credential) {
    if (!cartStore.valid) {
      modalStore.error('Erro ao tentar confirmar', 'Adicione pelo menos um produto no carrinho antes de confirmar.')
      clearReader();
      return;
    }

    toggleConfirmOrderModal();
    clearReader();
    return;
  }

  cartStore.add(reader.value);
  clearReader();
}

const createOrder = () => {
  toggleConfirmOrderModal();
  if (!currentAtendimento.value || !client.value) {
    return;
  }

  create(cartStore.requestItems, client.value.credential, currentAtendimento.value.id);
}

</script>

<template>
  <section>
    <Card class="mt-auto">
      <CardTitle icon="fa-barcode">Leitor do código de barras</CardTitle>
      <CardBody>
        <Form :on-submit="handleReaderSubmit">
          <Input id="barcode" autofocus v-model="reader" required />
        </Form>
      </CardBody>
    </Card>
    <section class="grid gap-4 btn-columns mt-4" v-if="client">
      <Button :click="() => toggleConfirmOrderModal()" variant="success" class="flex-col w-full" v-if="canCreate()">
        <Icon icon="fa-check" />
        <p>Confirmar</p>
      </Button>
      <Button :click="() => toggleResetModal()" variant="danger" class="flex-col w-full">
        <Icon icon="fa-arrow-rotate-left" />
        <p>Reiniciar</p>
      </Button>
    </section>


    <Modal :show="resetModalOpen" @on-close="() => toggleResetModal()" @on-confirm="reset"
      title="Cancelar o atendimento?" action-buttons cancel-text="Voltar" confirm-text="Sim">
      <p>Tem certeza que deseja cancelar o atendimento?</p>
    </Modal>

    <Modal :show="confirmOderModalOpen" @on-close="() => toggleConfirmOrderModal()" @on-confirm="createOrder"
      title="Confirmar pedido?" action-buttons>
      <p>Tem certeza que deseja confirmar o pedido?</p>
    </Modal>


  </section>

</template>
<style>
.btn-columns {
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
}
</style>
