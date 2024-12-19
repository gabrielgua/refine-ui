<script setup lang="ts">
import Button from '@/components/Button.vue';
import Container from '@/components/Container.vue';
import Icon from '@/components/Icon.vue';
import Modal from '@/components/Modal.vue';
import SelfServiceClientInfo from '@/components/SelfService/SelfServiceClientInfo.vue';
import SelfServiceCurrent from '@/components/SelfService/SelfServiceCurrent.vue';
import SelfServiceFooter from '@/components/SelfService/SelfServiceFooter.vue';
import SelfServiceForm from '@/components/SelfService/SelfServiceForm.vue';
import SelfServiceHeader from '@/components/SelfService/SelfServiceHeader.vue';
import SelfSevriceProducts from '@/components/SelfService/SelfServiceProducts.vue';
import SelfServiceTotal from '@/components/SelfService/SelfServiceTotal.vue';
import Spinner from '@/components/Spinner.vue';
import { useCartStore } from '@/stores/cart.store';
import { useUserOrderStore } from '@/stores/user.order.store';
import { useFullscreen } from '@vueuse/core';
import { computed, ref } from 'vue';


const element = ref<HTMLElement>();
const { toggle } = useFullscreen(element);

const userOrderStore = useUserOrderStore();
const cartStore = useCartStore();

const user = computed(() => userOrderStore.user);
const validCart = computed(() => cartStore.cart.items.length >= 1);

const resetModalOpen = ref<boolean>(false);

const canConfirm = () => {
  return user.value && validCart.value;
}

const reset = () => {
  cartStore.reset();
  userOrderStore.reset();
  toggleResetModal();
}

const toggleResetModal = () => {
  resetModalOpen.value = !resetModalOpen.value;
}

const handleConfirm = () => {
  console.log('Confirm, create order');

}

</script>
<template>

  <section ref="element" class="bg-[#f5f5f5] text-black dark:bg-zinc-800 dark:text-white h-full">
    <SelfServiceHeader @fullscreen="toggle" />
    <Container class="grid grid-cols-2 pt-4 gap-4">
      <section class="flex flex-col gap-4 h-[calc(100dvh-113px)]">
        <SelfServiceCurrent />
        <SelfServiceForm />

        <section class="grid gap-4 btn-columns" v-if="user">
          <Button variant="success" class="flex-col w-full" v-if="canConfirm()">
            <Icon icon="fa-check" />
            <p>Confirmar</p>
          </Button>
          <Button :click="toggleResetModal" variant="danger" class="flex-col w-full">
            <Icon icon="fa-arrow-rotate-left" />
            <p>Reiniciar</p>
          </Button>
        </section>
      </section>
      <section class="flex flex-col gap-4 h-[calc(100dvh-113px)]">
        <SelfServiceClientInfo />
        <SelfSevriceProducts />
        <SelfServiceTotal />
      </section>
    </Container>
  </section>

  <Modal :show="userOrderStore.state.loading || cartStore.state.loading">
    <div class="py-10 grid place-items-center">
      <Spinner size="large" />
    </div>
  </Modal>

  <Modal :show="resetModalOpen" @on-close="toggleResetModal" @on-confirm="reset" title="Deseja cancelar o atendimento?"
    action-buttons cancel-text="Voltar" confirm-text="Sim" />
</template>

<style>
.btn-columns {
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
}
</style>
