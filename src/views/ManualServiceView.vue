<script setup lang="ts">
import { ref, type Component } from "vue";
import Section from "@/components/Section.vue";
import ModalAlert from "@/components/modal/ModalAlert.vue";
import ReportResidentsForm from "@/components/Form/ReportResidentsForm.vue";
import ManualServiceForm from "@/components/Form/ManualServiceForm.vue";
import { useOrderStore } from "@/stores/order.store";
import { CartRequest } from '@/types/cart.type'

const orderStore = useOrderStore();

const submitCart = () => {
    if (!CartRequest.credential || !CartRequest.atendimentoId) {
      return
    }

    orderStore.createOrder(CartRequest.items, CartRequest.credential, CartRequest.atendimentoId)
}


</script>

<template>
  <Section>
      <div>
        <component @submit="submitCart" :key="ReportResidentsForm" :is="ManualServiceForm" />
      </div>
  </Section>
  <ModalAlert />
</template>
