<script setup lang="ts">
import Section from "@/components/Section.vue";
import Spinner from "@/components/Spinner.vue";
import ManualServiceClientSearch from "@/components/forms/manual-service/ManualServiceClientSearch.vue";
import ManualServiceForm, { type ManualServiceForm as ManualServiceFormType } from "@/components/forms/manual-service/ManualServiceForm.vue";
import Modal from "@/components/modal/Modal.vue";
import ModalAlert from "@/components/modal/ModalAlert.vue";
import JumpInTransition from "@/components/transitions/JumpInTransition.vue";
import { useManualServiceCartStore } from "@/stores/manual-service-cart.store";
import { useManualServiceOrderStore } from "@/stores/manual-service-order.store";
import { useManualServiceStore } from "@/stores/manual-service.store";
import { useModalStore } from "@/stores/modal.store";
import { useToggle } from "@vueuse/core";
import { computed, onBeforeUnmount, ref, watch } from "vue";

onBeforeUnmount(() => resetManualServiceStores())


const { success, error } = useModalStore();

const manualServiceOrderStore = useManualServiceOrderStore();
const showResetModal = ref<boolean>(false);
const toggleResetModal = useToggle(showResetModal);

const manualServiceStore = useManualServiceStore();
const manualServiceCartStore = useManualServiceCartStore();

const client = computed(() => manualServiceStore.client);

watch(() => client.value, () => {
  if (client.value && client.value.credential.length) {
    manualServiceCartStore.setCredential(client.value.credential);
  }
})

const resetManualServiceStores = () => {
  manualServiceCartStore.reset();
  manualServiceStore.reset();
}

const resetManualServiceForm = () => {
  resetManualServiceStores();
  toggleResetModal();
  success('Atendimento reiniciado', 'Atendimente manual foi reiniciado com sucesso');
}

const submitCart = (form: ManualServiceFormType) => {
  manualServiceOrderStore.createOrder({ credential: form.credential, atendimentoId: form.atendimentoId, items: form.items });
}


</script>

<template>
  <Section>
    <ManualServiceClientSearch />
    <JumpInTransition>
      <ManualServiceForm v-if="client" @submit="submitCart" @reset="toggleResetModal" />
    </JumpInTransition>

    <Modal :show="showResetModal" title="Reiniciar atendimento manual?" variant="danger" action-buttons
      confirm-text="Reiniciar" @on-confirm="resetManualServiceForm" @on-close="toggleResetModal">
      <p>Isso fará com que todas as informações do formulário sejam perdidas.</p>
    </Modal>

    <Modal :show="manualServiceOrderStore.state.loading">
      <div class="py-10 grid place-items-center">
        <Spinner size="large" />
      </div>
    </Modal>

    <ModalAlert />
  </Section>
</template>
