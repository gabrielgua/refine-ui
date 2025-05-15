<script setup lang="ts">
import Button from '@/components/Button.vue';
import CredentialRangeTable from '@/components/credential-range/CredentialRangeTable.vue';
import Divider from '@/components/Divider.vue';
import DropdownSelect from '@/components/forms/fields/DropdownSelect.vue';
import Input from '@/components/forms/fields/Input.vue';
import Icon from '@/components/Icon.vue';
import Modal from '@/components/modal/Modal.vue';
import ModalAlert from '@/components/modal/ModalAlert.vue';
import Section from '@/components/Section.vue';
import Spinner from '@/components/Spinner.vue';
import { useCredentialRangeStore } from '@/stores/credential-range.store';
import { type CredentialRange, type CredentialRangeRequest } from '@/types/credential-range.type';
import type { DropdownSelectOption } from '@/types/input';
import { computed, onMounted, ref, watch } from 'vue';

onMounted(() => {
  credentialRangeStore.fetchAll()
})

const credentialRangeStore = useCredentialRangeStore();
const showCredentialRangeModal = ref<boolean>(false);
const credentialRange = ref<CredentialRange>();
const credentialRangeForm = ref<CredentialRangeRequest>({
  name: '',
  min: 0,
  max: 0,
  paymentType: undefined
});

const hasOverlappingRanges = computed(() => credentialRangeStore.overlap.overlaps.length)
const isRangeVerified = computed(() => credentialRangeStore.overlap.verified)


const hasAlreadyBeenVerified = computed(() => {
  return verifiedRange.value.max === credentialRangeForm.value.max
    && verifiedRange.value.min === credentialRangeForm.value.min
})

const verifiedRange = ref<{ min: number, max: number }>({
  min: 0,
  max: 0
})

const isCredentialRangeFormValid = computed<boolean>(() => {
  return !!credentialRange.value
    && !!credentialRangeForm.value.name
    && !!credentialRangeForm.value.min
    && !!credentialRangeForm.value.max
    && !!credentialRangeForm.value.paymentType
    && !hasOverlappingRanges.value
    && isRangeVerified.value
})

const modalTitle = computed(() => credentialRange.value ? 'Editar range de crachá' : 'Novo range de crachá')
const hasChanges = computed(() => {
  if (!credentialRange.value) return true; // New range

  return (
    credentialRangeForm.value.name !== credentialRange.value.name ||
    credentialRangeForm.value.min !== credentialRange.value.min ||
    credentialRangeForm.value.max !== credentialRange.value.max ||
    credentialRangeForm.value.paymentType !== credentialRange.value.paymentType
  );
});

const isVerifyBtnValid = computed(() => {
  return credentialRangeForm.value.min
    && credentialRangeForm.value.max
    && !hasAlreadyBeenVerified.value
    && (credentialRange.value
      && (credentialRange.value.min !== credentialRangeForm.value.min
        || credentialRange.value.max !== credentialRangeForm.value.max
      ))
})

const dropdownPaymentTypeOptions: DropdownSelectOption[] = [
  { label: 'Saldo em conta', value: 'BALANCE_DEBIT' },
  { label: 'Pagamento em folha', value: 'PAYROLL_DEBIT' },
  { label: 'Cortesia', value: 'COURTESY' },
]

watch(() => credentialRangeStore.state, (newState) => {
  if (newState.single.success) {
    showCredentialRangeModal.value = false;
    credentialRangeStore.resetState();
  }
}, { deep: true })


const verifyRange = () => {
  if (!credentialRangeForm.value.min || !credentialRangeForm.value.max) {
    return;
  }

  credentialRangeStore.getOverlapping(
    credentialRangeForm.value.min,
    credentialRangeForm.value.max,
    credentialRange.value?.id ? credentialRange.value.id : undefined
  );

  verifiedRange.value = {
    min: credentialRangeForm.value.min,
    max: credentialRangeForm.value.max
  }
}

const openEditRangeModal = (cRange: CredentialRange) => {
  credentialRange.value = { ...cRange }
  credentialRangeForm.value = {
    name: cRange.name,
    min: cRange.min,
    max: cRange.max,
    paymentType: cRange.paymentType
  };

  credentialRangeStore.resetOverlap()
  credentialRangeStore.overlap.verified = true;

  verifiedRange.value = {
    min: credentialRange.value.min!,
    max: credentialRange.value.max!
  }

  showCredentialRangeModal.value = true;
}

