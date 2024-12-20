<script setup lang="ts">
import Container from '@/components/Container.vue';
import Modal from '@/components/Modal.vue';
import ModalAlert from '@/components/Modals/ModalAlert.vue';
import SelfServiceClientInfo from '@/components/SelfService/SelfServiceClientInfo.vue';
import SelfServiceCurrent from '@/components/SelfService/SelfServiceCurrent.vue';
import SelfServiceForm from '@/components/SelfService/SelfServiceForm.vue';
import SelfServiceHeader from '@/components/SelfService/SelfServiceHeader.vue';
import SelfSevriceProducts from '@/components/SelfService/SelfServiceProducts.vue';
import SelfServiceTotal from '@/components/SelfService/SelfServiceTotal.vue';
import Spinner from '@/components/Spinner.vue';
import { useCartStore } from '@/stores/cart.store';
import { useOrderStore } from '@/stores/order.store';
import { useUserOrderStore } from '@/stores/user.order.store';
import { useFullscreen } from '@vueuse/core';
import { ref } from 'vue';


const element = ref<HTMLElement>();
const { toggle } = useFullscreen(element);

const userOrderStore = useUserOrderStore();
const cartStore = useCartStore();
const orderStore = useOrderStore();

</script>
<template>

  <section ref="element" class="bg-[#f5f5f5] text-black dark:bg-zinc-800 dark:text-white h-full">
    <SelfServiceHeader @fullscreen="toggle" />
    <Container class="grid grid-cols-2 pt-4 gap-4">
      <section class="flex flex-col gap-4 h-[calc(100dvh-113px)]">
        <SelfServiceCurrent />
        <SelfServiceForm />
      </section>
      <section class="flex flex-col gap-4 h-[calc(100dvh-113px)]">
        <SelfServiceClientInfo />
        <SelfSevriceProducts />
        <SelfServiceTotal />
      </section>
    </Container>
  </section>

  <Modal :show="userOrderStore.state.loading || cartStore.state.loading || orderStore.state.loading">
    <div class="py-10 grid place-items-center">
      <Spinner size="large" />
    </div>
  </Modal>

  <ModalAlert />


</template>

<style></style>
