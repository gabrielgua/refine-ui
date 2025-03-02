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
import { useFullscreen } from '@vueuse/core';
import { computed, onBeforeUnmount, ref } from 'vue';
import SelfServiceScale from '@/components/SelfService/SelfServiceScale.vue';
import { useScheduleStore } from '@/stores/schedule.store';

onBeforeUnmount(() => {
  cartStore.reset();
  orderStore.reset();
  scheduleStore.reset();
})


const element = ref<HTMLElement>();
const { toggle } = useFullscreen(element);

const orderStore = useOrderStore();
const scheduleStore = useScheduleStore();
const cartStore = useCartStore();


const loading = computed(() => {
  return orderStore.state.loading
    || cartStore.state.loading
    || orderStore.state.loading
})

const serving = computed(() => scheduleStore.schedule?.serving)


const showScaleSection = computed(() => {
  return orderStore.client && scheduleStore.current?.priceType === 'PRICE_PER_KG';
})

</script>
<template>
  <section ref="element" class="h-full bg-[#f5f5f5] text-black dark:bg-zinc-800 dark:text-white">
    <SelfServiceHeader @fullscreen="toggle" />
    <Container class="grid grid-cols-2 pt-4 gap-4" :class="{ 'grid-cols-1': !serving }">
      <section class="flex flex-col gap-4 h-[calc(100dvh-113px)]">
        <SelfServiceCurrent />
        <SelfServiceForm v-if="serving" />
      </section>
      <section class="flex flex-col gap-4 h-[calc(100dvh-113px)]" v-if="serving">
        <SelfServiceClientInfo />
        <SelfServiceScale v-if="showScaleSection" />
        <SelfServiceProducts />
        <SelfServiceTotal class="mt-auto" />
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
