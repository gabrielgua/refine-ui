<script setup lang="ts">
import Container from '@/components/Container.vue';
import Modal from '@/components/Modal.vue';
import ModalAlert from '@/components/Modals/ModalAlert.vue';
import SelfServiceClientInfo from '@/components/SelfService/SelfServiceClientInfo.vue';
import SelfServiceCurrent from '@/components/SelfService/SelfServiceCurrent.vue';
import SelfServiceForm from '@/components/SelfService/SelfServiceForm.vue';
import SelfServiceHeader from '@/components/SelfService/SelfServiceHeader.vue';
import SelfServiceProducts from '@/components/SelfService/SelfServiceProducts.vue';
import SelfServiceTotal from '@/components/SelfService/SelfServiceTotal.vue';
import Spinner from '@/components/Spinner.vue';
import { useCartStore } from '@/stores/cart.store';
import { useOrderStore } from '@/stores/order.store';
import { useClientOrderStore } from '@/stores/client.order.store';
import { useFullscreen } from '@vueuse/core';
import { computed, ref } from 'vue';
import SelfServiceScale from '@/components/SelfService/SelfServiceScale.vue';
import { useScheduleStore } from '@/stores/schedule.store';


const element = ref<HTMLElement>();
const { toggle } = useFullscreen(element);

const userOrderStore = useClientOrderStore();
const scheduleStore = useScheduleStore();
const cartStore = useCartStore();
const orderStore = useOrderStore();

const loading = computed(() => {
  return userOrderStore.state.loading
    || cartStore.state.loading
    || orderStore.state.loading
})

const showScaleSection = computed(() => {
  return userOrderStore.client && scheduleStore.current?.priceType === 'PRICE_PER_KG';
})

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
        <SelfServiceScale v-if="showScaleSection" />
        <SelfServiceProducts />
        <SelfServiceTotal />
      </section>
    </Container>
  </section>

  <Modal :show="loading">
    <div class="py-10 grid place-items-center">
      <Spinner size="large" />
    </div>
  </Modal>

  <ModalAlert />


</template>

<style></style>
