<script setup lang="ts">
import { useManualServiceCartStore } from '@/stores/manual-service-cart.store';
import type { OrderItemRequest } from '@/types/order.item.request.type';
import { parseLocaleDate } from '@/utils/dates';
import { computed, ref, watch } from 'vue';
import Button from '../../Button.vue';
import Icon from '../../Icon.vue';
import DropdownSelect from '../fields/DropdownSelect.vue';
import Input from '../fields/Input.vue';
import Form, { type FormFieldOption } from '../Form.vue';
import ManualServiceCart from './ManualServiceCart.vue';
import ManualServicePricing from './ManualServicePricing.vue';
import ManualServiceProductSearch from './ManualServiceProductSearch.vue';
import { useManualServiceStore } from '@/stores/manual-service.store';
import { useModalStore } from '@/stores/modal.store';
import InputButtonGroup from '../fields/InputButtonGroup.vue';
import { useToggle } from '@vueuse/core';
import { useTareStore } from '@/stores/tare.store';

export type ManualServiceForm = {
  credential: string,
  date: string,
  storeId: number,
  atendimentoId: number,
  tare: number,
  items: OrderItemRequest[],
}

const emit = defineEmits(['submit', 'reset']);

const { error } = useModalStore();
const tareStore = useTareStore();
const manualServiceStore = useManualServiceStore();
const manualServiceCartStore = useManualServiceCartStore();

const tareDisabled = ref<boolean>(true);
const toggleTareDisabled = useToggle(tareDisabled)

const showProductForm = computed(() => form.value.atendimentoId && form.value.date && form.value.storeId);

const form = ref<ManualServiceForm>({
  credential: '',
  date: '',
  storeId: 0,
  atendimentoId: 0,
  tare: tareStore.tare,
  items: []
});

watch(() => form.value.atendimentoId, () => {
  if (form.value.atendimentoId >= 0) {
    manualServiceCartStore.setAtendimentoId(form.value.atendimentoId);
  }
})

watch(() => form.value.storeId, () => {
  if (form.value.storeId >= 0) {
    manualServiceCartStore.setStoreId(form.value.storeId);
  }
})


const storeOptions: FormFieldOption[] = [
  { value: 1, label: 'Erasto Gaertner' },
  { value: 2, label: 'Hóspice' },
  { value: 3, label: 'Irati' },
]

const atendimentoOptions: FormFieldOption[] = [
  { value: 1, label: 'Café da Manhã' },
  { value: 2, label: 'Almoço' },
  { value: 3, label: 'Lanche da Tarte' },
  { value: 4, label: 'Jantar' },
]

const submit = () => {
  if (!manualServiceStore.client) {
    error('Cliente não selecionado', 'Selecione um cliente antes de enviar o formulário');
    return;
  }

  if (!manualServiceCartStore.cart.items.length) {
    error('Carrinho vazio', 'Adicione pelo menos um produto antes de enviar o formulário');
    return;
  }

  form.value.credential = manualServiceStore.client.credential;
  form.value.items = manualServiceCartStore.cart.items.map(item => (
    {
      productCode: item.product.code,
      quantity: item.quantity,
      ...((item.weight && item.product.priceType === 'PRICE_PER_KG') && { weight: item.weight })
    }))

  emit('submit', form.value);
};

const setTodayDate = () => {
  form.value.date = parseLocaleDate(new Date());
}

const isValid = computed(() => {
  return form.value.date
    && form.value.atendimentoId !== 0
    && form.value.storeId !== 0
    && form.value.tare
    && manualServiceStore.client
    && manualServiceCartStore.cart.items.length
})

const resetTare = () => {
  toggleTareDisabled();
  form.value.tare = tareStore.tare;
}

</script>

<template>
  <Form @submit="submit">
    <template #formInputsGridNone>
      <div class="grid divide-y divide-zinc-100/10">
        <div class="grid lg:grid-cols-2 xl:grid-cols-4 gap-4 pb-4">
          <InputButtonGroup id="date" label="Data e Hora" v-model="form.date" type="datetime-local">
            <template #btn-group-actions>
              <Button type="button" :click="() => setTodayDate()" class="rounded-l-none rounded-r-lg">
                Hoje
                <Icon icon="fa-regular fa-clock" size="small" />
              </Button>
            </template>
          </InputButtonGroup>
          <DropdownSelect id="store" v-model="form.storeId" label="Loja" placeholder="Selecione a loja"
            :options="storeOptions" />
          <DropdownSelect id="atendimento" v-model="form.atendimentoId" placeholder="Selecione o atendimento"
            label="Atendimento" :options="atendimentoOptions" />

          <InputButtonGroup id="tare" v-model="form.tare" label="Tara" type="number" step="0.001" min="0.00"
            :disabled="tareDisabled">
            <template #btn-group-actions>
              <Button :variant="tareDisabled ? 'secondary' : 'danger'" type="button"
                :click="() => tareDisabled ? toggleTareDisabled() : resetTare()"
                class="rounded-none last:rounded-r-lg h-full">
                {{ tareDisabled ? 'Editar' : 'Cancelar' }}
                <Icon :icon="tareDisabled ? 'pen' : 'arrow-rotate-left'" size="small" />
              </Button>
            </template>
          </InputButtonGroup>
        </div>

        <div class="py-4" v-if="showProductForm">
          <ManualServiceProductSearch :tare="form.tare" />
        </div>

        <div v-if="showProductForm" class="grid xl:grid-cols-2 items-end gap-4 h-full pt-4">
          <ManualServiceCart />
          <ManualServicePricing />
        </div>
      </div>
    </template>
    <template #formActions>
      <Button type="button" variant="danger" :click="() => $emit('reset')">
        <Icon icon="rotate-left" />
        Reiniciar
      </Button>
      <Button type="submit" variant="success" :disabled="!isValid">
        Salvar
        <Icon icon="check" />
      </Button>
    </template>
  </Form>
</template>