const openNewRangeModal = () => {
  credentialRange.value = {}
  credentialRangeForm.value = {
    name: '',
    min: 0,
    max: 0,
    paymentType: undefined
  };

  credentialRangeStore.resetOverlap()
  showCredentialRangeModal.value = true;
}

const saveNewRange = () => {
  credentialRangeStore.save({
    name: credentialRangeForm.value.name!,
    min: credentialRangeForm.value.min!,
    max: credentialRangeForm.value.max!,
    paymentType: credentialRangeForm.value.paymentType!
  });
}

const editRange = () => {
  if (!credentialRange.value) {
    return;
  }

  credentialRangeStore.edit({
    name: credentialRangeForm.value.name,
    min: credentialRangeForm.value.min,
    max: credentialRangeForm.value.max,
    paymentType: credentialRangeForm.value.paymentType
  }, credentialRange.value.id!);
}

const removeRange = (id: number) => {
  console.log('remove: ', id);
}

const submitCredentialRangeForm = () => {
  credentialRange.value?.id ? editRange() : saveNewRange();
}

</script>

<template>
  <Section>
    <div class="grid grid-cols-[20rem_auto] divide-x divide-zinc-200 dark:divide-zinc-700">
      <span class="pe-4">
        <Input id="credential-range-search" icon-start="magnifying-glass" placeholder="Buscar por nome..." />
      </span>
      <span class="ps-4">
        <Button :click="() => openNewRangeModal()">
          Adicionar Novo
          <Icon icon="plus" size="small" />
        </Button>
      </span>
    </div>
    <Divider />
    <CredentialRangeTable @edit="openEditRangeModal" @remove="" />
    <Modal :show="showCredentialRangeModal" :title="modalTitle" @on-close="showCredentialRangeModal = false"
      :loading="credentialRangeStore.state.single.loading">
      <form @submit.prevent="submitCredentialRangeForm" class="space-y-4">

        <Input id="c-range-name" v-model="credentialRangeForm.name" label="Nome" placeholder="Insira o nome" />

        <div class="space-y-4">
          <div class="flex items-end gap-4 *:grow">
            <Input id="c-range-min" v-model="credentialRangeForm.min" type="number" step="1" min="1" label="Mínimo"
              placeholder="Insira nº mínimo" />
            <Input id="c-range-max" v-model="credentialRangeForm.max" type="number" step="1" min="1" label="Máximo"
              placeholder="Insira nº máximo" />

            <Button class="mb-0.5" type="button" :click="() => verifyRange()" :disabled="!isVerifyBtnValid"
              :loading="credentialRangeStore.state.overlap.loading">
              <Icon icon="magnifying-glass" size="small" />
              Verificar
            </Button>
          </div>
          <div v-if="credentialRangeStore.state.overlap.loading" class="flex items-center gap-3 text-xs">
            <Spinner size="small" />
            <p class="text-zinc-400">Verificando conflitos...</p>
          </div>

          <div v-if="hasOverlappingRanges && !credentialRangeStore.state.overlap.loading"
            class="space-y-1.5 text-rose-500">
            <div class="flex items-center gap-2">
              <p class="text-xs">Conflito com outros Ranges</p>
              <Icon icon="xmark" size="small" />
            </div>
            <div
              class="bg-rose-100 border transition-all border-rose-200 dark:border-rose-800/50 dark:bg-rose-950 p-3 rounded-xl space-y-4">
              <ul class="space-y-2">
                <li v-for="{ id, name } in credentialRangeStore.overlap.overlaps" :key="id"
                  class="text-xs flex items-center gap-3">
                  <Icon icon="xmark" size="small" />
                  <p>{{ name }}</p>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="!hasOverlappingRanges && isRangeVerified && !credentialRangeStore.state.overlap.loading"
            class="flex items-center gap-2 text-teal-500">
            <p class="text-xs">Nenhum conflito encontrado.</p>
            <Icon icon="check" size="small" />
          </div>
        </div>

        <DropdownSelect id="c-range-payment-type" v-model="credentialRangeForm.paymentType" label="Tipo de pagamento"
          placeholder="Selecione um valor" :options="dropdownPaymentTypeOptions" />
        <Divider />
        <Button type="submit" class="w-full"
          :disabled="!isCredentialRangeFormValid || !hasChanges || !hasAlreadyBeenVerified">Salvar</Button>
      </form>
    </Modal>
    <ModalAlert />
  </Section>
</template>
